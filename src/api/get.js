// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "../../../middleware/connectToDb";
import COLevel from "../../../models/COLevel";
import NextCors from 'nextjs-cors';

connectToDb();
export default async function handler(req, res) {
  if(req.method!='GET'){
    return res.status(405).json({success:false, msg: req.method+ " method not allowed"});
  }
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const data = await COLevel.find({})
  if(!data){
    return res.status(403).json({success:false, msg:"Data not found"});
  }
  return res.status(200).json({success:true, msg:"Data Found", data});
}
