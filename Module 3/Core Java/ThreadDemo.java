class MessagePrinter implements Runnable {
    private String message;
    private int times;

    public MessagePrinter(String message, int times) {
        this.message = message;
        this.times = times;
    }

    @Override
    public void run() {
        for (int i = 1; i <= times; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + message + " (" + i + ")");
            try {
                Thread.sleep(500); // Pause for 500ms for better readability
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MessagePrinter("Hello from Thread 1", 5), "Thread-1");
        Thread t2 = new Thread(new MessagePrinter("Hello from Thread 2", 5), "Thread-2");

        t1.start();
        t2.start();
    }
}
