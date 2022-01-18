<?php
$debug = false;
if ($debug) {
	// $file = '/BearbeiterEditor/php/login.log';
	$file = 'D:\login.log';
	$fp = fopen($file, 'w');
	fputs($fp, "Logfile Anfang: " . date("l jS \of F Y h:i:s A") . "\n");
}
global $fp;
meinlog("_REQUEST[username]): ". $_REQUEST['username']);
meinlog("_REQUEST[password]): ". $_REQUEST['password']);
$iusername = normalize_input($_REQUEST["username"]);
$ipassword = normalize_input($_REQUEST["password"]);
$isUsernameValid = $isPasswordValid = true;
if ($debug) {
    $iusername="Feinen_J";
    $ipassword="snoopy";
}
    if (!preg_match("/^[a-zA-Z-'_]*$/i",$iusername))
    {
        $isUsernameValid = false;
        echo "login=invalid";
        meinlog($fp, "invalid: " . "\n");
    }
    else
    {
        meinlog("else: ");
        
        meinlog("iusername: ".$iusername);
        meinlog("ipassword: ".$ipassword);
        $pgHandle = pg_connect("host=localhost dbname=postgres user=postgres password=PGkp4rz");
        pg_set_client_encoding($pgHandle, 'utf-8');
        date_default_timezone_set('Europe/Berlin');
        $SqlSelectQuery = "SELECT * FROM public.personal WHERE username='$iusername' AND passwort='$ipassword'";
        meinlog("SqlSelectQuery: ".$SqlSelectQuery);
        $SqlSelectExec = pg_exec($pgHandle, $SqlSelectQuery);
        $row = pg_fetch_assoc($SqlSelectExec);
        if(!$row==false)
        {
            echo "valid";
        }
        else{
            echo "invalid";
        }
    }  
function meinlog($text)
{
    global $fp,$debug;
    if($debug)
    {
        fputs($fp, $text . "\n");
    }
}

function normalize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


?>