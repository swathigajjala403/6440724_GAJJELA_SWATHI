import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamAPIDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 15, 20, 25, 30, 35, 40);

        // Filter even numbers using Stream API
        List<Integer> evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());

        System.out.println("Even numbers: " + evenNumbers);
    }
}
