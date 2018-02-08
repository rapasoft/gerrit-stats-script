import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from "pubsub-js";

import App from './app';
import STATE from './app-state';
import {showNotification, simpleHash} from "./util";

import './main.css';
import './components.css';
import MESSAGES from "./message-constants";
import {isNewOrUnread} from "./comments";

function prepare(commentsFromBackend, cachedComments) {
    const newCache = commentsFromBackend
        .map((comment) => ({...comment, hash: simpleHash(JSON.stringify(comment))}))
        .map((comment) => {
                if (!cachedComments.map((comment) => comment.hash).includes(comment.hash)) {
                    return {...comment, status: 'New'};
                } else {
                    const cachedComment = cachedComments.find(cached => cached.hash === comment.hash);
                    if (cachedComment && isNewOrUnread(cachedComment)) {
                        return {...cachedComment, status: 'Unread'};
                    }
                    return {...comment, status: 'Old'};
                }
            }
        );

    document.title = `(${newCache.filter((comment) => comment.status !== 'Old').length}) Gerrit Comments`;

    if (cachedComments.length > 0) {
        displayNotificationForNewComments(newCache);
    }

    return newCache;
}

function displayNotificationForNewComments(newCache) {
    newCache
        .filter(comment => comment.status === 'New')
        .forEach(comment => showNotification(comment))
}

const fetchAndAppendComments =
    () => window.fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then((comments) => prepare(comments, STATE.comments))
        .then((comments) => PubSub.publish(MESSAGES.STATE_CHANGED, {comments: comments}))
        .catch((error) => console.error(`Well this is awkward... An error occurred: ${error}`));

// Application initialization

Notification.requestPermission().then(function (result) {
    console.info(`Notification permissions: ${result}`);
});

fetchAndAppendComments();

window.setInterval(
    fetchAndAppendComments,
    60000
);

PubSub.subscribe(MESSAGES.SHOULD_RERENDER_VIEW, (event, STATE) => {
    ReactDOM.render(<App {...STATE} />, document.getElementById('app'));
});