const isNewOrUnread = require('../../../ui/comments/comment-utils').isNewOrUnread;
const groupByKey = require('../../../ui/comments/comment-utils').groupByKey;

describe('isNewOrUnread', () => {
    it('should return true if status is unread', () => {
        const comment = {status: 'Unread'};

        expect(isNewOrUnread(comment)).toBeTruthy();
    });

    it('should return true if status is new', () => {
        const comment = {status: 'New'};

        expect(isNewOrUnread(comment)).toBeTruthy();
    });

    it('should return false if status is old', () => {
        const comment = {status: 'Old'};

        expect(isNewOrUnread(comment)).toBeFalsy();
    });
});

describe('groupByKey', () => {
    const comments = [
        {author: 'Pavol', subject: 'Subject 1', updatedFormatted: '10.04.2017 12:23.03'},
        {author: 'John', subject: 'Subject 1', updatedFormatted: '10.04.2017 12:23.03'},
        {author: 'Pavol', subject: 'Subject 2', updatedFormatted: '11.04.2017 12:23.03'},
        {author: 'Pavol', subject: 'Subject 3', updatedFormatted: '12.04.2017 12:23.03'},
        {author: 'John', subject: 'Subject 3', updatedFormatted: '13.04.2017 12:23.03'},
        {author: 'John', subject: 'Subject 3', updatedFormatted: '13.04.2017 12:23.03'},
        {author: 'John', subject: 'Subject 2', updatedFormatted: '14.04.2017 12:23.03'},
    ];

    it('should mark those comment to be squashed which have same author', () => {
        const squashed = groupByKey(comments, {author: true});

        expect(squashed.map(comment => comment.squash))
            .toEqual([false, false, false, true, false, true, true]);
    });

    it('should mark those comment to be squashed which have same subject', () => {
        const squashed = groupByKey(comments, {subject: true});

        expect(squashed.map(comment => comment.squash))
            .toEqual([false, true, false, false, true, true, false]);
    });

    it('should mark those comment to be squashed which have same subject', () => {
        const squashed = groupByKey(comments, {time: true});

        expect(squashed.map(comment => comment.squash))
            .toEqual([false, true, false, false, false, true, false]);
    });

    it('should mark all comments not to be squashed if grouping is not enabled', () => {
        const squashed = groupByKey(comments, {});

        expect(squashed.map(comment => comment.squash))
            .toEqual([false, false, false, false, false, false, false]);
    });
});