<?php
require_once '../db.php';

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$query1="select * from sheet where etat='" . $data->etat . "' order by id desc";

$result1 = $db->query($query1) or die($db->error.__LINE__);

$arr = array();

while ($row = $result1->fetch()) {
	$arr[] = $row;
}

echo $json_response = json_encode($arr);