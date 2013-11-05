<?php
	function link_to($url, $text) {
		return "<a href=\"$url\">$text</a>";
	}

	function get_db_item($row, $table, $where) {
		global $db;
		$query = "SELECT $row FROM $table WHERE $where";
		$result = mysql_query($query, $db) or die(mysql_error());
        $selected_row = mysql_fetch_assoc($result);
        return $selected_row[$row];
	}

	function set_pre_csrf_token($id) {
		mysql_query("DELETE FROM users_pre_tokens WHERE id='$id'") or die(mysql_error());
		$token = md5(time());
		mysql_query("INSERT INTO users_pre_tokens VALUES ('$id', '$token')") or die(mysql_error());
		return $token;
	}

	function get_pre_csrf_token($id) {
		$token = get_db_item("token", "users_pre_tokens", "id='$id'");
		if(!$token) {
			$token = set_pre_csrf_token($id);
		}
		return $token;
	}

	function test() {
		echo "TEST HERE";
	}

	function print_success($phrase, $question_name) {
		echo "You've successfully logged in!<br />";
		echo "The secret phrase is '$phrase'<br />";
		echo link_to("../question_logout.php?question=$question_name", "Log Out");
	}

	function print_error() {
		echo "Username or password was incorrect<br />";
		echo link_to("login.php", "Back to login");
	}

	function print_hack() {
		echo "Stop trying to hack the login!<br />";
		echo link_to("login.php", "Back to login");
	}

?>