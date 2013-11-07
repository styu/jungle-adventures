<?php

	require('require_login.php');
	require('../db.php');

	setcookie('6470JUNGLEADVENTURES', 'giraffe-cookies');

	print_login_info();

	$query = "SELECT post FROM user_posts where username='$user' ORDER BY post DESC";
	$result = mysql_query($query, $db) or die(mysql_error());
	$posts = array();
	while ($row = mysql_fetch_assoc($result)) {
		$posts[] = $row['post'];
	}

	$has_none = (count($posts) == 0);

?>

<html>
	<head>
		<title>Problem 3</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
	</head>

	<body>
		<p>
			<textarea id="post-contents" style="width:500px; height:300px"></textarea><br />
			<button id="submit">Submit</button>
		</p>
		<div id="posts">
			<?php foreach ($posts as $post) { ?>
			<p><?php echo $post ?></p>
			<?php } ?>
		</div>

	</body>

	<script type="text/javascript">
		$(document).ready(function() {
			$('#submit').click(function() {
				var post_contents = $('#post-contents').val();
				$.post('add_post.php', { content: post_contents },
					function(data) {
						if (data) {
							$('#posts').prepend('<p>' + post_contents + '</p>');
							$('#post-contents').val('');
						}
					}
				);
			});
		});
	</script>
</html>