import java.util.concurrent.*;
import java.util.*;

public class ExecutorCallableDemo {

    public static void main(String[] args) {
        // Create a fixed thread pool with 5 threads
        ExecutorService executor = Executors.newFixedThreadPool(5);

        // Create a list to hold Future objects
        List<Future<String>> futures = new ArrayList<>();

        // Submit 10 Callable tasks
        for (int i = 1; i <= 10; i++) {
            int taskId = i;
            Callable<String> task = () -> {
                // Simulate some work with sleep
                Thread.sleep(500);
                return "Result from task " + taskId;
            };
            futures.add(executor.submit(task));
        }

        // Collect results from futures
        for (Future<String> future : futures) {
            try {
                String result = future.get();  // This blocks until the result is available
                System.out.println(result);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }

        // Shutdown the executor
        executor.shutdown();
    }
}
