import {calculateBackgroundFor, buildCommentLink, initialsOf} from './util';

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

function createAuthorFilter(comments, selected) {
    let names = findUnique(comments, 'author');
    names.unshift("None");
    return names
        .map(name => '<option ' + (selected === name ? 'selected' : '') + '>' + name + '</option>');
}

function createSubjectFilter(comments, selected) {
    let subjects = findUnique(comments, 'subject');
    subjects.unshift("None");
    return subjects
        .map(subject => '<option ' + (subject === selected ? 'selected' : '') + '>' + subject + '</option>');
}

function createMenu(comments, state) {
    return `<div id="menu">
                <div style="display: inline-block;">
                  Group by: 
                    <input type="checkbox" value="${state.groupBy.author}" onclick=""/>Author,
                    <input type="checkbox" value="${state.groupBy.subject}"/>Subject,
                    <input type="checkbox" value="${state.groupBy.time}"/>Time,
                </div>
                <div style="display: inline-block;">
                    Filter author:
                    <select>
                        ${createAuthorFilter(comments, state.filter.author)}                    
                    </select>,
                    Filter subject:
                    <select>
                        ${createSubjectFilter(comments, state.filter.subject)}                    
                    </select>
                </div>
            </div>`
}

export default function composeAppComponents(comments, state) {
    return createMenu(comments, state) + createListOfComments(comments, state);
}