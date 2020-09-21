
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

    },

    onLoad() {
        //this.data = this.node.openParam;
        facade.subscribe(Initializer.fuXingProxy.FUXING_DATA_UPDATE, this.onDataUpdate, this);
        this.onDataUpdate();
    },

    start() {
        //this.initData();
    },

    onDataUpdate : function() {
        var xingyunList = Initializer.fuXingProxy.getXingYunHongBaoList();
        var id = this.node.openParam.id;
        for(var i = 0; i < xingyunList.length; i ++) {
            if(xingyunList[i].data != null && id == xingyunList[i].data.id) {
                this.data = xingyunList[i].data;
                break;
            }
        }
        if (null != this.data) {
            this.list.data = this.data.rank;
            this.nodeQiangguang.active = this.data.rob_amount == 0;
            this.lblNum.node.active =  this.data.rob_amount != 0;
            this.lblNum.string = i18n.t("FUXING_YIQIANGDAOYUANBAO", {param1 : this.data.rob_amount});
            this.lblGongji.string = i18n.t("FUXING_GONGJIYUANBAOJIAZHUANGTAI", {param1 : this.data.total, param2 : this.data.num + "/" + this.data.max_num});
        }
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    }
});
