'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const uploadRoutes = require('./upload/upload.router');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const uploadsFolder = './uploads';

let fileList = [];

// app.use(express.static(path.join(__dirname, '../app/dist/')));

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../app/dist/index.html'));
// });

app.use('/upload', uploadRoutes);
  
app.use((err, req, res, next) => {
    if (err.code === 'INCORRECT_FILETYPE') {
      res.status(422).json({ error: 'Only pdfs are allowed' });
      return;
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(422).json({ error: 'Max file size is 500KB' });
      return;
    } 
    // else if (err.code === 'NO_FILE') {
    //   res.status(422).json({ error: 'Please Select a File' });
    //   return;
    // }
});

app.get('/get-files', (req, res) => {
    fs.readdir(uploadsFolder, (err, files) => {
        files.forEach(file => {
            if (file != '.DS_Store' && !fileList.includes(file)) {
                fileList.push(file);
            }
        });
    });
    console.log(fileList);
    res.json(fileList);
})

app.listen(port, () => {
    console.log(`Server listening on port::${port}`);
});
