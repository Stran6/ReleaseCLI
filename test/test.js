import VersionBump from '../src/version-bump';
import semver from 'semver';
import yargsParse from '../src/yargs-parse';
import pkg from '../package.json';
import {versionRelease} from '../src/CLI';


describe('YARGS Parsing', function() {
    it('Parse Bump & Type(major)', function() {
        let argv = yargsParse(['bump', '-t', 'major']);
        assert.equal(argv._[0], "bump");
        assert.equal(argv.type, "major");
    })
    it('Parse Preid(alpha)', function() {
        let argv = yargsParse(["bump", "-t", "major", "-p", "alpha"]);
        assert.equal(argv.preid, "alpha");
    })
})
    
describe('Version Bumping', function() {
    describe('Major', function() {
        let major = VersionBump('1.2.3', "major");
        
        it('Valid Version', function() {
            assert(semver.valid(major));
        })
        it('Greater Version', function() {
            assert(semver.gt(major, '1.2.3'));
        })
        it('Correct Version', function() {
            assert.equal(major, '2.0.0');
        })
    })
        
    describe('Minor', function() {
        let minor = VersionBump('1.2.3', "minor");
        
        it('Valid Version', function() {
            assert(semver.valid(minor));
        })
        it('Greater Version', function() {
            assert(semver.gt(minor, '1.2.3'));
        })
        it('Correct Version', function() {
            assert.equal(minor, '1.3.0');
        })
    })
                     
    describe('Patch', function() {
        let patch = VersionBump('1.2.3', "patch");
        
        it('Valid Version', function() {
            assert(semver.valid(patch));
        })
        it('Greater Version', function() {
            assert(semver.gt(patch, '1.2.3'));
        })
        it('Correct Version', function() {
            assert.equal(patch, '1.2.4');
        })
    })
    
    describe('Pre-Major', function() {
        let preMajor = VersionBump('1.2.3', "premajor", "alpha");
        
        it('Valid Version', function() {
            assert(semver.valid(preMajor));
        })
        it('Greater Version', function() {
            assert(semver.gt(preMajor, '1.2.3'));
        })
        it('Correct Version - Alpha.0', function() {
            assert.equal(preMajor, '2.0.0-alpha.0');
        })
        it('Correct Version - Alpha.1', function() {
            assert.equal(VersionBump(preMajor, "pre", "alpha"), "2.0.0-alpha.1");
        })
        it('Correct Version - 2nd Premajor', function() {
            preMajor = VersionBump(preMajor, "premajor", "alpha");
            assert.equal(preMajor, '3.0.0-alpha.0');
        })
    })
    
    describe('Pre-Minor', function() {
        let preMinor = VersionBump('1.2.3', "preminor", "alpha");
        
        it('Valid Version', function() {
            assert(semver.valid(preMinor));
        })
        it('Greater Version', function() {
            assert(semver.gt(preMinor, '1.2.3'));
        })
        it('Correct Version - Alpha.0', function() {
            assert.equal(preMinor, '1.3.0-alpha.0');
        })
        it('Correct Version - Alpha.1', function() {
            assert.equal(VersionBump(preMinor, "pre", "alpha"), "1.3.0-alpha.1");
        })
        it('Correct Version - 2nd Preminor', function() {
            assert.equal(VersionBump(preMinor, "preminor", "alpha"), '1.4.0-alpha.0');
        })
    })
        
    describe('Pre-Patch', function() {
        let prePatch = VersionBump('1.2.3', "prepatch", "alpha");
        
        it('Valid Version', function() {
            assert(semver.valid(prePatch));
        })
        it('Greater Version', function() {
            assert(semver.gt(prePatch, '1.2.3'));
        })
        it('Correct Version - Alpha.0', function() {
            assert.equal(prePatch, '1.2.4-alpha.0');
        })
        it('Correct Version - Alpha.1', function() {
            assert.equal(VersionBump(prePatch, "pre", "alpha"), "1.2.4-alpha.1");
        })
        it('Correct Version - 2nd Prepatch', function() {
            assert.equal(VersionBump(prePatch, "prepatch", "alpha"), '1.2.5-alpha.0');
        })
    })
    
    describe('Error Validation', function() {
        it('Invalid Version - Letters', function() {
            assert.throws(() => VersionBump("a.b.c", "major"), Error, "Invalid version.");
        })
        it('Invalid Version - Syntax', function() {
            assert.throws(() => VersionBump("1.2", "major"), "Error", "Invalid version.");
        })
        it('Release->Pre-release', function() {
            assert.throws(() => VersionBump("1.2.3", "pre", "alpha"), "Error", "Older version.");
        })
        it('Pre-release Beta->Alpha', function() {
            assert.throws(() => VersionBump("1.2.3-beta.0", "pre", "alpha"), "Error", "Older version.");
        })
    })
})

describe('Program Execution', function() {
    it('package.json Version', function(done) {
        let version = pkg.version;
        versionRelease("patch");
        done();
        assert(semver.gt(pkg.version, version));
    })
})