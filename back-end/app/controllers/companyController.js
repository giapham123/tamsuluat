const addresses = require('../models/addressModel');
const company = require('../models/companyModel');
const commentModel = require('../models/commentsModel');
const imageToBase64 = require('image-to-base64');
const fs = require('fs')
const resizeOptimizeImages = require('resize-optimize-images');
const pathToFile = "./thumnail/dsCongty.xlsx"

const ES = require('../../configES')
const syncData = require('../ES/syncDataFromMongoToES')
exports.getCompanyNm = async (req, res) => {
    var result = [];
    var resultCompany = [];
    resultCompany = await company.find().skip((req.body.page - 1) * 10).limit(10)
    result = await commentModel.aggregate([{
        $group: {
            _id: "$companyCd",
            count: {
                $sum: 1
            }
        }
    }])
    var number = 0
    for (let i = 0; i < resultCompany.length; i++) {
        // var base64Image =  await imageToBase64("http://localhost:3000/" + resultCompany[i].image )
    //    var base64Image =  await imageToBase64("http://107.167.68.100:3000/" + resultCompany[i].image )
    //     resultCompany[i].image = base64Image
        for (let j = 0; j < result.length; j++) {
            if (resultCompany[i].companyCd == result[j]._id) {
                number = result[j].count
                break
            } else {
                number = 0
            }
        }
        resultCompany[i].count = number
    }
    res.send(resultCompany);
};
exports.getCompanyNmForSelect = async (req, res) => {
    var result = [];
    result = await company.find()
    res.send(result);
};
exports.getAddressNm = async (req, res) => {
    var result = [];
    result = await addresses.find();
    res.send(result);
};
exports.insertCompany = async (req, res) => {
    var bulk = []
    var XLSX = require('xlsx')
    var workbook = XLSX.readFile(req.files[0].path);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    for (let i = 0; i < xlData.length; i++) {
        var dataInExcel = new company(xlData[i])
        var result = await dataInExcel.save()
    }
    xlData.forEach((doc) => {
        bulk.push({
          index: {
            _index: 'companyss',
          }
        })
  
        let { _id, ...data } = doc;
        bulk.push(data);
      })
    await ES.client.bulk({refresh: true, body: bulk })

    try {
        fs.unlinkSync(pathToFile)
        console.log("Successfully deleted the file.")
      } catch(err) {
        throw err
      }
    res.send(xlData)
}
exports.uploadImages = async (req, res) => {
    // syncData.indexData();
    res.send('done');
};
exports.searchComp = async (req, res) => {
    var result = [];
    var hits = []
    result = await commentModel.aggregate([
        { $group: { _id: "$companyCd", count: { $sum: 1 } } }
    ])
    var a = await ES.client.search({
        index: 'companyss',
        q: req.body.companyCd
    })
    hits = a.hits.hits;
    var number = 0
    for (let i = 0; i < hits.length; i++) {
        // var base64Image =  await imageToBase64("http://localhost:3000/" +  hits[i]._source.image )
    //    var base64Image =  await imageToBase64("http://107.167.68.100:3000/" + hits[i]._source.image )
    //    hits[i]._source.image = base64Image
        for (let j = 0; j < result.length; j++) {
            if (hits[i]._source.companyCd == result[j]._id) {
                number = result[j].count
                break
            } else {
                number = 0
            }
        }
        hits[i]._source.count = number
    }
    res.send(hits)
};