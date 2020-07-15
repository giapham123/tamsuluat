var express = require('express');
var router = express.Router();
const multer = require('multer')
const fs = require('fs')

const pathToFile = "dsCongty.xlsx"

const companyController = require('../controllers/companyController');
  
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        var dir = './thumnail'
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        callback(null, dir)
    },
    filename: function(req,file, callback){
        callback(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

var storageImage = multer.diskStorage({
    destination: function(req, file, callback){
        var dir = './thumnail'
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        callback(null, dir)
    },
    filename: function(req,file, callback){
        callback(null, file.originalname)
    }
});
var uploadImage = multer({storage:storageImage}).array('files',4000)

var uploadmulter = upload.array('files',5);
router.post('/uploadImage',uploadImage, companyController.uploadImages);
router.post('/insertCompany',uploadmulter, companyController.insertCompany);
router.post('/getCompany', companyController.getCompanyNm);
router.get('/getCompanyForSelect', companyController.getCompanyNmForSelect);
router.get('/getAddress', companyController.getAddressNm);
router.post('/getCompanyForSearch',companyController.searchComp);

module.exports = router;