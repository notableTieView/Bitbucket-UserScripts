// ==UserScript==
// @name         Bitbucket PullRequest TODOs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       notableTieView
// @match        <URL TO YOUR BITBUCKET INSTALLATION>/projects/*/repos/*/pull-requests*
// @grant        none
// ==/UserScript==


const BUTTON_TODO_TEXT = "My TODOs";
const BUTTON_UNHIDE_TEXT = "Unhide";

window.addEventListener("load",addTodoButton);


function addTodoButton() {
    if (window.location.pathname.endsWith("pull-requests")) {
        // add switch button
        let button = document.createElement("button");
        button.className="aui-button aui-button-subtle";
        button.innerText=BUTTON_TODO_TEXT;
        button.addEventListener("click", function(){
            toggleButton(button)
        });
        let list=document.getElementById("pull-requests-content").getElementsByClassName("filter-bar").item(0).children.item(1);
        list.appendChild(button);

        // add observer that resets button when other filters are selected
        let observer = new MutationObserver(function() {button.innerText=BUTTON_TODO_TEXT});
        var config = { attributes: false, childList: true, subtree: true };
        observer.observe(document.getElementsByClassName("pull-request-list").item(0), config);
    }
}


function fetchReviewRequests(username, callback) {
    // compute api url to fetch branches
    let prURL = window.location.protocol
      + "//"
      + window.location.host
      + "/rest/api/latest"
      + window.location.pathname
      + "?reviewing=true";

    // fetch branches, extract their number and display it
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", prURL, true);
    xhttp.onload = function (e) {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                let resultJSON=JSON.parse(xhttp.responseText);
                let reviewIds=resultJSON["values"]
                .filter(
                    function(value) {
                        let unapprovedMes= value["reviewers"]
                        .filter(
                            function(reviewer) {
                                return reviewer["user"]["name"]===username && reviewer["status"]==="UNAPPROVED"
                            }
                        );
                        return unapprovedMes.length>0
                    }
                )
                .map(
                    function(value) {
                        return value["id"].toString()
                    }
                );
                callback(reviewIds);
            } else {
                console.error(xhttp.statusText);
            }
        }
    }
    xhttp.send(null);
}


function toggleButton(button) {
    if (button.innerText === BUTTON_TODO_TEXT) {
        fetchReviewRequests(
            extractUsername(),
            function(ids) {restrictToTodos(true, ids)}
        );
        button.innerText = BUTTON_UNHIDE_TEXT;
    } else {
        restrictToTodos(false);
        button.innerText = BUTTON_TODO_TEXT;
    }
}


function restrictToTodos(todos, ids) {
    let pullRequestTableBody=document.getElementById("pull-requests-content").getElementsByTagName("tbody").item(0);
    if (pullRequestTableBody!=undefined) {
        for (var i=0; i<pullRequestTableBody.children.length; i++) {
            let child=pullRequestTableBody.children[i];
            if (todos) {
                let prId=child.getElementsByClassName("summary").item(0).getAttribute("data-pull-request-id")
                if (!ids.includes(prId)) {
                    child.setAttribute("style", "display: none;");
                }
            } else {
                child.removeAttribute("style");
            }
        }
    }
}


function extractUsername() {
    return document.getElementById("current-user").getAttribute("data-username")
}
