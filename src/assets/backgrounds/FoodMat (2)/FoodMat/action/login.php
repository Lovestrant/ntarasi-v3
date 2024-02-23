<?php
session_start();
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$username = $_POST['username'];
$password = $_POST['password'];
$redirect = 0;

$userdetails = fetchonerow('p_staff',"status = 1 AND (email='$username' OR username='$username')","uid, password");
$userid = $userdetails['uid'];
if($userid > 0) {
    $user_password = $userdetails['password'];
    $encpass = md5($password);
    if($encpass === $user_password){
        $_SESSION['pos_user'] = softencrypt($userid);
        echo sucmes("Success. Taking you to dashboard...");
        $redirect = 1;

    }else{
   echo errormes("Incorrect password");
    }


}
else{
    echo errormes("User does not exist or is disabled");
}
?>
<script>
  var redd = '<?php echo $redirect; ?>';
  if(redd === '1'){
      redirectto('index.php');
  }
</script>
