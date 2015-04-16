import VersionBump from "../lib/version-bump.js";
import fsp from 'fs-promise';
import path from 'path';
import pkg from '../package.json';
import {exec} from 'child-process-promise';
import yargsParse from '../lib/yargs-parse';


if(process.argv > 2) {
    let argv = yargsParse(process.argv);

    if(argv._[2] == "bump") {
        versionRelease(type, preid);
        npmPublish();
    }
}

export function versionRelease(type, preid) {
        let newVersion = VersionBump(pkg.version, type, preid);
        pkg.version = newVersion;

        return fsp.writeFile('package.json', JSON.stringify(pkg, null, "  "))
            .then(() => exec('git add package.json'))
            .then(() => exec(`git commit -m "Release v${newVersion}"`))
            .then(() => exec(`git tag ${pkg.name} v${newVersion}`))
            .then(() => exec('git push --tags'))
            .catch(error => {
            console.Error('ERROR: ', error);
            process.exit(1);
        });
}
    
function npmPublish() {
    return exec('echo npm publish');
}