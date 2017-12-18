<?php
require_once '../db.php';

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$query="select nom from sheet order by id desc";

$result1 = $db->query($query) or die($db->error.__LINE__);

$arr = array();
$valid = 0;

while ($row = $result1->fetch()) {
	$arr[] = $row;
}

foreach ($arr as $one) {
    if ($one["nom"] == $data->data->nom) {
        $valid ++;
    }
}

if ($valid === 0) {
    $query1 = $db->prepare(' INSERT INTO sheet(nom, adresse, etat, email, tel, commentaires, createdAt, updatedAt) 
                        VALUES(:nom, :adresse, :etat, :email, :tel, :commentaires, :createdAt, :updatedAt) ');
    $query1->execute(array(
        'nom' => strtoupper($data->data->nom),
        'adresse' => isset($data->data->adresse) ? $data->data->adresse : "",
        'etat' => 'En attente',
        'email' => isset($data->data->email) ? $data->data->email : "", 
        'tel' => isset($data->data->tel) ? $data->data->tel : "", 
        'commentaires' => isset($data->data->commentaires) ? $data->data->commentaires : "",
        'createdAt' => date("Y-m-d"),
        'updatedAt' => date("Y-m-d")
    ));
   
}

echo $json_response = json_encode($valid);