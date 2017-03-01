'use strict';

var fs = require('fs');
var path = require('path');

var capstoneJsDir = path.join(__dirname, 'capstone.js');
var subgruntFile = path.join(capstoneJsDir, 'Gruntfile.js');
var capstoneDir = path.join(capstoneJsDir, 'capstone');
var capstoneCMakeList = path.join(capstoneDir, 'CMakeLists.txt');

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    exec: {
      init_capstone_js: {
        cmd: 'npm install',
        cwd: capstoneJsDir
      },
      run_subgrunt: {
        cmd: 'grunt build:x86',
        cwd: capstoneJsDir
      }
    }
  });

  grunt.registerTask('check', function () {
    if (!process.env['EMSCRIPTEN'])
      throw new Error('EMSCRIPTEN environment is not initialized. Run `source EMSDK_ROOT/emsdk_env.sh`');
    try {
      fs.lstatSync(subgruntFile);
      fs.lstatSync(capstoneCMakeList);
    } catch (e) {
      throw new Error('capstone.js grunt is not found. Run `git submodule update --init --recursive`');
    }
  });

  grunt.registerTask('install', function () {
    grunt.file.mkdir('lib');
    grunt.file.copy(path.join(capstoneJsDir, 'dist', 'capstone-x86.min.js'), 'lib/capstone-x86.min.js');
    grunt.file.copy(path.join(capstoneDir, 'LICENSE.txt'), './LICENSE.capstone');
  });

  grunt.registerTask('build', ['check', 'exec:init_capstone_js', 'exec:run_subgrunt']);
};
