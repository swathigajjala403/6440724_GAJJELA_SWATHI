import java.io.*;
import java.net.*;

public class ChatApp {

    public static void runServer(int port) {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server started. Waiting for clients...");
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected.");

            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
            BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

            Thread readThread = new Thread(() -> {
                String msg;
                try {
                    while ((msg = in.readLine()) != null) {
                        System.out.println("Client: " + msg);
                    }
                } catch (IOException e) {
                    System.out.println("Connection closed.");
                }
            });
            readThread.start();

            String inputLine;
            while ((inputLine = userInput.readLine()) != null) {
                out.println(inputLine);
            }

            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void runClient(String hostname, int port) {
        try (Socket socket = new Socket(hostname, port)) {
            System.out.println("Connected to the server.");

            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

            Thread readThread = new Thread(() -> {
                String msg;
                try {
                    while ((msg = in.readLine()) != null) {
                        System.out.println("Server: " + msg);
                    }
                } catch (IOException e) {
                    System.out.println("Connection closed.");
                }
            });
            readThread.start();

            String inputLine;
            while ((inputLine = userInput.readLine()) != null) {
                out.println(inputLine);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Usage:");
            System.out.println("To run as server: java ChatApp server <port>");
            System.out.println("To run as client: java ChatApp client <hostname> <port>");
            return;
        }

        if ("server".equalsIgnoreCase(args[0])) {
            int port = (args.length >= 2) ? Integer.parseInt(args[1]) : 12345;
            runServer(port);
        } else if ("client".equalsIgnoreCase(args[0])) {
            if (args.length < 3) {
                System.out.println("Usage: java ChatApp client <hostname> <port>");
                return;
            }
            String hostname = args[1];
            int port = Integer.parseInt(args[2]);
            runClient(hostname, port);
        } else {
            System.out.println("Invalid option. Use 'server' or 'client'.");
        }
    }
}
