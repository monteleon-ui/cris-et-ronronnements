module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions'],
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          minifyFontValues: { removeQuotes: false },
          minifySelectors: true,
        },
      ],
    })
  ]
};
