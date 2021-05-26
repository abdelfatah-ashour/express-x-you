const Joi = require('joi');

function signup(data) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(55).required({
      'string.base': `"username" must be text`,
      'string.empty': `"username" must be an empty field`,
      'string.min': `"username" should have a minimum length of {#limit}`,
      'string.required': `"username" a required field`,
    }),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(16).required().label('Password'),
    cPassword: Joi.string()
      .min(8)
      .max(16)
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });
  return schema.validate(data);
}

function login(data) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(16).required(),
  });

  return schema.validate(data);
}

module.exports = {
  signup,
  login,
};
