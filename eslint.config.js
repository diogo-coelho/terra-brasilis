module.exports = {
	root: true,
	env: {
	  node: true
	},
	parserOptions: {
	  parser: '@typescript-eslint/parser',
	  sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: [
	  'eslint:recommended',
	  'plugin:@typescript-eslint/eslint-recommended',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:prettier/recommended'
	],
	rules: { 
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-explicit-any": "off"
	},
	globals: {
	  "NodeJS": true
	},
}