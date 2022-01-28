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
    objPerson.BearbeiterID = rowID+1;
    document.getElementById("iVorname").value = objPerson.Vorname;
    document.getElementById("iNachname").value = objPerson.Nachname;
    document.getElementById("iUsername").value = objPerson.Username;
    OpenModalOne();
}
function btnSpeichern()
{
  closeOverlayOne();
  openOverlayTwo();
  var speichernObj = new Person;
  speichernObj.Vorname =document.getElementById("iVorname").value;
  speichernObj.Nachname =document.getElementById("iNachname").value;
  speichernObj.Username =document.getElementById("iUsername").value;
  speichernObj.BearbeiterID =objPerson.BearbeiterID;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      if(this.responseText.includes("success"))
      {
        getUserListe();
        return;
      }
      else if(this.responseText.includes("failure"))
      {
        alert("failed to update the database..");
        CloseModalOne();
        closeOverlayTwo();
      }
      else if(this.responseText.includes("invalidinput"));
      {
        alert("invalid input\nmust only contain letters and (-' _äöü)");
        CloseModalOne();
        closeOverlayTwo();
      }
    }
  }
  xmlhttp.open("GET", "./php/update.php?vorname=" + speichernObj.Vorname+"&nachname="+speichernObj.Nachname+"&username="+speichernObj.Username+"&bearbeiterid="+speichernObj.BearbeiterID, true);
  xmlhttp.send();
}  


function btnLoeschen()
{
  OpenModalTwo();
  closeOverlayOne();
}

function closeButton()
{
    CloseModalOne();
}

function OpenModalOne() {
  document.getElementById("modal").style.transform = "translate(-50%,-50%) scale(1)";
  openOverlayOne();
}
  function openOverlayOne() {
  document.getElementById("overlay").style.display = "block";
  }

function CloseModalTwo() {
  document.getElementById("loeschen-modal").style.transform = "translate(-50%,-50%) scale(0)";
  closeOverlayTwo();
}
  function closeOverlayTwo() {
  document.getElementById("loeschenOverlay").style.display = "none";
  }

function CloseModalOne() {
  document.getElementById("modal").style.transform = "translate(-50%,-50%) scale(0)";
  closeOverlayOne();
}


  function closeOverlayOne() {
  document.getElementById("overlay").style.display = "none";
  }

function OpenModalTwo() {
  document.getElementById("loeschen-modal").style.transform = "translate(-50%,-50%) scale(1)";
  openOverlayTwo();
}

  function openOverlayTwo() {
  document.getElementById("loeschenOverlay").style.display = "block";
  }

function loeschenJa()
{
  CloseModalOne();
  CloseModalTwo();
  var loeschenObj = new Person;
  loeschenObj.BearbeiterID =objPerson.BearbeiterID;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      if(this.responseText.includes("success"))
      {
        getUserListe();
        return;
      }
      else if(this.responseText.includes("failure"))
      {
        alert("failed to update the database..");
      }
    }
  }
  xmlhttp.open("GET", "./php/loeschen.php?bearbeiterid=" + loeschenObj.BearbeiterID, true);
  xmlhttp.send();
}

function btnTableReset()
{
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      alert("the data table was reset");
      getUserListe();
    }
  }
  xmlhttp.open("GET", "./php/ReadCSV.php?", true);
  xmlhttp.send();
}

function loeschenNein()
{
  CloseModalTwo();
  openOverlayOne();
}
function getUserListe()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector("html").innerHTML = this.responseText;
      }
    }
    xmlhttp.open("GET", "./php/usertabelle.php?", true);
    xmlhttp.send();
}