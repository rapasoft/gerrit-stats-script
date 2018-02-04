import React from 'react';
import PubSub from 'pubsub-js';

import Menu from './menu';
import CommentList from './comment-list';
import MESSAGES from "./message-constants";

const app = (state) => (<div>
    <Menu {...state} triggerChange={(state) => PubSub.publish(MESSAGES.STATE_CHANGED, {...state})}/>
    <CommentList {...state} />
</div>);

export default app;