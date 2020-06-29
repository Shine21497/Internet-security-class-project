var express = require('express');
var router = express.Router();
var chain = require('../chain')
/* GET users listing. */
router.get('/udemo1', function(req, res, next) {
    chain.Add("map1", "mapmap")
    res.send('respond with a resource user demo 1');
});

router.get('/udemo2', function(req, res, next) {
    res.send('respond with a resource' + chain.First("map1"));
});

//使用POST方法添加书籍
router.post('/userpost', (req, res) => {
    const {error} = validateBook(req.body);
    if(error){
        return res.status(400).json({msg: error.details[0].message}).end();
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.json(book).end();
});

module.exports = router;
