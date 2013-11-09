 <html>
 	<head>
 		<title>Account Registration</title>
        <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
 	</head>

 	<body>
 		<h2>Account Registration</h2>
        <form action="process-register.php" method="post">
                Team Name: <input type="text" name="username" /><br />
                Password: <input type="password" name="password" /><br />
                Confirm Password: <input type="password" name="confirm" /><br />
                <input type="submit" />
        </form>
       	<br />
		<br />
		<a href="login.php">If you already have an account, login here.</a>
    </body>
</html>
