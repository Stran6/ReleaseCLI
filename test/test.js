import VersionBump from "../src/version-bump.js"
import semver from 'semver'

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
            try {
                VersionBump("a.b.c", "major");
            }
            catch(error) {
                assert.equal(error.message, "Invalid version.");
            }
        })
        
        it('Invalid Version - Syntax', function() {
            try {
                VersionBump("1.2", "major");
            }
            catch(error) {
                assert.equal(error.message, "Invalid version.");
            }
        })
            
        it('Release->Pre-release', function() {
            try {
                VersionBump("1.2.3", "pre", "alpha");
            }
            catch(error) {
                assert.equal(error.message, "Older version.");
            }
        })
        
        it('Pre-release Beta->Alpha', function() {
            try {
                VersionBump("1.2.3-beta.0", "pre", "alpha");
            }
            catch(error) {
                assert.equal(error.message, "Older version.");
            }
        })
    })
})