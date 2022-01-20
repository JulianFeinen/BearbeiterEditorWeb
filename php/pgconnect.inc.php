<?php
$pgconn = pg_connect("host=localhost dbname=postgres user=postgres password=PGkp4rz");
pg_set_client_encoding($pgconn, 'utf-8');
date_default_timezone_set('Europe/Berlin');
?>