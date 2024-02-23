<?php
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$orderid = $_POST['orderid'];
$paymode = $_POST['paymode'];
$amount = $_POST['amount'];



if($amount > 0){
  $fds = array('pid','amount','mode','date_paid');
  $vals = array("$orderid","$amount","$paymode","$fulldate");
  $create = addtodb('p_stock_pay', $fds, $vals);
  if($create == 1){
      echo sucmes("Success! Saved");
  }
  else
  {
      echo errormes("Error! Not saved");
  }
}
else{
    echo errormes("Amount required");
}