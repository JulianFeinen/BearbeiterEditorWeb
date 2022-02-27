areInputsValid=true;
function Meinlogin()
{
LoginUsername = document.getElementById("iusername").value;
LoginPassword = document.getElementById("ipassword").value;
if (!isLengthokay(LoginUsername))    
{
    document.getElementById("iusername").style.border = "2px solid rgb(245, 32, 32)";
    openIncorrectText();
    areInputsValid=false;
}
if (!isLengthokay(LoginPassword))
{
    document.getElementById("ipassword").style.border = "2px solid rgb(245, 32, 32)";
    openIncorrectText();
    areInputsValid=false;
}
if(areInputsValid==true)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        if(this.responseText=="valid")
        {
            getUserTabelle();
        }
        else
        {
        document.getElementById("iusername").style.border = "2px solid rgb(245, 32, 32)";
        document.getElementById("ipassword").style.border = "2px solid rgb(245, 32, 32)";
        openIncorrectText();
        }
      }
    }
    xmlhttp.open("GET", "./php/login.php?username=" + LoginUsername+"&password="+LoginPassword, true);
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
function getUserTabelle()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        document.querySelector("html").innerHTML = this.responseText;
      }
    }
    xmlhttp.open("GET", "./php/usertabelle.php?", true);
    xmlhttp.send();
}
