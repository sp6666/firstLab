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

    start () {

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
        if(!i.mingyueProxy.sjShop || i.mingyueProxy.sjShop.length<=0) 
            return;

        var shopData = {};
        shopData.buy = this.silderCount.curValue;
        shopData.count = 0;//this.silderCount.curValue;
        shopData.id = i.mingyueProxy.sjShop[this._data.index].id;
        shopData.items = [];

        shopData.items.push({id:this._data.id,count:1});
        shopData.items.push({id:i.mingyueProxy.MINGYUE_ITEM_YUE_LING,count:1});

        var t = shopData;
        t && u.utils.openPrefabView("ActivityShopBuy", !0, t);
    },

    onClickGift: function() {
        if(this.silderCount.curValue <= 0){
            u.alertUtil.alert(i18n.t("MING_YUE_GIFT_NO_NUM"));
            return;
        }

        if(i.mingyueProxy.isUserIdValid()){
            u.alertUtil.alert(i18n.t("MING_YUE_GIFT_NO_USER_ID"));
            return;
        }

        var totalValue = this._data.num;
        u.utils.showConfirm(i18n.t("MING_YUE_GIFT_USER",{ num: this.silderCount.curValue,food:this._data.name,name:i.mingyueProxy.userId})
        ,function(){
            //兑换类型，数量,用户id
            i.mingyueProxy.sendGift(this._data.id,this.silderCount.curValue,function(ret){
                if(ret&&ret.a&&ret.a.system&&ret.a.system.errror&&ret.a.system.errror.msg){
                }
                else{
                    var giftValue = totalValue - this._data.num;
                    if(giftValue > 0){
                        u.alertUtil.alert(i18n.t("MING_YUE_GIFTED_USER",{ num:giftValue,food:this._data.name,name:i.mingyueProxy.userId}));
                    }
                }
            }.bind(this));
        }.bind(this));
    },
});
