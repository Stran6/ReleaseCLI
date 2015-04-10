var argv = require('yargs').argv;

import VersionBump from "../lib/version-bump.js"

var bump = new VersionBump();
console.log(bump.bump(argv.b, argv.p));