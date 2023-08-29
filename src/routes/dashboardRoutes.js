const express = require('express');

const activityController = require("../controllers/activityController")
const authMiddleware = require("../middlewares/authMiddleware");

class Routes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/dashboard', authMiddleware.verifyToken, activityController.recentActivity)

    }
}

const routes = new Routes().router;

module.exports = routes;