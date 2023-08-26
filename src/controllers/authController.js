require('dotenv').config()
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const requestIp = require('request-ip');

const UserModel = require('../models/userModel');
const ActivityController = require('./activityController')

class AuthController {
    async signup(req, res) {
        const { email, password } = req.body;

        try {
            const existingUser = await UserModel.findOne({
                attributes: ['email'],
                where: {
                    email: email
                },
            });
            if (existingUser) {
                return res.status(200).json({ response: false, message: 'Email sudah terdaftar' });
            } else if (!email) {
                return res.status(200).json({ response: false, message: 'Email harus diisi' });
            } else if (!password) {
                return res.status(200).json({ response: false, message: 'Password harus diisi' });
            } else if (!validator.validate(email)) {
                return res.status(200).json({ response: false, message: 'Email tidak valid' });
            } else if (password.length > 32) {
                return res.status(200).json({ response: false, message: 'Password maksimal 32 karakter' });
            } else if (password.length < 6) {
                return res.status(200).json({ response: false, message: 'Password minimal 6 karakter' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await UserModel.create({
                    email: email, password: hashedPassword,
                });
                res.status(200).json({ response: true, message: 'Akun berhasil dibuat' });
            }
        } catch (error) {
            res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ attributes: ['id', 'email', 'password'], where: { email } });

            if (!user) {
                return res.status(200).json({ response: false, message: 'Email atau password kamu salah' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(200).json({ response: false, message: 'Email atau password kamu salah' });
            }
            const ip_address = requestIp.getClientIp(req);
            const location = await ActivityController.userLocation(ip_address);
            const activity = 'login'
            const message = 'Login from ' + location.stateProv + ', ' + location.countryCode
            const res2 = await ActivityController.saveActivity(email, activity, message, ip_address);
            const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
            res.json({ response: true, message: 'Login berhasil', token });
        } catch (error) {
            res.status(500).json({ response: false, message: 'Terjadi kesalahan', error });
        }
    }
}

module.exports = new AuthController();