<?php

	require('require_login.php');
	require('../db.php');

	$arr1 = array('giraffe-', 'monkey-', 'lizard-', 'jungle-', 'lion-', 'elephants-');
	$arr2 = array('cookies', 'tails', 'bananas', 'trees', 'adventures');

	$secret = $arr1[array_rand($arr1)] . $arr2[array_rand($arr2)];
	setcookie('6470JUNGLEADVENTURES', $secret);

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
		<title>Challenge 3</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
	</head>

	<body>
		<?php print_login_info(); ?>
		<?php echo 'Secret:  ' . $secret ?>
		<p>Can you cause the page to alert the contents of the secret as soon as it is visited?</p>
		<p>Hint: The secret is stored -- somehow -- on your computer, perhaps with the name '6470JUNGLEADVENTURES'</p>
		<h2>Your Jungle-book Feed:</h2>
		<p>
			<textarea id="post-contents" style="width:500px; height:50px; font-size:16px" placeholder="Write your post here"></textarea><br />
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