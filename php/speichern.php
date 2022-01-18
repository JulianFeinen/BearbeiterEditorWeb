<?php
$vorname = $_REQUEST["vorname"];
$nachname = $_REQUEST["nachname"];
$username = $_REQUEST["username"];
$bearbeiterid = $_REQUEST["bearbeiterid"];
if (!preg_match("/^[a-zA-Z-' _äöü]*$/i",$vorname) || !preg_match("/^[a-zA-Z-' _äöü]*$/i",$nachname) || !preg_match("/^[a-zA-Z-' _äöü]*$/i",$username))
{
	echo "invalidinput";
	return;
}
else
{
	$vorname = normalize_input($vorname);
	$nachname = normalize_input($nachname);
	$username = normalize_input($username);
	$bearbeiterid = normalize_input($bearbeiterid);

	$pgconn = pg_connect("host=localhost dbname=postgres user=postgres password=PGkp4rz");
	pg_set_client_encoding($pgconn, 'utf-8');
	date_default_timezone_set('Europe/Berlin');	
	$sqlupdate = "UPDATE public.personal SET vorname = '".$vorname."', nachname= '".$nachname."', username= '".$username."' WHERE gid = '".$bearbeiterid."'";
	$sqlUpdateResult = pg_exec($pgconn, $sqlupdate);
	pg_close($pgconn);
	if($sqlUpdateResult)
	{
	echo "success";
	}
	else{
	echo "failure";
	}
}
function normalize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>