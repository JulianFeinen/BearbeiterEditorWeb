<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/BearbeiterEditor.js"></script>
    <title>Document</title>
</head>
<body>
    <form action="./php/ReadCSV.php">
        <button type="submit">csv nach datenbank schreiben</button>
    </form>
    <div id="listWrapper">
        <table id="BearbeiterListe">    
            <tr><th>Vorname</th><th>Nachname</th><th>Username</th><th>BearbeiterID</th></tr>
            <tr id="1" onclick="RowSelected(1)"><td id="1-julian">julian</td><td id="1-feinen">feinen</td><td id="1-j_feinen">j_feinen</td><td id="1id">1</td></tr>
            <tr id="2" onclick="RowSelected(2)"><td id="2-julian">julian</td><td id="2-feinen">feinen</td><td id="1-j_feinen">j_feinen</td><td id="2id">2</td></tr>
            <tr id="3" onclick="RowSelected(3)"><td id="3-julian">julian</td><td id="3-feinen">feinen</td><td id="3-j_feinen">j_feinen</td><td id="3id">3</td></tr>
        </table>
    </div>
    <div id="modal" class="modal">
        <div class="modal-header"><div class="modal-title">Editor</div><button onclick="closeButton()" class="close-button">&times;</button></div>
        <div class="modal-body">
            <input id="iVorname" class="input"></input>Vorname
            <input id="iNachname" class="input"></input>Nachname
            <input id="iUsername" class="input"></input>Username
            <input id="iBearbeiterID" class="input"></input>BearbeiterID
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
    
    
    <div onclick="loeschenOverlayZurueck()" id="loeschenOverlay"></div>
</body>
</html>