<?php
	if (empty($_GET['id'])) {
		echo 'Try again';
	} else if ($_GET['id'] == 2) {
		echo 'This is your page. There\'s nothing special here';
	} else if ($_GET['id'] == 1984) {
		echo 'Congrats! You\'ve gotten in! The secret phrase is \'elephant food\'';
	}
?>