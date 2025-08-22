// ==UserScript==
// @name         Flag as Spam Button for Stack Exchange
// @namespace    https://user7215.github.io/
// @version      2025-08-22
// @description  Adds a Flag as Spam button to quickly flag spam without opening the dialog. Useful for spam waves.
// @author       user7215
// @match        *://*.stackexchange.com/questions/*/*
// @match        *://*.askubuntu.com/questions/*/*
// @match        *://*.mathoverflow.net/questions/*/*
// @match        *://*.serverfault.com/questions/*/*
// @match        *://*.stackoverflow.com/questions/*/*
// @match        *://*.superuser.com/questions/*/*
// @match        *://*.stackapps.com/questions/*/*
// @icon         https://cdn.sstatic.net/Sites/stackexchange/Img/favicon.ico
// @updateURL    https://github.com/user7215/flag-spam-se/raw/refs/heads/main/spam.meta.js
// @grant        none
// ==/UserScript==

// Get list of sites here - https://meta.stackexchange.com/a/81383/1730933


// -----CONFIG-----
var testing_mode = false; // when testing set to true
var error_message = "There was an error flagging the question as spam. This might occur because this is your own question or you have already flagged this question/retracted the flag. If you think this is a bug, check the console for details.";
// -----END CONFIG -----

// ---- API CONFIG ---
var qid = location.pathname.split("/")[2]
var site = location.hostname;
var token = localStorage.getItem("user7215-flagspam-accessToken");
var key = "rl_jhoXv9U3Hh3swDc3aioi1uWKo";
// --- END API CONFIG ---

// create span button

var div = document.createElement("div");
div.className = "flex--item";

var btn = document.createElement("button");
btn.innerText = "Spam";
btn.className = "s-btn s-btn__link";
btn.onclick = function(){
    if (!token){ // get access token if not exist.
      alert("Redirecting to get API access token. This question has not been flagged as spam. This will happen one time for every separate domain and every time you clear your localStorage (cookies).")
      location.href = "https://user7215.github.io/flag-spam-se/access-token.html?redirect=" + location.href;
    }
    // Flag spam
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "//api.stackexchange.com/2.3/questions/" + qid + "/flags/options?key=" + key + "&site=" + site + "&access_token=" + token, false);
    xhr.send();
    var options = xhr.responseText;
    var optionsJSON = JSON.parse(options);
    var optionID = optionsJSON.items[0].option_id;
    if (!optionID){
        alert(error_message);
        console.log("There was an error getting flag options. This might occur because this is your own question. If you think this is a bug, create an issue on GitHub (https://github.com/user7215/flag-spam-se) or ask on the StackApps post (https://stackapps.com/questions/11876/placeholder-flag-as-spam-quick-button). Please include the below debug output. Please include the below output.");
        console.log("options: ", options, "\noptionsJSON: ", optionsJSON, "\noptionID: ", optionID);
    } else {
        xhr.open("POST", "https://api.stackexchange.com/2.3/questions/" + qid + "/flags/add/", false);
        var formData = new FormData();
        formData.append("id", qid);
        formData.append("option_id", optionID);
        formData.append("comment", "Done through user7215's Flag as Spam Quick Button userscript. https://github.com/user7215/flag-spam-se https://stackapps.com/questions/11876/flag-as-spam-quick-button");
        formData.append("key", key);
        formData.append("access_token", token);
        formData.append("preview", testing_mode);
        formData.append("filter", "default");
        formData.append("site", site);
        xhr.send(formData);
        if (xhr.status !== 200){
            alert(error_message);
            console.log("There was an error flagging the question as spam. This might occur because this is your own question or you have already flagged this question/retracted the vote. If you think this is a bug, create an issue on GitHub (https://github.com/user7215/flag-spam-se) or ask on the StackApps post (https://stackapps.com/questions/11876/placeholder-flag-as-spam-quick-button). Please include the below debug output. Please include the below output.");
            console.log("/questions/{id}/flags/add returned " + xhr.status + " instead of 200. responseText: " + xhr.responseText);
        }
    }
};

if (location.hash.includes("accessToken")){ // save access token
  let accessToken = location.hash.split("#")[1].split("=")[1];
  localStorage.setItem("user7215-flagspam-accessToken", accessToken);
}

// append spam button
div.appendChild(btn);
document.getElementsByClassName("d-flex gs8 s-anchors s-anchors__muted fw-wrap")[0].appendChild(div);
