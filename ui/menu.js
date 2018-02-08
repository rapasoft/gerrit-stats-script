import React from 'react';
import PropTypes from 'prop-types';
import {commentPropTypes} from "./comments";

const checkboxDivStyle = {
    display: 'inline-block',
    marginRight: '10px',
    fontSize: '1.1em'
};
const checkboxStyle = {
    verticalAlign: 'middle',
    height: '1em',
    weight: '1em',
    border: '1px solid black'
};

const menu = ({groupBy, triggerChange, markAllAsRead}) => (<div id="menu">
    <div style={{display: 'inline-block', marginLeft: '0.5em'}}>
        <div style={checkboxDivStyle}>
            <input type="checkbox" disabled={groupBy.subject || groupBy.time}
                   onClick={() => triggerChange({groupBy: {author: !groupBy.author}})}
                   value={groupBy.author} style={checkboxStyle}/>Author
        </div>
        <div style={checkboxDivStyle}>
            <input type="checkbox" disabled={groupBy.author || groupBy.time}
                   onClick={() => triggerChange({groupBy: {subject: !groupBy.subject}})}
                   value={groupBy.subject} style={checkboxStyle}/>Subject
        </div>
        <div style={checkboxDivStyle}>
            <input type="checkbox" disabled={groupBy.subject || groupBy.author}
                   onClick={() => triggerChange({groupBy: {time: !groupBy.time}})}
                   value={groupBy.time} style={checkboxStyle}/>Time
        </div>
    </div>
    <div style={{display: 'inline-block', float: 'right', marginRight: '0.5em'}}>
        <img src={require('./img/markunread_black_144x144.png')}
             alt="Mark as read"
             style={{width: '1em', height: '1em', verticalAlign: 'middle'}}
        />
        <a href="#" onClick={() => markAllAsRead()}>
            Mark all as read
        </a>
    </div>
</div>);

menu.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(commentPropTypes)),
    filter: PropTypes.object,
    groupBy: PropTypes.object,
    triggerChange: PropTypes.func,
    markAllAsRead: PropTypes.func,
};

export default menu;