/*global module:false*/
module.exports = function(grunt) {

    function addSlash() {
        return [].join.call(arguments, '/');
    }

    var Path = {
        dev: 'dev',
        dist: 'dist',
        test: 'test',
        name: {
          js: 'js',
          scss: 'scss',
          css: 'css'
        }
    };

    Path.js = {
        dev: addSlash(Path.dev , Path.name.js, 'ictlab'),
        dist: addSlash(Path.dist , Path.name.js, 'ictlab'),
        test: addSlash(Path.dev , Path.name.js , Path.test)
    };

    Path.scss = {
        src: addSlash(Path.dev, Path.name.scss, 'ictlab'),
        dev: addSlash(Path.dev, Path.name.css, 'ictlab'),
        dist: addSlash(Path.dist, Path.name.css, 'ictlab')
    };

    Path.css = {
        dev: Path.scss.dev,
        dist: Path.scss.dist
    };

    Path.wp = {
        theme: 'dev/theme',
        themeRemote: '../wpictlab/wp-content/themes/ictlab',
        pluginRemote: '../wpictlab/wp-content/plugins'
    };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= pkg.license %> */\n',
    Path: Path,
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= Path.js.dev %>/**/*.js'],
        dest: '<%= Path.js.dist + "/" + pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= Path.js.dist + "/" + pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        devel: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dev_test: {
        src: [ '<%= Path.js.dev %>/**/*.js', '<%= Path.js.test %>/**/*.js', '!**/vendor/**/*.js']
      },
      dist_test: {
        src: [ '<%= Path.js.dist %>/**/*.min.js']
      }
    },
    jasmine: {
      dev: {
        src: '<%= Path.js.dev %>/**/*.js',
        options: {
          specs: '<%= Path.js.test %>/**/*_spec.js',
          keepRunner: true
        }
      }
    },
    sass: {
      dev: {
        options: {
          debugInfo: true
        },
        files: [{
          expand: true,
          cwd: '<%= Path.scss.src %>',
          src: ['**/*.scss'],
          dest: '<%= Path.scss.dev %>',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          banner: '<%= banner %>',
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '<%= Path.scss.src %>',
          src: ['**/*.scss'],
          dest: '<%= Path.scss.dist %>',
          ext: '.min.css'
        }]
      }
    },
    autoprefixer: {
      dev: {
        src: '<%= Path.css.dev %>/*.css'
      },
      dist: {
        expand: true,
        flatten: true,
        src: '<%= Path.css.dev %>/**/*.css',
        dest: '<%= Path.css.dist %>'
      }
    },
    wiredep: {
        js: {
            src: ['<%= Path.dev %>/html/index.html'],
            ignore: ''
        }
    },
    copy: {
        html: {
            src: '<%= Path.dev %>/html/index.html',
            dest: '<%= Path.dist %>/index.html',
            options: {
                process: function(content) {
                    return content.replace(/(\.\.\/\.\.\/bower_components)|(\.\.\/js)|(\.\.\/css)|(\.js)|(\.css)/g, function(match) {
                        if (match.indexOf('bower_components') !== -1) { return 'bower_components'; }
                        if (match.indexOf('js') !== -1) {
                            if (match.indexOf('.js') !== -1) { return '.min.js'; }
                            return 'js';
                        }
                        if (match.indexOf('css') !== -1) {
                            if (match.indexOf('.css') !== -1) { return '.min.css'; }
                            return 'css';
                        }
                    });
                }
            }
        },
        themePHP: {
            expand: true,
            cwd: '<%= Path.dev %>/php',
            src: '**/*.php',
            dest: '<%= Path.wp.theme %>'
        },
        themeStyles: {
            expand: true,
            flatten: true,
            src: ['<%= Path.css.dev %>/**/*.css'],
            dest: '<%= Path.wp.theme %>/css/<%= pkg.name %>'
        },
        themeJS: {
            expand: true,
            flatten: true,
            src: '<%= Path.js.dev %>/**/*.js',
            dest: '<%= Path.wp.theme %>/js'
        },
        themeIMG: {
            expand: true,
            cwd: '<%= Path.dev %>/img',
            src: '**/*.{jpg,png,gif}',
            dest: '<%= Path.wp.theme %>/img'
        },
        theme: {
            expand: true,
            cwd: '<%= Path.wp.theme %>',
            src: '**/*.*',
            dest: '<%= Path.wp.themeRemote %>'
        }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: [ '<%= Path.js.dev %>/**/*.js', '<%= Path.js.test %>/**/*_spec.js'],
        tasks: ['jshint:dev_test', 'jasmine', 'themePrep']
      },
      sass: {
        files: '<%= Path.scss.src %>/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer:dev', 'themePrep']
      },
      htmlPHP: {
        files: '<%= Path.dev %>/**/*{.php,.html}',
        tasks: ['themePrep']
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('themePrep', ['copy:themeIMG', 'copy:themeStyles', 'copy:themeJS', 'copy:themePHP', 'copy:theme']);

};
