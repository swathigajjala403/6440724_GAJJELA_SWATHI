import java.sql.*;

public class TransactionExample {
    private static final String URL = "jdbc:mysql://localhost:3306/college";
    private static final String USER = "root";
    private static final String PASSWORD = "your_password";

    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // Turn off auto-commit for transaction management
            conn.setAutoCommit(false);

            try {
                // Simulated transfer: from account 1 to account 2, amount = 1000
                int fromAccountId = 1;
                int toAccountId = 2;
                double amount = 1000.0;

                // Debit from sender
                PreparedStatement debitStmt = conn.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?"
                );
                debitStmt.setDouble(1, amount);
                debitStmt.setInt(2, fromAccountId);
                debitStmt.executeUpdate();

                // Credit to receiver
                PreparedStatement creditStmt = conn.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?"
                );
                creditStmt.setDouble(1, amount);
                creditStmt.setInt(2, toAccountId);
                creditStmt.executeUpdate();

                // Commit transaction if both operations succeed
                conn.commit();
                System.out.println("Transaction committed successfully.");

            } catch (Exception e) {
                // Rollback transaction if any operation fails
                conn.rollback();
                System.out.println("Transaction rolled back due to error: " + e.getMessage());
            } finally {
                conn.setAutoCommit(true); // Restore default behavior
                conn.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
