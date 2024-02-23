<?php
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$catname = $_POST['catname'];

$refresh = 0;




        $fds = array('name','status');
        $vals = array("$catname","1");
        $create = addtodb('p_product_categories',$fds,$vals);
        if($create == 1){
            echo sucmes("Success! Added");
            $refresh = 1;
        }
        else
        {
            echo errormes("Error! Unable to add");
        }



?>

<script>
   let refresh = '<?php echo $refresh; ?>';
   if(refresh === '1'){
       reloadpage();
   }
</script>
