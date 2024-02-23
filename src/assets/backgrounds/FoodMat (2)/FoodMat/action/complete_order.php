<?php
session_start();
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');


$sessionid = $_SESSION['pos_user'];
$session = softdecrypt($sessionid);


$bal = $_POST['bal'];
$amount_given = $_POST['amount_given'];

$alltotal = 0.00;
$totalbp = 0;
$totalprofit = 0;
$cart = fetchtable('p_cart',"order_id is null AND status=1","uid","asc","1000","uid, product_id, units ,unit_price, line_total, buying_price, profit");
$size = mysqli_num_rows($cart);
if($size > 0) {
    while ($c = mysqli_fetch_array($cart)) {
        $uid = $c['uid'];
        $product_id = $c['product_id'];
        $unit_price = $c['unit_price'];
        $line_total = $c['line_total'];
        $buying_price = $c['buying_price'];
        $profit = $c['profit'];
        $units = $c['units'];

        $alltotal+=$line_total;
        $itemcount+=1;

        $totalbp = $totalbp + $buying_price;
        $totalprofit = $totalprofit + $profit;

        $prod = fetchonerow('p_products', "uid='$product_id'", "name");
        $name = $prod['name'];

    }

}
else{
    $det = "Please add items to cart";
    echo ("{\"result_\":0,\"details_\":$det,\"total_\":0}");
    die();
    exit();
}


$total = $alltotal;
$items = $itemcount;
$reference_number = 0;

$comp = fetchonerow('p_company_details',"uid = 1");
$store = $comp['store'];
$sale_type = $_POST['sale_type'];
$pay_method = $_POST['pay_method'];


$orderid = randomDateString(5);



//////---------Create an order
$fds = array("created_date","created_by","total","total_items","received_amount","balance","reference_no","store","sale_type","pay_method","transcode","orderid","buying_price","profit","status");
$vals = array("$fulldate","$session","$total","$items","$amount_given","$bal","$reference_number","$store","$sale_type","$pay_method","$transcode","$orderid","$totalbp","$totalprofit","1");
$create = addtodb('p_orders', $fds, $vals);
if($create == 1){
    $orderuid = fetchrow('p_orders',"orderid='$orderid'","uid");
    updatedb('p_cart',"status=2, order_id='$orderuid'","status=1 AND order_id is null");

    /////----------Stock Update
    $cartprods = fetchtable('p_cart',"order_id='$orderuid' AND status=2","uid","desc","1000","product_id, units");
    while($car = mysqli_fetch_array($cartprods)){
        $produ = $car['product_id'];
        $units = $car['units'];

        ////-----Update stock
        $updatestock = updatedb('p_products',"available_stock=available_stock-$units","uid='$produ'");
    }



}
else
{
   // echo errormes("Error! Unable to complete order".$create);
}

$transcode = "$orderuid";

/////----------Create Receipt
///
echo ("{\"result_\":$create,\"details_\":$orderuid,\"total_\":1}");
?>
