import {simpleHash} from "../util";
import showNotification from "../messages/message-notification";
import {isNewOrUnread} from "./comment-utils";

export default function prepare(commentsFromBackend, cachedComments) {
    const newCache = commentsFromBackend
        .map((comment) => ({...comment, hash: simpleHash(JSON.stringify(comment))}))
        .map((comment) => {
                if (!cachedComments.map((comment) => comment.hash).includes(comment.hash)) {
                    return {...comment, status: 'New'};
                } else {
                    const cachedComment = cachedComments.find(cached => cached.hash === comment.hash);
                    if (cachedComment && isNewOrUnread(cachedComment)) {
                        return {...cachedComment, status: 'Unread'};
                    }
                    return {...comment, status: 'Old'};
                }
            }
        );

    document.title = `(${newCache.filter((comment) => comment.status !== 'Old').length}) Gerrit Comments`;

    if (cachedComments.length > 0) {
        displayNotificationForNewComments(newCache);
    }

    return newCache;
}

function displayNotificationForNewComments(newCache) {
    newCache
        .filter(comment => comment.status === 'New')
        .forEach(comment => showNotification(comment))
}