<?php

include "connect.php";
$conn->set_charset('utf8');
$guid = isset($_GET['guid']) ? $_GET['guid'] : null;

$sql = "select * from goodslist where guid = '$guid'";

$result = $conn->query($sql);

$row = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>