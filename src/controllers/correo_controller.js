// const { request, response } = require('express');
// const nodeMailer = require('nodemailer')

// const enviocorreo = (req=request, resp=response) =>{
//     const body = req.body;
  
//     const config = nodeMailer.createTransport({
//       host: 'smtp.gmail.com',
//       post: 587,
//       auth:{
//         user:'',
//         pass:'' 
//       }
//     })
  
//     const opciones = {
//       from: 'Programacion',
//       subject: body.asunto,
//       to:body.email,
//       text:body.mensaje
//     };
  
//     config.sendMail(opciones,function(error,result){
      
//       if (error)return resp.json({ok:false,msg:error});
  
//       return resp.json({
//         ok:true,
//         msg:result
//       })
//     })
//   }
  
//   module.exports = {
//     enviocorreo
//   }