<?php
require_once('db_config.php');

$username = "admin";
$password = "test";

// Przygotuj zapytanie SQL do dodania użytkownika
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Użytkownik został dodany pomyślnie.";
} else {
    echo "Błąd podczas dodawania użytkownika: " . $conn->error;
}

$conn->close();
?>