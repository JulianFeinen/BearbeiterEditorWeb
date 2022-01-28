<?php
require "pgconnect.inc.php";
$bearbeiterid = $_REQUEST["bearbeiterid"];

$sqlloeschen = "DELETE FROM public.personal WHERE gid = '".$bearbeiterid."'";
$sqlloeschenResult = pg_exec($pgconn, $sqlloeschen);
pg_close($pgconn);
if($sqlloeschenResult)
{
echo "success";
}
else{
echo "failure";
}
?>