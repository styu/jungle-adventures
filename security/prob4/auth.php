<?php
	require("db.php");
	require("../util.php");

	session_start();

	$csrf_id = $_SESSION['csrf_id'];

	if (!$csrf_id) {
		$csrf_id = md5(2*time());
	}

	$real_csrf_token = get_pre_csrf_token($csrf_id);
	set_pre_csrf_token($csrf_id);

	$user_csrf_token = isset($_POST['csrf_token']) ? $_POST['csrf_token'] : NULL;

	if (isset($_SESSION[$PROBLEM])) {
		print_success("baby squirrels", $PROBLEM);
	} else if ($user_csrf_token != $real_csrf_token) {
		print_hack();
	} else if (empty($_POST["username"])) {
		print_error();
	} else {
		$user = mysql_real_escape_string($_POST["username"]);
		$pass = mysql_real_escape_string($_POST["password"]);
		$correct_pass = get_db_item("password", "users_$PROBLEM", "username='$user'");
		$salt = get_db_item("salt", "users_$PROBLEM", "username='$user'");
		if (sha1($pass . $salt) == $correct_pass) {
			$_SESSION[$PROBLEM] = 'pass';
			print_success("baby squirrels", $PROBLEM);
		} else {
			print_error();
		}
	}
?>