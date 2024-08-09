const validator = require('@hapi/joi')

const schemas = {
    fullName:validator.string().required().min(6).regex(/^[A-Z][a-z]+(?: [A-Z][a-z]+)*(?:-[A-Z][a-z]+)?$/).trim().messages({
        'string.pattern.base': 'Name must start with an uppercase letter and contain only alphabetic characters, spaces, or hyphens.',
        'string.required': 'Full name is required.',
        'string.empty':'Full name is not allowed to be empty',
        'string.min':'Full name must be above six (6) alphabets'
      }),
    age:validator.number().min(18).integer().required().messages({
        'number.base': 'Age must be a number',
        'number.min':'Age must not be below 18 years',
        'any.required': 'Age is required.'
      }),
    maritalStatus:validator.string().required().valid('single','married','divorced','widow','widower').messages({
        'string.pattern.base': 'Marital status must be in alphabets.',
        'any.required': 'Marital Status is required.',
        'any.only': 'Marital status must be one of [single, married, divorced, widow, widower] case sensitive.'
      }),
    address:validator.string().required().regex(/^[a-zA-Z0-9-,\. ]+$/).messages({
        'string.pattern.base': 'Address can contain only alphabetic characters, numbers, spaces, or punctuations.',
        'any.required': 'Address is required.',
        'string.empty': 'Address cannot be empty.'
      }),
    gender:validator.string().required().valid('male','female').messages({
        'string.pattern.base': 'Gender can either be male or female',
        'any.required': 'Gender is required.',
        'any.only': 'Gender must be one of [male or female] case sensitive.'
      }),
    academicQualification:validator.string().required().regex(/^[a-zA-Z0-9-,\. ]+$/).messages({
        'string.pattern.base': 'Academic Qualification can contain only alphabetic characters, numbers, spaces, or punctuations.',
        'any.required': 'Academic Qualification is required.',
        'string.empty': 'Academic Qualification cannot be empty.'
      }),
    stateOfOrigin:validator.string().required().regex(/^[a-zA-Z]+$/).messages({
        'string.pattern.base':'State of origin must be only alphabets.',
        'string.required': 'State of origin is required.',
        'string.empty': 'State of origin cannot be empty.'})
}

const staffValidator = (validateAllFields = false) => {
  return async (req, res, next) => {
      const keysToValidate = {};

      if (validateAllFields) {
          Object.keys(schemas).forEach((key) => {
              keysToValidate[key] = schemas[key].required();
          });
      } else {
          Object.keys(req.body).forEach((key) => {
              if (schemas[key]) {
                  keysToValidate[key] = schemas[key];
              }
          });
      }
      const schema = validator.object(keysToValidate);

      const { error } = schema.validate(req.body);

      if (error) {
          return res.status(400).json(error.details[0].message);
      } else {
          return next();
      }
  };
}

module.exports = staffValidator