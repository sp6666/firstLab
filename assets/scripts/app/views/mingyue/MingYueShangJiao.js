var Utils = require("../../utils/Utils"),
    n = require("../../Initializer"),
    List = require("../../component/List");

cc.Class({
    extends: cc.Component,

    properties: {
        lblNum:cc.Label,
        list:List.default
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        facade.subscribe(n.mingyueProxy.MINGYUE_UPDATE_ITEM,this.onShowData,this);

        n.limitActivityProxy.curExchangeId = n.limitActivityProxy.MINGYUE_ID;
        this.onShowData();
    },

    // start () {

    // },
    
    onShowData: function(){
        this.list.data = n.mingyueProxy.foodList;

        var t = n.bagProxy.getItemCount(n.mingyueProxy.MINGYUE_ITEM_YUE_LING);
        this.lblNum.string = t + "";
    },

    // update (dt) {},
    onClickClose: function() {
        Utils.utils.closeView(this);
    },
});
