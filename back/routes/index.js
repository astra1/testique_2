var express = require('express');
var router = express.Router();

var score_controller = require('../controllers/score-controller');

router.get('/', function(req, res, next) {
    return res.render('index', { title: 'SnakeREST' });
});

router
    .route('/scores/')
    .get(score_controller.list_all_scores)
    .post(score_controller.create_score);

router
    .route('/score/:id')
    .get(score_controller.read_score)
    .put(score_controller.update_score)
    .delete(score_controller.delete_score);

module.exports = router;
