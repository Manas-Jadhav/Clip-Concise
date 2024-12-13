<%@ page import="java.io.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="manager.ConnectionManager" %>
<%
    if(session==null || session.getAttribute("username")==null)
		response.sendRedirect("login.jsp");	
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0"
		/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link rel="stylesheet" href="styling\admin.css" />
		<script>
            function remove(uid,uname){
                if(confirm("Remove user : "+uname))
                {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/Clip-Concise/removeServlet",
                        data: { uid: uid },
                        success: function(flag) {
                            // Display the retrieved summary in the main content area
                            location.reload();
                            if(flag)
                                alert("User Removed Successfully.");
                            else
                                alert("Some error occured.User not removed.");
                        }
                    });
                }
            }
        </script>
        
		<title>Document</title>
	</head>
	<body>
		<div class="navbar">
			<div class="navbar-left">
				<div class="logo-container">
					<img
						src="Landing-Page\finallogo.png"
						alt="logo"
						class="logo"
					/>
				</div>
				<div class="nav-items title">ClipConcise</div>
			</div>
			<div class="navbar-right">
				<div class="nav-items">
					<a class="redirects" href="logout">Logout</a>
				</div>
			</div>
		</div>

		<div class="container">
        <%
            try (Connection con = ConnectionManager.connect()){
                Class.forName("org.postgresql.Driver");
                Statement ps = con.createStatement();
                ResultSet rs = ps.executeQuery("select * from users");
        %>
        <table class="tab">
            <col width="100">
            <col width="150">   
            <tr class="heading">
                <th> Remove User</th>
                <th> UID </th>
                <th> USERNAME </th>
                <th> TITLE </th>
            </tr>
            <%
                while (rs.next()) {
                    int uno = rs.getInt(1);
                    PreparedStatement ps1 = con.prepareStatement("select * from video where uid=?");
                    ps1.setInt(1, uno);
                    ResultSet rs1 = ps1.executeQuery();
            %>
            <tr>
                <td id="dlt"><div id="rmbtn" onclick="remove('<%= rs.getInt(1)%>','<%= rs.getString(2)%>')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></div></td>
                <td><%= rs.getInt(1) %></td>
                <td><%= rs.getString(2) %></td>
            <td>
                    <%
                        while (rs1.next()) {
                    %>
                    <a class="links" href="<%= rs1.getString(4) %>"><%= rs1.getString(3) %></a><br>
                    <%
                        }
                    %>
                </td>
            </tr>
            <%
                }
            } catch(Exception e) {
                e.printStackTrace();
            }
            %>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
	</body>
</html>
