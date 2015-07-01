// tests/karma.config.js
module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],


    files: [
        '../client/dist/components/angular/*.js',
        '../client/dist/components/angular-mocks/*.js',
        '../client/dist/components/angular-ui-router/*.js',
        '../client/dist/components/angular-animate/*.js',
        '../client/dist/components/lodash/*.js',
        '../client/src/js/app/config.js',
        '../client/src/js/app/filters.js',
        '../client/src/js/app/services.js',
        '../client/src/js/app/models.js',
        '../client/src/js/app/controllers/*.js',
        'unit/**/*.test.js'
    ],

    preprocessors: {
      '../client/src/js/app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    reporters: ['progress', 'growl', 'coverage'],


    port: 9876,

    colors: true,

    browsers: ['PhantomJS'],

    autoWatch: true,
    singleRun: true
  });
};