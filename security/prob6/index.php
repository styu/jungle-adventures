<html>
    <head><title>Challenge 6</title></head>
    <body>
        <h2>Challenge 6</h2>
        <p>Can you get an alert with "hello world" by visiting this page?</p>
        <?php
            $a = $_GET['a'];
            $b = $_GET['b'];
            $str = "The value of a was $a. The value of b was $b";
            echo $str;
        ?>
    </body>
</html>