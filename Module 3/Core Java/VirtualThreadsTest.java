public class VirtualThreadsDemo {

    private static final int THREAD_COUNT = 100_000;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("Starting virtual threads test...");
        long vtStart = System.currentTimeMillis();

        Thread[] virtualThreads = new Thread[THREAD_COUNT];
        for (int i = 0; i < THREAD_COUNT; i++) {
            virtualThreads[i] = Thread.startVirtualThread(() -> {
                // Simple work: print thread name (commented out to avoid huge console output)
                // System.out.println("Virtual Thread: " + Thread.currentThread().getName());
            });
        }
        for (Thread t : virtualThreads) {
            t.join();
        }
        long vtEnd = System.currentTimeMillis();
        System.out.println("Virtual threads completed in " + (vtEnd - vtStart) + " ms\n");

        System.out.println("Starting platform threads test...");
        long ptStart = System.currentTimeMillis();

        Thread[] platformThreads = new Thread[THREAD_COUNT];
        for (int i = 0; i < THREAD_COUNT; i++) {
            platformThreads[i] = new Thread(() -> {
                // Simple work: print thread name (commented out for performance)
                // System.out.println("Platform Thread: " + Thread.currentThread().getName());
            });
            platformThreads[i].start();
        }
        for (Thread t : platformThreads) {
            t.join();
        }
        long ptEnd = System.currentTimeMillis();
        System.out.println("Platform threads completed in " + (ptEnd - ptStart) + " ms");
    }
}
