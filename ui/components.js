import {calculateBackgroundFor, buildCommentLink, initialsOf} from './util';
import {STATE} from './app-state';

require('./components.css');

function createListOfComments(comments) {
    return comments
        .map(comment =>
            `<div class="w3-panel w3-white w3-card w3-display-container" 
                  style="background: ${comment.status === 'New' ? '#b1ffa2' : 'none'} !important">
                <div class="subject">
                    <a href="${buildCommentLink(comment)}">${comment.subject}</a>
                </div>
                <div class="subheader">                    
                    <div class="time">${comment.updatedFormatted}</div>
                    <span>(${comment.status})</span>
                </div>
                <div class="comment-body">
                    <div class="author">
                        <div class="author-badge" style="background: ${calculateBackgroundFor(comment.author)}">
                            ${initialsOf(comment.author)}
                        </div>
                    </div>
                    <div class="message">${comment.message}</div>
                </div>
             </div>`)
        .reduce((a, b) => a + b);
}

function findUnique(comments, property) {
    return Object.keys(comments.reduce((r, v, i, a, k = v[property]) => ((r[k] || (r[k] = [])).push(v), r), {}));
}

function createAuthorFilter(comments) {
    let names = findUnique(comments, 'author');
    names.unshift("None");
    console.log(names);
    return names
        .map(name => '<option ' + (STATE.filter.author === name ? 'selected' : '') + '>' + name + '</option>');
}

function createMenu(comments) {
    return `<div id="menu">
                <div style="display: inline-block;">
                  Group by: 
                    <input type="checkbox" value="${STATE.groupBy.author}" onclick=""/>Author,
                    <input type="checkbox" value="${STATE.groupBy.subject}"/>Subject,
                    <input type="checkbox" value="${STATE.groupBy.time}"/>Time,
                </div>
                <div style="display: inline-block;">
                    Filter:
                    <select>
                        ${createAuthorFilter(comments)}                    
                    </select>
                </div>
            </div>`
}

export default function composeAppComponents(comments) {
    return createMenu(comments) + createListOfComments(comments);
}