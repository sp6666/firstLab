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
        facade.subscribe(n.thanksGivingProxy.THANKSGIVING_UPDATE_ITEM,this.onShowData,this);

        n.limitActivityProxy.curExchangeId = n.limitActivityProxy.THANKSGIVING_ID;
        this.onShowData();
    },

    // start () {

    // },
    
    onShowData: function(){
        var list = [];
        for(var idx = 0; idx < 5; idx ++) {
            if(n.thanksGivingProxy.foodList[idx]) {
                list.push(n.thanksGivingProxy.foodList[idx]);
            }
        }
        this.list.data = list;

        var t = n.bagProxy.getItemCount(n.thanksGivingProxy.THANKSGIVING_ITEM_YUE_LING);
        this.lblNum.string = t + "";
    },

    // update (dt) {},
    onClickClose: function() {
        Utils.utils.closeView(this);
    },
});
