const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/connect');
const router = require('./routes/index')
const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // for log routes
app.disable('x-power-by');

// router
app.get('/', (req, res) => {
    res.status(201).json('Root Get Request');
});

//* /api routes from Router
app.use('/api', router)

// ** Make Sure DB is connecting
connect()
    .then(() => {
        try {
            app.listen(port, () => console.log(`Server is listening at port:${port}`));
        } catch (err) {
            console.log('Cannot connect DB');
        }
    })
    .catch((err) => console.log('Invalid DB connection' + err.message));
