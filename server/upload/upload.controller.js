'use strict';

const UploadModel = require('./upload.model');

exports.uploadPdf = async function (req, res) {
  try {
    await UploadModel.indexPdfPages(req.file.path);
  } catch (error) {
    console.log('Error uploading PDF: ' + error);
    return res.status(400).send('Failed to upload PDF');
  }

  res.send(201);
};

exports.deletePdf = async function (req, res) {
  try {
    await UploadModel.deletePdfPages(req.params.id);
  } catch (error) {
    console.log('Error deleting PDF: ' + error);
    return res.status(404).send('PDF not found'); 
    // ES does not check for existence so it won't error but the other database should
  }

  res.end();
};
