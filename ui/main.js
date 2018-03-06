import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';

import App from './app';
import STATE from './app-state';
import './main.css';
import './components.css';
import prepare from './comments/comment-processor';
import MESSAGES from "./messages/message-constants";

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