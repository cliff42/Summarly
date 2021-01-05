'use strict';

const multer = require('multer');
const express = require('express');
const asyncHandler = require('express-async-handler');
const UploadController = require('./upload.controller');

const router = express.Router();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf'];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file');
    error.code = 'INCORRECT_FILETYPE';
    return cb(error, false)
  }
  cb(null, true);
};
  
const upload = multer({
  dest: './uploads',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
});

router.post('/', upload.single('file'), asyncHandler(UploadController.uploadPdf));

module.exports = router;
