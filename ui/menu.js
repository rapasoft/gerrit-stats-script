import React from 'react';
import PropTypes from 'prop-types';

const menu = ({groupBy, triggerChange}) => (<div id="menu">
    <div style={{display: 'inline-block'}}>
        Group by:
        <div style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="checkbox"
                   onClick={() => triggerChange({groupBy: {author: !groupBy.author}})}
                   value={groupBy.author}/>Author
        </div>
        <div style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="checkbox"
                   onClick={() => triggerChange({groupBy: {subject: !groupBy.subject}})}
                   value={groupBy.subject}/>Subject
        </div>
        <div style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="checkbox"
                   onClick={() => triggerChange({groupBy: {time: !groupBy.time}})}
                   value={groupBy.time}/>Time
        </div>
    </div>
</div>);

menu.propTypes = {
    comments: PropTypes.array,
    filter: PropTypes.object,
    groupBy: PropTypes.object,
    triggerChange: PropTypes.func
};

export default menu;