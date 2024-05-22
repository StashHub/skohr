/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  singleQuote: true,
  bracketSameLine: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
