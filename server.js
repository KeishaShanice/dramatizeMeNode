const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express()
.use(helmet())
.use(cors())
.use(express.json());

const router = require('./app/routes/router');
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
});