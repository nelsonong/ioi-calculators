export const MODEL = {
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

export const MODELS = {
    ALL: Object.values(MODEL),
    TYPE_250: [
        MODEL.Type51B163MCX,
        MODEL.Type51B163CCX
    ],
    TYPE_252: [
        MODEL.Type32B216MCX,
        MODEL.Type32B216CCX,
    //    MODEL.Type2KMSDIMINI,
    //    MODEL.Type2KMSDIMINID
    ],
    TYPE_253: [
        MODEL.Type120B68MCX,
        MODEL.Type120B68CCX
    ],
    TYPE_255: [
        MODEL.Type89B93MCX,
        MODEL.Type89B93CCX,
    //    MODEL.Type4KMSDIMINI,
    //    MODEL.Type4KMSDIMINID
    ],
    TYPE_273: [
        MODEL.Type16B276MCX,
        MODEL.Type16B276CCX
    ],
    TYPE_287: [
        MODEL.Type4B523MCX,
        MODEL.Type4B523CCX
    ],
    TYPE_MONO: [
        MODEL.Type24A164MCX,
        MODEL.Type205R26MCX,
        MODEL.Type51B163MCX,
        MODEL.Type32B216MCX,
        MODEL.Type120B68MCX,
        MODEL.Type89B93MCX,
        MODEL.Type16B276MCX,
        MODEL.Type4B523MCX,
    //    MODEL.Type2KMSDIMINI,
    //    MODEL.Type2KMSDIMINID,
    //    MODEL.Type4KMSDIMINI,
    //    MODEL.Type4KMSDIMINID
    ]
};