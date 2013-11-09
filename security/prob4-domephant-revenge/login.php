<?php

	require('../util.php');
	require('db.php');

	session_start();

	if (isset($_SESSION[$PROBLEM])) {
		header("Location: auth.php");
	}

	if (isset($_SESSION['csrf_id'])) {
		$csrf_id = $_SESSION['csrf_id'];
	} else {
		$csrf_id = md5(2*time());
		$_SESSION['csrf_id'] = $csrf_id;
	}

	$token = get_pre_csrf_token($csrf_id);

?>

<html>
	<head>
		<title>Login</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
	</head>

	<body>
		<h2>Login to the super secret 6.470 jungle server</h2>
		<h2>(Challenge 4)</h2>
		<p>Can you figure out the secret message protected by the 'root' user?</p>
		<p>Hint: It's a 4 digit number.</p>

		<form action="auth.php" method="post">
			<input type="hidden" name="csrf_token" value="<?php echo $token ?>" />
			Username: <input type="text" name="username" /><br />
			Password: <input type="password" name="password" /></br />
			<input type="submit" />
		</form>
	</body>
</html>