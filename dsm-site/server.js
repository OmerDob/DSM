'use strict';

const path = require('path');
const express = require('express');

var dsmSite = express();

dsmSite.use(express.static(path.join(__dirname, 'bin')));

dsmSite.listen(8080, () => {
    console.log('local dev server up and running on http://localhost:8080');
});