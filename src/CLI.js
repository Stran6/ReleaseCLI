import yargs from 'yargs';
import VersionBump from "../lib/version-bump.js";
import fsp from 'fs-promise';
import path from 'path';
import pkg from '../package.json';

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
    
if(yargs.argv._ == "bump")
{
    pkg.version = VersionBump(pkg.version, yargs.argv.type, yargs.argv.preid);
    
    fsp.writeFile(file('package.json'), JSON.stringify(pkg, null, "  "));
}

function file() {
    let args = [].slice.call(arguments);
    args.unshift(__dirname + '\\..\\');
    return path.join.apply(path, args);
}