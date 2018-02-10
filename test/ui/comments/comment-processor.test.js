import prepare from '../../../ui/comments/comment-processor';
import {simpleHash} from "../../../ui/util";

const comments = require('../../../test/random-data');

jest.mock('../../../ui/messages/notification', () => {
    return jest.fn().mockImplementation(() => {
        return {onClick: (link) => console.log(link)};
    });
});

describe('prepare', () => {
    describe('when application does not have any comments in cache', () => {
        let numberOfNewComments;

        beforeEach(() => {
            const prepared = prepare(comments, []);

            numberOfNewComments = prepared
                .filter(comment => comment.status === 'New')
                .length;
        });

        it('should mark all comments as new', () => {
            expect(numberOfNewComments).toBe(comments.length);
        });

        it('should display number of new comments in title', () => {
            expect(document.title).toBe(
                `(${numberOfNewComments}) Gerrit Comments`
            )
        });
    });

    describe('when application does have comments in cache', () => {
        let prepared;
        let cachedComments;

        beforeEach(() => {
            cachedComments = comments
                .map(comment => ({...comment, hash: simpleHash(JSON.stringify(comment)), status: 'Old'}));

            const newlyAddedComment = {subject: 'Some feature', message: 'Some comment'};

            prepared = prepare([...comments, newlyAddedComment], cachedComments);
        });

        it('should mark last added comments as new', () => {
            expect(prepared[prepared.length - 1].status).toBe('New');
            expect(prepared[prepared.length - 1].subject).toBe('Some feature');
        });

        it('should increase cache size by one', () => {
            expect(prepared.length).toBe(cachedComments.length + 1);
        });

        it('should mark only one comment as new', () => {
            expect(prepared.filter(comment => comment.status === 'New').length).toBe(1);
        });
    });

    describe('when application has new or unread comments in cache', () => {
        let prepared;
        let cachedComments;

        beforeEach(() => {
            cachedComments = comments
                .map(comment => ({...comment, hash: simpleHash(JSON.stringify(comment)), status: 'Old'}));

            cachedComments[0].status = 'New';
            cachedComments[1].status = 'Unread';

            const newlyAddedComment = {subject: 'Some feature', message: 'Some comment'};

            prepared = prepare([...comments, newlyAddedComment], cachedComments);
        });

        it('should mark those comments as unread', () => {
            expect(prepared.filter(comment => comment.status === 'Unread').length).toBe(2);
        });

        it('should mark newly added comments as new', () => {
            expect(prepared.filter(comment => comment.status === 'New').length).toBe(1);
        });

        it('should set the document title to total amount of new and unread messages', () => {
            expect(document.title).toBe(
                `(3) Gerrit Comments`
            )
        });
    });
});