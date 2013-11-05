<?php

$db = mysql_connect("sql.mit.edu", "cliu2014", "charlesliu1") or die(mysql_error());
//mysql_query("CREATE DATABASE IF NOT EXISTS '6470-jungle-security'") or die(mysql_error());
mysql_select_db("cliu2014+6470-jungle-security", $db) or die(mysql_error());
mysql_query("CREATE TABLE IF NOT EXISTS users_pre_tokens (id VARCHAR(32) NOT NULL, token CHAR(32) NOT NULL, UNIQUE (id))") or die (mysql_error());
mysql_query("CREATE TABLE IF NOT EXISTS users_tokens (username VARCHAR(20) NOT NULL, token CHAR(32) NOT NULL, UNIQUE (username))") or die (mysql_error());

?>