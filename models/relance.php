<?php
require_once '../db.php';

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$query1 = $db->prepare(' UPDATE sheet SET etat=:etat WHERE id=:id ');
$query1->execute(array(
    'etat' => 'Relancé',
    'id' => $data->id
));