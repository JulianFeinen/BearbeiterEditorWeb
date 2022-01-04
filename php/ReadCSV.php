<?php
class Person {
	public $Vorname;
	public $Nachname;
	public $Username;
	public $BearbeiterID;
  
	function __construct($Vorname, $Nachname, $Username, $BearbeiterID) {
	  $this->Vorname = $Vorname;
	  $this->Nachname = $Nachname;
	  $this->Username = $Username;
	  $this->BearbeiterID = $BearbeiterID;
	}
  }
$csvHandle = fopen("D:\Personal\bearbeiter.csv", "r") or die("Unable to open file!");
$wholeCSVfile = fread($csvHandle,filesize("D:\Personal\bearbeiter.csv"));
fclose($csvHandle);
$csvLines = preg_split('/\r\n|\r|\n/', $wholeCSVfile);
for($i =1;$i<count($csvLines);$i++)
{	
	$csvWords = explode(";",$csvLines[$i]);
	$Person = new Person($csvWords[3], $csvWords[2], $csvWords[1], $csvWords[0]);
	$PersonList[$i] = $Person;
}





// $pgHandle = pg_connect("host=localhost dbname=postgres user=postgres password=PGkp4rz");
// pg_set_client_encoding($pgHandle, 'utf-8');
// date_default_timezone_set('Europe/Berlin');
// $webgiscontrol=$pgHandle;
// $query = "Select * From	public.Personal  ";
// 	$result = pg_query($webgiscontrol, $query);
// 	if ($result) {
// 		$row = pg_fetch_row($result);
// 		echo $row[0] . '.os_' . $row[1];
// 	}
// 	else { FehlerBehandlung($query); }
//     function FehlerBehandlung($query) {
//         $file = 'query_attributtabelle.log';
//         $fp = fopen($file, 'a');
//         fputs($fp, $query . " - Abfrage-Fehler!\n");
//     }
?>