<?php
session_start();
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$session = session();

$oid = $_POST['oid'];
$amount = $_POST['amount'];
$notes = $_POST['notes'];

if($amount > 0){
    $fds = array('orderid','amount', 'notes','addeddate','addedby','status');
    $vals = array("$oid","$amount", "$notes",$fulldate,"$session","1");
    $create = addtodb('p_credit_pay',$fds, $vals);
}
else
{
   $create = 0;
}

echo $create;