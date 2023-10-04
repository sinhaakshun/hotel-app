const User = require('../db/userModel');
const Hotel = require('../db/hotelModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'THIS-IS-A-SECRET-KEY';

exports.register = async (req, res) => {
    let userData = await User.findOne({email : req.body.email});
    if(userData){
        return res.send({ msg : 'user already registered'})
    }

    console.log(req.body.email)

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({email : req.body.email, password : hashedPassword, role : req.body.role});

    await newUser.save();

    return res.json({msg : 'user registration successful'})
}

exports.login = async(req, res) => {
    let userData = await User.findOne({email: req.body.email});

    if(!userData){
        return res.send({msg : 'user not registered'})
    }
    const {email, password, role} = req.body;

    const validPwd = await bcrypt.compare(password, userData.password);

    if(!validPwd){
        return res.send({msg : 'password invalid'})
    }
    const token = jwt.sign({userData}, SECRET_KEY);
    return res.json({token})
}


exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    //console.log('verifyToken', token)

    if(!token){
        return res.send({msg : 'token missing'})
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) =>{
        if(err){
            return res.send({msg : 'token not valid'})
        }
        req.user = decoded;
        next();
    })
}


exports.addData = async (req, res ) => {
    const {hotelName, hotelKind } = req.body;
    const hotel = new Hotel ({hotelName, hotelKind});

    await hotel.save();
    return res.send({msg : 'data added successfully'})
}

exports.getAll = async( req, res) => {
    const hotels = await Hotel.find();
    return res.json({hotels})
}

exports.getHotelById = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    if(!hotel){
        return res.send({msg : 'hotel not found'})
    }
    return res.json(hotel)
}

exports.update = async (req, res) => {
    const {hotelName, hotelKind} = req.body;
    const updated = await Hotel.findByIdAndUpdate(req.params.id, {hotelName, hotelKind});
    if(!updated){
        return res.send({msg : 'hotel not found'})
    }
    res.json({msg : 'hotel updated'})
}

exports.delete = async (req, res) => {
    const deleted = await Hotel.findByIdAndRemove(req.params.id);
    if(!deleted){
        return res.send({msg : 'hotel not found'})
    }
    res.json({ msg : 'hotel deleted' })
}
