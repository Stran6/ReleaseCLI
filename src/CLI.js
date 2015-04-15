import yargs from 'yargs';
import VersionBump from "../lib/version-bump.js";
import fsp from 'fs-promise';
import path from 'path';
import pkg from '../package.json';
import {exec} from 'child-process-promise'

yargs.usage('bin/release <command> <options>')
    .command('bump', 'Updates the version of the program using the specified options.')
    .options({
    'type': {alias: 't', describe: 'Bump Type (major/minor/patch/pre/premajor/preminor/prepatch)'},
    'preid': {alias: 'p', describe: 'PreID (alpha, beta, ...) [Only use with pre- bump types]'}})
    .nargs('type', 1)
    .nargs('preid', 1)
    .example('bin/release bump -t major', '|    Updates major version (Ex. 1.2.3 -> 2.0.0)')
    .demand('type')
    .help('help').alias('help', 'h')
    .showHelpOnFail(false, "Use --help or -h for options.");
    
if(yargs.argv._ == "bump") {
    let newVersion = VersionBump(pkg.version, yargs.argv.type, yargs.argv.preid);
    pkg.version = newVersion;
    
    fsp.writeFile(file('package.json'), JSON.stringify(pkg, null, "  "));
    
    executeShellCommand('git add package.json')
    .then(function() {
        executeShellCommand('git commit -m "Release v' + newVersion + '"')
            .then(function() {
            executeShellCommand('git tag ' + pkg.name + 'v' + newVersion)
                .then(function() {
                executeShellCommand('git push --tags')
            })
        })
    })
    
    executeShellCommand('echo npm publish');
}

function file() {
    let args = [].slice.call(arguments);
    args.unshift(__dirname + '\\..\\');
    return path.join.apply(path, args);
}

function executeShellCommand(command) {
    return exec(command)
        .then(function (result) {
        let stdout = result.stdout;
        let stderr = result.stderr;
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    })
    .fail(function (err) {
        console.error('ERROR: ', err);
    })
//    .progress(function (childProcess) {
//        console.log('childProcess.pid: ', childProcess.pid);
//    }); 
}