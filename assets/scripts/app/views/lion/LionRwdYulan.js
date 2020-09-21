/**
 * 舞狮奖励预览
 */
const List = require("../../component/List");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        listGoldBig : List.default,
        listGoldNormal : List.default,
        listSliveBig : List.default,
        listSliveNormal : List.default,
    },

    start () {
        var listData  = Initializer.lionProxy.getRwdData();
        this.listGoldBig.repeatX = listData.goldBig.length;
        this.listGoldBig.data = listData.goldBig;
        this.listGoldNormal.data = listData.goldNormal;
        this.listSliveBig.repeatX = listData.sliveBig.length;
        this.listSliveBig.data = listData.sliveBig;
        this.listSliveNormal.data = listData.sliveNormal;
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    },


});
