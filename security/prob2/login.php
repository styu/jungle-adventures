<html>
	<head>
		<title>Login</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
	</head>

	<body>

		<h2>Login to the super secret 6.470 jungle server</h2>
		<h2>(Challenge 2)</h2>

		<div id="result" style="margin-bottom: 20px"></div>

		<form id="login-form">
			Username: <input type="text" name="username" id="username"/><br />
			Password: <input type="password" name="password" id="password"/></br />
			<input type="submit" />
		</form>

	</body>

	<script type="text/javascript">
		$(document).ready(function() {
			$("#login-form").submit(function(event) {
				var username = $('#username').val();
				var password = $('#password').val();
				if (username == "root" && password == "230018") {
					$('#result').text("Success! The magic phrase is 'monkey bananas'.");
				} else {
					$('#result').text("Whoops. Try again.");
				}
				return false;
			});
		});
	</script>
</html>