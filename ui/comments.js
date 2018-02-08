import PropTypes from 'prop-types';

export const commentPropTypes = {
    // Required attributes
    subject: PropTypes.string.isRequired,
    reviewNumber: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    patchSet: PropTypes.number.isRequired,
    updated: PropTypes.string.isRequired,
    updatedFormatted: PropTypes.string.isRequired,
    // Optional attributes - usually connected to line review
    file: PropTypes.string,
    line: PropTypes.number
};

export function isNewOrUnread(comment) {
    return (comment.status === 'Unread' || comment.status === 'New');
}

export function groupByKey(comments, by) {
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

    return comments;
}