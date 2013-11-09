<?php
	if (isset($_GET['username']) && $_GET['username'] == 'root') {
		echo '231825';
	} else {
		echo 'invalid';
	}
?>