class Person
{
    constructor(Vorname, Nachname, Username, BearbeiterID) {
    this.Vorname = Vorname;
    this.Nachname = Nachname;
    this.Username = Username;
    this.BearbeiterID = BearbeiterID;
  }
}

const observer = new MutationObserver(function(mutations)
{
  if (document.contains(document.getElementById("listWrapper")))
  {
    observer.disconnect();
    initDragstuff()
  }
});
observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});

function initDragstuff()
{
  modalOne = document.querySelector("#modal");
  modalOneHeader = document.querySelector(".modal-header");
  modalOneHeader.addEventListener("mousedown", ()=>
  {
    modalOneHeader.classList.add("active");
    window.addEventListener("mousemove", onDrag);
  })
  window.addEventListener("mouseup", ()=>
  {
    modalOneHeader.classList.remove("active");
    window.removeEventListener("mousemove", onDrag);
  })
}
function onDrag(e)
{
  let getStyle = window.getComputedStyle(modalOne)
  let Left = parseFloat(getStyle.left);
  let Top = parseFloat(getStyle.top);
  modalOne.style.left = String(Left + e.movementX)+"px";
  modalOne.style.top = String(Top + e.movementY)+"px";
}
function RowSelected(rowID)
{
  let trLength = document.getElementsByTagName("tr").length;
  for(var i=0;i<trLength;i++)
  {
    if(document.getElementsByTagName("tr")[i].id==rowID)
    {
      objPerson = new Person;
      objPerson.Vorname = document.getElementsByTagName("tr")[i].childNodes[0].innerHTML;
      objPerson.Nachname = document.getElementsByTagName("tr")[i].childNodes[1].innerHTML;
      objPerson.Username = document.getElementsByTagName("tr")[i].childNodes[2].innerHTML;
      objPerson.BearbeiterID = document.getElementsByTagName("tr")[i].id;
      document.getElementById("iVorname").value = objPerson.Vorname;
      document.getElementById("iNachname").value = objPerson.Nachname;
      document.getElementById("iUsername").value = objPerson.Username;
      OpenModalOne();
      break;
    }
  }
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
  document.getElementById("modal").style.left = "50%";
  document.getElementById("modal").style.top = "50%";
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
        initDragstuff();
      }
    }
    xmlhttp.open("GET", "./php/usertabelle.php?", true);
    xmlhttp.send();
}