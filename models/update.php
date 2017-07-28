<?php
require_once '../db.php';

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$query1 = $db->prepare(' UPDATE sheet SET nom=:nom, adresse=:adresse, etat=:etat, date_modif=:date, email=:email, tel=:tel, commentaires=:commentaires WHERE id=' . $data->data->id);
$query1->execute(array(
    'nom' => $data->data->nom,
    'adresse' => $data->data->adresse,
    'etat' => $data->data->etat,
    'date' => date("Y-m-d"),
    'email' => $data->data->email, 
    'tel' => $data->data->tel, 
    'commentaires' => $data->data->commentaires
));