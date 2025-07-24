const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formatted} ${sizes[i]}`;
}

export default formatBytes;