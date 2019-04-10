const { InvalidData } = require('./errors');
const { buildSchema } = require('./helpers');

module.exports = (model) => {
  const schema = buildSchema(model);

  return (req, res, next) => {
    const errors = [];

    Object.entries(schema).forEach(([key, { types, required, validate }]) => {
      const value = req.params[key];
      const valueType = typeof value;
      const isTypeValid = types.some(type => type === valueType);

      if (!required && !value) {
        return;
      }

      if (!value) {
        errors.push(`${key} is required`);

        return;
      }

      if (!isTypeValid) {
        errors.push(`${key} is expected to be a ${types.join('/')}`);

        return;
      }

      if (validate && !validate(value)) {
        errors.push(`${key} is invalid`);
      }
    });

    if (!errors.length) {
      return next();
    }

    throw new InvalidData(errors.join(', '));
  };
};
