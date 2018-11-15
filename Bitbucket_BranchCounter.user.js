// ==UserScript==
// @name         Bitbucket BranchCounter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Count the number of ALL branches in a repository and display it next to the item in the nav.
// @author       notableTieView
// @match        <URL TO YOUR BITBUCKET INSTALLATION>/projects/*/repos/*/**
// @grant        none
// ==/UserScript==

window.addEventListener("load",fetchNumberOfBranches);


function fetchNumberOfBranches() {

    // compute api url to fetch branches
    let branchURL = window.location.protocol
      + "//"
      + window.location.host
      + "/rest/api/latest"
      + window.location.pathname.split("/").slice(0,5).join("/")
      + "/branches?details=false&start=0&limit=10000"; // if your repo has more than 10000 branches check for insane developers or bots

    // fetch branches, extract their number and display it
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", branchURL, true);
    xhttp.onload = function (e) {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                let resultJSON=JSON.parse(xhttp.responseText);
                let branchCount=resultJSON["size"];
                showNumberOfBranches(branchCount);
            } else {
                console.error(xhttp.statusText);
            }
        }
    }
    xhttp.send(null);

}


function showNumberOfBranches(branchCount) {

    if (window.location.pathname.endsWith("branches")) {
        let branchesHeadline=document.getElementsByTagName("h2").item(0);
        branchesHeadline.innerText="Branches (" + branchCount + ")";
    }
    let node = document.createElement("span");
    node.className="aui-badge";
    node.innerText=branchCount
    let navElementBranches = document.getElementById("repository-nav-branches");
    navElementBranches.insertBefore(node, navElementBranches.children[1]);

}
