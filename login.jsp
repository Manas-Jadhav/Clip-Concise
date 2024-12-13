<%@ page import="javax.servlet.http.Cookie"%>
<%! String semail="";%>
<%
    // This is used to extract the email which is stored in a cookie when authentication is done and the email entered is correct.
    Cookie[] ck = request.getCookies();
    if (ck != null) {
        for (Cookie cookie : ck) {
            if ("semail".equals(cookie.getName())) {
                semail = cookie.getValue();
                break;
            }
        }
    }

    // Checks if user has already logged in and if yes they are redirected directly to the home page
    if (session != null && session.getAttribute("username") != null) {
        String userid = (String) session.getAttribute("uid");
        String username = (String) session.getAttribute("username");
        response.sendRedirect("home.jsp");
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="styling/login.css"> <!-- Include the same CSS file -->
    <title>LOGIN</title>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</head>
<body>
<section>
    <div class="wrapper"> <!-- Ensure this matches the CSS class name -->
        <span class="bg-animate"></span>
        <div class="form-box login"> <!-- Ensure this matches the CSS class name -->
            <h2>LOGIN</h2>
            <form action="login" method="post">
                <div class="inputbox">
                    <ion-icon name="person-outline"></ion-icon>
                    <input type="text" placeholder="Email Id" name="email" value="<%= semail %>" required>
                </div>
                <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" name="password" placeholder="Password" required>
                </div>
		<p class="welcome-link">Visit Welcome Page <a href="welcome.jsp">Here</a></p>
                <button type="submit">Login</button>
                <%
                    String statusMessage = (String) session.getAttribute("statusMessage");
                    if (statusMessage != null && !statusMessage.isEmpty()) {
                %>
                <div class="errormsg"><%= statusMessage %></div>
                <%
                    session.removeAttribute("statusMessage");
                    }
                %>
                <div class="logreg-link">
                    <h4 id="redirect">New User? <a href="register.jsp" class="register-link">Create Account</a> </h4>
                </div>
            </form>
        </div>
    </div>
</section>
</body>
</html>
