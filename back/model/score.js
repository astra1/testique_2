// const sql = require('./dbconnection');
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/scores.db');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.log(err);
    }
    console.log('connected');
    // db.run('CREATE TABLE scores');
});

exports.all = function(cb) {
    db.all('Select * from scores', [], (err, res) => {
        cb(err, res);
    });
};

exports.createScore = function(newScore, result) {
    db.run(
        'INSERT OR IGNORE INTO scores (date, score) VALUES (?,?)',
        [newScore.date, newScore.score],
        function(err, res) {
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

exports.getScoreById = function(scoreId) {
    sql.run('SELECT date, score FROM scores where id = ?', scoreId, function(
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

exports.remove = function(id, result) {
    sql.run('DELETE FROM scores WHERE id = ?', [id]),
        function(err, res) {
            if (err) {
                console.log('error: ', err);
                result(null, err);
            } else {
                result(null, res);
            }
        };
};
