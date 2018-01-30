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
app.get('/comments', (req, res) =>
    performGerritRequest({
        status: "open",
        ownerGroup: WORK_GROUP,
        additionalOptions: ["DETAILED_LABELS", "DETAILED_ACCOUNTS", "MESSAGES"]
    }, require('./recent-activity'), "changes/")
        .then((comments) => res.json(comments))
);

app.listen(3000);