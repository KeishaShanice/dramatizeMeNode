const express = require('express');
const router = express.Router();
const PORT = process.env.PORT || 3001;

router.get('/', (req, res) => {
    res.json({
        'All Dramas': `http://localhost:${PORT}/api/dramas`,
        'All Genres': `http://localhost:${PORT}/api/genre_table`,
        'All Actors': `http://localhost:${PORT}/api/actor_table`,
        'All Directors': `http://localhost:${PORT}/api/director_table`,
        'Contact': `http://localhost:${PORT}/api/contact`,
        'Pages': `http://localhost:${PORT}/api/pages`
    });
});


router.use('/dramas', require('./api/dramaRoutes'));
router.use('/genre_table', require('./api/genreRoutes'));
router.use('/actor_table', require('./api/actorRoutes'));
router.use('/director_table', require('./api/directorRoutes'));
router.use('/contact', require('./api/contactRoutes'));
router.use('/pages', require('./api/pageRoutes'));


module.exports = router;
