import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const userSchema = new Schema({
    names: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
module.exports = mongoose.model("User", userSchema);