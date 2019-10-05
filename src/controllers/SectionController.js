// index() = metodo que retorna uma listagem de seções
// show() = serve quando quero listar um única seção
// store() = serve quando quero criar uma seção
// update() = serve quando eu quero alterar uma seção
// detroy() = serve quando eu quero remover uma seção

const User = require("../models/User");

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email }); // se ele encontrar um usuário com esse e-mail ele vai chamar.

        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}