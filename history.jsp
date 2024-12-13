<%
	if(session==null || session.getAttribute("username")==null)
		response.sendRedirect("login.jsp");	
	else if(((String)session.getAttribute("username")).startsWith("@admin"))
		response.sendRedirect("admin.jsp");
%>
<%@ page import="manager.ConnectionManager"%>
<%@ page import="java.sql.*"%>
<%! Boolean flag = false;%>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="styling\history.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script>
			$(document).ready(function() {
				// Handle click event on video titles
				$(".titles").click(function() {
					var vid = $(this).attr('value');
					// Send AJAX request to retrieve summary for the clicked video title
					$.ajax({
						type: "POST",
						url: "http://localhost:8080/Clip-Concise/getSummary",
						data: { vid: vid },
						success: function(summary) {
							// Display the retrieved summary in the main content area
							$("#summary").html(summary);
						}
					});
				});
			});
		</script>
	</head>
	<body>
		<div class="sidebar">
			
			<h1 id='cc'><a href="home.jsp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></a> Clip Concise</h1>
			<%	
				try(Connection con=ConnectionManager.connect()){
					Statement st = con.createStatement();
					ResultSet rs = st.executeQuery("SELECT * FROM VIDEO where uid ="+session.getAttribute("uid"));
					while(rs.next()){
			%>
						<div class="titles" value="<%= rs.getInt(1)%>"><h6><%= rs.getString(3)%></h6></div>
			<%
					}
					con.close();
				}catch(Exception e){
					e.printStackTrace();
				}
			%>
		</div>

		<div class="main-content">
			<div id="summary"><div class="image"></div><div>
		</div>
	</body>
</html>
