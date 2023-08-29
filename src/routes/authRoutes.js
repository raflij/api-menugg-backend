const express = require('express');

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

class Routes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.post('/login', authController.login);
        this.router.post('/signup', authController.signup);
        this.router.get('/profile', authMiddleware.verifyToken, userController.profile);

    }
}

const routes = new Routes().router;

module.exports = routes;