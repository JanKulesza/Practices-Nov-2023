<?php
require_once('db_config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pobierz dane z formularza
    $wprowadzonyLogin = $_POST["login"];
    $wprowadzoneHaslo = $_POST["password"];

    // Przygotuj zapytanie SQL
    $sql = "SELECT * FROM users WHERE username = '$wprowadzonyLogin' AND password = '$wprowadzoneHaslo'";
    $result = $conn->query($sql);

    // Sprawdź, czy wynik zapytania zawiera dokładnie jeden rekord (użytkownik)
    if ($result->num_rows == 1) {
        echo "<p>Poprawne logowanie!</p>";
        
    } else {
        echo "<p>Błędny login lub hasło. Spróbuj ponownie.</p>";
    }
}

$conn->close();
?>