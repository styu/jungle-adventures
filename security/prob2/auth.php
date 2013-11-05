<?php
	require("db.php");
	require("../util.php");

	session_start();

	if (isset($_SESSION['prob2'])) {
		print_success("monkey bananas", "prob2");
	} else if (empty($_POST["username"])) {
		print_error();
	} else {
		$user = mysql_real_escape_string($_POST["username"]);
		$pass = mysql_real_escape_string($_POST["password"]);
		$correct_pass = get_db_item("password", "users_prob2", "username='$user'");
		$salt = get_db_item("salt", "users_prob2", "username='$user'");
        if (sha1($pass . $salt) == $correct_pass) {
        	$_SESSION['prob2'] = 'pass';
        	print_success("monkey bananas", "prob2");
        } else {
        	print_error();
        }
	}
?>