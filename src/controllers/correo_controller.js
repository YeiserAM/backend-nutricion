const { request, response } = require('express');
const nodeMailer = require('nodemailer')

const correoctr = {};

correoctr.enviocorreo = (req=request, resp=response) =>{
    const body = req.body;
  
    const config = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      post: 587,
      auth:{
        user:'ChristianGP0716@gmail.com',
        pass:'Wardelobos07' 
      }
    })
  
    const opciones = {
      from: 'Observacion',
      subject: body.asunto,
      to:body.email,
      text:body.mensaje
    };
  
    config.sendMail(opciones,function(error,result){
      
      if (error)return resp.json({ok:false,msg:error});
  
      return resp.json({
        ok:true,
        msg:result
      })
    })
  }
  
  module.exports = correoctr;