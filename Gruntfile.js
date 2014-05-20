module.exports = function(grunt) {

    var SERVER_PORT = 3000;
    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: '<%= pkg.options.client.src %>/../components',
                    install: true,
                    verbose: true,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    layout: 'byComponent'
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
            templates: {
                dest: '<%= pkg.options.client.dist %>/templates',
                relativeSrc: '../../<%= pkg.options.client.src %>/js/app/templates',
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
            files: ['<%= pkg.options.client.src %>/js/app/**/*.js', '<%= pkg.options.client.src %>/js/app/**/*.html', '<%= pkg.options.client.src %>/css/**', '<%= pkg.options.client.src %>/../index.html', '<%= pkg.options.client.src %>/data/**/*.json'],
            tasks: ['jshint', 'less', 'uglify', 'reload'],
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


    grunt.registerTask('install', ['bower:install']);
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'less', 'express', 'uglify', 'symlink', 'reload', 'watch']);
};