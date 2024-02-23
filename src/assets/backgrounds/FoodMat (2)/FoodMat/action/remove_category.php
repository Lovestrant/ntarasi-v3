<?php
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$cid = $_POST['cid'];

if($cid>0 ) {

    $update = updatedb('p_product_categories', "status=0", "uid='$cid'");
    if ($update == 1) {
        echo sucmes("Success! Removed");
        $refresh = 1;

    } else {
        echo errormes("Error! Unable to remove");
    }


}
?>
