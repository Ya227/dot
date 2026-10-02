const pkg = require("./package");

module.exports = {
  //apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    devServer: {
      historyApiFallback: true, 
      hot: true,
      port: 8099,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    }
  },
  api: {
    port: 3001,
    script: './stubs/api/index.js', 
  },

  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "dot.main": "/dot",
  },
  features: {
    "dot": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "dot.api": "/api",
  },
  // Укажите путь к кастомному HTML-шаблону для prom-режима или оставьте undefined
  // htmlTemplatePath: undefined,
};
