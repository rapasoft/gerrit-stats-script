const buildCommentLink = require('../../ui/util').buildCommentLink;
const simpleHash = require('../../ui/util').simpleHash;
const calculateBackgroundFor = require('../../ui/util').calculateBackgroundFor;

describe('buildCommentLink', () => {
    test('should build comment link for line comment', () => {
        const comment = {
            reviewNumber: 123,
            patchSet: 2,
            file: 'src/main/java/Test.java',
            line: 23
        };

        expect(buildCommentLink(comment).endsWith('/#/c/123/2/src/main/java/Test.java@23')).toBeTruthy();
    });

    test('should build comment link for general comment', () => {
        const comment = {
            reviewNumber: 123,
            patchSet: 2
        };

        expect(buildCommentLink(comment).endsWith('/#/c/123/2/')).toBeTruthy();
    });
});

describe('simpleHash', () => {
    test('should create simple hash out of JSON representation of object', () => {
        const objectToTest = JSON.stringify({
            key: 'value',
            another: 2
        });

        expect(simpleHash(objectToTest)).toBe(-815682835);
    });
});

describe('calculateBackgroundFor', () => {
    test('should create RGB hex encoded representation of string', () => {
        const value = 'Pavol Rajzak';

        expect(calculateBackgroundFor(value)).toBe('#EE5507');
    });
});
