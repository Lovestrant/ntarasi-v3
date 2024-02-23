<?php
session_start();
include_once ('../includes/config.inc');
include_once ('../includes/functions.php');

$pid = $_POST['pid'];
$product_name = $_POST['product_name'];
$product_description = $_POST['product_description'];
$product_category = $_POST['product_category'];
$product_code = $_POST['product_code'];
$measure_unit = $_POST['measure_unit'];
$buying_price = $_POST['buying_price'];
$selling_price = $_POST['selling_price'];
$wholesale_price = $_POST['wholesale_price'];
$wholesale_units = $_POST['wholesale_units'];
$status = $_POST['status'];

$session_user = session();
$refresh = 0;

///////////////-------Validation
$product_nameOk = input_length($product_name, 3);
$product_categoryOk = vnozero($product_category);
$product_codeOk = input_available($product_code);
$buying_priceOk = input_available($buying_price);
$selling_priceOk = input_available($selling_price);

if($product_nameOk == 0){
    echo errormes('Name is too short < 3');
}
if($product_categoryOk == 0){
    echo errormes('Product category is required');
}
if($product_codeOk == 0){
    echo errormes('Product Code is required');
}
if($buying_priceOk == 0){
    echo errormes('Buying Price is Required');
}
if($selling_priceOk == 0){
    echo errormes('Selling Price is Required');
}

//////------
if($product_nameOk+$product_categoryOk+$product_codeOk+$buying_priceOk+$selling_priceOk == 5){
    $category_name = fetchrow('p_product_categories',"uid='$product_category'","name");
    if($pid > 0) ///////Update product
    {
        $update = updatedb('p_products',"name='$product_name', description='$product_description', category='$product_category', category_name='$category_name', product_code='$product_code', measure_unit='$measure_unit', buying_price='$buying_price', selling_price='$selling_price', wholesale_price='$wholesale_price', wholesale_quantity='$wholesale_units', status='$status'","uid=$pid");
        if($update == 1)
        {
            echo sucmes("Success! Product updated");
            $refresh = 1;
            $changeblock = mysqli_real_escape_string($con, "name='$product_name', description='$product_description', category='$product_category', category_name='$category_name', product_code='$product_code', measure_unit='$measure_unit', buying_price='$buying_price', selling_price='$selling_price', wholesale_price='$wholesale_price', wholesale_quantity='$wholesale_units', status='$status'");
            changelog('p_product',"$changeblock","$session_user");

        }
        else
        {
            echo errormes("Error! Unable to update product");
        }
    }
    else   //////New product
        {
            $fds = array('name' ,'description' ,'category','category_name' ,'added_by','added_date' ,'product_code' ,'measure_unit' ,'buying_price' ,'selling_price' ,'wholesale_price' ,'wholesale_quantity' ,'status');
            $vals = array("$product_name","$product_description","$product_category","$category_name","$session_user","$fulldate","$product_code","$measure_unit","$buying_price","$selling_price","$wholesale_price","$wholesale_units","$status");
            $create = addtodb('p_products',$fds, $vals);
            if($create == 1){
                echo sucmes("Success! Product saved");
                $refresh = 1;
            }
            else
            {
                echo errormes("Error! unable to save product");
            }
        }
}
else
{
    echo errormes("Product not saved");
}


?>
<script>
    let refresh = '<?php echo $refresh; ?>';
    if(refresh === '1'){
        clearForm('standardform');
    }
</script>
