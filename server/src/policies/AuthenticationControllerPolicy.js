import Joi from 'joi'

export default {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Zа-яА-Я0-9]{8,32}$')
            )
        });

        const { error } = schema.validate(req.body)
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Вы должны указать действительный адрес электронной почты'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `Предоставленный пароль не соответствует следующим правилам:
              <br>
              1. Он должен содержать ТОЛЬКО следующие символы: строчные, прописные буквы, цифры.
              <br>
              2. Его длина должна быть не менее 8 символов и не более 32 символов
            `
                    })
                    break
                default:
                    res.status(400).send({
                        error: `Неверная регистрационная информация`
                    })
            }
            
        }else{
            next()
        }
    }
}