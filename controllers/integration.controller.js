const integrationModel = require("../models/integration.model");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}--${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
}).single('image');


exports.add = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to upload the image.' });
            }

            const { name, email, dob, phonenumber } = req.body;
            const imageFile = req.file;
            let imagePath = null;

            if (imageFile) {
                imagePath = imageFile.path;
            }

            const add = new integrationModel({
                name,
                email,
                phonenumber,
                dob,
                image: imagePath || null,
            });

            const savedUser = await add.save();

            res.status(201).json({ data: savedUser });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};



// exports.add = async (req, res) => {
//     try {
//         const { name, email, dob, phonenumber } = req.body;
//         let add;

//         add = new integrationModel({
//             name,
//             email,
//             phonenumber,
//             dob,

//         });

//         const savedUser = await add.save();


//         res.status(201).json({ data: savedUser })

//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ error: err.message });
//     }

// }
exports.all_integration = async (req, res) => {
    try {
        const allData = await integrationModel.find({}).sort({ name: 1 });
        console.log(allData, "aaaaa")
        res.status(200).json(allData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

