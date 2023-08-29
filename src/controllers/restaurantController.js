const RestaurantModel = require('../models/restaurantModel.js');
const UserModel = require('../models/userModel');

class RestaurantController {
    async saveInfo(req, res) {
        const { restaurantName, phoneNumber, description, location, googleMapLink, imageUrl, email } = req.body;
        try {
            const user = await UserModel.findOne({ attributes: ['email'], where: { email } });
            if (!user) {
                return res.status(200).json({ response: false, message: 'Access denied' });
            }
            if (!restaurantName) {
                return res.status(200).json({ response: false, message: 'Nama restoran / cafe harus diisi' });
            }
            if (!location) {
                return res.status(200).json({ response: false, message: 'Alamat harus diisi' });
            }
            if (phoneNumber && phoneNumber.length < 9) {
                return res.status(200).json({ response: false, message: 'Nomor telepon tidak valid' });
            }
            if (restaurantName && restaurantName.length > 64) {
                return res.status(200).json({ response: false, message: 'Nama restoran / cafe tidak boleh lebih dari 64 karakter' });
            }
            if (description && description.length > 150) {
                return res.status(200).json({ response: false, message: 'Deskripsi atau kata kunci tidak boleh lebih dari 150 karakter' });
            }
            if (location && location.length > 150) {
                return res.status(200).json({ response: false, message: 'Alamat tidak boleh lebih dari 150 karakter' });
            }
            if (googleMapLink && googleMapLink.length > 250) {
                return res.status(200).json({ response: false, message: 'Alamat tidak boleh lebih dari 250 karakter' });
            }
            const checkExists = await RestaurantModel.findOne({ attributes: ['id'], where: { email } });
            const restaurantInfo = {
                email: email,
                restaurantName: restaurantName,
                phoneNumber: phoneNumber,
                description: description,
                location: location,
                googleMapLink: googleMapLink,
                imageUrl: imageUrl
            };
            if (!checkExists) {
                await RestaurantModel.create(restaurantInfo);

            }
            if (checkExists) {
                await RestaurantModel.update(restaurantInfo, {
                    where: { email: email }
                });
            }
            res.status(200).json({ response: true, message: 'Informasi restoran / cafe berhasil disimpan' });
        } catch (error) {
            res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
        }
    }

    async data(req, res) {
        try {
            const user = await UserModel.findOne({ attributes: ['email'], where: { id: req.userId } });
            if (!user) {
                return res.status(200).json({ response: false, message: 'Access denied' });
            }
            const getInfo = await RestaurantModel.findOne({
                attributes: ['restaurantName', 'phoneNumber', 'description', 'location', 'googleMapLink', 'imageUrl'],
                where: {
                    email: user.email,
                },
            })
            if (getInfo) {

                return res.status(200).json({ response: true, message: 'restaurantInfo...', info: getInfo });
            }
        } catch (error) {
            return res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
        }
    }
}

module.exports = new RestaurantController();