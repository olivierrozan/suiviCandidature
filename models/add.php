<?php
require_once '../db.php';

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$query1 = $db->prepare(' INSERT INTO sheet(nom, adresse, poste, etat, date_modif, email, commentaires) VALUES(:nom, :adresse, :poste, :etat, :date, :email, :commentaires) ');
$query1->execute(array(
    'nom' => $data->nom,
    'adresse' => $data->nom,
    'poste' => $data->nom,
    'etat' => 'En attente',
    'date' => date("Y-m-d"),
    'email' => $data->nom, 
    'commentaires' => $data->nom
));