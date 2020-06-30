var fs = require('fs');
var express = require('express');
var router = express.Router();
var chain = require('../chain')
/* GET users listing. */
var multer = require('multer')

var upload = multer({ dest: 'uploads/' })

// router.post('/upload', upload.array('file',1), (req, res) => {
// 	// res.json({
// 	// 	file: req.file
// 	// })
// 	res.json({
// 		msg: "上传成功"
// 	})
// });


router.post('/upload', upload.any(), function(req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息

    var des_file = "./uploads/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
                console.log( response );
                res.end( JSON.stringify( response ) );
            }
        });
    });
});


router.post('/new_map', (req, res) => {

    
    name = req.param('name');
    province = req.param('province');
    region = req.param('region');
    filepath = req.param('filepath');
    filename = req.param('filename');
    //0  未申请， 1 申请确认， 2 已确认
    state = 0;

    //Save to the MongoDB

    data = {
        name: name,
        province: province,
        region: region,
        filepath: filepath,
        filename: filename,
    }


    return res.json(data).end();
});







router.get('/test_map', (req, res) => {

    // userId = req.param('id')
    // name = req.param('name')
    // position = req.param('position')
    // path = req.param('path')

    // const {error} = validateBook(req.body);
    // if(error){
    //     return res.status(400).json({msg: error.details[0].message}).end();
    // }

    // const book = {
    //     id: books.length + 1,
    //     name: req.body.name
    // };
    // books.push(book);
    return res.json({msg: "successful!"}).end();
});



module.exports = router;
