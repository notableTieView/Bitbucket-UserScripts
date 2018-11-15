// ==UserScript==
// @name         Bitbucket AvatarFinder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  see avatars next to branches (fixes Bitbucket bug https://jira.atlassian.com/browse/BSERV-10780)
// @author       notableTieView
// @match        <URL TO YOUR BITBUCKET INSTALLATION>/projects/*/repos/*/branches
// @grant        none
// ==/UserScript==

window.addEventListener("load", function() {
    tamperWithPage();
    let observer = new MutationObserver(tamperWithPage);
    var config = { attributes: false, childList: true, subtree: true };
    observer.observe(document.getElementsByTagName("tbody").item(0), config);
});


function tamperWithPage() {
    getAvatars();
}


function getAvatars() {

    'use strict';
    let names = {
        "real name (as in commits)" : "username",
        "Jean-Luc Picard" : "jpicard",
    };

    let a=document.getElementsByClassName("aui-avatar aui-avatar-small user-avatar");
    (Array.from(a)).forEach(function(item){

        let b=item.getElementsByClassName("aui-avatar-inner")
        .item(0)
        .getElementsByTagName("img")
        .item(0);

        let name=b.getAttribute("alt");
        if (names[name]) {
            b.setAttribute("src", window.location.protocol + "//" + window.location.host + "/users/"+names[name]+"/avatar.png")
        }

    })

}