function compareVersion(version1, version2) {
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);
  const len = Math.max(v1.length, v2.length);
  for (let i = 0; i < len; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

// eslint-disable-next-line no-unused-vars
function getLatestVersion(versionHistory) {
  const latestVersion = {};
  versionHistory.forEach(version => {
    const { version_code: versionCode, logs } = version;
    logs.forEach(log => {
      if (!latestVersion[log.platform]) {
        latestVersion[log.platform] = { ...log, ... { versionCode } };
        return;
      }

      const latestVersionCode = latestVersion[log.platform].versionCode;
      if (compareVersion(versionCode, latestVersionCode) > 0) {
        latestVersion[log.platform] = { ...log, ... { versionCode } };
      }
    });
  });

  return latestVersion;
}
