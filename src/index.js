const express = require('express');

const bodyParser = require('body-parser');
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const sequelize = require('./database/sequelize')

class App {
    constructor() {
        this.app = express();
        this.port = 3001;
        this.message = "server started on port " + this.port;

        this.setup();
    }

    async setup() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use("/api", authRouter);
        this.app.use("/api", dashboardRouter);
        this.app.use("/api", restaurantRouter);

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

const { app, port, message } = new App();

app.listen(port, () => {
    console.log(message)
})