<?php
	require("../util.php");

	function print_reg_error() {
		echo "Something in your registration was wrong<br />";
		echo link_to("register.php", "Back to register");
	}

	session_start();

	if (empty($_POST["username"]) || empty($_POST["password"])) {
		print_error();

	} else {
		require("../db.php");
		$user = mysql_real_escape_string($_POST["username"]);
		$pass = mysql_real_escape_string($_POST["password"]);
		$salt = md5(time());
		$salted_hash = sha1($pass . $salt);
		$query = "INSERT INTO users VALUES ('$user', '$salted_hash', '$salt')";
		$result = mysql_query($query, $db) or die(mysql_error());
		if ($result) {
			$_SESSION['username'] = $user;
        	header("Location: index.php");
		} else {
        	print_reg_error();
        }
	}
?>