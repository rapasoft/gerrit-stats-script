function createListOfComments(comments) {
    return comments
        .map(comment =>
            `<div class="w3-panel w3-white w3-card w3-display-container" 
                  style="background: ${comment.status === 'New' ? '#b1ffa2' : 'none'} !important">
                <div class="subject">
                    <a href="${buildCommentLink(comment)}">${comment.subject}</a>
                </div>
                <div class="subheader">                    
                    <div class="time">${comment.updatedFormatted}</div>
                    <span>(${comment.status})</span>
                </div>
                <div class="comment-body">
                    <div class="author">
                        <div class="author-badge" style="background: ${calculateBackgroundFor(comment.author)}">
                            ${initialsOf(comment.author)}
                        </div>
                    </div>
                    <div class="message">${comment.message}</div>
                </div>
             </div>`)
        .reduce((a, b) => a + b);
}