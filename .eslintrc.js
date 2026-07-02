module.exports = {
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Erreurs potentielles
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-constant-condition': 'error',
    
    // Bonnes pratiques
    'eqeqeq': ['error', 'always'],
    'strict': ['error', 'global'],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    
    // Style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    
    // Node.js et Express
    'require-await': 'error',
    'no-path-concat': 'error',
    'no-process-exit': 'warn',
    
    // Accessibilité (RGAA)
    'jsx-a11y/alt-text': 'off', // Désactivé car nous n'utilisons pas JSX
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};
