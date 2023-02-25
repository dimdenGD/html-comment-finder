function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}

function getAllComments(rootElem) {
    let comments = [];
    let iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    let curNode;
    while (curNode = iterator.nextNode()) {
        comments.push(curNode.nodeValue);
    }
    return comments;
}

setTimeout(() => {
    chrome.runtime.sendMessage({action: "set", comments: getAllComments(document.body).filter(c => c.trim().length > 0)});
}, 500);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "get") {
        sendResponse(getAllComments(document.body).filter(c => c.trim().length > 0));
    }
});