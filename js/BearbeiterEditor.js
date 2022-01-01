var wholeTable;
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
    alert(objPerson.Vorname + objPerson.Nachname + objPerson.Username + objPerson.BearbeiterID);
}