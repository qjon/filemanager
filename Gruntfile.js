module.exports = function(grunt) {

    var SERVER_PORT = 3000;
    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            options: {
                install: true,
                verbose: true,
                cleanTargetDir: true,
                cleanBowerDir: false,
                layout: 'byComponent'
            },
            dist: {
                options: {
                    targetDir: '<%= pkg.options.client.dist %>/components'
                }
            }
//            ,src: {
//                options: {
//                    targetDir: '<%= pkg.options.client.src %>/components'
//                }
//            }
        },
        complexity: {
            build: {
                src: ['<%= pkg.options.client.src %>/js/app/**/*.js'],
                options: {
                    breakOnErrors: true,
                    errorsOnly: true,
                    cyclomatic: [5, 7, 12],
                    halstead: [10, 13, 20],
                    maintainability: 100,
                    hideComplexFunctions: false
                }
            }
        },
        jade: {
            build: {
                files: {
                    '<%= pkg.options.client.dist %>/templates/': ['<%= pkg.options.client.src %>/js/app/templates/*.jade'],
                    '<%= pkg.options.client.dist %>/': ['<%= pkg.options.client.src %>/../index.jade']
                },
                options: {
//                    basePath: '<%= pkg.options.client.src %>',
                    extension: '.html',
                    client: false,
                    pretty: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['<%= pkg.options.client.src %>/js/app/**/*.js']
        },
        karma: {
            unit: {
                configFile: 'tests/karma.config.js'
            }
        },
        less: {
            dist: {
                options: {
                },
                files: {
                    "<%= pkg.options.client.dist %>/css/main.min.css": "<%= pkg.options.client.src %>/css/main.less"
                }
            }
        },
        express: {
            options: {
                // Override defaults here
                background: true,
                delay: 500
            },
            dev: {
                options: {
                    script: '<%= pkg.options.server.script %>'
                }
            }
        },
        reload: {
            port: 8001,
            liveReload: {},
            proxy: {
                host: 'localhost',
                port: SERVER_PORT // should match server.port config
            }
        },
        symlink: {
//            data_src: {
//                dest: '<%= pkg.options.client.src %>/data',
//                relativeSrc: '../../<%= pkg.options.client.src %>/../data',
//                options: {type: 'dir'}
//            },
            data_dest: {
                dest: '<%= pkg.options.client.dist %>/data',
                relativeSrc: '../../<%= pkg.options.client.src %>/../data',
                options: {type: 'dir'}
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            files: {
                src: [
                    '<%= pkg.options.client.src %>/js/app/app.js',
                    '<%= pkg.options.client.src %>/js/app/config.js',
                    '<%= pkg.options.client.src %>/js/app/filters.js',
                    '<%= pkg.options.client.src %>/js/app/models.js',
                    '<%= pkg.options.client.src %>/js/app/services.js',
                    '<%= pkg.options.client.src %>/js/app/controllers/*.js'
                ],
                dest: '<%= pkg.options.client.dist %>/js/app.min.js'
            }
        },
        watch: {
            options: {
                spawn: false
            },
            files: ['<%= pkg.options.client.src %>/js/app/**/*.js', '<%= pkg.options.client.src %>/js/app/**/*.jade', '<%= pkg.options.client.src %>/css/**', '<%= pkg.options.client.src %>/../index.jade', '<%= pkg.options.client.src %>/data/**/*.json'],
            tasks: ['jshint', 'less', 'uglify', 'jade', 'reload'],
            express: {
                files:  [ '<%= pkg.options.server.src %>/**/*.js' ],
                tasks:  [ 'express' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-symlink');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-jade');


    grunt.registerTask('install', ['bower', 'symlink']);
    // Default task(s).
    grunt.registerTask('build', ['jshint', 'complexity']);
    grunt.registerTask('default', ['less', 'express', 'uglify', 'jade', 'reload', 'watch']);
};