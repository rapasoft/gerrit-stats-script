function buildCommentLink(comment) {
    let url = `https://source.esec.bbsas.no/#/c/${comment.reviewNumber}/${comment.patchSet}/`;
    if (comment.file && comment.line) {
        url += `${comment.file}@${comment.line}`;
    }
    return url;
}

function simpleHash(string) {
    let ret, i;
    for (ret = 0, i = 0; i < string.length; i++) {
        ret = (31 * ret + string.charCodeAt(i)) << 0;
    }
    return ret;
}

function intToRGB(i) {
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function calculateBackgroundFor(author) {
    return '#' + intToRGB(simpleHash(author));
}

function initialsOf(author) {
    return author.split(" ").map(word => word.charAt(0)).reduce((a, b) => a + b);
}