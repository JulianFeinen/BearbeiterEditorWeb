<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/index.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/Login.js"></script>
    <script src="js/BearbeiterEditor.js"></script>
    <title></title>
</head>
<body>
    <h2></h2>
    <form class="form-login">
        <p class="p-login">log in here:</p>
        <div class="login-wrapper">
            <input name="iusername" id="iusername" class="input" placeholder="username" onkeyup="resetColors()"></input>
            <input name="ipassword" id="ipassword" class="input" placeholder="password" onkeyup="resetColors()" type="password" maxlength="20"></input>
        </div>
        <div class="btnLogin" id="btnLogin" onclick="Meinlogin()"><p>log in</p></div>
    </form>
    <p id="incorrect" class="incorrect">Eingabe inkorrekt!<br>versuchen Sie es erneut.
    </p>
</body>
</html>