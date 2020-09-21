var SelectMax = require("../../component/SelectMax"),
    RenderListItem = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    s = require("../../utils/ShaderUtils"),
    u = require("../../utils/Utils"),
    i = require("../../Initializer"),
    n = require("../item/ItemSlotUI");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblName: cc.Label,
        lblNum: cc.Label,
        silderCount: SelectMax.default,
        slot: n.default,
        btnAction:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function () {

    },

    showData: function() {
        var t = this._data;
        if (t) {
            var e = localcache.getItem(localdb.table_item, t.id);
            this.lblName.string = e.name;
            this.lblNum.string = "(" + i18n.t("COMMON_HOLD") +":"+ t.num +")";

            //silder
            this.silderCount.curValue = 0;
            this.silderCount.max = t.num;//>7?7:t.num;
            this.silderCount.lblCount.string = t.num>0?1:0;
            //item
            this.slot.data = e;

            if(t.num == 0){
                s.shaderUtils.setNodeGray(this.node);
                //
                this.btnAction.interactable = false;
            }
        }
        else{
            s.shaderUtils.setNodeGray(this.node);
            //如果为空，置灰
            this.btnAction.interactable = false;
        }
    },

    // update (dt) {},

    //换月铃
    onClickShangJiao: function(){
        if(!i.loverProxy.sjShop || i.loverProxy.sjShop.length<=0) 
            return;

        i.loverProxy.sendHandItem(i.loverProxy.sjShop[this._data.index].items[0].id,this.silderCount.curValue);
    },

    onClickGift: function() {
        if(this.silderCount.curValue <= 0){
            u.alertUtil.alert(i18n.t("LOVER_GIFT_NO_NUM"));
            return;
        }

        if(i.loverProxy.isUserIdValid()){
            u.alertUtil.alert(i18n.t("LOVER_GIFT_NO_USER_ID"));
            return;
        }

        var totalValue = this._data.num;
        var sendId = this._data.id;
        u.utils.showConfirm(i18n.t("LOVER_GIFT_USER",{ num: this.silderCount.curValue,food:this._data.name,name:i.loverProxy.userData.name})
        ,function(){
            //兑换类型，数量,用户id
            i.loverProxy.sendGift(this._data.id,this.silderCount.curValue,function(ret){
                if(ret&&ret.a&&ret.a.system&&ret.a.system.errror&&ret.a.system.errror.msg){
                }
                else{
                    var giftValue = totalValue - this._data.num;
                    if(giftValue >= 5 && sendId != 1408 && sendId != 1409 && sendId != 1410){
                        //u.alertUtil.alert(i18n.t("LOVER_GIFTED_USER",{ num:giftValue,food:this._data.name,name:i.loverProxy.userData.name}));
                        u.alertUtil.alert(i18n.t("LOVER_SENDSUCCESS"));
                    }else if(sendId == 1408) {
                        u.alertUtil.alert(i18n.t("LOVER_FRIENDSHIP_SENDSUCCESS", {num : giftValue * 10}));
                    }else if(sendId == 1409) {
                        u.alertUtil.alert(i18n.t("LOVER_FRIENDSHIP_SENDSUCCESS", {num : giftValue * 20}));
                    }else if(sendId == 1410) {
                        u.alertUtil.alert(i18n.t("LOVER_FRIENDSHIP_SENDSUCCESS", {num : giftValue * 50}));
                    }else {
                        u.alertUtil.alert(i18n.t("SPELL_SEND_SUCCESS"));
                    }
                }
            }.bind(this));
        }.bind(this));
    },
});