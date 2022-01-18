areInputsValid=true;
function Meinlogin()
{
username = document.getElementById("iusername").value;
password = document.getElementById("ipassword").value;
if (!isLengthokay(username))    
{
    document.getElementById("iusername").style.border = "2px solid rgb(245, 32, 32)";
    openIncorrectText();
    areInputsValid=false;
}
if (!isLengthokay(password))
{
    document.getElementById("ipassword").style.border = "2px solid rgb(245, 32, 32)";
    openIncorrectText();
    areInputsValid=false;
}
if(areInputsValid==true)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText=="valid")
        {
            getUserListe();
        }
        else
        {
        document.getElementById("iusername").style.border = "2px solid rgb(245, 32, 32)";
        document.getElementById("ipassword").style.border = "2px solid rgb(245, 32, 32)";
            openIncorrectText();
        }
      }
    }
    xmlhttp.open("GET", "/BearbeiterEditor/php/login.php?username=" + username+"&password="+password, true);
    xmlhttp.send();
}
areInputsValid=true;
}
function isLengthokay(data)
{
    if(data.length==0)
    {
        return false;
    }
    else{
        return true;
    }
}
function openIncorrectText()
{
    document.getElementById("incorrect").style.opacity = "100%";
}
function resetColors()
{
    document.getElementById("iusername").style.border = "2px solid white";
    document.getElementById("ipassword").style.border = "2px solid white";
    document.getElementById("incorrect").style.opacity = "0%";
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