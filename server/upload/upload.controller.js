'use strict';

const UploadModel = require('./upload.model');

exports.uploadPdf = async function (req, res) {
  try {
    await UploadModel.indexPdfPages(req.file.path);
  } catch (error) {
    console.log(error);
    return res.status(400).send('Failed to upload PDF');
  }

  res.send(201);
};
