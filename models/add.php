<?php
require_once '../db.php';

$query1="insert into sheet(name) values(" . $_POST["name"] . ")";

$mysqli->query($query1) or die($mysqli->error.__LINE__);
