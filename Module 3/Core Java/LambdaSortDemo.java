import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaSortDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Zara");
        names.add("John");
        names.add("Alice");
        names.add("Bob");

        System.out.println("Before sorting: " + names);

        // Sort using a lambda expression (alphabetical order)
        Collections.sort(names, (s1, s2) -> s1.compareToIgnoreCase(s2));

        System.out.println("After sorting: " + names);
    }
}
