const buildCommentLink = require('../../ui/util').buildCommentLink;
const simpleHash = require('../../ui/util').simpleHash;
const calculateBackgroundFor = require('../../ui/util').calculateBackgroundFor;
const initialsOf = require('../../ui/util').initialsOf;

describe('buildCommentLink', () => {
    it('should build comment link for line comment', () => {
        const comment = {
            reviewNumber: 123,
            patchSet: 2,
            file: 'src/main/java/Test.java',
            line: 23
        };

        expect(buildCommentLink(comment).endsWith('/#/c/123/2/src/main/java/Test.java@23')).toBeTruthy();
    });

    it('should build comment link for general comment', () => {
        const comment = {
            reviewNumber: 123,
            patchSet: 2
        };

        expect(buildCommentLink(comment).endsWith('/#/c/123/2/')).toBeTruthy();
    });
});

describe('simpleHash', () => {
    it('should create simple hash out of JSON representation of object', () => {
        const objectToTest = JSON.stringify({
            key: 'value',
            another: 2
        });

        expect(simpleHash(objectToTest)).toBe(-815682835);
    });
});

describe('calculateBackgroundFor', () => {
    it('should create RGB hex encoded representation of string', () => {
        const value = 'Pavol Rajzak';

        expect(calculateBackgroundFor(value)).toBe('#EE5507');
    });
});

describe('initialsOf', () => {
    it('should create single initial out of single word', () => {
        expect(initialsOf('Pavol')).toBe('P');
    });

    it('should create double initial out of two words', () => {
        expect(initialsOf('Pavol Rajzak')).toBe('PR');
    });
});
