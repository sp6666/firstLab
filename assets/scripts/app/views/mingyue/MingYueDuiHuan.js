var List = require("../../component/List"),
    n = require("../../Initializer"),
    u = require("../../utils/Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        lblNum:cc.Label,
        list:List.default,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //
        this.list.data = n.mingyueProxy.foodList;

        var t = n.bagProxy.getItemCount(n.mingyueProxy.MINGYUE_ITEM_YUE_LING);
        this.lblNum.string = t + "";
    },

    // start () {

    // },

    // update (dt) {},

    onShangJiaoClick: function() {
        u.utils.openPrefabView("mingyue/MingYueShangJiao");
    },

    onClickClose: function() {
        u.utils.closeView(this);
    },
});
