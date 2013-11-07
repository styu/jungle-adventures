<?php
	require('require_login.php');
	require('../db.php');

	if (empty($_POST['content'])) {
		echo false;
	} else {
		$content = $_POST['content'];
		$query = "INSERT INTO user_posts VALUES ('$user', '$content')";
		mysql_query($query, $db) or die(mysql_error());
		echo true;
	}
?>