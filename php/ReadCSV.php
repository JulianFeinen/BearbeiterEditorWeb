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
importNachDatenbank($csvLines);


function importNachDatenbank($csvLines)
{
$SqlResetTableScript = "DROP TABLE IF EXISTS public.personal;
SELECT setval('public.personal_gid_seq', 1, true);
CREATE TABLE IF NOT EXISTS public.personal
(
    gid integer NOT NULL DEFAULT nextval('" ."personal_gid_seq" . "'::regclass),
    vorname character(121) COLLATE pg_catalog." . "default" . ",
    nachname character(121) COLLATE pg_catalog." . "default" . ",
    username character(121) COLLATE pg_catalog." . "default" . ",
    passwort character varying(250) COLLATE pg_catalog." . "default" . " NOT NULL DEFAULT 'snoopy'::character varying,
    CONSTRAINT personal_pkey PRIMARY KEY (gid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.personal
    OWNER to postgres;";

$pgHandle = pg_connect("host=localhost dbname=postgres user=postgres password=PGkp4rz");
pg_set_client_encoding($pgHandle, 'utf-8');
date_default_timezone_set('Europe/Berlin');
$sqlTableResult = pg_exec($pgHandle, $SqlResetTableScript);
	for($i =1;$i<count($csvLines);$i++)
	{	
		$csvWords = explode(";",$csvLines[$i]);
		$sqlquery = "insert into public.personal (vorname, nachname, username) VALUES ('$csvWords[3]', '$csvWords[2]', '$csvWords[1]');";
		$sqlresult = pg_exec($pgHandle, $sqlquery);
	}
	pg_close($pgHandle);
}




?>