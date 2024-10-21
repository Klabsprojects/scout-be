const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

const bcrypt = require('bcryptjs');

let file = "login.controller";
let Jkey = process.env.JWT_SECRET_KEY;

 
exports.register = async (req, res) => {
    try {
        console.log('try login register');
        console.log(req.body);
        let username; 
        let password; 
        let loginAs;
        let email; 
        let loginId; 
        let inputQuery;
        username = req.body.username;
        password = req.body.password;
        loginAs = req.body.loginAs;
        email = req.body.email;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(password);
    console.log(hashedPassword);
    inputQuery = { username, email, password: hashedPassword, loginAs: req.body.loginAs };

    console.log('inputQuery', inputQuery);
    const login = new db.login(inputQuery);
    await login.save();
    res.status(201).json({ message: 'Login registered successfully' });
    } catch (error) {
        console.log('catch', error);
        if(error.name == 'SequelizeUniqueConstraintError'){
            res.status(500).json({ error: 'Email already registered' });
        }
        else
            res.status(500).json({ error: 'Login Registration failed' });
    }
    }

    exports.login = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);

    let query = {};
        query.where = {email: req.body.email};
        console.log('query ', query);
       let user;
       if (req.body.email && req.body.password) {
           console.log('if');
           user = await commonService.findOne(db.login, query);
           console.log(user);
       }
    console.log(user);
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
        console.log('line88');
    return res.status(401).json({ error: 'Authentication failed' });
    }

    let jwt_input = {
        email: req.query.email,
        password: req.query.password
    }
    const expire = process.env.EXPIRE;
    const token = await jwt.createToken(jwt_input, expire);
    const output = {
        data: user,
        token: token,
    }
    console.log('output : ', output);
    res.status(200).json({output});
    } catch (error) {
        console.log('catch');
    res.status(500).json({ error: 'Login failed' });
    }
    }
