<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'goods';

    $pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : null;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : null;


    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        // 输出信息并结束连接
        die("连接失败: " . $conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = "select * from goodslist";

    // 执行sql语句
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    $res = array(
        "total" => count($row),
        "row" => array_slice($row,($pageNo-1)*$qty,$qty),
        "pageNo" => $pageNo,
        "qty" => $qty
    );
    // echo json_encode($res,JSON_UNESCAPED_UNICODE);

    $arr = array($res);
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    // print_r($row);

    
?>