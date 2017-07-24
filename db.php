<?php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'alternance';

try {
	$db = new PDO("mysql:host=" . $DB_HOST . ";dbname=" . $DB_NAME, $DB_USER, $DB_PASS);
} catch(Exception $e) {
	die("Erreur : ". $e->getMessage());
}

$db->query('SET NAMES UTF8');
setlocale(LC_TIME, 'fra_fra');