import PubSub from 'pubsub-js';

import MESSAGES from "./messages/message-constants";

// Default state

const STATE = {
    groupBy: {
        author: false,
        time: false,
        subject: false
    },
    filter: {
        author: ''
    },
    comments: []
};

// Reducers

PubSub.subscribe(MESSAGES.STATE_CHANGED, (event, newState) => {
    console.info(`State change for event: ${event}`, newState);

    STATE.groupBy = {...STATE.groupBy, ...newState.groupBy};
    STATE.filter = {...STATE.filter, ...newState.filter};
    STATE.comments = newState.comments ? newState.comments : STATE.comments;

    PubSub.publish(MESSAGES.SHOULD_RERENDER_VIEW, STATE);
});

export default STATE;