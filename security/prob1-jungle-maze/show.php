<?php
	if (empty($_GET['id'])) {
		echo 'Try again';
	} else if ($_GET['id'] == 2) {
		echo 'This is your page. There\'s nothing special here';
	} else if ($_GET['id'] == 84) {
		echo 'Congrats! You\'ve gotten in! The secret phrase is \'elephant food\'';
	} else {
		echo "This is someone else's page. There's also nothing special here";
	}
?>