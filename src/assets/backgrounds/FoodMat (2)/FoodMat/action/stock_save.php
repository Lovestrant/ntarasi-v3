<?php
session_start();
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$product = $_POST['product'];
$quantity = $_POST['quantity'];
$units = $_POST['units'];
$buying_price = $_POST['buying_price'];
$purchase_cost = $_POST['purchase_cost'];
$distname = $_POST['distname'];
$session_user = session();
$refresh = 0;


//////Verification


$productOk = vnozero($product);
//$quantityOk = in[($quantity);
$buying_priceOk = vnozero($buying_price);
$unitsOk = vnozero($units);


if($productOk == 0){
    echo errormes('Product is required');
}

if($buying_priceOk == 0){
    echo errormes('Buying Price Required');
}
if($unitsOk == 0){
    echo errormes('Units are required');
}

if($productOk  + $buying_priceOk + $unitsOk == 3)
{
   $fds = array('product_id' ,'seller_name' ,'quantity','units' ,'buyingprice','purchase_cost' ,'added_by','added_date' ,'status');
   $vals = array($product,$distname,$quantity,$units,$buying_price, $purchase_cost,$session_user,$fulldate,1);

   $savestock = addtodb('p_stock',$fds, $vals);
   if($savestock == 1){
       echo sucmes("Success! Stock Saved");
       $updateproductstock = updatedb('p_products',"available_stock=available_stock+$units","uid='$product'");
       $refresh = 1;
   }
   else{
       echo errormes('Error! Stock not saved');
   }

}
?>
<script>
    let refresh = '<?php echo $refresh; ?>';
    if(refresh === '1'){
        redirectto("products.php?pid=<?php echo $product; ?>&product-details&price-change")
    }
</script>
