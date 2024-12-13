package summarizer;

import java.io.*;

public class YoutubeURLParser {

    public static String processVideoId(String videoId) {
        //Let's Call the Python script with the video ID as an argument
        ProcessBuilder processBuilder = new ProcessBuilder("python",
                "C:\\xampp\\tomcat\\webapps\\Clip-Concise\\WEB-INF\\src\\summarize.py", videoId);
        processBuilder.redirectErrorStream(true);

        try {
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line, summary = "";
            Boolean flag = false,summary_generated = false;
            while ((line = reader.readLine()) != null) {
                if (line.equals("[[start]]")) {
                    flag = true;
                    summary_generated = true;
                    continue;
                }
                if (line.equals("[[end]]")) {
                    flag = false;
                    continue;
                }
                if (flag) {
                    summary += line + "\n";
                    System.out.println(line);
                }
            }
            process.waitFor();
            if(summary_generated)
                return summary;
            else
                return null;

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }
}