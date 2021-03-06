function verificaEmail (userEmail, IdUsuario){

    console.log("Email Enviado = "+ userEmail);

    const nodemailer = require("nodemailer");
    let $usuario = "<usuario>";
    let $senha = "<senha>";
    let $destinatario = userEmail;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: $usuario,
            pass: $senha
        }
    });
    
    let mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: "Verificação de Email, cadastro no sistema ABE",
        text: `Clique no Link para Verificar: https://api-pessoa-node.herokuapp.com/verify/${IdUsuario}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Email enviado: " + info.response);
        }
    });
}

module.exports =  verificaEmail;
