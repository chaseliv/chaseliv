import java.io.*;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class MyRunnable implements Runnable {
    private String fileName_;
    private String cmd_;
    private String port_;
    private Map< String, String > httpRequestData_;
    private String statusCode_;
    private String statusDescription_;
    private String contentType_;
    private String filePath_;

    private Socket clientSocket_;
    private Room myRoom_;
    private String userName_;


    MyRunnable(Socket clientSocket) {
        fileName_ = "";
        cmd_ = "";
        port_ = "";
        httpRequestData_ = new HashMap<>();
        clientSocket_ = clientSocket;
        statusCode_ = "";
        statusDescription_ = "";
        contentType_ = "text/html";
        filePath_ = "src/resources";
    }

    @Override
    public void run() {
        try {
            handleRequest();
            if(httpRequestData_.get("Sec-WebSocket-Key") != null ) {
                handleWSResponse();
            }
            else{
                handleHTTPResponse();
            }
            clientSocket_.close();

        }
        catch (IOException | NoSuchAlgorithmException | InterruptedException e){
            System.out.println("error with I/O");
            e.printStackTrace();
        }


    }

    public String generateResponseKey(String requestKey) throws NoSuchAlgorithmException {
        String provided = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
        requestKey += provided;
        MessageDigest md = MessageDigest.getInstance("SHA-1");

        byte[] hashed = md.digest( requestKey.getBytes() );
        String result = Base64.getEncoder().encodeToString( hashed );

        return result;
    }

    public void handleRequest() throws IOException {
        //Creating the input and outputstreams to the socket
        InputStreamReader input = new InputStreamReader(clientSocket_.getInputStream());

        //using a scanner to read my input stream
        Scanner myScanner = new Scanner(input);

        //getting the cmd filename and port
        cmd_ = myScanner.next();
        fileName_ = myScanner.next();
        port_ = myScanner.next();
        myScanner.nextLine();

//        System.out.println(cmd_ + " " + fileName_ + " " + port_);

        while(myScanner.hasNextLine() ){
            String[] temp = myScanner.nextLine().split(": ", 2);
            if(temp[0].isEmpty()) {
                break;
            }
            httpRequestData_.put( temp[0], temp [1] );
//            System.out.println( "\t" + temp[0] + ": " + temp[1] );
        }

    }

    public void handleHTTPResponse() throws IOException {
        //Handle the response to the clientSocket
        OutputStream myOutputStream = clientSocket_.getOutputStream();
        PrintWriter writer = new PrintWriter(myOutputStream);



        if (fileName_.equals("/")) {
            filePath_ += "/index.html";
        } else {
            filePath_ += fileName_;
        }

        File file = new File(filePath_);

        if (!file.exists()) {
            System.err.println("File not found: " + filePath_);
            statusCode_ = "404";
            statusDescription_ = "File not found";

            writer.println(port_ + " " + statusCode_ + " " + statusDescription_);
            writer.println("\n");
            writer.flush();
        }
        else {
            statusCode_ = "200";
            statusDescription_ = "OK";
            setContentType();

            writer.println(port_ + " " + statusCode_ + " " + statusDescription_);
            writer.println("Content-Type: " + contentType_);
            writer.println("Content-Size: " + filePath_.length());
            writer.println("\n");
            writer.flush();

            FileInputStream fis = new FileInputStream(file);
            fis.transferTo(myOutputStream);
        }

        writer.close();

        myOutputStream.flush();
        myOutputStream.close();
    }

    public void handleWSResponse() throws IOException, NoSuchAlgorithmException, InterruptedException {

        String responseKey = generateResponseKey(httpRequestData_.get("Sec-WebSocket-Key"));

        PrintWriter writer = new PrintWriter(clientSocket_.getOutputStream());

        writer.println("HTTP/1.1 101 Switching Protocols\r");
        writer.println("Upgrade: websocket\r");
        writer.println("Connection: Upgrade\r");
        writer.println("Sec-WebSocket-Accept: " + responseKey + "\r");
        writer.println("\r");
        writer.flush();

//        System.out.println("HTTP/1.1 101 Switching Protocols\r");
//        System.out.println("\tUpgrade: websocket\r");
//        System.out.println("\tConnection: Upgrade\r");
//        System.out.println("\tSec-WebSocket-Accept: " + responseKey + "\r");

        //using a datainputstream to read my Web Socket.
        DataInputStream dis = new DataInputStream(clientSocket_.getInputStream());

        decodeStream(dis);
    }

    public void setContentType(){
        try {
            int firstIndex = fileName_.indexOf('.') + 1;

            String fileType = fileName_.substring(firstIndex, fileName_.length());

            if (fileType.equals("css")) {
                contentType_ = "text/css";
            }
            else if (fileType.equals("html")) {
                contentType_ = "text/html";
            }
            else if (fileType.equals("png")){
                contentType_ = "image/png";
            }
            else if(fileType.equals("jpeg") || fileType.equals("jpg")){
                contentType_ = "image/jpeg";
            }
        }
        catch (StringIndexOutOfBoundsException e){
            contentType_ = "text/html";
        }

    }

    private void decodeStream(DataInputStream dis) throws IOException {
        while(true) {

            try {
                byte byte0 = dis.readByte();
                byte byte1 = dis.readByte();

                int fin = byte0 >>> 7;
                int opCode = byte0 & 0x0F;
                if (opCode == 8) {
                    break;
                }

                boolean isMasked = (byte1 & 0x80) != 0;
                int payloadLength = byte1 & 0x7F;

                if (payloadLength == 126) { //else if length < Short,Max*2
                    payloadLength = dis.readShort(); //returns the next two bytes as a short
                } else if (payloadLength == 127) {
                    payloadLength = (int) dis.readLong(); // returns the next 8 bytes as a long
                }


                byte[] mask = new byte[4];
                if (isMasked) {
                    for (int i = 0; i < 4; i++) {
                        mask[i] = dis.readByte();
                    }
                }

                byte[] encodedData = new byte[payloadLength];
                for (int i = 0; i < payloadLength; i++) {
                    encodedData[i] = dis.readByte();
                }

                byte[] decodedData = new byte[payloadLength];
                for (int i = 0; i < payloadLength; i++) {
                    decodedData[i] = (byte) (encodedData[i] ^ mask[i % 4]);
                }

                String payloadString = new String(decodedData);
//                System.out.println("Decode Stream for Thread # " + Thread.currentThread().getId()
//                        + "\n\tOpcode: " + opCode
//                        + "\n\tPayload length: " + payloadLength
//                        + "\n\tIs masked: " + isMasked
//                        + "\n\tMessage: " + payloadString);

                handleMessage(payloadString);
            }
            catch(EOFException e){
                //TODO do this for chess
                System.out.println("Thread # " + Thread.currentThread().getId() + ": Client disconnected");
                try {
                    myRoom_.removeClient(clientSocket_);
                    userName_ = null;
                    myRoom_ = null;
                    break;
                }
                catch (NullPointerException nE){
                    break;
                }
            }

        }
    }

    private void handleMessage(String payloadMessage) {
        String[] message = payloadMessage.split(" ", 2);
        String command = message[0];
        String content = message[1];

        switch (command){
            case "fen":
            case "message":
                myRoom_.sendMessageToAllClients(payloadMessage);
                break;
            case "join":
                userName_ = content;
                myRoom_ = Room.getRoom();
                myRoom_.addClient(clientSocket_);
                myRoom_.sendRoomStatus(clientSocket_);
                myRoom_.printRoomInfo();
                break;
            case "leave":
                myRoom_.removeClient(clientSocket_);
                break;
            default:
                System.err.print("Default " + payloadMessage);
                System.exit(1);
        }

    }

}

