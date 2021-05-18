const express = require('express');
const router = express.Router();
const { pageDao: dao } = require('../../daos/dao');

router.get('/', (req, res) => {
    dao.findAll(res, dao.table);
});

router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id);
});

router.get('/title/:title', (req, res) => {
    dao.findByTitle(res, dao.table, req.params.title);
});

router.post('/create', (req, res) => {
    dao.create(req, res);
});

router.patch('/update/:id', (req, res) => {
    dao.update(req, res);
});

module.exports = router;