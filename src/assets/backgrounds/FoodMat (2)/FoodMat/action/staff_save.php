<?php
session_start();
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$userid = $_POST['userid'];
$name = $_POST['name'];
$group = $_POST['group'];
$email = $_POST['email'];
$username = $_POST['username'];
$phone = $_POST['phone'];
$status = $_POST['status'];
$password = $_POST['password'];

$session_user = session();


$nameOk = input_length($name, 3);
$emailOk = emailOk($email);
$usernameOk = input_length($email, 3);
$passOk = input_length($password, 3);

if($nameOk == 0){
    echo errormes('Name too short < 3');
}
if($emailOk == 0){
    echo errormes("Email invalid");
}
if($usernameOk == 0){
    echo errormes("Username required");
}

if($nameOk+$emailOk+$usernameOk == 3){
    if($userid > 0){

        if($passOk == 1){
            $pass = md5($password);
            $andpass = ", password='$pass'";
        }
        else{
            $andpass = "";
        }
     $update = updatedb('p_staff',"name='$name', email='$email', phone='$phone', role='$group', username='$username' $andpass, status='$status'","uid='$userid'");
     if($update == 1){
         echo sucmes("Success! updated");
         $changeblock = mysqli_real_escape_string($con, "name='$name', email='$email', phone='$phone', role='$group', username='$username' $andpass, status='$status'");
         changelog('p_staff',"$changeblock","$session_user");
         $refresh = 1;
     }
     else{
         echo errormes("Error! not updated");
     }
    }
    else{
        if($passOk == 1){

        $passwordE = md5($password);
        $fds = array("name","email","phone","role","added_date","username","password","status");
        $vals = array("$name","$email","$phone","$group","$date","$username","$passwordE","$status");
        $create = addtodb("p_staff",$fds, $vals);
        if($create == 1){
            echo sucmes("Success! User created. Password is: $password");
        }
        else{
            echo errormes("Error! not created.");
        }
        }
        else{
            echo errormes("Password too short < 5");
        }
    }



}