const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('BookSmart API');
});

module.exports = router;