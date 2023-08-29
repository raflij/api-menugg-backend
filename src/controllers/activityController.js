const ActivityModel = require('../models/activityModel');
const UserModel = require('../models/userModel');
const axios = require('axios');

class ActivityController {
    async userLocation(ip_address) {
        try {
            const res = await axios.get('https://api.db-ip.com/v2/free/'+ip_address);
            return res.data;
        } catch (error) {
            return error;
        }

    }
    async saveActivity(email, activity, message, ip_address) {
        try {
            const res = await ActivityModel.create({
                email: email,
                activityType: activity,
                activityMessage: message,
                ipAddress: ip_address
            })
            return res;
        } catch (error) {
            return error;
        }
    }
    async recentActivity(req, res) {
        try {
            const user = await UserModel.findOne({ attributes: ['email'], where: { id: req.userId } });
            if (!user) {
                return res.status(200).json({ response: false, message: 'Access denied' });
            }
            const resolt = await ActivityModel.findAll({
                attributes: ['activityType', 'activityMessage', 'ipAddress', 'createdAt'],
                where: {
                    email: user.email,
                },
                order: [['createdAt', 'DESC']],
                limit: 5,
            })
            return res.status(200).json({ response: true, message: 'recentActivity...', activity: resolt });
        } catch (error) {
            return res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
        }
    }
}

module.exports = new ActivityController();