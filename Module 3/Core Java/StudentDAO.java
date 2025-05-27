import java.sql.*;

public class StudentDAO {
    private Connection conn;

    // Constructor to establish connection
    public StudentDAO() {
        String url = "jdbc:mysql://localhost:3306/college";  // Replace with your DB URL
        String user = "root";                                 // Your DB username
        String password = "your_password";                    // Your DB password

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Method to insert a new student
    public void insertStudent(String name, int age, String grade) {
        String sql = "INSERT INTO students (name, age, grade) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            pstmt.setString(3, grade);
            pstmt.executeUpdate();
            System.out.println("Student inserted successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to update a student's grade by ID
    public void updateStudentGrade(int id, String newGrade) {
        String sql = "UPDATE students SET grade = ? WHERE id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newGrade);
            pstmt.setInt(2, id);
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student grade updated successfully.");
            } else {
                System.out.println("No student found with ID: " + id);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Close the connection
    public void close() {
        try {
            if (conn != null && !conn.isClosed()) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Main method to test insert and update
    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        
        // Insert a new student
        dao.insertStudent("David", 23, "B");

        // Update the grade for student with ID 1
        dao.updateStudentGrade(1, "A+");

        dao.close();
    }
}
