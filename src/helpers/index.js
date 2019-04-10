const toArray = value => Array.isArray(value)
  ? value
  : [value];

module.exports.buildSchema = (model) => {
  const schema = {};

  Object.entries(model).forEach(([key, value]) => {
    switch (typeof value) {
      case 'function':
        schema[key] = {
          types: [typeof value()],
          required: true,
        };

        break;
      case 'object':
        schema[key] = {
          types: toArray(value.type).map(type => typeof type()),
          required: value.required,
          validate: value.validate,
          transform: value.transform,
        };

        break;
    }
  });

  return schema;
};
