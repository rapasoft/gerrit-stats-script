// Global "state" of our application
import composeAppComponents from './components';
import {showNotification, simpleHash} from './util';
import {STATE} from './app-state';

function appendToElement(commentBlock) {
    document.getElementById('app').innerHTML = commentBlock;
}

function addToCacheAndFlagNew(comments) {
    const newCache = comments
        .map((comment) => ({...comment, hash: simpleHash(JSON.stringify(comment))}))
        .map((comment) => !STATE.comments.map((comment) => comment.hash).includes(comment.hash) ?
            {...comment, status: 'New'} :
            {...comment, status: 'Old'});

    if (STATE.comments.length > 0) {
        displayNotificationForNewComments(newCache);
    }

    STATE.comments = newCache;

    return STATE.comments;
}

function displayNotificationForNewComments(newCache) {
    newCache
        .filter(comment => comment.status === 'New')
        .forEach(comment => showNotification(comment))
}

const fetchAndAppendComments =
    () => window.fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then(addToCacheAndFlagNew)
        .then(composeAppComponents)
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