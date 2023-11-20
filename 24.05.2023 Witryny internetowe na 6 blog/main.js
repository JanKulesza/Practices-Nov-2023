var dark = 0;
function toggleMenu() {
  var menu = document.getElementById('menu');
  var bars = document.getElementsByClassName('bar');
  var hamburger = document.querySelector('.hamburger');
  
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  
  for (var i = 0; i < bars.length; i++) {
    bars[i].classList.toggle('change');
  }
  
  hamburger.classList.toggle('change');
}
function showMore(readMoreId, readLessId) {
  var readMore = document.getElementById(readMoreId);
  var readLess = document.getElementById(readLessId);
  if (readMore && readLess) {
      readMore.style.display = "none";
      readLess.style.display = "inline";
  }
}

function showLess(readMoreId, readLessId) {
  var readMore = document.getElementById(readMoreId);
  var readLess = document.getElementById(readLessId);
  if (readMore && readLess) {
      readMore.style.display = "inline";
      readLess.style.display = "none";
  }
}
function cookies() {
  document.getElementById("cookie-banner").style.display = "none";
}
function newsletter() {
  document.getElementById("newsletter").style.display = "inline";
}
function hideForm() {
  document.getElementById("newsletter").style.display = "none";
}
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  var headerHeight = 30;
  var scrollPosition = window.scrollY;

  if (scrollPosition > headerHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});
function darkMode() {
  var root = document.documentElement;
  var body = document.body;
  var menu = document.getElementById("menu");
  var header = document.querySelector("header");
  var contact = document.querySelector(".contact");
  var button = document. getElementById("icon");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    button.className = "fa-solid fa-moon";
    root.style.setProperty('--background-color', 'white');
    root.style.setProperty('--text-color', 'black');
    root.style.setProperty('--header-bg-color', 'white');
    body.style.backgroundColor = "white";
    menu.style.backgroundColor = "white";
    menu.style.border = "thin var(--header-br-color) solid";
    header.style.border = "thin var(--header-br-color) solid";
    contact.style.backgroundColor = "#f2f2f2";
  } else {
    body.classList.add("dark");
    button.className = "fa-solid fa-sun";
    root.style.setProperty('--background-color', '#232323');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--header-bg-color', '#232323');
    body.style.backgroundColor = "#232323";
    menu.style.backgroundColor = "#232323";
    menu.style.border = "1px grey solid";
    header.style.border = "none";
    contact.style.backgroundColor = "#323232";
  }
}
function navigateTo(url) {
  window.location.href = url;
}