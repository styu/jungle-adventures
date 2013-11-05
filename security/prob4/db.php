<?php
	require("../db.php");
	$username = 'root';
	$password = '1104';
	$salt = md5(time());
	$pw_hash = sha1($password . $salt);

	$PROBLEM = "prob4";

	mysql_query("CREATE TABLE IF NOT EXISTS users_$PROBLEM(username VARCHAR(20) NOT NULL, password CHAR(40) NOT NULL, salt CHAR(32) NOT NULL, UNIQUE (username))") or die(mysql_error());
	mysql_query("INSERT IGNORE INTO users_$PROBLEM VALUES ('$username', '$pw_hash', '$salt')") or die(mysql_error());
?>