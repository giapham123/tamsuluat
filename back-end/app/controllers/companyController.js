const addresses = require('../models/addressModel');
const company = require('../models/companyModel');

exports.getCompanyNm = async (req, res) => {
    var result = [];
    result = await company.find();
    res.send(result);
};
exports.getAddressNm = async (req, res) => {
    var result = [];
    result = await addresses.find();
    res.send(result);
};
exports.insertCompany = async (req,res) => {
        var XLSX = require('xlsx')
        var workbook = XLSX.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        res.send(xlData[2])
        for(let i = 0; i< xlData.length; i++){
            var dataInExcel = new company(xlData[i])
            var result = await dataInExcel.save()
        }
}