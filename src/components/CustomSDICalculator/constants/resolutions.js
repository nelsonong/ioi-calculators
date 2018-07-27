const LABEL = {
  DCI_4K_2160p: '4K (2160p)',
  UHD_2160p: 'UHD (2160p)',
  DCI_2K_1080p: '2K (1080p)',
  HD_1080p: 'HD (1080p)',
  HD_1080i: 'HD (1080i)',
  HD_720p: 'HD (720p)',
  SD_576i: 'SD (576i)',
  SD_480i: 'SD (480i)',
};

// Resolution [Width, Height, Interlaced]
export default {
  [LABEL.DCI_4K_2160p]: [4096, 2160, false],
  [LABEL.UHD_2160p]: [3840, 2160, false],
  [LABEL.DCI_2K_1080p]: [2048, 1080, false],
  [LABEL.HD_1080p]: [1920, 1080, false],
  [LABEL.HD_1080i]: [1920, 1080, true],
  [LABEL.HD_720p]: [1280, 720, false],
  [LABEL.SD_576i]: [720, 576, true],
  [LABEL.SD_480i]: [720, 487, true],
};
