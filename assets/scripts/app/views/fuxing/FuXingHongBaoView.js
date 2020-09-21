
const Utils = require("../../utils/Utils");
const List = require("../../component/List");
const Initializer = require("../../Initializer");
cc.Class({
    extends: cc.Component,

    properties: {
        list : List.default,
        lblNum : cc.Label,
        nodeQiangguang : cc.Node,
        lblGongji : cc.Label,
        lblWeiRuBang : cc.Label,

    },

    onLoad() {
        //this.data = this.node.openParam;
        facade.subscribe(Initializer.fuXingProxy.FUXING_DATA_UPDATE, this.onDataUpdate, this);
        this.onDataUpdate();    
    },

    start() {
        //this.initData();
        //this.initData();
    },

    onDataUpdate : function() {
        this.data = Initializer.fuXingProxy.data.fortune[0];
        if (null != this.data) {
            for(var i = 0; i < this.data.rank.length; i ++) {
                this.data.rank[i].index = i;
            }
            this.list.data = this.data.rank;
            this.nodeQiangguang.active = this.data.rob_amount == 0;
            this.lblNum.node.active =  this.data.rob_amount != 0;
            this.lblNum.string = i18n.t("FUXING_YIQIANGDAOYUANBAO", {param1 : this.data.rob_amount});
            if(Utils.timeUtil.second > this.data.settle_time) {
                this.lblWeiRuBang.node.active = true;
            }else {
                this.lblWeiRuBang.node.active = false;
            }
            this.lblGongji.string = i18n.t("FUXING_GONGJIYUANBAOJIAZHUANGTAI", {param1 : this.data.total, param2 : this.data.num + "/" + this.data.max_num});
        }
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    }
});
