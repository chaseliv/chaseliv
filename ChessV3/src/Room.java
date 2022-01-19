import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;

public class Room {
    private ArrayList<String> messageHistory;
    private Socket pWhite_;
    private Socket pBlack_;
    private static ArrayList<Room> rooms_ = new ArrayList<>();
    private boolean gameStarted;

    Room(){
        messageHistory = new ArrayList<>();
        pWhite_ = null;
        pBlack_ = null;
        gameStarted = false;
    }

    public static synchronized Room getRoom(){
            for (int i = 0; i < rooms_.size(); i++) {
                if(rooms_.get(i).isWaitingPlayer()){
                    return rooms_.get(i);
                }
            }
            Room newRoom = new Room();
            rooms_.add(newRoom);
            return newRoom;
    }

    private boolean isWaitingPlayer() {
        if(pWhite_ != null && pBlack_ != null && !gameStarted){
            return false;
        }
        else{
            return true;
        }
    }

    public synchronized ArrayList<String> getMessages(){
        return messageHistory;
    }
    public synchronized void addMessage(String newMessage){
        messageHistory.add(newMessage);
    }
    public synchronized void sendMessageToAllClients(String message) {
        String messageJSON = convertMessageToJSON(message);
        try {
            outputToDataStream(pWhite_, messageJSON);
        }
        catch (NullPointerException e){

        }
        try {
            outputToDataStream(pBlack_, messageJSON);
        }
        catch (NullPointerException e){

        }
    }
    public void outputToDataStream(Socket clientSocket, String messageJSON){
        try {
            DataOutputStream output = new DataOutputStream(clientSocket.getOutputStream());

            //how to send back to client
            byte[] header = new byte[2];
            header[0] = (byte) ((0x8 << 4) | 0x1);
            header[1] = (byte) messageJSON.length();
            byte[] messageArray = messageJSON.getBytes();

            output.write(header);
            output.write(messageArray);
            output.flush();
            System.out.println("Sending: '" + messageJSON + "' to " + clientSocket);
        }
        catch (IOException e){
            System.err.println("Error sending message in room");
        }
    }
    public static String convertMessageToJSON(String newMessage) {
        String[] newMessageSplit = newMessage.split(" ", 2);
        return ("{\"command\":\"" + newMessageSplit[0] + "\", \"content\":\"" + newMessageSplit[1] + "\"}");

    }
    public void printRoomInfo(){
        System.out.println("Room info for Thread # " + Thread.currentThread().getId()
                + "\n\tWhite : " + pWhite_
                + "\n\tBlack : " + pBlack_
                + "\n\tRoom address: " + this);
    }
    public synchronized void addClient(Socket clientSocket) {
        if(pWhite_ == null){
            pWhite_ = clientSocket;
        }
        else{
            pBlack_ = clientSocket;
            gameStarted = true;
        }
    }
    public synchronized void removeClient(Socket clientSocket){
        if(pWhite_ == clientSocket){
            pWhite_ = null;
        }
        else{
            pBlack_ = null;
        }
        sendMessageToAllClients("server Player left the game");
        sendMessageToAllClients("leave gameOver");
        sendMessageToAllClients("server Game Over!");
    }

    public synchronized void sendRoomStatus(Socket player) {
        if(pWhite_ == player){
            outputToDataStream(player, convertMessageToJSON("playerColor w"));
            outputToDataStream(player, convertMessageToJSON("server You are white"));
            outputToDataStream(player, convertMessageToJSON("server Waiting for other player..."));
        }
        else if (pBlack_ == player){
            outputToDataStream(player, convertMessageToJSON("playerColor b"));
            outputToDataStream(player, convertMessageToJSON("server You are black"));
            sendMessageToAllClients("server Game has started");
            sendMessageToAllClients("fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        }
        else{
            System.err.println("Error sending room status.");
        }
    }

}

