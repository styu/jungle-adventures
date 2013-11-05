<?php
	require("../db.php");
	$username = 'root';
	$password = '1592';
	$salt = md5(time());
	$pw_hash = sha1($password . $salt);
	mysql_query("CREATE TABLE IF NOT EXISTS users_prob3 (username VARCHAR(20) NOT NULL, password CHAR(40) NOT NULL, salt CHAR(32) NOT NULL, UNIQUE (username))") or die(mysql_error());
	mysql_query("INSERT IGNORE INTO users_prob3 VALUES ('$username', '$pw_hash', '$salt')") or die(mysql_error());
?>