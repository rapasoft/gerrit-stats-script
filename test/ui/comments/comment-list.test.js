import React from 'react';
import {shallow, mount, render} from 'enzyme';

import testData from '../../random-data';
import CommentList from '../../../ui/comments/comment-list';

describe('CommentList', () => {
    let commentList;
    const props = {comments: [testData[0], testData[1]], groupBy: {}};

    beforeEach(() => {
        commentList = render(<CommentList {...props} />);
    });

    it('should render list with size of comments', () => {
        console.log(commentList.find('.w3-panel'));
        expect(commentList.find('.w3-panel')._root.length).toBe(props.comments.length);
    });
});