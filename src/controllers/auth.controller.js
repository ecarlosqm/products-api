import User from "../models/user";
import Role from "../models/role"
import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    try {
        const savedUser = await newUser.save();

        console.log(savedUser);

        const token = jwt.sign({ id: savedUser._id, }, config.SECRET, { expiresIn: 86400 })

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        switch (error.code) {
            
            case 11000:
                res.status(405).json({ message: `The ${Object.keys(error.keyPattern)[0]} already exist` });
                break;
            default:
                res.status(405).json({ message: '' });
                break;
        }   

    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate('roles');

    if (!userFound) return res.status(400).json({ message: 'User not found' });

    console.log(userFound);

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) return res.status(401).json({ message: 'Invalid Password' });

    const token = jwt.sign({ id: userFound._id, }, config.SECRET, { expiresIn: 86400 })

    res.json({ token: token });
}