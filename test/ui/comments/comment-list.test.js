import React from 'react';
import {mount} from 'enzyme';

import testData from '../../random-data';
import CommentList from '../../../ui/comments/comment-list';

describe('CommentList', () => {
    describe('that is not grouped', () => {
        let commentList;
        const props = {comments: [testData[0], testData[1]], groupBy: {}};

        beforeEach(() => {
            commentList = mount(<CommentList {...props} />);
        });

        it('should render list with size of comments', () => {
            expect(commentList.children().length).toBe(props.comments.length);
        });

        it('should contain subject for each comment', () => {
            const subjects = commentList.find('.subject');
            expect(subjects.length).toBe(props.comments.length);
            expect(subjects.at(0).text().includes(props.comments[0].subject)).toBeTruthy();
            expect(subjects.at(1).text().includes(props.comments[1].subject)).toBeTruthy();
        });

        it('should contain subheader with time', () => {
            const subheaders = commentList.find('.subheader');
            expect(subheaders.length).toBe(props.comments.length);
            expect(subheaders.at(0).text().includes(props.comments[0].updatedFormatted)).toBeTruthy();
            expect(subheaders.at(1).text().includes(props.comments[1].updatedFormatted)).toBeTruthy();
        });

    });
});