import Joi from 'joi'

export default {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Вы должны указать действительный адрес электронной почты',
                'any.required': 'Email является обязательным полем'
            }),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Zа-яА-Я0-9-_]{8,32}$')
            ).required().messages({
                'string.pattern.base': `Предоставленный пароль не соответствует следующим правилам:
                    <br>1. Он должен содержать ТОЛЬКО следующие символы: строчные, прописные буквы, цифры, дефис и подчеркивание.
                    <br>2. Его длина должна быть не менее 8 символов и не более 32 символов`,
                'any.required': 'Пароль является обязательным полем'
            }),
            name: Joi.string().min(2).max(50).required().messages({
                'string.min': 'Имя должно содержать минимум 2 символа',
                'string.max': 'Имя не должно превышать 50 символов',
                'any.required': 'Имя является обязательным полем'
            }),
            phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/).required().messages({
                'string.pattern.base': 'Номер телефона должен содержать только цифры и может начинаться с "+"',
                'any.required': 'Номер телефона является обязательным полем'
            }),
            birth_date: Joi.date().iso().required().messages({
                'date.isoDate': 'Дата рождения должна быть в формате ISO (например, 1990-01-01)',
                'any.required': 'Дата рождения является обязательным полем'
            }),
            gender: Joi.string().valid('male', 'female', 'other').required().messages({
                'any.only': 'Пол должен быть одним из значений: male, female',
                'any.required': 'Пол является обязательным полем'
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: error.message
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: error.message
                    });
                    break;
                case 'name':
                    res.status(400).send({
                        error: error.message
                    });
                    break;
                case 'phone':
                    res.status(400).send({
                        error: error.message
                    });
                    break;
                case 'birth_date':
                    res.status(400).send({
                        error: error.message
                    });
                    break;
                case 'gender':
                    res.status(400).send({
                        error: error.message
                    });
                    break;
                default:
                    res.status(400).send({
                        error: `Неверная регистрационная информация`
                    });
            }
        } else {
            next();
        }
    }
}
