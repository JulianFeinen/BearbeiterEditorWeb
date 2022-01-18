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
  rowID = rowID-1;
    objPerson = new Person;
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
function btnSpeichern()
{
uVorname =document.getElementById("iVorname").value;
uNachname =document.getElementById("iNachname").value;
uUsername =document.getElementById("iUsername").value;
uBearbeiterID =document.getElementById("iBearbeiterID").value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText.includes("success"))
      {
        getUserListe();
        return;
      }
      else if(this.responseText.includes("failure"))
      {
        alert("failed to update the database..");
      }
      else if(this.responseText.includes("invalidinput"));
      {
        alert("invalid input\nmay only contain letters and -' _äöü");
      }
    }
  }
  xmlhttp.open("GET", "/BearbeiterEditor/php/speichern.php?vorname=" + uVorname+"&nachname="+uNachname+"&username="+uUsername+"&bearbeiterid="+uBearbeiterID, true);
  xmlhttp.send();
  CloseModalOne();
}

function btnLoeschen()
{
  OpenModalTwo();
  document.getElementById("overlay").style.display = "none";
}

function closeButton()
{
    CloseModalOne();
}

function loeschenOverlayZurueck()
{
  CloseModalTwo();
  document.getElementById("overlay").style.display = "block";//must recover 1st overlay since only the second one has to be deleted
}

function OpenModalOne() {
  document.getElementById("modal").style.transform = "translate(-50%,-50%) scale(1)";
  document.getElementById("overlay").style.display = "block";
}
function CloseModalTwo() {
  document.getElementById("loeschen-modal").style.transform = "translate(-50%,-50%) scale(0)";
  document.getElementById("loeschenOverlay").style.display = "none";
}
function CloseModalOne() {
  document.getElementById("modal").style.transform = "translate(-50%,-50%) scale(0)";
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
function getUserListe()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector("html").innerHTML = this.responseText;
      }
    }
    xmlhttp.open("GET", "/BearbeiterEditor/usertabelle.php?", true);
    xmlhttp.send();
}