'use strict';

const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');
const { PDFDocument } = require('pdf-lib');

const esclient = new Client({ node: 'http://localhost:9200' });

const indexPdfPage = function (id, page, pageNumber) { // all ES functions should later go in its own service
  esclient.index({
    index: 'vue-upload-test',
    id: id,
    body: {
      data: page,
      page: pageNumber
    },
    pipeline: 'attachment'
  });
};

exports.indexPdfPages = async function (file) { // TODO: file names
  const buffer = await fs.promises.readFile(file);
  const pdfDoc = await PDFDocument.load(buffer); // will this work?
  const length = pdfDoc.getPages().length;

  for (let i=0; i < length; ++i) {
    const currentPageDoc = await PDFDocument.create();
    const [currentPage] = await currentPageDoc.copyPages(pdfDoc, [i]);
    currentPageDoc.addPage(currentPage);
    const currentPageDocBytes = await currentPageDoc.saveAsBase64();

    indexPdfPage(`GET-NAME-FROM-PARAMS-${i+1}`, currentPageDocBytes, i+1);
  }
};
