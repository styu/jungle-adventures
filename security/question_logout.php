<?php

	if (isset($_GET['question'])) {
		session_start();
		$question = $_GET['question'];
		echo $question;
		unset($_SESSION[$question]);
		header("Location: $question/login.php");

	} else {
		header("Location: login.php");
	}

?>