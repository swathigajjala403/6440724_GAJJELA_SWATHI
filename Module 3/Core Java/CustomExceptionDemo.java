// Custom Exception class
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomExceptionDemo {
    // Method to check age
    public static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age is less than 18. Access denied.");
        } else {
            System.out.println("Age is valid. Access granted.");
        }
    }

    public static void main(String[] args) {
        int userAge = 16;  // You can change this to test different ages

        try {
            checkAge(userAge);
        } catch (InvalidAgeException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }
}
