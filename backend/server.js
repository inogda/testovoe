import express from 'express';
import data from './data.js';

//import cors from 'cors';
//const cors = require('cors');
const app = express();

//app.use( cors() );



app.get('/rest/working', (req, res) => {
    res.send(data.working.workingItem);
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});