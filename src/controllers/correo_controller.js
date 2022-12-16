const { request, response } = require('express');
const nodeMailer = require('nodemailer')

const correoctr = {};

correoctr.enviocorreo = (req=request, resp=response) =>{
    const body = req.body;
    console.log(req.body);
  
    const config = nodeMailer.createTransport({
      host: 'smtp-mail.outlook.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers:'SSLv3'
      },
      auth:{
        user:'christianquispe@upeu.edu.pe',
        pass:'Realmadridcyj07' 
      }
    })
  
    const opciones = {
      from: 'christianquispe@upeu.edu.pe',
      subject: body.asunto,
      to:body.email,
      text:body.mensaje
    };
    console.log(opciones);
    
    config.sendMail(opciones,function(error,result){
      
      if (error)return resp.json({ok:false,msg:error});
  
      return resp.json({
        ok:true,
        msg:result
      })
    })
  }
  
  module.exports = correoctr;