import java.sql.*;

public class JdbcAllInOne {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/college";
        String user = "root";
        String password = "your_password";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();

            // Create table if not exists
            String createTableSQL = "CREATE TABLE IF NOT EXISTS students (" +
                                    "id INT PRIMARY KEY AUTO_INCREMENT," +
                                    "name VARCHAR(100)," +
                                    "age INT," +
                                    "grade VARCHAR(10))";
            stmt.executeUpdate(createTableSQL);

            // Insert data
            String insertSQL = "INSERT INTO students (name, age, grade) VALUES " +
                               "('Alice', 20, 'A')," +
                               "('Bob', 21, 'B')," +
                               "('Charlie', 22, 'A')";
            stmt.executeUpdate(insertSQL);

            // Select and display data
            String selectSQL = "SELECT * FROM students";
            ResultSet rs = stmt.executeQuery(selectSQL);

            System.out.println("ID\tName\t\tAge\tGrade");
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                String grade = rs.getString("grade");
                System.out.printf("%d\t%-10s\t%d\t%s%n", id, name, age, grade);
            }

            // Close resources
            rs.close();
            stmt.close();
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
