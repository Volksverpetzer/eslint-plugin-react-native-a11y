const defaultLanguageOptions = {
  ecmaVersion: 2015,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

export default function parserOptionsMapper({
  code,
  errors,
  options = [],
  output = null,
  languageOptions = {},
}) {
  return {
    code,
    errors,
    options,
    output,
    languageOptions: {
      ...defaultLanguageOptions,
      ...languageOptions,
    },
  };
}
