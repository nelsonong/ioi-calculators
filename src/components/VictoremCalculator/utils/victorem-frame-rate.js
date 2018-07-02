import { VIC_MODELS, VIC_OPTION } from '../constants';

export const calculateFrameRate = (parentState) => {
    
    // Get parameters from parent state
    let { model, format, bitDepth, width, height, cameraOption } = parentState;
    const linkSpeed = Number(format.slice(-1));
    const linkCount = Number(format.slice(0, 1));
    const subSampling = (cameraOption === VIC_OPTION.SUBSAMPLING);
    const binv = (cameraOption === VIC_OPTION.BIN_VERTICAL);
    const bin2 = (cameraOption === VIC_OPTION.BIN_2X2);

    // Determine HMAX and minimum vertical blanking
    let { hmax, minVertBlank } = getHMaxAndMinVertBlank(model, bitDepth, linkSpeed, linkCount, subSampling, binv, bin2);
    if (hmax === 0) throw new Error("Can't determine HMAX.");
    if (minVertBlank === 0) throw new Error("Can't determine minimum vertical blanking");

    // Calculate and return frame rate
    const linetime = hmax / 74.25;
    let frameRate = 1 / (linetime * (height + minVertBlank) / 1000000);
    frameRate = Math.round(frameRate * 100)/100;
    return frameRate + ' FPS [' + width + ' x ' + height + ']';
};

const getHMaxAndMinVertBlank = (model, bitDepth, linkSpeed, linkCount, subSampling, binv, bin2) => {
    let hmax = 0;
    let minVertBlank = 0;

    if (VIC_MODELS.TYPE_250.includes(model)) {
        minVertBlank = 38;
        if (linkSpeed === 2) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 376 : 760;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 470 : 950;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 564 : 1140;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling) hmax = 218;
                    else if (binv) hmax = 416;
                    else hmax = 380;
                } else if (bitDepth === 10) {
                    if (subSampling) hmax = 260;
                    else if (binv) hmax = 520;
                    else hmax = 475;
                } else if (bitDepth === 12) {
                    if (subSampling) hmax = 396;
                    else if (binv) hmax = 624;
                    else hmax = 513;
                }
            }
        } else if (linkSpeed === 3) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 300 : 608;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 375 : 760;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 450 : 912;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 304;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 260 : (binv ? 380 : 245);
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 396 : 456;
                }
            }
        } else if (linkSpeed === 5) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 416;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 260 : 520;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 396 : 624;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 217;
                } else if (bitDepth === 10) {
                    hmax = 260;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        } else if (linkSpeed === 6) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 304;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 260 : (binv ? 380 : 245);
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 396 : 456;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 217;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 260 : 245;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        }
    } else if (VIC_MODELS.TYPE_252.includes(model)) {
        minVertBlank = 38;
        if (linkSpeed === 2) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 312 : 636;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 390 : 795;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 468 : 954;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 318;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 245 : 400;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 396 : 477;
                }
            }
        } else if (linkSpeed === 3) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 250 : 512;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 310 : 640;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 396 : 768;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 256;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 245 : 320;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        } else if (linkSpeed === 5) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 352;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 245 : 440;
                } else if (bitDepth === 12) {
                    hmax = subSampling ? 396 : 528;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 217;
                } else if (bitDepth === 10) {
                    hmax = 245;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        } else if (linkSpeed === 6) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 256;
                } else if (bitDepth === 10) {
                    hmax = subSampling ? 245 : 320;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    hmax = subSampling ? 218 : 217;
                } else if (bitDepth === 10) {
                    hmax = 245;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        }
    } else if (VIC_MODELS.TYPE_253.includes(model)) {
        minVertBlank = 54;
        if (linkSpeed === 2) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 628;
                    else if (binv) hmax = 1256;
                    else hmax = 1280;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 785;
                    else if (binv) hmax = 1570;
                    else hmax = 1600;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 942;
                    else if (binv) hmax = 1884;
                    else hmax = 1920;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 638;
                    else hmax = 640;
                } else if (bitDepth === 10) {
                    if (subSampling) hmax = 420;
                    else if (binv) hmax = 785;
                    else if (bin2) hmax = 390;
                    else hmax = 800;
                } else if (bitDepth === 12) {
                    if (subSampling) hmax = 522;
                    else if (binv) hmax = 942;
                    else if (bin2) hmax = 522;
                    else hmax = 960;
                }
            }
        } else if (linkSpeed === 3) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 504;
                    else if (binv) hmax = 1004;
                    else hmax = 1024;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 630;
                    else if (binv) hmax = 1255;
                    else hmax = 1280;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 756;
                    else if (binv) hmax = 1506;
                    else hmax = 1536;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 504;
                    else hmax = 512;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else if (binv) hmax = 630;
                    else hmax = 640;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 522;
                    else if (binv) hmax = 756;
                    else hmax = 768;
                }
            }
        } else if (linkSpeed === 5) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 684;
                    else hmax = 696;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 420;
                    else if (binv) hmax = 855;
                    else hmax = 870;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 522;
                    else if (binv) hmax = 1026;
                    else hmax = 1044;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2 || binv) hmax = 356;
                    else hmax = 355;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else if (binv) hmax = 430;
                    else hmax = 435;
                } else if (bitDepth === 12) {
                    hmax = 522;
                }
            }
        } else if (linkSpeed === 6) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 504;
                    else hmax = 512;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else if (binv) hmax = 630;
                    else hmax = 640;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 522;
                    else if (binv) hmax = 756;
                    else hmax = 768;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2 || binv) hmax = 356;
                    else hmax = 355;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else hmax = 375;
                } else if (bitDepth === 12) {
                    hmax = 522;
                }
            }
        }
    } else if (VIC_MODELS.TYPE_255.includes(model)) {
        minVertBlank = 54;
        if (linkSpeed === 2) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 624;
                    else if (binv) hmax = 1240;
                    else hmax = 1272;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 780;
                    else if (binv) hmax = 1550;
                    else hmax = 1590;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 936;
                    else if (binv) hmax = 1860;
                    else hmax = 1908;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 620;
                    else hmax = 636;
                } else if (bitDepth === 10) {
                    if (subSampling) hmax = 420;
                    else if (binv) hmax = 775;
                    else if (bin2) hmax = 390;
                    else hmax = 795;
                } else if (bitDepth === 12) {
                    if (subSampling) hmax = 522;
                    else if (binv) hmax = 930;
                    else if (bin2) hmax = 522;
                    else hmax = 954;
                }
            }
        } else if (linkSpeed === 3) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 500;
                    else if (binv) hmax = 1000;
                    else hmax = 1016;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 625;
                    else if (binv) hmax = 1250;
                    else hmax = 1270;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 750;
                    else if (binv) hmax = 1500;
                    else hmax = 1524;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 496;
                    else hmax = 508;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else if (binv) hmax = 620;
                    else hmax = 635;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 522;
                    else if (binv) hmax = 744;
                    else hmax = 762;
                }
            }
        } else if (linkSpeed === 5) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 676;
                    else hmax = 692;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 420;
                    else if (binv) hmax = 845;
                    else hmax = 865;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 522;
                    else if (binv) hmax = 1014;
                    else hmax = 1038;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2 || binv) hmax = 356;
                    else hmax = 355;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else if (binv) hmax = 430;
                    else hmax = 435;
                } else if (bitDepth === 12) {
                    hmax = 522;
                }
            }
        } else if (linkSpeed === 6) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 356;
                    else if (binv) hmax = 496;
                    else hmax = 508;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else if (binv) hmax = 620;
                    else hmax = 635;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 522;
                    else if (binv) hmax = 744;
                    else hmax = 762;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2 || binv) hmax = 356;
                    else hmax = 355;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 380;
                    else hmax = 375;
                } else if (bitDepth === 12) {
                    hmax = 522;
                }
            }
        }
    } else if (VIC_MODELS.TYPE_273.includes(model)) {
        minVertBlank = 42;
        if (linkSpeed === 2) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 440;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 550;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 396;
                    else hmax = 660;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 238;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 290;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        } else if (linkSpeed === 3) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 354;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 442;
                } else if (bitDepth === 12) {
                    if (subSampling || bin2) hmax = 396;
                    else hmax = 530;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 238;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 290;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        } else if (linkSpeed === 5) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 238;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 290;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 238;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 290;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        } else if (linkSpeed === 6) {
            if (linkCount === 1) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 238;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 290;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            } else if (linkCount === 2) {
                if (bitDepth === 8) {
                    if (subSampling || bin2) hmax = 254;
                    else hmax = 238;
                } else if (bitDepth === 10) {
                    if (subSampling || bin2) hmax = 310;
                    else hmax = 290;
                } else if (bitDepth === 12) {
                    hmax = 396;
                }
            }
        }
    } else if (VIC_MODELS.TYPE_287.includes(model)) {
        minVertBlank = 42;
        if (bitDepth === 8) {
            hmax = 242;
        } else if (bitDepth === 10) {
            hmax = 290;
        } else if (bitDepth === 12) {
            hmax = 396;
        }
    } else {
        throw new Error("Unsupported model.");
    }

    return { hmax, minVertBlank };
};