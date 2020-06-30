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


router.post('/login', function(req, res, next) {
    
    var userName  = req.param('userName');
    var password  = req.param('password');
    
    if (userName == '619850002' && password == '123456'){
        res.send({status: "OK"});
    }else if (userName == '123456' && password == '123456'){
        res.send({status: "OK"});
    }
    res.send({status: "Error"});
});



router.post('/user-info', function(req, res, next) {
    
    var userName  = req.param('userName');
    let data = {}
    if (userName == '619850002'){
        data = {
            id:     "619850002",
            name:   "张天骏",
            ID_card: "4107xxxxxxxxxxxxx",
            gender:  'male',
            birth_date: "1997.11.08",
            address: "河南省新乡市牧野区解放路760厂家属院",
            phone: "158xxxx1260",
            card_number: "622xxxxxxxxxxxxxxxx",
        };

        res.send({
            info:data,
            status: "OK",
        });

    }else if (userName == '123456'){
        data = {
            id:     "123456",
            name:   "梁博",
            ID_card: "4107xxxxxxxxxxxxx",
            gender:  'female',
            birth_date: "1991.03.25",
            address: "东北",
            phone: "158xxxx1260",
            card_number: "622xxxxxxxxxxxxxxxx",
        };
        res.send({
            info:data,
            status: "OK",
        });
    }
    res.send({
            info: data,
            status: "Error",
        });
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
