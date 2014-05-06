// tests/karma.config.js
module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],


    files: [
      '../client/components/angular/*.js',
      '../client/components/angular-route/*.js',
      '../client/components/angular-mocks/*.js',
      '../client/components/lodash/*.js',
      '../client/src/js/app/app.js',
      '../client/src/js/app/filters.js',
      '../client/src/js/app/services.js',
      '../client/src/js/app/models.js',
      '../client/src/js/app/controllers.js',
      'unit/**/*.test.js'
    ],

    preprocessors: {
      '../../client/js/src/app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    port: 9876,

    colors: true,

    browsers: ['PhantomJS'],

    autoWatch: true,
    singleRun: false
  });
};