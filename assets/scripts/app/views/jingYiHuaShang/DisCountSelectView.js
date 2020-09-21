const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer")
const List = require("../../component/List");

cc.Class({
    extends: cc.Component,

    properties: {
        list:List.default,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(Initializer.jingYiHuaShangProxy.discountList == null) {
            Utils.utils.closeView(this);
            return;
        }
        this.data = Initializer.jingYiHuaShangProxy.discountList;
        this.onShowData();
    },

    // start () {

    // },

    // update (dt) {},

    onShowData: function(){
        this.list.data = this.data;
    },

    onClickGift: function(t, e) {
        var o = e ? e.data : null;
        facade.send(Initializer.jingYiHuaShangProxy.JINGYIHUASHANG_DISCOUNT_SELECT, o);
        this.onClickClose();
    },

    onClickClose: function() {
        Utils.utils.closeView(this);
    },
});
