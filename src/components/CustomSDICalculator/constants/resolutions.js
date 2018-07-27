const LABEL = {
  DCI_4K: '4K (2160p)',
  UHD: 'UHD (2160p)',
  DCI_2K: '2K (1080p)',
  FHD: 'HD (1080p)',
  FHD_I: 'HD (1080i)',
  HD: 'HD (720p)',
  SD_576i: 'SD (576i)',
  SD_480i: 'SD (480i)',
};

export default {
  [LABEL.DCI_4K]: [4096, 2160],
  [LABEL.UHD]: [3840, 2160],
  [LABEL.DCI_2K]: [2048, 1080],
  [LABEL.FHD]: [1920, 1080],
  [LABEL.FHD_I]: [1920, 1080],
  [LABEL.HD]: [1280, 720],
  [LABEL.SD_576i]: [768, 576],
  [LABEL.SD_480i]: [640, 480],
};
