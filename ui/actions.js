import PubSub from "pubsub-js";

import MESSAGES from "./message-constants";

export const changeState = (state) => PubSub.publish(MESSAGES.STATE_CHANGED, {...state});
export const markAllAsRead = (state) => {
    console.log(state);
    const newState = {comments: state.comments.map(comment => ({...comment, status: 'Old'}))};
    document.title = `(0) Gerrit Comments`;
    PubSub.publish(MESSAGES.STATE_CHANGED, {...state, ...newState});
};