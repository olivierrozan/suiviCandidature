<?php
require_once '../db.php';

$query1="select * from sheet order by id desc";

$result1 = $mysqli->query($query1) or die($mysqli->error.__LINE__);

$arr = array();

while ($row = $result1->fetch()) {
	$arr[] = $row;
}

echo $json_response = json_encode($arr);