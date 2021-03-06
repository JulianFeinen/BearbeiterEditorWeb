<?php
require "pgconnect.inc.php";
$templateInhalt = GetTemplateToString("userListeTemplate.php");
$neueTabelle = getNeueTabelle("SELECT * FROM public.personal ORDER BY gid ASC;");
$templateInhalt = str_replace("[USERTABELLE]", $neueTabelle, $templateInhalt);

echo $templateInhalt;

function GetTemplateToString($pfad)
{
    $handle = fopen($pfad, "r") or die("Unable to open file!");
    $templateInhalt = fread($handle,filesize($pfad));
    fclose($handle);
    return $templateInhalt;
}

function getNeueTabelle($sqlSelect)
{
    global $pgconn;
    $tempRow = [];
    $htmlQueryArray = [];
    $htmlQuery ="";
    $SqlSelectQuery =  $sqlSelect;
    $SqlSelectExec = pg_exec($pgconn, $SqlSelectQuery);
    $allRowsArray = pg_fetch_all($SqlSelectExec, PGSQL_ASSOC);
    for($i=0;$i<count($allRowsArray);$i++)
    {   
        $tempRow = $allRowsArray[$i];
        $tempRow['gid'] = trim($tempRow['gid']);
        $tempRow['vorname'] = trim($tempRow['vorname']);
        $tempRow['nachname'] = trim($tempRow['nachname']);
        $tempRow['username'] = trim($tempRow['username']);
        if($tempRow['username']=="" || $tempRow['username']=="NULL" || $tempRow['vorname']=="???")
        {
            continue;
        }
        else
        {
            $htmlQueryArray[$i] = "<tr id='".$tempRow['gid']."'onclick='RowSelected(".$tempRow['gid'].")'><td id='".$tempRow['gid']."-".$tempRow['vorname']."'>".$tempRow['vorname']."</td><td id='".$tempRow['gid']."-".$tempRow['nachname']."'>".$tempRow['nachname']."</td><td id='".$tempRow['gid']."-".$tempRow['username']."'>".$tempRow['username']."</td></tr>\n";
        }
    }
    foreach($htmlQueryArray as $val)
    {
        $htmlQuery .= $val;
    }
    return "<table id='BearbeiterListe'>\n<tr class='headerRow'><th onclick='sortTableby(vorname)'>Vorname<div class='sorter sortByVorname'></div></th><th onclick='sortTableby(nachname)'>Nachname<div class='sorter sortByNachname'></div></th><th onclick='sortTableby(username)'>Username<div class='sorter sortByUsername'></div></th></tr>\n". $htmlQuery ."</table>";
}
?>