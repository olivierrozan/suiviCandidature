<?php
require_once '../db.php';

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$query="select * from sheet order by id desc";

$result1 = $db->query($query) or die($db->error.__LINE__);

$arr = array();
$valid = 0;

while ($row = $result1->fetch()) {
	$arr[] = $row;
}

foreach ($arr as $one) {
    if ($one["nom"] === $data->data->nom) {
        $valid ++;
    }
}

if ($valid === 0) {
    $query1 = $db->prepare(' INSERT INTO sheet(nom, adresse, etat, date_modif, email, tel, commentaires) 
                        VALUES(:nom, :adresse, :etat, :date, :email, :tel, :commentaires) ');
    $query1->execute(array(
        'nom' => $data->data->nom,
        'adresse' => $data->data->adresse,
        'etat' => 'En attente',
        'date' => date("Y-m-d"),
        'email' => $data->data->email, 
        'tel' => $data->data->tel, 
        'commentaires' => $data->data->commentaires
    ));
}

echo $json_response = json_encode($valid);