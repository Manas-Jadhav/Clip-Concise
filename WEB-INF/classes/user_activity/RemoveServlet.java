package user_activity;

import manager.ConnectionManager;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

public class RemoveServlet extends HttpServlet{
    public void doPost(HttpServletRequest req,HttpServletResponse res){
        String uid = req.getParameter("uid");
        Statement st = null;
        try (Connection con = ConnectionManager.connect()) {
            st = con.createStatement();
            res.setContentType("text/plain");
            if(st.executeUpdate("DELETE FROM users WHERE uid = " + uid)>0)
                res.getWriter().write("true");
            else
                res.getWriter().write("false");
        
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}