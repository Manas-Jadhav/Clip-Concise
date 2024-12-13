package user_activity;

import manager.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Register_Servlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();

        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        PreparedStatement pst = null;
        ResultSet rs = null;
        try (Connection con = ConnectionManager.connect();){
            pst = con.prepareStatement("SELECT * FROM users where email = ?");
            pst.setString(1, email);
            rs = pst.executeQuery();
            if (rs.next()) {
                session.setAttribute("emailExists", "Email already in use.Try login");
                response.sendRedirect("register.jsp");
            } else {
                pst = con.prepareStatement("INSERT INTO users(username,email,password) values (?,?,?)");
                pst.setString(1, username);
                pst.setString(2, email);
                password = PasswordManager.encrypt(password);
                pst.setString(3, password);
                if (pst.executeUpdate() > 0) {
                    session.setAttribute("statusMessage", "Registration Successfull !");
                    response.sendRedirect("login.jsp");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
