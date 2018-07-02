export const VIC_MODEL = {
//    Type24A164MCX: '24A164MCX',
//    Type24A164CCX: '24A164CCX',
//    Type205R26MCX: '205R26MCX',
//    Type205R26CCX: '205R26CCX',
    Type51B163MCX: '51B163MCX',
    Type51B163CCX: '51B163CCX',
    Type32B216MCX: '32B216MCX',
    Type32B216CCX: '32B216CCX',
    Type120B68MCX: '120B68MCX',
    Type120B68CCX: '120B68CCX',
    Type89B93MCX: '89B93MCX',
    Type89B93CCX: '89B93CCX',
    Type16B276MCX: '16B276MCX',
    Type16B276CCX: '16B276CCX',
    Type4B523MCX: '4B523MCX',
    Type4B523CCX: '4B523CCX',
};

export const VIC_MODELS = {
    ALL: Object.values(VIC_MODEL),
    TYPE_250: [
        VIC_MODEL.Type51B163MCX,
        VIC_MODEL.Type51B163CCX
    ],
    TYPE_252: [
        VIC_MODEL.Type32B216MCX,
        VIC_MODEL.Type32B216CCX,
    //    VIC_MODEL.Type2KMSDIMINI,
    //    VIC_MODEL.Type2KMSDIMINID
    ],
    TYPE_253: [
        VIC_MODEL.Type120B68MCX,
        VIC_MODEL.Type120B68CCX
    ],
    TYPE_255: [
        VIC_MODEL.Type89B93MCX,
        VIC_MODEL.Type89B93CCX,
    //    VIC_MODEL.Type4KMSDIMINI,
    //    VIC_MODEL.Type4KMSDIMINID
    ],
    TYPE_273: [
        VIC_MODEL.Type16B276MCX,
        VIC_MODEL.Type16B276CCX
    ],
    TYPE_287: [
        VIC_MODEL.Type4B523MCX,
        VIC_MODEL.Type4B523CCX
    ],
    TYPE_MONO: [
        VIC_MODEL.Type24A164MCX,
        VIC_MODEL.Type205R26MCX,
        VIC_MODEL.Type51B163MCX,
        VIC_MODEL.Type32B216MCX,
        VIC_MODEL.Type120B68MCX,
        VIC_MODEL.Type89B93MCX,
        VIC_MODEL.Type16B276MCX,
        VIC_MODEL.Type4B523MCX,
    //    VIC_MODEL.Type2KMSDIMINI,
    //    VIC_MODEL.Type2KMSDIMINID,
    //    VIC_MODEL.Type4KMSDIMINI,
    //    VIC_MODEL.Type4KMSDIMINID
    ]
};