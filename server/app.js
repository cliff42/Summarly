const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

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
    fileSize: 500000
  }
});

// app.use(express.static(path.join(__dirname, '../app/dist/')));

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../app/dist/index.html'));
// });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});
  
app.use((err, req, res, next) => {
    if (err.code === 'INCORRECT_FILETYPE') {
      res.status(422).json({ error: 'Only pdfs are allowed' });
      return;
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(422).json({ error: 'Max file size is 500KB' });
      return;
    }
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});