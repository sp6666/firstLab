const RoleSpine = require("../../component/RoleSpine");
const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const UIUtils = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        roleSpine : RoleSpine.default,
        lblName : cc.Label,
        lblTime : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        facade.subscribe(Initializer.liuGongProxy.LIUGONG_DATA_UPDATE, this.onDataUpdate, this);  //获得数据
        Initializer.liuGongProxy.getInfo();
    },

    start () {

    },

    onDataUpdate : function() {
        var huangHouData = Initializer.liuGongProxy.huangHouData.queenInfo;
        if(huangHouData == null) return;
        var info = huangHouData.userInfo;
        this.lblName.string = huangHouData.sevName + " " + info.name;
        this.roleSpine.setClothes(info.sex, info.job, info.level, info.clothe);
        UIUtils.uiUtils.countDown(Initializer.liuGongProxy.huangHouData.endTime, this.lblTime, () => {
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");
        });
    },

    onCloseClick : function() {
        Utils.utils.closeView(this);
    },

    onClickSendGift : function() {
        if(Initializer.liuGongProxy.huangHouData == null) return;
        Utils.utils.openPrefabView("liugong/LiuGongQAView", null, {
            data : Initializer.liuGongProxy.huangHouData.queenInfo,
            type : 1,
        });
    }

});
