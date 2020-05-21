const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000



app.listen(port, () => {
    console.log('Server is listening on port: ' + port)
})