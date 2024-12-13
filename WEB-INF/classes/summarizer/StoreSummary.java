package summarizer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import manager.ConnectionManager;

public class StoreSummary{   
    public static Boolean save(String uid,String title,String video_link,String summary){
        try(Connection con = ConnectionManager.connect()){
            PreparedStatement ps = con.prepareStatement("INSERT INTO video(uid,title,video_url,summary) VALUES (?,?,?,?)");
            int userid = Integer.parseInt(uid);
            ps.setInt(1,userid);
            ps.setString(2,title);
            ps.setString(3,video_link);
            ps.setString(4,summary);
            if(ps.executeUpdate() > 0)
                return true;
            else
                return false;

        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
}