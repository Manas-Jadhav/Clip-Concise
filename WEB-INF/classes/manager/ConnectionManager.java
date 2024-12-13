package manager;

import java.sql.*;

public class ConnectionManager {
    static Connection con;
    public static Connection connect() {
        try {
            Class.forName("org.postgresql.Driver");
            con = DriverManager.getConnection("jdbc:postgresql://localhost/clipconcise", "postgres", "1633");
            } catch (Exception e) {
                e.printStackTrace();
            }
        return con;
    }
}