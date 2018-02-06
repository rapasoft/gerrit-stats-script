import React from 'react';
import PropTypes from 'prop-types';

const menu = ({groupBy, triggerChange, markAllAsRead}) => (<div id="menu">
    <div style={{display: 'inline-block'}}>
        Group by:
        <div style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="checkbox" disabled={groupBy.subject || groupBy.time}
                   onClick={() => triggerChange({groupBy: {author: !groupBy.author}})}
                   value={groupBy.author}/>Author
        </div>
        <div style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="checkbox" disabled={groupBy.author || groupBy.time}
                   onClick={() => triggerChange({groupBy: {subject: !groupBy.subject}})}
                   value={groupBy.subject}/>Subject
        </div>
        <div style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="checkbox" disabled={groupBy.subject || groupBy.author}
                   onClick={() => triggerChange({groupBy: {time: !groupBy.time}})}
                   value={groupBy.time}/>Time
        </div>
    </div>
    <div style={{display: 'inline-block'}}>
        <a href="#" onClick={() => markAllAsRead()}>(Mark all as read)</a>
    </div>
</div>);

menu.propTypes = {
    comments: PropTypes.array,
    filter: PropTypes.object,
    groupBy: PropTypes.object,
    triggerChange: PropTypes.func,
    markAllAsRead: PropTypes.func,
};

export default menu;