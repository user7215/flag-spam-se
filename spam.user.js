// ==UserScript==
// @name         Flag as Spam Button for Stack Exchange
// @namespace    user7215
// @version      2025-08-18
// @description  Adds a Flag as Spam button to quickly flag spam without opening the dialog. Useful for spam waves.
// @author       user7215
// @match        *://*.stackexchange.com/*
// @match        *://*.askubuntu.com/*
// @match        *://*.mathoverflow.net/*
// @match        *://*.serverfault.com/*
// @match        *://*.stackoverflow.com/*
// @match        *://*.superuser.com/*
// @match        *://*.stackapps.com/*
// @icon         https://cdn.sstatic.net/Sites/stackexchange/Img/favicon.ico
// @grant        none
// ==/UserScript==

// Get list of sites here - https://meta.stackexchange.com/a/81383/1730933

var qid = location.pathname.split("/")[2]
var site = location.hostname;

var div = document.createElement("div");
div.className = "flex--item";

var btn = document.createElement("button");
btn.innerText = "Spam";
btn.className = "s-btn s-btn__link"; 
btn.onclick = function(){
    if (!localStorage.getItem("user7215-flagspam-accessToken")){
      location.href = "https://user7215.github.io/flag-spam-se/access-token.html?redirect=" + location.href;
    }
};

if (location.hash){
  let accessToken = location.hash.split("#")[1].split("=")[1];
  alert(accessToken);
}

div.appendChild(btn);
document.getElementsByClassName("d-flex gs8 s-anchors s-anchors__muted fw-wrap")[0].appendChild(div);
