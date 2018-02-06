import React from 'react';

import Menu from './menu';
import CommentList from './comment-list';
import {changeState, markAllAsRead} from "./actions";

const app = (state) => (<div>
    <Menu {...state}
          triggerChange={changeState}
          markAllAsRead={() => markAllAsRead(state)}
    />
    <CommentList {...state} />
</div>);

export default app;