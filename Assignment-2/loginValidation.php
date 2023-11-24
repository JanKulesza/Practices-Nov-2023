<?php
require_once('db_config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sprawdź, czy istnieją dane w formularzu
    if (isset($_POST["login"]) && isset($_POST["password"])) {
        // Przygotuj zapytanie SQL
        $sql = "SELECT * FROM users WHERE username = '{$_POST["login"]}' AND password = '{$_POST["password"]}'";
        $result = $conn->query($sql);

        // Sprawdź, czy wynik zapytania zawiera dokładnie jeden rekord (użytkownik)
        if ($result->num_rows == 1) {
            echo "<p>Poprawne logowanie!</p>";
        } else {
            echo "<p>Błędny login lub hasło. Spróbuj ponownie.</p>";
        }
    } else {
        echo "<p>Nieprawidłowe dane wejściowe.</p>";
    }
}

$conn->close();
?>
