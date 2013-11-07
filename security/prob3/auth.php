<?php
	session_start();

	require("../util.php");

	function print_auth_error() {
		echo "Username or password was incorrect<br />";
		echo link_to("login.php", "Back to login");
	}

	if (empty($_POST["username"]) || empty($_POST["password"])) {
		print_auth_error();

	} else {
		require("../db.php");
		$user = mysql_real_escape_string($_POST["username"]);
		$pass = $_POST["password"];
		$query = "SELECT password from users WHERE username='" . $user . "'";
		$result = mysql_query($query, $db) or die(mysql_error());
        $row = mysql_fetch_assoc($result);
        $correct_pass = $row["password"];

        $query = "SELECT salt from users WHERE username='" . $user . "'";
        $result = mysql_query($query, $db) or die(mysql_error());
        $row = mysql_fetch_assoc($result);
        $salt = $row["salt"];

        if (sha1($pass . $salt) == $correct_pass) {
        	$_SESSION['username'] = $user;
        	header("Location: index.php");
        } else {
        	print_auth_error();
        }
	}
?>