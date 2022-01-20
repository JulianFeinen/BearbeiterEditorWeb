<?php
require "pgconnect.inc.php";
$iusername = normalize_input($_REQUEST["username"]);
$ipassword = normalize_input($_REQUEST["password"]);
$isUsernameValid = $isPasswordValid = true;

    if (!preg_match("/^[a-zA-Z-' _äöü]*$/i",$iusername))
    {
        $isUsernameValid = false;
        echo "login=invalid";
    }
    else
    {
        $SqlSelectQuery = "SELECT * FROM public.personal WHERE username='$iusername' AND passwort='$ipassword'";
        $SqlSelectExec = pg_exec($pgconn, $SqlSelectQuery);
        $row = pg_fetch_assoc($SqlSelectExec);
        if(!$row==false)
        {
            echo "valid";
        }
        else{
            echo "invalid";
        }
    }  

function normalize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


?>