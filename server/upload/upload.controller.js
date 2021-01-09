'use strict';

const UploadModel = require('./upload.model');

exports.uploadPdf = async function (req, res) {
  try {
    await UploadModel.indexPdfPages(req.file.buffer, req.params.id);
  } catch (error) {
    console.log('Error uploading PDF: ' + error);
    return res.status(400).send('Failed to upload PDF');
  }

  res.sendStatus(201);
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

exports.getPdfNames = async function (req, res) {
  try {
    let names = await UploadModel.getPdfNames();
    res.json(names);
  } catch (error) {
    console.log('Error getting PDF Names: ' + error);
    return res.status(404).send('Failed to get PDF names'); 
  }
}
