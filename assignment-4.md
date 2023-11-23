<h1>﻿Algorytmy Kryptograficzne do Szyfrowania Hasła w Bazie Danych</h1>
<ol>
<li><h3>Algorytmy Skrótu (Hashing):</h3>
<p><b>SHA-256:</b></p>
<pre><?php
function hash_password($password) {
    $hashed_password = hash('sha256', $password);
    return $hashed_password;
}
?></pre></li>
<li><h3>Algorytmy Uwierzytelniania (Key Derivation Functions - KDF):</h3>
<p><b>PBKDF2:</b></p>
<pre><?php
function hash_password_pbkdf2($password, $salt) {
    $key = hash_pbkdf2("sha256", $password, $salt, 100000, 32);
    return $key;
}
?></pre></li>
<li><h3>Algorytmy Szyfrowania Symetrycznego (Symmetric Encryption):</h3>
<p><b>AES:</b></p>
<pre><?php
function encrypt_password_aes($password, $key) {
    $cipher = "aes-256-cbc";
    $ivlen = openssl_cipher_iv_length($cipher);
    $iv = openssl_random_pseudo_bytes($ivlen);
    $encrypted_password = openssl_encrypt($password, $cipher, $key, 0, $iv);
    return $encrypted_password;
}
?></pre></li>
</ol>

<h4>Uwaga:</h4>
W przypadku używania funkcji kryptograficznych, aby unikać błędów związanych z bezpieczeństwem, warto używać odpowiednich bibliotek i funkcji języka programowania. Dlatego warto skorzystać z gotowych bibliotek PHP, 
takich jak Libsodium, do obsługi operacji kryptograficznych.

<h3>Kod do Zapisu Zaszyfrowanych Danych w Bazie:</h3>
<pre><?php
// Przykładowy kod zapisu zaszyfrowanego hasła do bazy danych
function save_encrypted_password_to_db($username, $encrypted_password) {
    // Kod zapisu do bazy danych (pominięte dla czytelności)
    // Przy użyciu PDO do obsługi bazy danych, np. MySQL
    $pdo = new PDO("mysql:host=localhost;dbname=twoja_baza", "nazwa_uzytkownika", "haslo");
    $stmt = $pdo->prepare("INSERT INTO uzytkownicy (nazwa, haslo) VALUES (?, ?)");
    $stmt->execute([$username, $encrypted_password]);
}
?></pre>


<h3>Kod Sprawdzający Dane Logowania z Szyfrowaniem:</h3>
<pre><?php
// Przykładowy kod sprawdzający dane logowania z zaszyfrowanym hasłem
function check_login_credentials($username, $provided_password) {
    // Pobranie zapisanego zaszyfrowanego hasła z bazy danych
    $saved_encrypted_password = get_encrypted_password_from_db($username);

    // Porównanie zaszyfrowanych haseł
    if ($saved_encrypted_password == hash_password($provided_password)) {
        echo "Login successful!";
    } else {
        echo "Login failed.";
    }
}</pre>
<pre>// Funkcja do pobrania zaszyfrowanego hasła z bazy danych
function get_encrypted_password_from_db($username) {
    // Kod pobierania hasła z bazy danych (pominięte dla czytelności)
    $pdo = new PDO("mysql:host=localhost;dbname=twoja_baza", "nazwa_uzytkownika", "haslo");
    $stmt = $pdo->prepare("SELECT haslo FROM uzytkownicy WHERE nazwa = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    return $row['haslo'];
}
?></pre>

<h4>Czym się różni SHA256 od SHA512?</h4>
SHA256 i SHA512 to różne wersje algorytmu funkcji skrótu, znanej jako Secure Hash Algorithm (SHA). Główną różnicą między nimi jest długość wygenerowanego skrótu. SHA256 generuje 256-bitowy skrót, podczas gdy SHA512 generuje 512-bitowy. Większa długość skrótu oznacza potencjalnie większe bezpieczeństwo, ale również może wymagać więcej zasobów obliczeniowych.

<h4>Za co odpowiada długość klucza w algorytmach?</h4>
Długość klucza w algorytmach kryptograficznych odgrywa kluczową rolę w zapewnianiu bezpieczeństwa. Im dłuższy klucz, tym trudniej go złamać za pomocą ataków siłowych. Długość klucza wpływa na przestrzeń klucza, czyli ilość możliwych kombinacji, co determinuje czas potrzebny do skutecznego złamania zabezpieczeń.

<h4>Jaki klucz wybiera się do zapisania hasła?</h4>
Przy wyborze klucza do zapisywania hasła ważne jest uwzględnienie używanego algorytmu. Na przykład, w kontekście algorytmu AES, klucz powinien być wystarczająco długi i generowany w sposób bezpieczny. Klucz do zapisywania hasła powinien być traktowany jako tajemnica, nieprzewidywalna i trudna do odgadnięcia.

<h4>Jeśli chce się użyć różnych kluczy to jakich i dlaczego?</h4>
Jeśli decydujemy się używać różnych kluczy, można rozważyć zastosowanie jednego klucza do szyfrowania danych, takiego jak AES, a innego do generowania skrótu hasła, np. SHA256 lub PBKDF2. To podejście może zwiększyć bezpieczeństwo systemu, gdyby jeden z kluczy został skompromitowany, drugi nadal zapewniałby ochronę.

<h4>Po co szyfrować dane kluczem, który daje się złamać?</h4>
Szyfrowanie danych kluczem, który jest łatwy do złamania, jest ryzykowne i niewystarczające w kontekście zabezpieczania poufnych informacji. Wybieranie silnych i bezpiecznych algorytmów oraz kluczy jest kluczowe dla utrzymania integralności i poufności danych. Używanie łatwo złamanych kluczy naraża system na ryzyko nieautoryzowanego dostępu i utraty danych.
