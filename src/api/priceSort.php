<?php

include "connect.php";
$pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : null;
$qty = isset($_POST['qty']) ? $_POST['qty'] : null;

$conn->set_charset('utf8');

$sql = "SELECT * FROM goodslist ORDER BY price asc";

// 执行sql语句
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);
$res = array(
        "total" => count($row),
        "row" => array_slice($row,($pageNo-1)*$qty,$qty),
        "pageNo" => $pageNo,
        "qty" => $qty
);
 $arr = array($res);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>