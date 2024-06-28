let menu_icon = document.querySelector("svg.menu_icon");
let menu_items = document.querySelectorAll("li a");
let menu_icon_remove = document.querySelector("svg.menu_icon_remove");
let menu_list = document.querySelector("ul");
// navbar in small size
menu_icon.addEventListener("click", () => {
  menu_list.style.height = "170px";
  menu_icon_remove.style.display = "block";
  menu_icon.style.display = "none";
});
menu_icon_remove.addEventListener("click", () => {
  menu_list.style.height = "0px";
  menu_icon.style.display = "block";
  menu_icon_remove.style.display = "none";
});
menu_items.forEach(function (elem) {
  elem.addEventListener("click", () => {
    menu_list.style.height = "0px";
    menu_icon.style.display = "block";
    menu_icon_remove.style.display = "none";
  });
});
// links & buttons
document
  .querySelector('button[type="download CV"]')
  .addEventListener("click", () => {
    window.open("attachments/CV.pdf", "_blank");
  });
document
  .querySelector('button[type="COntact info"]')
  .addEventListener("click", () => {
    window.open("#Section6", "_self");
  });
document.querySelectorAll('button[type="GitHub"]').forEach(function (elem) {
  var GitHub = elem.getAttribute("href");
  elem.addEventListener("click", () => {
    window.open(GitHub, "_self");
  });
});

document.querySelectorAll('button[type="blog"]').forEach(function (elem) {
  var blog = elem.getAttribute("href");
  elem.addEventListener("click", () => {
    window.open(blog, "_self");
  });
});

document.querySelectorAll(".poster").forEach(function (elem) {
  var url = elem.getAttribute("href");
  var width = elem.getAttribute("width");
  var height = elem.getAttribute("height");
  elem.style.backgroundImage = "url(" + url + ")";
  elem.style.backgroundPosition = width + " " + height;
});

//filter projects
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].querySelector('.category').textContent == c || c == "all") w3AddClass(x[i], "show");
  }
}
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}