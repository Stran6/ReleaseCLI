import yargs from 'yargs'

import VersionBump from "../lib/version-bump.js"

yargs.usage('bin/release <args>').option('v', {describe: 'Version Number (x.x.x) [Required]'}).option('t', {describe: 'Bump Type (major/minor/patch/pre/premajor/preminor/prepatch) [Required]'}).option('p', {describe: 'PreID (alpha, beta, ...) [Only use with pre- bump types]'}).example('bin/release -v 1.2.3 -t major', '|   Performs major version bump on 1.2.3');
    
if(yargs.argv.help)
{
    yargs.showHelp();
}
else
{
    yargs.demand(['v', 't']);
    console.log(VersionBump(yargs.argv.v, yargs.argv.t, yargs.argv.p));
}