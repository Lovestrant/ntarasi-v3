<?php
session_start();
include_once ('includes/config.inc');
include_once ('includes/functions.php');
$session = session();
if($session == 1){
    $red = '';
}
else
{
    $red = 'index.php';
    header('location:login.php');
}
?>
