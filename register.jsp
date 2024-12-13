<!DOCTYPE  html>
<html lang="en">
<head>
	  <link rel="stylesheet" href="styling\register.css">
	  <title>Registration</title>
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</head>
<body>
	<section>
      <div class="form-box">
      <div class="form-value">
    	<form action="register" method="post">
            <h2>REGISTRATION</h2>
           <div class="inputbox">
           	  <ion-icon name="person-outline"></ion-icon>
              <input type="text" id="username" placeholder="Username" name="username"required>
           </div>
           <div id="usernameCondition" class="popup"></div>
           <div class="inputbox">
           	  <ion-icon name="mail-outline"></ion-icon>
              <input type="email" name="email" id="email" placeholder="Email" required>
           </div>
           <div id="emailConditions" class="popup"></div>
           <div class="inputbox">
           	  <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" id="password" name="password" placeholder="Password" required>
           </div>
           <div id="passwordConditions" class="popup"></div>
           <div class="inputbox">
           	  <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" id="cpassword" name="cpassword" placeholder="Confirm Password" required>
           </div>
           <div id="cpasswordCondition" class="popup"></div>
           <% 
                  String message = (String) session.getAttribute("emailExists");
                  if (message != null && !message.isEmpty()) {
                  %>
                     <div class="errormsg"> <%= message %> </div>
                  <%
                  session.removeAttribute("emailExists");
            }
            %>
           <button type="submit" id="submit">REGISTER</button>
      	</form>
         <div id="login">
            <h4 id="redirect">Already have account?<a href="login.jsp">Login</a></h4>   
         </div>
      </div>	
     </div>
     
   </section>
   <script src="validations.js"></script>
</body>
</html>