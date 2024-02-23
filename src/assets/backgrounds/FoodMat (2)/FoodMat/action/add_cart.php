<?php
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$product = $_POST['product'];
$qty = $_POST['qty'];
$refresh = 0;


if($product>0 && $qty > 0){
     $prod = fetchonerow('p_products',"uid='$product'","selling_price, wholesale_price, wholesale_quantity, buying_price");
     $selling_price = $prod['selling_price'];
     $wholesale_price = $prod['wholesale_price'];
     $wholesale_quantity = $prod['wholesale_quantity'];
     $buying_price = $prod['buying_price'];


    $itswholesale = 0;

    $item = fetchonerow('p_cart',"product_id='$product' AND status = 1");
    $itemId = $item['uid'];
    $units = $item['units'];
    if($itemId > 0) {
        $qty = $units + $qty;

    }

    $total_bp = ceil($qty * $buying_price);

        $qty = round($qty, 3);
    $retprice = $selling_price;
    $wsprice = $wholesale_price;
    $wsquantity = $wholesale_quantity;
    $tp = 0.000;
    if($wsquantity > 0) {
        if ($qty < $wsquantity) {
            $tp = $qty * $retprice;
            $unit_price = $retprice;
        } else {
            $tp = $qty * $wsprice;
            $unit_price = $wsprice;
            $itswholesale = 1;
        }
    }
    else{
        $tp = $qty * $retprice;
        $unit_price = $retprice;
    }

    $profit = $tp - $total_bp;



    if($itemId > 0){
        $update = updatedb('p_cart',"units = '$qty', unit_price='$unit_price', line_total='$tp', last_update='$fulldate', buying_price='$total_bp', profit='$profit', wsale='$itswholesale'","uid='$itemId'");
        if($update == 1){
            echo sucmes("Success! Updated");
            $refresh = 1;

        }
        else
        {
            echo errormes("Error! Unable to add");
        }
    }
    else{
       $fds = array('product_id','units','unit_price','line_total','last_update','buying_price','profit','wsale','status');
       $vals = array("$product","$qty","$unit_price","$tp","$fulldate","$total_bp","$profit","$itswholesale","1");
       $create = addtodb('p_cart',$fds,$vals);
        if($create == 1){
            echo sucmes("Success! Added");
            $refresh = 1;
        }
        else
        {
            echo errormes("Error! Unable to add");
        }
    }

}
else
{
    echo errormes('Product and Quantity Required');
}

?>
