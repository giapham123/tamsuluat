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