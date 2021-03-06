import React from 'react';
import PropTypes from 'prop-types';

import {buildCommentLink, calculateBackgroundFor, initialsOf} from "../util";
import {commentPropTypes, groupByKey, isNewOrUnread} from "../comments/comment-utils";
import annotate from "../messages/message-annotation";

const commentList = ({comments, groupBy}) => (
        (comments.length !== 0) ? groupByKey(comments, groupBy)
            .map((comment, i) => (
                <div key={comment.hash}
                     className={"w3-panel w3-display-container" +
                     (comment.squash ? " squashed-card" : " w3-card") +
                     ((comment.squash && i < comments.length - 1 && !comments[i + 1].squash) ? " squashed-card-bottom" : "")}
                     style={{background: (isNewOrUnread(comment) ? '#dfd' : 'white')}}>
                    <div className="subject" style={{display: (comment.squash && groupBy.subject ? 'none' : 'block')}}>
                        <a href={buildCommentLink(comment)} style={{textDecoration: 'none'}}>
                            {comment.subject}
                        </a>
                    </div>
                    <div className="subheader" style={{display: (comment.squash && groupBy.time ? 'none' : 'block')}}>
                        <div className="time">{comment.updatedFormatted}</div>
                        <span> ({comment.status})</span>
                    </div>
                    <div className="comment-body">
                        <div className="author" style={{display: (comment.squash && groupBy.author ? 'none' : 'block')}}>
                            <div className="author-badge" style={{background: calculateBackgroundFor(comment.author)}}
                                 title={comment.author}>
                                {initialsOf(comment.author)}
                            </div>
                        </div>
                        <div className="message">
                            {annotate([comment.message])}
                        </div>
                        <div>
                            <a href={buildCommentLink(comment)} target="_blank">
                                <img style={{width: '1.5em', height: '1.5em'}}
                                     src={require('../img/open_in_new_black_108x108.png')}
                                     alt="View"/>
                            </a>
                        </div>
                    </div>
                </div>)
            ) : <div style={{marginTop: '1em', fontSize: '2em'}}>Nothing to display, go have a coffee... ☕</div>
    )
;

commentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(commentPropTypes)),
    groupBy: PropTypes.object
};

export default commentList;