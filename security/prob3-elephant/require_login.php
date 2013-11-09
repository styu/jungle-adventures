<?php
	session_start();

	if (empty($_SESSION['username'])) {
		header("Location: login.php");
	} else {
		$user = $_SESSION['username'];
	}

	function print_login_info() {
		echo "Welcome, {$_SESSION['username']} (<a href='logout.php'>Logout</a>)<br />";
	}
?>