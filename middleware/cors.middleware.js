function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://cadastroabe.netlify.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports=cors;