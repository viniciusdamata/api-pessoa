//Exemplo de middleware
//Um middleware tem acesso aos objetos de request e response de uma requesição
const logger = (req, res, next)=>{
    console.log(`${req.protocol}://${req.get("host")}${req.url}`)
    next();
}
module.exports=logger;