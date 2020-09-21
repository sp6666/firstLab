//const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        animation : cc.Animation,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init : function(data) {
        this.data = data;
        this.node.x = this.data.x;
        this.node.y = this.data.y;
        this.initShaking();
    },

    initShaking : function() {
        var delay = Math.floor(Math.random() * 5);
        this.scheduleOnce(this.shakingWithDelay, delay);
    },

    shakingWithDelay : function() {
        this.animation.play();
        this.initShaking();
    },

    onDestroy() {
        this.unscheduleAllCallbacks();
    },
    // update (dt) {},

    onClickItem : function() {
        //Initializer.fuXingProxy.sendGetXinChunHongbao(this.data.data.id);
        Utils.utils.openPrefabView("fuxing/FuXingHongBaoOpenView", null, this.data.data);
    }
});
