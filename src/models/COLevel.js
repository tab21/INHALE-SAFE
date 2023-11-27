import mongoose from 'mongoose'
const COLevel  = new mongoose.Schema({
    co_ppm:String
},{timestamps:true})

mongoose.models={};
export default mongoose.model('COLevel', COLevel);