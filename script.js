let menu_icon = document.querySelector("svg.menu_icon");
let menu_icon_remove = document.querySelector("svg.menu_icon_remove")
let menu_list = document.querySelector("ul");
menu_icon.addEventListener("click",()=>{
    menu_list.style.display = "block";
    menu_icon_remove.style.display = "block";
    menu_icon.style.display = "none";
})
menu_icon_remove.addEventListener("click",()=>{
    menu_list.style.display = "none";
    menu_icon.style.display = "block";
    menu_icon_remove.style.display = "none";
})