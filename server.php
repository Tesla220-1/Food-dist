<?php
$_POST = json_decode(file_get_contents('php://input'), true); //Для декодирования JSON
echo var_dump($_POST);