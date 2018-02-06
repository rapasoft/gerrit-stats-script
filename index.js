const performGerritRequest = require('./gerrrit-request');
const express = require('express');
const WORK_GROUP = require('./constants').WORK_GROUP;

let app = express();

app.use('/ui', express.static('ui'));

// TODO: Super secret functionality that is hidden for now
// app.get('/stats', (req, res) =>
//     performGerritRequest({
//         status: "merged",
//         ownerGroup: WORK_GROUP,
//         additionalOptions: ["DETAILED_LABELS", "DETAILED_ACCOUNTS"]
//     }, require('./reviewer-report'), "changes/")
//         .then(stats => res.json(stats))
// );
let fetchComments = (req, res) =>
    performGerritRequest({
        status: "open",
        ownerGroup: WORK_GROUP,
        additionalOptions: ["DETAILED_LABELS", "DETAILED_ACCOUNTS", "MESSAGES"]
    }, require('./recent-activity'), "changes/")
        .then((comments) => res.json(comments));

const data = require('./test/random-data');
if (process.argv[2] === 'test') {
    fetchComments = (req, res) => {
        data.unshift({
            subject: 'feat: A completely new feature!',
            reviewNumber: 478,
            message: 'Yqoqbgfi ucyhj vhw 5.',
            author: 'Uvkcp Jqng Pgudø',
            patchSet: 1,
            updated: new Date(),
            updatedFormatted: require('moment')(new Date()).format(require('./constants').DATE_FORMAT)
        });
        return res.json(data);
    }
}

app.get('/comments', fetchComments);

app.listen(3000);