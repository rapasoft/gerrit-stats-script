import React from 'react';

const URL_REGEXP = /https:\/\/[^\s]+/;

function annotateMessage(message, wordToAnnotate, annotationStyle, options = {}) {
    return <div>
        {message.substring(0, message.indexOf(wordToAnnotate))}
        {options.isUrl && <a href={wordToAnnotate} target="_blank">{wordToAnnotate}</a>}
        {!options.isUrl && <span style={annotationStyle}>{wordToAnnotate}</span>}
        {message.substring(message.indexOf(wordToAnnotate) + wordToAnnotate.length, message.length)}
    </div>;
}

export default function annotate(message) {
    let annotatedMessage = <div>{message}</div>;
    if (message.includes('Verified+1')) {
        annotatedMessage = annotateMessage(message, 'Verified+1', {
            fontWeight: 'bold',
            color: 'green',
            fontStyle: 'italic'
        })
    }
    const url = message.match(URL_REGEXP);
    if (url) {
        annotatedMessage = annotateMessage(message, url[0], {textDecoration: 'underline'}, {isUrl: true});
    }
    if (message.includes('Code-Review+1')) {
        annotatedMessage = annotateMessage(message, 'Code-Review+1', {fontWeight: 'bold', color: 'green'})
    }
    if (message.includes('Code-Review+2')) {
        annotatedMessage = annotateMessage(message, 'Code-Review+2', {fontWeight: 'bold', color: 'green'})
    }
    if (message.includes('Code-Review-1')) {
        annotatedMessage = annotateMessage(message, 'Code-Review-1', {fontWeight: 'bold', color: 'red'})
    }
    return annotatedMessage;
}