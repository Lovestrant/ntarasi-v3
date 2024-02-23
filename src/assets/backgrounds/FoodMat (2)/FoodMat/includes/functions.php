<?php
//////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Validate input


function session(){
    if(isset($_SESSION['pos_user']))
    {
//        $sessionid = $_SESSION['pos_user'];
//        $myuserid = softdecrypt($sessionid);
//        $fullname = fetchrow('k_users',"uid='$myuserid'","fullname");
//        $f = explode(' ',$fullname);
//        $fname = $f['0'];
//        $sessionOk = 1;
//        $mygroup = fetchrow('k_users',"uid='$myuserid'","category");
        return  1;
    }
    else{
        return null;
    }
}



function input_available($x)
{
    $x = rtrim($x);
    if (empty($x)) {
        return 0;
    } else {
        return 1;
    }
}

function input_exists($table, $where, $field, $value)
{
    $where = "$field='$value' && $where";
    $ch = checkrowexists($table, $where);
    return $ch;
}


function input_length($x, $l)
{
    $x = rtrim($x);
    if ((strlen($x) < $l)) {
        return 0;
    } else {
        return 1;
    }
}

function vnozero($x)
{
    if ($x > 0) {
        return 1;
    } else {
        return 0;
    }
}

function file_avail($filesize)
{
    if ($filesize < 0.0000000000000000001) {

        return 0;

    } else {

        return 1;

    }

}


function file_type($filename, $search_array)
{
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $ext = strtolower($ext);
    if ((!in_array("$ext", $search_array))) {
        return 0;
    } else {
        return 1;
    }

}

function file_size($x, $max)
{
    if (($x > 0) && ($x > $max)) {
        return 0;
    } else {
        return 1;
    }
}

function emailOk($emaill)
{
    if (filter_var($emaill, FILTER_VALIDATE_EMAIL)) {
        return 1;
    } else {
        return 0;
    }

}
function passencrypt($pass)
{
    $oursalt=crazystring(32);  //generate a random number
    $longpass=$oursalt.$pass;                          //Prepend to the password
    $hash=hash('SHA256',$longpass);

    return $hash.$oursalt;
    //save hash and salt in diffrent tables
}

function fetchtable($table, $category,$orderby,$dir,$limit,$fds='*')      ////####################################Fetch whole table
{
    global $con;
    $query="SELECT $fds FROM ".$table." WHERE ".$category." ORDER BY ".$orderby.' '.$dir." LIMIT ".$limit;
    //var_dump($query);
    $result=mysqli_query($con, $query);

    return $result;

}
function fetchrow($table, $where, $name)            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT $name FROM $table WHERE ($where)";    //var_dump($query);
    $result=mysqli_query($con,$query);
    $row=mysqli_fetch_array($result); //var_dump($result);
    $attrequired=$row[$name];

    return $attrequired;

}
function fetchonerow($table, $where,$fds='*')            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT $fds FROM $table WHERE ($where)"; //var_dump($query);
    $result=mysqli_query($con, $query);
    $roww=mysqli_fetch_array($result);

    return $roww;

}
function fetchrandomrow($table, $where)            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT * FROM $table WHERE $where order by RAND()"; //var_dump($query);
    $result=mysqli_query($con, $query);
    $roww=mysqli_fetch_array($result);

    return $roww;

}
function fetchmaxid($table,$where)
{
    global $con;
    $query="SELECT * FROM $table WHERE $where order by uid desc LIMIT 0,1"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $roww=mysqli_fetch_array($result, MYSQLI_ASSOC);

    return $roww;
}
function fetchminid($table,$where)
{
    global $con;
    $query="SELECT * FROM $table WHERE $where order by uid asc LIMIT 0,1"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $roww=mysqli_fetch_array($result, MYSQLI_ASSOC);

    return $roww;
}
function checkrowexists($table, $where)            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT * FROM $table WHERE $where"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $totalrows=mysqli_num_rows($result);
    if($totalrows>0)
    {
        return 1;
    }
    else
    {
        return 0;
    }

}
function searchtable($table, $category,$fields, $tags,$dir,$limit)
{
    global $con;
    $query="SELECT * FROM ".$table." WHERE ".$category." AND ".$fields." LIKE %".$tags."% LIMIT ".$limit; // var_dump($query);
    $result=mysqli_query($con, $query) ;

    return $result;

}


function countotal($table, $where, $fds = '*')
{
    global $con;
    $query="SELECT $fds FROM $table WHERE $where"; //var_dump($query);
    $result=mysqli_query($con, $query); $totalrows=mysqli_num_rows($result);
    return $totalrows;

}

function totaltable($table,$where,$fld)   /////////////////////add up all fields of a given table
{
    global $con;
    $q="SELECT sum($fld) FROM $table WHERE $where";
    $result=mysqli_query($con, $q);
    $row=mysqli_fetch_array($result);
    return $row[0];
}
function errormes($x)
{
    return "<span class=\"error\">$x</span>";
}
function sucmes($x)
{
    return "<span class=\"success\">$x</span>";
}
function notice($x)
{
    return "<span class=\"notice\">$x</span>";
}
function addtodb($tb, $fds, $vals)
{
    global $con;
    $fields=implode(',',$fds);
    $values=implode("','",$vals);
    $values="'$values'";
    $insertq="INSERT into $tb ($fields) VALUES ($values)";  //echo $insertq;
    if(!mysqli_query($con,$insertq))
    {
        return mysqli_error($con);
    }
    else
    {
        return 1;
    }

}

/////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<< Accept parameters of table name, fields and values and update database
function updatedb($tb, $fds, $where)
{
    global $con;
    $insertq="UPDATE $tb SET $fds WHERE $where"; //var_dump($insertq);
    if(!mysqli_query($con, $insertq))
    {
        return mysqli_error($con);
    }
    else
    {
        return 1;
    }

}

function money($number)
{
  return  number_format($number,2,".",",");
}

function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function crazystring($length)

{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%^*()_+-~{}[];:|.<>';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function randomDateString($l){
    $datestring = date("Ymdhis");
    $random = generateRandomString(5);
    return  $datestring.$random;
}

function softencrypt($val){
    $encrypt = $val+193839432;
    $encrypt2 = $encrypt * 3;

    return $encrypt2;
}
function softdecrypt($val)
{
   $dec = $val / 3;
   $dec2 = $dec-193839432;

   return $dec2;

}

function changelog($category, $changeblock, $changed_by){
    global $fulldate;
    $fds = array('category','change_block','change_date','changed_by','status');
    $vals = array("$category","$changeblock","$fulldate","$changed_by","1");
    return addtodb('p_change_log',$fds,$vals);
}
function status($state){
    if($state == 1){
        return 'ACTIVE';
    }
    else{
        return 'REMOVED';
    }
}

function dayfromdate($date){
    $datetime = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    return $datetime->format('D');
}

function hourfromdate($date){
    $datetime = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    return $datetime->format('H');
}
