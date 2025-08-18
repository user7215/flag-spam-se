// ==UserScript==
// @name         Flag as Spam Button for SE
// @namespace    https://user7215.github.io/
// @version      2025-08-18
// @description  try to take over the world!
// @author       user7215
// @match        https://github.com/user7215/flag-spam-se/blob/main/spam.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

var qid = location.pathname.split("/")[2]
var site = location.hostname;

var div = document.createElement("div");
div.className = "flex--item";

var btn = document.createElement("button");
btn.innerText = "Spam";
btn.className = "s-btn s-btn__link"; 
btn.onclick = function(){
    if (!localStorage.get("user7215-flagspam-accessToken")){
      alert("You will be redirected to obtain your access token.")
      location.href = "https://user7215.github.io/flag-spam-se/access_token.html?redirect=" + location.href;
    }
};

if (location.hash){
  let accessToken = location.hash.split("#")[1].split("=")[1];
  alert(accessToken);
}

div.appendChild(btn);
document.getElementsByClassName("d-flex gs8 s-anchors s-anchors__muted fw-wrap")[0].appendChild(div);
