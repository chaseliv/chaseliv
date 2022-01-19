import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;


//My HTTP server:
//Features:
//  * when you join a room, it sends all the history of that room
//  * When you type 'Hello Anna' it activates AnnaBot:
//      * you can talk to her after she is activated using "Anna" in your message
//      * you de activate Anna by saying 'Bye Anna'
//  * you can leave rooms
//  * there are messages when people join or leave the room

public class MyHttpServer {
    public int socketPort_;
    public ServerSocket serverSocket_;
    public Socket clientSocket_;

    MyHttpServer(int socketPort) throws IOException {
        socketPort_ = socketPort;
        serverSocket_ = new ServerSocket(socketPort_);
        clientSocket_ = new Socket();
    }

    public void handleClients() throws IOException {
        while( true ) {
            Socket clientSocket = serverSocket_.accept();

            MyRunnable runner = new MyRunnable(clientSocket); //thread only needs Socket
            Thread t = new Thread(runner);
            t.start();
        }

    }
    public static void main(String[] args) throws IOException {

        MyHttpServer theServer = new MyHttpServer( 8080 );
        theServer.handleClients();

    }

}
