module.exports = function(config) {
  config.set({

    basePath: './',

    preprocessors: {
      'app/**/**/*.html': ['ng-html2js'],
      'app/views/**/!(*_test).js': ['coverage'],
      'app/components/**/!(*_test).js': ['coverage']
    },

    reporters: ['dots', 'coverage'],

    files: [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/lodash/lodash.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
      'app/manage_components/manage-ui-shared/components/**/*.js',
      'app/components/**/*.js',
      'app/views/**/*.js',
      'app/**/**/*.html'
    ],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'partials'
    },

    coverageReporter: {
      // specify a common output directory
      dir: 'build/coverage/',
      reporters: [
        // reporters not supporting the `file` property
        {
          type: 'html',
          subdir: 'report'
        }
      ]
    },
    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};