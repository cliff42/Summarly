const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../app/dist/')));

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../app/dist/index.html'));
// });

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});