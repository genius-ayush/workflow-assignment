"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// schemas
const userSchema = new mongoose_1.default.Schema({
    userName: String,
    email: String,
    password: String,
    todos: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'todo' }]
});
const todoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    status: String,
    Priority: String,
    deadline: Date
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Todo = mongoose_1.default.model('Todo', todoSchema);
