function verificaEmail (userEmail, IdUsuario){

    console.log('email Recebido = '+ userEmail);

    var nodemailer = require('nodemailer');
    var $usuario = '<email>';
    var $senha = '<password>';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });
    
    var $destinatario = userEmail;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Enviando um email pelo Node.js',
        text: `Clique no Link para Verificar: http://localhost:3000/verify/${IdUsuario}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports =  verificaEmail;