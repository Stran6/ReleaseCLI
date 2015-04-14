import semver from 'semver';

export default function VersionBump(currentVersion, type, preid) {    
    let version = semver.inc(currentVersion, type, preid);
    
    if(semver.valid(version) == null)
        throw new Error("Invalid version.");
    
    if(!semver.gt(version, currentVersion))
        throw new Error("Older version.");
    
    return version;
}