<html>
    <head><title>XSS Demo</title></head>
    <body>
    <?php
        $a = $_GET['a'];
        $b = $_GET['b'];
        $str = "The value of a was $a. The value of b was $b";
        echo $str;
    ?>
    </body>
</html>