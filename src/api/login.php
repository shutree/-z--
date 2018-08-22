<?php
// header('Content-Type:application/json;charset=utf-8');
include 'connect.php';

$username = isset($_GET['username']) ? $_GET['username'] : null; 


$sql = "select * from user where username = '$username'";
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);
// print_r($row);
if(count($row)>0){
        echo "yes";
    }else{
        echo "no";
    }
?>