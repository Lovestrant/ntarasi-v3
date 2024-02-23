function test(x) {
alert(x);
}

/////////////////All about products
function saveproduct()
{

}

function product_list() {
    let params = "&sel=ALL";
loadstd('jresources/product_list.php',"#prod_list",params);

}
function product_details(uid) {
    let params = "?uid="+uid+"&sel=ONE";
    loadstdJSON('jresources/product_list.php',params, function (feedback) {
     // alert(feedback);
    });
}

function load_product_edit(uid) {

}

function load_product(uid, typ) {
    let params = "?x=1&sel=ONE&uid="+uid;
    loadstdJSON('jresources/product_list.php',params, function (feedback) {
        let obj = JSON.parse(feedback);
        let uid = obj[0].uid;
        let name = obj[0].name;


        if(typ === 'VIEW'){
           $('#uid_').html(obj[0].uid);
           $('#name_').html(obj[0].name);
           $('#description_').html(obj[0].description);
           $('#category_').html(obj[0].category_name);
           $('#addeddate_').html(obj[0].added_date);
           $('#productcode_').html(obj[0].product_code);
           $('#measureunit_').html(obj[0].measure_unit);
           $('#buyingprice_').html(obj[0].buying_price);
           $('#sellingprice_').html(obj[0].selling_price);
           $('#wholesaleprice_').html(obj[0].wholesale_price);
           $('#wholesalequantity_').html(obj[0].wholesale_quantity);
           $('#stockavailable_').html(obj[0].available_stock);
        }
        else{
            $('#product_name').val(obj[0].name);
            $('#product_description').val(obj[0].description);
            $('#product_category').val(obj[0].category);
            $('#product_code').val(obj[0].product_code);
            $('#measure_unit').val(obj[0].measure_unit);
            $('#buying_price').val(obj[0].buying_price);
            $('#selling_price').val(obj[0].selling_price);
            $('#wholesale_price').val(obj[0].wholesale_price);
            $('#wholesale_units').val(obj[0].wholesale_quantity);
            $('#status_').val(obj[0].status);
        }
    });
}

////////////////All about sales
function viewsale(oid){
    openmodal('#details');

    let params = "orderid="+oid;
    loadstd('jresources/order_details.php',"#inmodal", params);
}

///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ form action
function formready(formid)
{
    formhandler('#'+formid);
}


function formhandler(formid){

    var options = {
        beforeSend: function()
        {
            $("#progress").show();
            //clear everything
            $("#bar").width('0%');
            $("#message").html("");
            $("#percent").html("0%");
        },
        uploadProgress: function(event, position, total, percentComplete)
        {
            $("#bar").width(percentComplete+'%');
            $("#percent").html(percentComplete+'%');

        },
        success: function()
        {
            $("#bar").width('100%');
            $("#percent").html('100%');

        },
        complete: function(response)
        {
            $("#message").html("<font color='green'>"+response.responseText+"</font>");
            ///if success, refresh form
            var res=response.responseText;
            var suc=(res.search("ucces"))
            if(suc>=0)
            {
                $(formid)[0].reset();
            }


        },
        error: function()
        {
            $("#message").html("<font color='red'> ERROR: unable to upload files</font>");

        }

    };

    $(formid).ajaxForm(options);

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of  form action

function process_cart() {
openmodal('#sellPop');
    let params = "";
    loadstd('jresources/cart_summary.php',"#cart_summary",params);
    $('#amountgiven').val(0);
}
function  balcalc(){
    let amt = ($('#pricbox').val().trim());
    let amountgiven = ($('#amountgiven').val().trim());

    if(amt && amountgiven){
        $('#bal_').html(amountgiven-amt);
        $('#balinput_').val(amountgiven-amt);
    }
    else{
        $('#bal_').html(0.00);
        $('#balinput_').val(0.00);
    }

}

function complete_sale() {

    let bal = $('#balinput_').val();
                    $('#balance_given').html(bal);
    let amountgiven = $('#amountgiven').val();
                    $('#amount_given').html(amountgiven);
    let sale_type = $('input[name="sale_type"]:checked').val();
                    $('#sale_type').html(sale_type);
    let pay_method = $('input[name="pay_method"]:checked').val();

    let params = "amount_given="+amountgiven+"&bal="+bal+"&sale_type="+sale_type+"&pay_method="+pay_method;
    dbaction('action/complete_order.php',params,"#ess",function (feedback) {


        let json_ = JSON.parse(feedback.trim());
        let status = json_.result_;



        if (status === 1) {
            let jbody = json_.details_;
            $('#sale_receipt').text(jbody);
            $('#cart_summary').html("<h2>Sale Complete. Printing Receipt...</h2>");

            closemodal('#sellPop');
            setTimeout(function () {
                print();
            },1000);
            setTimeout(function () {
                reloadpage();
            },2000);
        }
        else
        {
           $('#inlinemess').html("<span class='error'>Error Completing Order, Retry</span>");
            setTimeout(function () {
                $('#inlinemess').html("");
            },5000);
        }



    });




}

function openmodal(mod)
{
    $(mod).modal('show');
}

function closemodal(mod)
{
    $(mod).modal('hide');
}

function clearForm(fid) {
    document.getElementById(fid).reset();
}


function loadstd(resource,feedbackdiv,params)           /////x-fetch page name e.g. allnews.php,  >>> y-parameters e.g. ?id=x&category=c
{

   let fields=params;
    $.ajax({
        method:'GET',
        url:resource,
        data:fields,
        beforeSend:function()
        {
            $("#processing").show();
        },

        complete:function ()
        {
            $("#processing").hide();
        },
        success: function(feedback)
        {
            $(feedbackdiv).html(feedback);

        }


    });
}

function loadstdJSON(resource,params, callback) {
    let fields=params;
    $.ajax({
        method:'GET',
        url:resource,
        data:fields,
        beforeSend:function()
        {
            $("#processing").show();
        },

        complete:function ()
        {
            $("#processing").hide();
        },
        success: function(feedback)
        {
            callback(feedback);
        },
        error: function (err) {
            callback(err);
        }


    });
}

function searchproduct() {
    let searchterm = $('#searchterm_').val().trim();
    if(searchterm){
        let params = "searchterm="+searchterm;
        loadstd('jresources/search_product.php',"#searchrecords_",params);
    }
    else{
        $('#searchrecords_').html('<tr><td colspan="3"><i>Type above to search... </i></td></tr>');

    }

}
function addtocart(pid) {
  let product = pid;
  let qty = $('#res'+pid).val();
  let params = "product="+product+"&qty="+qty;
  dbaction('action/add_cart.php',params,"pop",function (feedback) {
      popbox('NOTICE',feedback);
      loadcart();
  });
}
function recalculateprice(pid) {
    let qty = parseFloat($('#res'+pid).val());
    let retprice = parseFloat($('#retpr'+pid).val());
    let wsprice = parseFloat($('#wsp'+pid).val());
    let wsquantity = parseFloat($('#wsq'+pid).val());
    let tp = 0.00;
    if(wsquantity > 0) {
        if (qty < wsquantity) {
            tp = qty * retprice;
        } else {
            tp = qty * wsprice;
        }
    }
    else{
        tp = qty * retprice;
    }

   $('#total_'+pid).text(tp);
}
function remove_cart_item(cid) {

    var result = confirm('Are you sure you want to remove the cart item ');
    if (result) {
        let params = "cid="+cid;
        dbaction('action/remove_cart_item.php',params,".dd",function (feedback) {
            popbox('NOTICE',feedback);
            loadcart();
        })
    }
}



function loadcart()
{
    let params = "";
    loadstd('jresources/cart_list.php',"#cartlist_",params);
}

function dbaction(actionpage, params, feedbackarea='.feedbackarea', callback)
{
    let fields=params;
    $.ajax({
        method:'POST',
        url:actionpage,
        data:fields,
        beforeSend:function()
        {
        },

        complete:function ()
        {
        },
        success: function(feedback)
        {
            callback(feedback);

        },
        error: function(err)
        {
            callback(err);
        }
    });
}



function popbox(typ, message) {
  $('#pop').fadeIn('slow');
  $('#pop').html(message);
   if(typ === 'SUCCESS'){
       $('#pop').css('background','#08d811');
   }
   else if(typ === 'ERROR'){
       $('#pop').css('background','#ff0000');
   }
   else{
       $('#pop').css('background','#000000');
   }
   setTimeout(function () {
       $('#pop').fadeOut('slow');
   },3000)
}





function redirectto(url) {
    window.location.href = url;
}

function reloadpage() {
    location.reload();
}

function resetpass() {
    alert("Unable to reset password");
}

function new_category(){
    let catname = $('#cat_name').val().trim();

   if(catname) {
       let params = "catname=" + catname;
       dbaction('action/category_add.php', params, "pop", function (feedback) {
           popbox('NOTICE', feedback);
       });
   }
   else
   {
       popbox('ERROR', "Name is required");
   }

}

function  remove_cat(cid) {
    var result = confirm('Are you sure you want to remove this item ');
    if (result) {
        let params = "cid="+cid;
        dbaction('action/remove_category.php',params,".dd",function (feedback) {
            popbox('NOTICE',feedback);
            reloadpage();
        })
    }
}

function filterdates(red='reports.php?sales') {
    let starting = $('#starting').val();
    let ending = $('#ending').val();

    redirectto(red+'&starting='+starting+"&ending="+ending);
}

function credit_modal(oid) {

    let params = "";
    openmodal('#details');
    loadstd('jresources/record_credit_pay.php',"#inmodal",params);
   setTimeout(function () {
       $('#oid').val(oid);
   },300) ;
}

function save_pay() {
  let amount = parseInt($('#amount').val().trim());
  let notes = $('#notes').val();
  let oid = $('#oid').val();

  if(amount > 0){
      let params = "oid="+oid+"&amount="+amount+"&notes="+notes;
      dbaction('action/save_pay.php',params,"#feedback",function (feedback) {
          if(feedback === '1') {
              inlinemessage("<span class='success'>Success Adding Payment</span>");
              setTimeout(function () {
                  reloadpage();
              },2000)

          }
          else{
              inlinemessage("<span class='error'>Error Adding a Payment</span>");
          }
      })
  }
  else
  {
      inlinemessage("<span class='error'>Please Enter Amount</span>");
  }
}

function inlinemessage(message) {
    $('#feedback').html(message);
    setTimeout(function () {
        $('#feedback').html("");
    },3000);

}