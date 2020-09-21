//宠管六宫

const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const LiuGongRoleItem = require("./LiuGongRoleItem");
cc.Class({
    extends: cc.Component,

    properties: {
        roleItem : [LiuGongRoleItem],
    },

    onLoad () {

        //facade.subscribe(Initializer.liuGongProxy.LIUGONG_DATA_UPDATE, this.onDataUpdate, this);  //获得数据
        facade.subscribe(Initializer.liuGongProxy.LIUGONG_MAIN_RANK_UPDATE, this.onDataUpdate, this);  //获得数据
        Initializer.liuGongProxy.getInfo();
    },

    onDataUpdate : function() {
        if(Initializer.liuGongProxy.data == null || Initializer.liuGongProxy.mainRoleData == null) return;
        for(var i = 0; i < this.roleItem.length; i ++) {
            this.roleItem[i].init(Initializer.liuGongProxy.mainRoleData[i]);
        }
    },


    onClickRole : function(evt, customData) {
        var index = parseInt(customData);
        if(Initializer.liuGongProxy.mainRoleData == null) {
            Utils.alertUtil.alert18n("LIUGONG_NOONE");
            return;
        }
        var roleData = Initializer.liuGongProxy.mainRoleData[index].roleData;
        if(roleData == null) {
            Utils.alertUtil.alert18n("LIUGONG_NOONE");
            return;
        }
        Utils.utils.openPrefabView("liugong/LiuGongQAView", null, {
            data : roleData,
            type : 0,
        });
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    },

    onClickFengyi : function() {
        Utils.utils.openPrefabView("liugong/LiuGongFengYiView");
    },
});
