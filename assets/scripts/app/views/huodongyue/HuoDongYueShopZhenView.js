const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const UIUtils = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        lblTime : cc.Label,
        suitNode : [cc.Node],
        btnExchange : cc.Button,
        lblProgress : cc.Label,
    },

    onLoad () {
        facade.subscribe(Initializer.huoDongYueProxy.HUODONGYUE_SHOP_UPDATE2,this.onDataUpdate,this);
        this.shopData = this.node.openParam;
        this.suitCtrs = [];
        for (var i = 0; i < this.suitNode.length; i++) {
            this.suitCtrs.push(this.suitNode[i].getComponent("HuoDongYueDHZItem"));
        }
        this.updateShow();
    },

    onDataUpdate : function(t) {
        this.shopData = t;
        this.updateShow();
    },
    
    updateShow : function() {
        if(this.shopData != null && this.shopData.rwd != null) {
            if(this.shopData.stime == null || this.shopData.stime < Utils.timeUtil.second ) {
                this.lblTime.string = i18n.t("ACTHD_OVERDUE");
            }else {
                UIUtils.uiUtils.countDown(
                    this.shopData.stime,
                    this.lblTime,
                    ()=> {
                        this.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );

                var progressCount = 0;
                for (var i = 0; i < this.suitCtrs.length; i++) {
                    if(this.shopData.rwd[i] == null) break;
                    var ctr = this.suitCtrs[i];
                    ctr.showData(this.shopData.rwd[i]);
                    if(this.shopData.rwd[i].have) {
                        progressCount ++;
                    }
                }
                this.lblProgress.string = i18n.t("ZHOUNIAN_DH_PROGRESS", {progress : progressCount + "/3"});
                this.btnExchange.interactable = (this.shopData.allHave && this.shopData.buy == 0);
            }


        }else {
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");
            this.lblProgress.string = i18n.t("ZHOUNIAN_DH_PROGRESS", {progress : "0/3"});
        }
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    },

    onClickExchange : function(evt, customData) {
        var type = parseInt(customData);
        if(isNaN(type)) return;
        Initializer.huoDongYueProxy.sendExchange(type);
    },
});
