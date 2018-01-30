module.exports = {
    GERRIT_URL: require('./configuration').gerritUrl,
    DATE_FORMAT: "DD.MM.YYYY HH:mm:ss",
    WORK_GROUP: require('./configuration').group,
    sum: (next, acc) => next + acc,
    concat: (a, b) => a.concat(b)
};