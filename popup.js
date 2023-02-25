async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

let noComments = document.getElementById('no-comments');
let commentsElement = document.getElementById('comments');

(async () => {
    let tab = await getCurrentTab();
    let comments = await chrome.tabs.sendMessage(tab.id, { action: "get" });
    if(!comments) comments = [];
    
    noComments.hidden = comments.length > 0;
    commentsElement.innerHTML = "";

    for(let comment of comments) {
        let li = document.createElement('li');
        li.innerText = comment;
        commentsElement.appendChild(li);
    }
})();