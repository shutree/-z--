<?php

include 'connect.php';
$username = isset($_GET['username']) ? $_GET['username'] : null; 
$password = isset($_GET['password']) ? $_GET['password'] : null;
$sql = "insert into user(username,password) values('$username','$password')";

$result = $conn->query($sql);

if($result){
    echo '注册成功';
}else{
    echo '注册失败';
}

?>