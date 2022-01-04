class Person
{
    constructor(Vorname, Nachname, Username, BearbeiterID) {
    this.Vorname = Vorname;
    this.Nachname = Nachname;
    this.Username = Username;
    this.BearbeiterID = BearbeiterID;
  }
}
function RowSelected(rowID)
{
    var objPerson = new Person;
    objPerson.Vorname = document.getElementById("BearbeiterListe").rows[rowID].cells.item(0).innerHTML;
    objPerson.Nachname = document.getElementById("BearbeiterListe").rows[rowID].cells.item(1).innerHTML;
    objPerson.Username = document.getElementById("BearbeiterListe").rows[rowID].cells.item(2).innerHTML;
    objPerson.BearbeiterID = document.getElementById("BearbeiterListe").rows[rowID].cells.item(3).innerHTML;
    document.getElementById("iVorname").value = objPerson.Vorname;
    document.getElementById("iNachname").value = objPerson.Nachname;
    document.getElementById("iUsername").value = objPerson.Username;
    document.getElementById("iBearbeiterID").value = objPerson.BearbeiterID;
    OpenModalOne();
    
}
function OpenModalOne() {
  document.getElementById("modal").style.transform = "translate(-50%,-50%) scale(1)";
  document.getElementById("overlay").style.display = "block";
}

function closeButton()
{
  CloseModalOne();
}

function loeschenOverlayZurueck()
{
  CloseModalTwo();
  document.getElementById("overlay").style.display = "block";//must recover 1st overlay since only the first has to be deleted
}

function CloseModalTwo() {
  document.getElementById("loeschen-modal").style.transform = "translate(-50%,-50%) scale(0)";
  document.getElementById("loeschenOverlay").style.display = "none";
}

function btnSpeichern()
{
  CloseModalOne();
}

function CloseModalOne() {
  document.getElementById("modal").style.transform = "translate(-50%,-50%) scale(0)";
  document.getElementById("overlay").style.display = "none";
}

function btnLoeschen()
{
  OpenModalTwo();
  document.getElementById("overlay").style.display = "none";
}

function OpenModalTwo() {
  document.getElementById("loeschen-modal").style.transform = "translate(-50%,-50%) scale(1)";
  document.getElementById("loeschenOverlay").style.display = "block";
}

function loeschenJa()
{
  CloseModalOne();
  CloseModalTwo();
}

function loeschenNein()
{
  loeschenOverlayZurueck()
}
