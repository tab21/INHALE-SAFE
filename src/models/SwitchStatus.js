import mongoose from 'mongoose'
const SwitchStatus  = new mongoose.Schema({
    status:String
},{timestamps:true})

mongoose.models={};
export default mongoose.model('SwitchStatus', SwitchStatus);