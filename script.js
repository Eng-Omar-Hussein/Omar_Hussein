let menu_icon = document.querySelector("svg.menu_icon");
let menu_items = document.querySelectorAll("li a");
let menu_icon_remove = document.querySelector("svg.menu_icon_remove");
let menu_list = document.querySelector("ul");
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
    var GitHub = elem.getAttribute('href');
  elem.addEventListener("click", () => {
    window.open(GitHub, "_self");
  });
});

document.querySelectorAll('button[type="blog"]').forEach(function (elem) {
  var blog = elem.getAttribute('href');
  elem.addEventListener("click", () => {
    window.open(blog, "_self");
  });
});
