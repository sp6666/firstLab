const List=require("../../component/List");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        btnGet : cc.Button,
        list : List.default,
    },


    onLoad() {
        if(Initializer.lingLangProxy.rechargeRecords == null) {
            Utils.utils.closeView(this);
            Utils.alertUtil.alert18n("COMMON_NODATA");
            return;
        }

        facade.subscribe(Initializer.lingLangProxy.LINGLANG_RECHARGE_RECORDS_UPDATE, this.onDataUpdate, this);
        this.onDataUpdate();
    },

    onDataUpdate() {
        if(Initializer.lingLangProxy.rechargeRecords == null)return;
        var rechargeRecords = Initializer.lingLangProxy.rechargeRecords;
        this.list.data = rechargeRecords;
        
        //判断btn
        var canGet = false;
        for(var i = 0; i < rechargeRecords.length; i ++) {
            if(rechargeRecords[i].status == 1) {
                canGet = true;
            }   
        }
        this.btnGet.interactable = canGet;
    },

    onClickGet : function() {
        Initializer.lingLangProxy.sendRechargeRecordRwd();
    },

    onCloseClick : function() {
        Utils.utils.closeView(this);
    },
});
