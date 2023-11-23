# Algorytmy Kryptograficzne do Szyfrowania Hasła w Bazie Danych

## 1. Algorytmy Skrótu (Hashing):
Algorytmy skrótu, zwane również funkcjami skrótu lub hashowania, są używane do przekształcania danych wejściowych, takich jak hasła, na unikalne, stałej długości ciągi znaków, nazywane skrótem. Kluczową cechą algorytmów skrótu jest to, że nawet niewielka zmiana wejściowych danych powoduje znaczną zmianę skrótu. Jest to przydatne w kontekście przechowywania haseł w bazach danych, ponieważ umożliwia porównywanie haseł bez przechowywania ich w czystej postaci.

Popularnymi algorytmami skrótu są SHA-256 i SHA-512, które generują skróty o stałej długości (256 i 512 bitów, odpowiednio). Algorytmy skrótu są szeroko stosowane w kryptografii, zwłaszcza do zabezpieczania haseł użytkowników i weryfikacji integralności danych.

#### SHA-256:
` <?php
function hash_password($password) {
    $hashed_password = hash('sha256', $password);
    return $hashed_password;
}
?> `
## 2. Algorytmy Uwierzytelniania (Key Derivation Functions - KDF):
Algorytmy Uwierzytelniania, znane również jako funkcje pochodzenia klucza (KDF), są używane w celu wzmocnienia bezpieczeństwa procesu uwierzytelniania, zwłaszcza przy przechowywaniu haseł. Głównym celem KDF jest wygenerowanie bezpiecznego klucza na podstawie hasła oraz dodatkowych parametrów, takich jak sól (salt). Sól jest losowym ciągiem danych dodawanym do hasła przed przetworzeniem przez algorytm KDF.

Przykładowy algorytm KDF to PBKDF2 (Password-Based Key Derivation Function 2), który jest oparty na iteracyjnym stosowaniu funkcji skrótu. PBKDF2 umożliwia określenie liczby iteracji, co zwiększa czas potrzebny do generowania klucza i utrudnia ataki siłowe.

Wykorzystanie algorytmów KDF jest kluczowe dla zabezpieczania haseł przed atakami, takimi jak brutalne łamanie haseł, poprzez wprowadzenie dodatkowych warstw bezpieczeństwa, jakie daje sól i iteracje.

#### PBKDF2:
` <?php
function hash_password_pbkdf2($password, $salt) {
    $key = hash_pbkdf2("sha256", $password, $salt, 100000, 32);
    return $key;
    }
?> `
## 3. Algorytmy Szyfrowania Symetrycznego (Symmetric Encryption):
Algorytmy Szyfrowania Symetrycznego są używane do zakodowania danych za pomocą jednego klucza, który jest następnie wykorzystywany zarówno do szyfrowania, jak i deszyfrowania informacji. W tym rodzaju szyfrowania ta sama tajna informacja (klucz) jest używana zarówno do zaszyfrowania, jak i odszyfrowania danych. Szyfrowanie symetryczne jest efektywne i szybkie, co sprawia, że jest często wykorzystywane do szyfrowania dużych ilości danych.

Przykładem popularnego algorytmu szyfrowania symetrycznego jest AES (Advanced Encryption Standard). AES może działać w różnych trybach, takich jak ECB (Electronic Codebook), CBC (Cipher Block Chaining) czy GCM (Galois/Counter Mode), oferując różne poziomy bezpieczeństwa i dostosowując się do różnych potrzeb aplikacji.

W praktyce klucz do szyfrowania i deszyfrowania musi być skrupulatnie przechowywany, ponieważ dostęp do klucza oznacza dostęp do zaszyfrowanych danych. Dlatego bezpieczne zarządzanie kluczami jest kluczowym elementem implementacji algorytmów szyfrowania symetrycznego.

#### AES:
` <?php
function encrypt_password_aes($password, $key) {
    $cipher = "aes-256-cbc";
    $ivlen = openssl_cipher_iv_length($cipher);
    $iv = openssl_random_pseudo_bytes($ivlen);
    $encrypted_password = openssl_encrypt($password, $cipher, $key, 0, $iv);
    return $encrypted_password;
}
?> `


#### Uwaga:
W przypadku używania funkcji kryptograficznych, aby unikać błędów związanych z bezpieczeństwem, warto używać odpowiednich bibliotek i funkcji języka programowania. Dlatego warto skorzystać z gotowych bibliotek PHP, takich jak Libsodium, do obsługi operacji kryptograficznych.

## Kod do Zapisu Zaszyfrowanych Danych w Bazie:
<pre> <?php
// Przykładowy kod zapisu zaszyfrowanego hasła do bazy danych
function save_encrypted_password_to_db($username, $encrypted_password) {
    // Kod zapisu do bazy danych (pominięte dla czytelności)
    // Przy użyciu PDO do obsługi bazy danych, np. MySQL
    $pdo = new PDO("mysql:host=localhost;dbname=twoja_baza", "nazwa_uzytkownika", "haslo");
    $stmt = $pdo->prepare("INSERT INTO uzytkownicy (nazwa, haslo) VALUES (?, ?)");
    $stmt->execute([$username, $encrypted_password]);
}
?> </pre>
## Kod Sprawdzający Dane Logowania z Szyfrowaniem:
` <?php
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
 <pre>
}    // Funkcja do pobrania zaszyfrowanego hasła z bazy danych
function get_encrypted_password_from_db($username) {
    // Kod pobierania hasła z bazy danych (pominięte dla czytelności)
    // Przy użyciu PDO do obsługi bazy danych, np. MySQL
    $pdo = new PDO("mysql:host=localhost;dbname=twoja_baza", "nazwa_uzytkownika", "haslo");
    $stmt = $pdo->prepare("SELECT haslo FROM uzytkownicy WHERE nazwa = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    return $row['haslo'];
}
?> </pre>




### Czym się różni SHA256 od SHA512?
SHA256 i SHA512 to różne wersje algorytmu funkcji skrótu, znanej jako Secure Hash Algorithm (SHA). Główną różnicą między nimi jest długość wygenerowanego skrótu. SHA256 generuje 256-bitowy skrót, podczas gdy SHA512 generuje 512-bitowy. Większa długość skrótu oznacza potencjalnie większe bezpieczeństwo, ale również może wymagać więcej zasobów obliczeniowych.

### Za co odpowiada długość klucza w algorytmach?
Długość klucza w algorytmach kryptograficznych odgrywa kluczową rolę w zapewnianiu bezpieczeństwa. Im dłuższy klucz, tym trudniej go złamać za pomocą ataków siłowych. Długość klucza wpływa na przestrzeń klucza, czyli ilość możliwych kombinacji, co determinuje czas potrzebny do skutecznego złamania zabezpieczeń.

### Jaki klucz wybiera się do zapisania hasła?
Przy wyborze klucza do zapisywania hasła ważne jest uwzględnienie używanego algorytmu. Na przykład, w kontekście algorytmu AES, klucz powinien być wystarczająco długi i generowany w sposób bezpieczny. Klucz do zapisywania hasła powinien być traktowany jako tajemnica, nieprzewidywalna i trudna do odgadnięcia.

### Jeśli chce się użyć różnych kluczy to jakich i dlaczego?
Jeśli decydujemy się używać różnych kluczy, można rozważyć zastosowanie jednego klucza do szyfrowania danych, takiego jak AES, a innego do generowania skrótu hasła, np. SHA256 lub PBKDF2. To podejście może zwiększyć bezpieczeństwo systemu, gdyby jeden z kluczy został skompromitowany, drugi nadal zapewniałby ochronę.

### Po co szyfrować dane kluczem, który daje się złamać?
Szyfrowanie danych kluczem, który jest łatwy do złamania, jest ryzykowne i niewystarczające w kontekście zabezpieczania poufnych informacji. Wybieranie silnych i bezpiecznych algorytmów oraz kluczy jest kluczowe dla utrzymania integralności i poufności danych. Używanie łatwo złamanych kluczy naraża system na ryzyko nieautoryzowanego dostępu i utraty danych.
