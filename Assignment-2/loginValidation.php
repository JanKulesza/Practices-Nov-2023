<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = "admin";
    $haslo = "test";
    if($login == $_POST["login"] and $haslo == $_POST["haslo"]){
        echo "Pomyślne logowanie";
    }else{
        echo "Niepoprawny login lub hasło";
    }
}
?>
