"use strict";

var url = require("url");

module.exports.getAllUsers = function getAllUsers(req, res, next) {
    // User.getAllUsers(req.swagger.params, res, next);
    res.send("manager getAllUsers");
};


module.exports.download = function download(req, res, next) {
const fs = require('fs')
    const name = 'test.zip';
    var file = fs.createReadStream(__dirname + "/" + name);
    var stat = fs.statSync(__dirname + "/" + name);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=name.zip');
    file.pipe(res);

};