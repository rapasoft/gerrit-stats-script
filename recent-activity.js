const performGerritRequest = require('./gerrrit-request');
const moment = require('moment');
const DATE_FORMAT = require('./constants').DATE_FORMAT;
const flatten = require('./constants').concat;

/**
 * The original commentObject has key of fileName and array of comments, therefore we need to flatten it down
 */
function createCommentObjects(commentObject, reviewNumber, subject) {
    return Object
        .keys(commentObject)
        .map(key => {
            return commentObject[key].map(details => {
                return {key: key, ...details}
            });
        })
        .reduce(flatten, [])
        .map(comment => {
            return {
                subject: subject,
                file: comment.key,
                reviewNumber: reviewNumber,
                patchSet: comment['patch_set'],
                line: comment.line,
                author: comment.author.name,
                message: comment.message,
                updated: comment.updated,
                updatedFormatted: moment(comment.updated).format(DATE_FORMAT)
            };
        });
}

/**
 * As input we will get comment arrays per change, we need to flatten it down and sort by date
 */
function mergeAndSortComments(comments) {
    return [...comments]
        .reduce(flatten, [])
        .sort((one, another) => moment.utc(another.updated) - moment.utc(one.updated));
}

function fetchAllComments(changeId, reviewNumber, subject) {
    return performGerritRequest({}, (comments) => createCommentObjects(comments, reviewNumber, subject), "changes/" + changeId + "/comments");
}

function createCommentsFrom(changes) {
    return changes.map(change => {
        return change.messages.map(message => {
            return {
                subject: change.subject,
                reviewNumber: change._number,
                message: message.message,
                author: message.author.name,
                patchSet: message._revision_number,
                updated: message.date,
                updatedFormatted: moment(message.date).format(DATE_FORMAT)
            }
        });
    }).reduce(flatten, []);
}

function recentActivity(changes) {
    const promises = changes.map(
        change => fetchAllComments(change.id, change._number, change.subject)
    );
    promises.push(createCommentsFrom(changes));
    return Promise.all(promises).then(mergeAndSortComments);
}

module.exports = recentActivity;