import React from 'react';
import {simpleHash} from "../util";

const URL_REGEXP = /https:\/\/[^\s]+/;

function annotateMessage(message, wordToAnnotate, annotationStyle, options = {}) {
    return [
        message.substring(0, message.indexOf(wordToAnnotate)),
        options.isUrl ? <a href={wordToAnnotate} target="_blank">{wordToAnnotate}</a> :
            <span style={annotationStyle}>{wordToAnnotate}</span>,
        message.substring(message.indexOf(wordToAnnotate) + wordToAnnotate.length, message.length)
    ];
}

export default function annotate(messageParts) {
    return messageParts.map(part => {
        if (typeof part === 'string') {
            const annotatedParts = annotatePart(part);
            return annotate(annotatedParts);
        }
        return part;
    });
}

function annotatePart(message) {
    const url = message.match(URL_REGEXP);
    if (url) {
        return annotateMessage(message, url[0], {textDecoration: 'underline'}, {isUrl: true});
    }
    else if (message.includes('Verified+1')) {
        return annotateMessage(message, 'Verified+1', {fontWeight: 'bold', color: 'green', fontStyle: 'italic'})
    }
    else if (message.includes('Code-Review+1')) {
        return annotateMessage(message, 'Code-Review+1', {fontWeight: 'bold', color: 'green'})
    }
    else if (message.includes('Code-Review+2')) {
        return annotateMessage(message, 'Code-Review+2', {fontWeight: 'bold', color: 'green'})
    }
    else if (message.includes('Code-Review-1')) {
        return annotateMessage(message, 'Code-Review-1', {fontWeight: 'bold', color: 'red'})
    }
    else if (message.includes('Verified-1')) {
        return annotateMessage(message, 'Verified-1', {fontWeight: 'bold', color: 'red', fontStyle: 'italic'})
    }
    else {
        return [<span key={simpleHash(message)}>{message}</span>];
    }
}