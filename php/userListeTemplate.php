<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/liste.css" rel="stylesheet">
    <script src="js/BearbeiterEditor.js"></script>
    <title></title>
</head>
<body>
    <div id="tablereset">
        <button id="btnTableReset" onclick="btnTableReset()">Reset Table</button>
    </div>
    <div id="listWrapper">
        [USERTABELLE]
    </div>
    <div id="modal" class="modal">
        <div class="modal-header"><div class="modal-title">Editor</div><button onclick="closeButton()" class="close-button">&times;</button></div>
        <div class="modal-body">
            <input maxlength="20" id="iVorname" class="input"></input>Vorname
            <input maxlength="20" id="iNachname" class="input"></input>Nachname
            <input maxlength="20" id="iUsername" class="input"></input>Username
            <button onclick="btnSpeichern()" id="speichern">Speichern</button><button onclick="btnLoeschen()" id="loeschen">Löschen</button>
        </div>
    </div>
    <div onclick="closeButton()" id="overlay"></div>
    <div id="loeschen-modal">
        Sind Sie sicher, dass Sie den Bearbeiter aus der gesamten Liste löschen wollen?
        <div id="jaAbbrechenWrapper" class="jaAbbrechen">
        <button onclick="loeschenJa()" id="ja">Ja</button>
        <button onclick="loeschenNein()" id="NeinAbbrechen">Abbrechen</button>
        </div>
    </div>
    
    
    <div id="loeschenOverlay"></div>
</body>
</html>