module.exports = function(grunt) {
  'use strict';

  var timestamp = grunt.template.today("yyyymmdd-HHMM");


  // Project configuration.
  grunt.initConfig({

    clean: ['dist/*', 'build/*'],
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/app-<%= globalConfig.timestamp %>.min.css': 'scss/app.scss'
        }
      },
      dev: {
        files: {
          'app/css/app.css': 'scss/app.scss'
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'app/css/*.css',
            'app/views/**/*.html',
            'app/views/**/*.js',
            'app/components/**/*.js',
            'app/components/**/*.html'
          ]
        },
        options: {
          proxy: "localhost:8000",
          watchTask: true
        }
      }
    },
    targethtml: {
      dist: {
        files: {
          'dist/index.html': 'app/index.html',
          'dist/login.html': 'app/login.html'
        },
        options: {
          curlyTags: {
            version: '<%= globalConfig.timestamp %>'
          }
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/bower_components',
          src: ['**'],
          dest: 'dist/bower_components'
        }, {
          expand: true,
          cwd: 'app/manage_components',
          src: ['**'],
          dest: 'dist/manage_components'
        }, {
          expand: true,
          cwd: 'app',
          src: ['**/*.html', '**/*.json', 'css/**', 'img/**', 'plugins/*.js', 'components/util/sha1.js', '!index.html', '!login.html'],
          dest: 'dist'
        }]
      }
    },
    compress: {
      main: {
        options: {
          mode: 'tar',
          archive: 'build/dist.tar'
        },
        expand: true,
        cwd: 'dist/',
        src: ['**/*']
      }
    },
    watch: {
      // gruntfile: {
      //   files: ['<%= jshint.gruntfile %>'],
      //   tasks: ['jshint:gruntfile']
      // },
      css: {
        files: 'scss/*.scss',
        tasks: ['devcss']
      },
      scripts: {
        files: ['app/**/*.js', 'app/*.js'],
        tasks: ['buildjs']
      }
      // shared: {
      //   files: ['<%= globalConfig.sharedUiPath %>/components/**', '<%= globalConfig.sharedUiPath %>/scss/**'],
      //   tasks: ['sync:shared']
      // }
    },
    sync: {
      shared: {
        files: [{
          cwd: '<%= globalConfig.sharedUiPath %>/components/',
          src: ['**'],
          dest: 'app/manage_components/manage-ui-shared/components'
        }, {
          cwd: '<%= globalConfig.sharedUiPath %>/scss/',
          src: ['**'],
          dest: 'app/manage_components/manage-ui-shared/scss'
        }],
        verbose: true,
        updateAndDelete: true
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        browsers: ['Chrome']
      },
      ci: {
        browsers: ['PhantomJS'],
        autoWatch: false,
        singleRun: true
      },
      gunit: {
        browsers: ['PhantomJS'],
        autoWatch: true
      }
    }
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadTasks('grunt');

  // Runs jshint and unit tests
  grunt.registerTask('test', ['jshint', 'karma']);


  // Runs the full build.  Final output is dist.tar in the 'build' directory.
  grunt.registerTask('build', ['clean', 'buildcss', 'buildjs', 'targethtml']);

};