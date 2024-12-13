package user_activity;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import manager.ConnectionManager;

public class GetSummaryServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the video title from the request
        String vid = request.getParameter("vid");
        System.out.println(vid);

        // Call a method to retrieve the summary from the database based on the video
        String summary = retrieveSummaryFromDatabase(vid);

        // Set the content type and write the summary to the response
        response.setContentType("text/plain");
        response.getWriter().write(summary);
    }

    // Method to retrieve the summary from the database
    private String retrieveSummaryFromDatabase(String vid) {
        Statement st = null;
        ResultSet rs = null;
        String summary = "";
        try (Connection con = ConnectionManager.connect()) {
            st = con.createStatement();
            System.out.println(vid);
            rs = st.executeQuery("SELECT * FROM video WHERE video_id = " + vid);
            rs.next();
            summary += "<h1>Video Title : <a target='_blank' href='" + rs.getString("video_url") + "'>"
                    + rs.getString("title") + "</a></h1><br/>";
            summary += rs.getString("summary");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return summary;
    }
}