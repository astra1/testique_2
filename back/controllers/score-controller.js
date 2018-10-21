const db = require('../models');

exports.list_all_scores = function (req, res) {
    db.Score.findAll()
        .then((records) => res.send(records))
        .catch((e) => {
            res.send(e);
        });
};

exports.create_score = function (req, res) {
    if (!req.body) {
        return;
    }

    let date = new Date(req.body.date);

    const new_score = {
        date: new Date(date),
        score: parseInt(req.body.score) >= 0 ? req.body.score : 0,
    };

    // handle null error
    if (new_score.score < 0) {
        res.status(400).send({
            error: true,
            message: 'Score is less then 0',
        });
        return;
    }

    db.Score.create(new_score)
        .then(record => res.send(record))
        .catch(e => res.status(400).send(e))
};

exports.read_score = function (req, res) {
    const id = parseInt(req.params.id);
    db.Score.findByPk(id)
        .then(record => res.send(record))
        .catch(e => res.status(400).send(e))
};

exports.update_score = function (req, res) {
    const id = parseInt(res.body.id);
    db.Score.findByPk(id)
        .then(record => {
            const { score, date } = req.body;
            record.update({ score, date })
                .then(() => res.send(record))
                .catch((e) => res.status(400).send(e));
        })
};

exports.delete_score = function (req, res) {
    const id = parseInt(req.params.id);
    db.Score.findByPk(id)
        .then(record => record.destroy())
        .then(() => res.send({ id }))
        .catch((e) => res.status(400).send(e));
};
