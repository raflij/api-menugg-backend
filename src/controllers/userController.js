const UserModel = require('../models/userModel');

class UserController {
    async profile(req, res) {
        const cok = req.userId;
        try {
            // cari user berdasarkan id
            const user = await UserModel.findOne({ attributes: ['email'], where: { id: req.userId } });
            if (!user) {
                return res.status(200).json({ response: false, message: 'Akun tidak ditemukan' });
            }
            return res.status(200).json({ response: true, message: 'success', user: user.email });
        } catch (error) {
            return res.status(200).json({ response: false, message: 'Terjadi kesalahan', error, cok });
        }
    }
}


module.exports = new UserController();