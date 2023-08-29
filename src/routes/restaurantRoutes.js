const express = require('express');

const restaurantController = require("../controllers/restaurantController")
const authMiddleware = require("../middlewares/authMiddleware");

class Routes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.post('/restaurant/save', authMiddleware.verifyToken, restaurantController.saveInfo)
        this.router.get('/restaurant/data', authMiddleware.verifyToken, restaurantController.data)

    }
}

const routes = new Routes().router;

module.exports = routes;