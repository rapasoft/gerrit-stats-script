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
        return comments;
    }
    const result = comments.reduce((aggr, next) => {
        if (aggr[aggr.length - 1][key] === next[key]) {
            aggr[aggr.length - 1][key] += next[key];
        } else {
            aggr.push(next);
        }
        return aggr;
    }, [{}]);

    console.log(result);
    return comments;
}

const commentList = ({comments, groupBy}) => (
        groupByKey(comments, groupBy)
            .map(comment => (<div key={comment.hash} className="w3-panel w3-white w3-card w3-display-container"
                                  style={{background: (comment.status === 'New' ? '#b1ffa2!important' : 'none!important')}}>
                    <div className="subject">
                        <a href={buildCommentLink(comment)}>{comment.subject}</a>
                    </div>
                    <div className="subheader">
                        <div className="time">{comment.updatedFormatted}</div>
                        <span>({comment.status})</span>
                    </div>
                    <div className="comment-body">
                        <div className="author">
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