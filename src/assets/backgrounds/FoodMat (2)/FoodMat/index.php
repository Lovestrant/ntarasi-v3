<?php
include_once ('session.php');
?>
<!doctype html>
<html lang="en">
 
<head>
    <!-- Required meta tags -->
    <?php
    include_once ('header-includes.php');

    $sessionid_ = $_SESSION['pos_user'];
    $session_ = softdecrypt($sessionid_);

    $comp = fetchonerow('p_company_details',"uid = 1");
    $cashier = fetchrow('p_staff',"uid='$session_'","name");
    $now_date  = $shortdatetime;
    ?>

    <title>Iruga  - Home</title>
</head>

<body>
<div id="printbody" style="visibility: hidden; position: absolute" leftmargin="0" topmargin=0" rightmargin="0" bottommargin="0" marginwidth="0" marginheight=0>
    <div id="printarea">
        <div id="printfront">

            <table style="width: 100%;">
                <tr><td colspan="2" class="font-small">Sales Receipt: <span id="sale_receipt"></span> <span class="rightfloat"><?php echo $comp['store']; ?></span> </td></tr>
                <tr><td colspan="2"> </td></tr>
                <tr class="centered"><td colspan="2"> <h3 style="font-weight: bold; text-dark color: #000000 !important; "><b> <?php echo $comp['company_name']; ?> </b> </h3></td></tr>
                <tr class="centered"><td colspan="2"> <?php echo $comp['address']; ?></td></tr>
                <tr class="centered"><td colspan="2"> <?php echo $comp['pobox']; ?></td></tr>
                <tr class="centered"><td colspan="2"> <?php echo $comp['tel']; ?></td></tr>
                <tr class="centered"><td colspan="2"> <?php echo $comp['email']; ?></td></tr>
                <tr><td> Cashier: <span id="cashier_"><?php echo $cashier; ?></span> </td> <td class="rightfloat"><span id="now_date"><?php echo $now_date; ?></span></td></tr>
            </table>
            <table class="items" style="border-collapse: collapse; ">
                <thead>
                <tr class="item-head" style="border-bottom: 1pt solid #333333; border-top: 1px solid #333;">
                    <th class="quantity">Qty.</th>
                    <th class="description">Description</th>
                    <th class="price">Price</th>
                    <th class="price">Ext.Price</th>
                </tr>
                </thead>
                <tbody id="cart_items_">


                </tbody>
            </table>
            <table>
                <tr>
                    <td colspan="3"> Amount Given </td>
                    <td> <span id="amount_given">...</span> </td>
                </tr>
                <tr>
                    <td colspan="3"> Balance Given </td>
                    <td> <span id="balance_given">...</span> </td>
                </tr>
                <tr>
                    <td colspan="4"><span style="font-weight: bold;"> SALE TYPE: </span> <span id="sale_type">...</span></td>
                </tr>
            </table>
            <hr/>
            <p class="centered"><?php echo $comp['footer1']; ?>
                <br><?php echo $comp['footer2']; ?>

            </p>
            <p class="centered"><?php echo $comp['footer3']; ?><br/>
                <span class="small centered font-small font-10 font-italic">
                    <?php echo $comp['poweredby']; ?>
                </span>
                <br>
                <span class="centered">_________________________</span>

            </p>

        </div>
    </div>
</div>

<div id="screenbody">
    <!-- ============================================================== -->
    <!-- main wrapper -->
    <!-- ============================================================== -->
    <div class="dashboard-main-wrapper">
        <!-- ============================================================== -->
        <!-- navbar -->
        <!-- ============================================================== -->
        <?php
        include_once ('header.php');
        ?>
        <!-- ============================================================== -->
        <!-- end navbar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- left sidebar -->
        <!-- ============================================================== -->
       <?php
       include_once ('header-menu.php');
       ?>

        <!-- ============================================================== -->
        <!-- end left sidebar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- wrapper  -->
        <!-- ============================================================== -->
        <div class="dashboard-wrapper">
            <div class="dashboard-ecommerce">
                <div class="container-fluid dashboard-content ">
                    <div id="contentblock"  class="row">
                        <div class="col-md-12">
                            <div id="maincard" class="card" style="min-height: 500px; background: whitesmoke;">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6" style="border-right: 1px solid #333">
                                            <h3>Products</h3>
                                            <table style="width: 99%;"><tr><td><input type="search" id="searchterm_" onkeyup="searchproduct();" placeholder="Find product by code or name" class="form-control"></td><td><button class="btn btn-success">Search</button></td></tr></table>

                                            <div style="margin: 25px 0; background: #fbfbfb; padding: 15px;     overflow-y: auto;">
                                                <table class="table table-hover" style="width: 99%;">
                                                    <tr class="text-dark"><th>Product</th><th>Price</th><th>Qty</th><th>Add</th></tr>
                                                    <tbody id="searchrecords_">
                                                    <tr><td colspan="3"><i>Type above to search... </i></td></tr>

                                                    </tbody>
                                                </table></div>
                                            <div id="test">

                                            </div>

                                        </div>
                                        <div class="col-md-6" style="background: #fcfcfd; padding: 0 15px">
                                            <h3>Cart</h3>
                                            <table class="table table-hover" style="width: 99%;">
                                                <tr class="text-dark"><th>Product</th><th>Unit Price (Ksh)</th><th>Qty</th><th>Line Total (Ksh)</th><th></th></tr>
                                                <tbody id="cartlist_">
                                                <tr><td colspan="4"><h3 class="text-muted">Cart is Empty</h3></td></tr>
                                                </tbody>
                                                </table>
                                            <hr/>


                                            <div class="row">
                                                <div class="col-md-12">
                                                <button onclick="process_cart()" class="btn btn-lg btn-primary float-right">Proceed</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->

            <div id="sellPop" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                           <div class="row">
                               <div class="col-md-6">
                                   <div id="cart_summary">
                                       ...
                                   </div>
                                   Sale Type: ______

                                   <label class="custom-control custom-radio custom-control-inline">
                                       <input type="radio" name="sale_type" value="CASH" class="custom-control-input" CHECKED><span class="custom-control-label">CASH</span>
                                   </label>
                                   <label class="custom-control custom-radio custom-control-inline">
                                       <input type="radio" name="sale_type" value="CREDIT" class="custom-control-input"><span class="custom-control-label">CREDIT</span>
                                   </label>

                                   <br/>

                                   Pay Method: ____

                                   <label class="custom-control custom-radio custom-control-inline">
                                       <input type="radio" name="pay_method" value="CASH" class="custom-control-input" CHECKED><span class="custom-control-label">CASH</span>
                                   </label>
                                   <label class="custom-control custom-radio custom-control-inline">
                                       <input type="radio" name="pay_method" value="MPESA" class="custom-control-input"><span class="custom-control-label">MPESA</span>
                                   </label>




                               </div>

                               <div class="col-md-6">
                                   <table class="table table-bordered">
                                       <tr><td><h3>Total</h3></td><td><h2 class="text-danger" id="total_cart">0.00</h2><input type="hidden" id="pricbox"></td></tr>
                                       <tr><td><h3>Amount Paid</h3></td><td><input id="amountgiven" type="number" onkeyup="balcalc();" onmouseup="balcalc()" class="form-control"></td></tr>
                                       <tr><td><h3>Bal</h3></td><td><h2 class="text-primary" id="bal_">0.00</h2><input type="hidden" id="balinput_" value="0.00"></td></tr>

                                   </table>
                               </div>
                           </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-lg btn-success" onclick="complete_sale()">COMPLETE SALE</button>
                            <div id="inlinemess"></div>
                        </div>
                    </div>

                </div>
            </div>


            <div class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            Copyright © 2020 All rights reserved. Project by <a target="_blank" href="https://www.icthub.co.ke"> Truweb Solutions.</a>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div class="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript: void(0);">About</a>
                                <a href="javascript: void(0);">Support</a>
                                <a href="javascript: void(0);">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- end wrapper  -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- end main wrapper  -->
    <!-- ============================================================== -->

    <!-- jquery 3.3.1 -->
    <?php
    include_once ('footer_includes.php');
    ?>
    <script>
        $('document').ready(function () {
            loadcart();
        });

    </script>
</div>



</body>


 
</html>