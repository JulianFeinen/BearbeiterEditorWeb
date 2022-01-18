<?php
$templateInhalt = GetTemplateToString("/Apache24/htdocs/BearbeiterEditor/userListeTemplate.php");
$neueTabelle = getNeueTabelle("SELECT * FROM public.personal ORDER BY gid ASC;");
$templateInhalt = str_replace("[USERTABELLE]", $neueTabelle, $templateInhalt);

$debug = false;
if ($debug) {
	$file = 'D:\login.log';
	$fp = fopen($file, 'w');
	fputs($fp, "Logfile Anfang: " . date("l jS \of F Y h:i:s A") . "\n\n");
}
if($debug)
{
    fputs($fp, "templateInhalt: ". "\n" . $templateInhalt);
}

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
    $tempRow = [];
    $htmlQueryArray = [];
    $htmlQuery ="";
    $pgHandle = pg_connect("host=localhost dbname=postgres user=postgres password=PGkp4rz");
    pg_set_client_encoding($pgHandle, 'utf-8');
    date_default_timezone_set('Europe/Berlin');
    $SqlSelectQuery =  $sqlSelect;
    $SqlSelectExec = pg_exec($pgHandle, $SqlSelectQuery);
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
            $htmlQueryArray[$i] = "<tr id='".$tempRow['gid']."'onclick='RowSelected(".$tempRow['gid'].")'><td id='".$tempRow['gid']."-".$tempRow['vorname']."'>".$tempRow['vorname']."</td><td id='".$tempRow['gid']."-".$tempRow['nachname']."'>".$tempRow['nachname']."</td><td id='".$tempRow['gid']."-".$tempRow['username']."'>".$tempRow['username']."</td><td id='".$tempRow['gid']."id'>".$tempRow['gid']."</td></tr>\n";
        }
    }
    foreach($htmlQueryArray as $val)
    {
        $htmlQuery .= $val;
    }
    return "<table id='BearbeiterListe'>\n<tr><th>Vorname</th><th>Nachname</th><th>Username</th><th>BearbeiterID</th></tr>\n". $htmlQuery ."</table>";
}
?>