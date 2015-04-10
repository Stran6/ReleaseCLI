class VersionBump {
    bump(currentVersion, type) {
        
        var version = require('semver').inc(currentVersion, 'pre', 'gamma');
        //var test = version.substring(version.indexOf('z') + 1, version.length);
        
        return version;
//        return "Version:" + ' ' + version + ' ' + "Type:" + ' ' + type;
    }
}

export default VersionBump;