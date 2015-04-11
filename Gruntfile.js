module.exports = function(grunt) {
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        libsdir: 'bower_components',
        watch: {
            scripts: {
                files: [
                    'src/**/*.html',
                    'styles/*.css',
                    'index.html',
                    'Gruntfile.js',
                    'package.json'
                ],
                tasks: ['concat', 'copy'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost',
                livereload: true//,
                //keepalive: true
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        './dist/'
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            distJS: {
                //src: ['src/**/*.js'],
                src: '<%= pkg.files.js%>',
                dest: 'dist/<%= pkg.name %>.js'
            },
            distCSS: {
                src: '<%= pkg.files.css%>',
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            distJS: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.distJS.dest %>']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true, 
                        cwd: 'src',
                        src: '**/*.html',
                        dest : 'dist/views',
                        filter: 'isFile'
                    },
                    {
                        expand: true, 
                        src: ['index.html'], 
                        dest: 'dist'
                    },
                    {
                        src: '<%=  libsdir %>/angular/angular.min.js',
                        dest : 'dist/libs/angular.js'
                    },
                    {
                        src: '<%=  libsdir %>/angular/angular.min.js.map',
                        dest : 'dist/libs/angular.min.js.map'
                    },
                    {
                        src: '<%=  libsdir %>/angular-route/angular-route.min.js',
                        dest : 'dist/libs/angular-route.js'
                    },
                    {
                        src: '<%=  libsdir %>/angular-route/angular-route.min.js.map',
                        dest : 'dist/libs/angular-route.min.js.map'
                    },
                    {
                        src: '<%=  libsdir %>/jquery-2.1.0.min/index.js',
                        dest : 'dist/libs/jquery.js'
                    },
                    {
                        src: '<%=  libsdir %>/ol3css/index.css',
                        dest : 'dist/libs/ol.css'
                    },
                    {
                        src: '<%=  libsdir %>/ol3js/index.js',
                        dest : 'dist/libs/ol.js'
                    },
                    {
                        src: '<%=  libsdir %>/bootstrap/dist/css/bootstrap.min.css',
                        dest : 'dist/libs/bootstrap.css'
                    },
                    {
                        src: '<%=  libsdir %>/bootstrap/dist/js/bootstrap.min.js',
                        dest : 'dist/libs/bootstrap.js'
                    },
                    {
                        expand: true, 
                        cwd: '<%=  libsdir %>/bootstrap/dist/fonts/',
                        src    : ['**'],
                        dest : 'dist/libs/fonts'
                    },
                    {   
                        expand: true, 
                        src: ['views/*'], 
                        dest: 'dist/', 
                        filter: 'isFile'
                    }
                ]
            }
        }/*,
        shell: {
            push: {
                command: function() {
                    grunt.log.writeln('Pushing ' + pkg.name + ' to bluemix');
                    return 'cd dist; cf push '+ pkg.name + ' --no-manifest --no-start -c "NODE_ENV=production node server.js"' ;
                }
            },
            start: {
                command: function() {
                    grunt.log.writeln('Start ' + pkg.name);
                    return 'cf start ' + pkg.name;
                }
            }
        }*/
        /*shell: {
            multiple: {
                command: [
                    'cd bower_components/ol3',
                    'sudo npm install',
                    //'sudo pip install -r requirements.txt'
                    'cat requirements.txt | sudo xargs easy_install' //MAC OS
                ].join('&&')
            }
        }*/
  });

  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  //grunt.loadNpmTasks('grunt-shell');
  //grunt.registerTask('default', ['concat', 'uglify', 'copy', 'shell']);
  grunt.registerTask('default', ['concat', 'copy']);
  grunt.registerTask('bluemix', [
    'build',
    'shell:push',
    'shell:start'
  ]);
  grunt.registerTask('build', function() {
    grunt.task.run([
        'concat', 
        'copy',
        'connect',
        'watch'
        ]);
  });
};