"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield db_1.User.findOne({ email });
    if (user) {
        res.status(403).json({ message: 'User already exist' });
    }
    else {
        const newUser = new db_1.User({ username, email, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, middleware_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, middleware_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'logged in Successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid email or password' });
    }
}));
router.get('/me', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield db_1.User.findOne({ _id: userId });
    if (user) {
        res.json({ username: user.userName });
    }
    else {
        res.status(403).json({ message: 'User not logged in' });
    }
}));
router.post('/logout', middleware_1.authenticateJwt, (req, res) => {
    res.json({ message: 'logged out sucessfully' });
});
exports.default = router;
