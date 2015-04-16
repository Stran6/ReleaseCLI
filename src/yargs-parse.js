import yargs from 'yargs';

export default function parseArgs(args) {
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
    
    return yargs.parse(args);
}
