// import mongoose from 'mongoose';
// var ObjectId = mongoose.Types.ObjectId;
// var client = mongoose.connection;

// client.getUsers = (callback)=> {
//     const users = client.collection('users');
//     users.find({},).toArray((err,res)=>{
//         callback(res, err);
//     });
   
// }
// client.deleteUsers = (user, callback)=> {
//     const users = client.collection('users');
//     users.deleteOne({_id:ObjectId(user.id)}, function(err, result){   
//         if(err){ 
//             console.log(err);
//             users.find({},).toArray((err,res)=>{
//                 callback(res, err);
//             });
//             return;
//         }     
//     });
//     users.find({},).toArray((err,res)=>{
//         callback(res, err);
//     });
// }
// client.findUsers = (ip, callback)=> {
//     const users = client.collection('users');
//     users.find({ip: ip}).toArray(function(err, result){   
//         callback(result, err);
//     });
// }
// client.editUsers = (user, callback)=> {
//     const users = client.collection('users');
//     users.findOneAndUpdate({_id:ObjectId(user.id)}, {$set:{name:user.name, ip:user.ip}},{ returnOriginal: false }, function(err, result){   
//         if(err){ 
//             console.log(err);
//             result.toArray((err,res)=>{
//                 callback(res, err);
//             });
//             return;
//         }  
//         users.find({},).toArray((err,res)=>{
//             callback(res, err);
//         });   
//     });
   
// }
// client.addUser = (user, callback)=> {
//     const users = client.collection('users');
//     users.insertOne(user, function(err, result){
//         if(err){ 
//             console.log(err);
//             users.find({},).toArray((err,res)=>{
//                 callback(res, err);
//             });
//             return;
//         }
//         users.find({},).toArray((err,res)=>{
//             callback(res, err);
//         });
//     });
//     //
// }
// export default client;
