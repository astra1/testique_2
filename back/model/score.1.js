const path = require('path');
const dbPath = path.resolve(__dirname, '../db/scores.db');

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, err => {
    if (err) {
        console.log(err);
    }

    console.log('connected');
});

exports.all = function (result) {
    db.all('SELECT * from scores LIMIT 10', [], (err, res) => {
        result(err, res);
    });
};

exports.createScore = function (newScore, result) {
    db.run(
        'INSERT OR IGNORE INTO scores (date, score) VALUES (?,?)',
        [newScore.date, newScore.score],
        function (err, res) {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                console.log(this.lastID);
                result(null, this.lastID);
            }
        },
    );
};

exports.getScoreById = function (scoreId) {
    sql.run('SELECT date, score FROM scores where id = ?', scoreId, function (
        err,
        res,
    ) {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

exports.remove = function (id, result) {
    sql.run('DELETE FROM scores WHERE id = ?', [id]),
        function (err, res) {
            if (err) {
                console.log('error: ', err);
                result(null, err);
            } else {
                result(null, res);
            }
        };
};
