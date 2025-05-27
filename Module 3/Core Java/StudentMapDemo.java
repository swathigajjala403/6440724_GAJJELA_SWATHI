import java.util.HashMap;
import java.util.Scanner;

public class StudentMapDemo {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Add student entries (ID and Name). Type '0' as ID to stop.");

        while (true) {
            System.out.print("Enter student ID (integer): ");
            int id = scanner.nextInt();
            scanner.nextLine();  // consume newline

            if (id == 0) {
                break;  // stop input
            }

            System.out.print("Enter student name: ");
            String name = scanner.nextLine();

            studentMap.put(id, name);
        }

        System.out.print("\nEnter a student ID to retrieve the name: ");
        int searchId = scanner.nextInt();

        if (studentMap.containsKey(searchId)) {
            System.out.println("Student Name: " + studentMap.get(searchId));
        } else {
            System.out.println("No student found with ID " + searchId);
        }

        scanner.close();
    }
}
