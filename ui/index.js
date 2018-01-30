// Global "state" of our application

let unread = 0;
let commentCache = [];
let cacheOfHashes = [];

function markAllAsRead() {
    document.title = 'Gerrit Comments';
    unread = 0;
}

function appendToElement(commentBlock) {
    document.getElementById('app').innerHTML = commentBlock;
}

function addToCacheAndFlagNew(comments) {
    const newCache = comments
        .map((comment) => ({...comment, hash: simpleHash(JSON.stringify(comment))}))
        .map((comment) => !cacheOfHashes.includes(comment.hash) ?
            {...comment, status: 'New'} :
            {...comment, status: 'Old'});

    if (commentCache.length > 0) {
        displayNotificationForNewComments(newCache);
    }

    if (commentCache.length < newCache.length) {
        unread += newCache.length - commentCache.length;
        document.title = `(${unread}) Gerrit Comments`;
    }

    cacheOfHashes = newCache.map((comment) => comment.hash);
    commentCache = newCache;

    return newCache;
}

function showNotification(comment) {
    const options = {
        body: comment.author + '@' + comment.updatedFormatted + '\n' + comment.message
    };
    const notification = new Notification(comment.subject, options);
    notification.onclick = () => window.open(buildCommentLink(comment));
}

function displayNotificationForNewComments(newCache) {
    newCache
        .filter(comment => comment.status === 'New')
        .forEach(comment => showNotification(comment))
}

const fetchAndAppendComments = () => window.fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(addToCacheAndFlagNew)
    .then(createListOfComments) // defined in comment-list-component.js
    .then(appendToElement)
    .catch((error) => console.log(`Well this is awkward... An error occurred: ${error}`));

// Application initialization

Notification.requestPermission().then(function (result) {
    console.log(result);
});

fetchAndAppendComments();

window.setInterval(
    fetchAndAppendComments,
    60000
);