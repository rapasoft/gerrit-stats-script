import {buildCommentLink} from '../util';
import BrowserNotification from './notification';

function getIconBasedOnContent(comment) {
    if (comment.message.includes('Verified+1') || comment.message.includes('Code-Review+1')) {
        return 'img/done_black_96x96.png';
    } else if (comment.message.includes('Code-Review+2')) {
        return 'img/done_all_black_144x144.png';
    } else if (comment.message.includes('Code-Review-1') || comment.message.includes('Verified-1')) {
        return 'img/error_outline_black_192x192.png';
    }
    return 'img/open_in_new_black_108x108.png';
}

export default function showNotification(comment) {
    const options = {
        body: comment.author + '@' + comment.updatedFormatted + '\n' + comment.message,
        icon: getIconBasedOnContent(comment)
    };
    const notification = new BrowserNotification(comment.subject, options);
    notification.onclick = () => window.open(buildCommentLink(comment));
}