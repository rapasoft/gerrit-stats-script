import React from 'react';

import {buildCommentLink, calculateBackgroundFor, initialsOf} from "./util";

function groupByKey(comments, by) {
    let key;
    console.log(by.author);
    if (by.author) {
        key = 'author';
    } else if (by.time) {
        key = 'updatedFormatted';
    } else if (by.subject) {
        key = 'subject';
    } else {
        return comments.map(comment => ({...comment, squash: false}));
    }

    for (let i = 1; i < comments.length; i++) {
        comments[i].squash = comments[i - 1][key] === comments[i][key];
    }

    console.log(comments);

    return comments;
}

const commentList = ({comments, groupBy}) => (
        groupByKey(comments, groupBy)
            .map((comment, i) => (<div key={comment.hash}
                                       className={"w3-panel w3-display-container" +
                                       (comment.squash ? " squashed-card" : " w3-card") +
                                       ((comment.squash && i < comments.length - 1 && !comments[i + 1].squash) ? " squashed-card-bottom" : "")}>
                    <div className="subject" style={{display: (comment.squash && groupBy.subject ? 'none' : 'block')}}>
                        <a href={buildCommentLink(comment)}>{comment.subject}</a>
                    </div>
                    <div className="subheader" style={{display: (comment.squash && groupBy.time ? 'none' : 'block')}}>
                        <div className="time">{comment.updatedFormatted}</div>
                        <span>({comment.status})</span>
                    </div>
                    <div className="comment-body">
                        <div className="author" style={{display: (comment.squash && groupBy.author ? 'none' : 'block')}}>
                            <div className="author-badge" style={{background: calculateBackgroundFor(comment.author)}}>
                                {initialsOf(comment.author)}
                            </div>
                        </div>
                        <div className="message">{comment.message}</div>
                    </div>
                </div>)
            )
    )
;

export default commentList;