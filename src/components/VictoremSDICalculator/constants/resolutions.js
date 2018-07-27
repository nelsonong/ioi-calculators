const LABEL = {
  DCI_4K: '4K (2160p)',
  UHD: 'UHD (2160p)',
  DCI_2K: '2K (1080p)',
  FHD: 'HD (1080p)',
  FHD_I: 'HD (1080i)',
  HD: 'HD (720p)',
};

export default {
  [LABEL.DCI_4K]: [4096, 2160],
  [LABEL.UHD]: [3840, 2160],
  [LABEL.DCI_2K]: [2048, 1080],
  [LABEL.FHD]: [1920, 1080],
  [LABEL.FHD_I]: [1920, 1080],
  [LABEL.HD]: [1280, 720],
};
