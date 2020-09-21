/**
 * 公用折扣券购买弹窗
 */
const ItemSlotUI = require("../item/ItemSlotUI");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const SelectMax = require("../../component/SelectMax");
const UrlLoad = require("../../component/UrlLoad");
const UIUtils = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        lblDes : cc.Label,
        silderCount : SelectMax.default,
        item : ItemSlotUI.default,
        lblPrice : cc.Label,
        lblLimit : cc.Label,
        lblNoDiscount : cc.Label,
        disCountSp : UrlLoad.default,
        checkBox : cc.Toggle,
        btnGet : cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.shop = this.node.openParam;
        if (null != this.shop.limit) {
            this.count = this.shop.limit;
        }

        facade.subscribe(
            Initializer.jingYiHuaShangProxy.JINGYIHUASHANG_DISCOUNT_SELECT,
            this.onDisCountSelect,
            this
        );
        //监听折扣券合成
        
        this.currentDisCountItem = null;
        this.currentCost = 0;
        this.updateShow();
    },

    updateShow : function() {
        if (this.shop) {
            var e = localcache.getItem(
                    localdb.table_userClothe,
                    this.shop.items.id
                );
            var o = Math.floor(Initializer.playerProxy.userData.cash / this.shop.need.count);
            o = 1 == this.shop.is_limit ? this.shop.limit > o ? o : this.shop.limit : o;
            this.lblLimit.node.active = 1 == this.shop.is_limit;
            this.lblLimit.string = i18n.t("SHOP_LIMIT_COUNT", {
                c: this.shop.limit
            });
            //this.lblPrice.string = this.shop.need.count + "";
            this.item.data = this.shop.items;
            this.lblDes.string = e.des;
            this.silderCount.node.active = o > 1 || this.count > 1;

            this.btnGet.interactable = this.shop.limit > 0 && !this.shop.alreadyHave;
            // this.silderCount.changeHandler = ()=> {
            //     var t = this.shop.need.count * this.silderCount.curValue;
            //     this.lblPrice.string = t + "";
            // };
            this.silderCount.curValue = this.count;
            this.silderCount.node.active && (this.silderCount.max = o);

            // var defaultSelectDiscountItem = null;
            // //检索最高的
            // for(var i = 0;i < Initializer.jingYiHuaShangProxy.discountList.length; i ++) {
            //     if(Initializer.jingYiHuaShangProxy.discountList[i].count > 0) {
            //         defaultSelectDiscountItem = Initializer.jingYiHuaShangProxy.discountList[i];
            //         break;
            //     }
            // }
            // if(defaultSelectDiscountItem != null) {
            //     this.onShowDisCountSelect(defaultSelectDiscountItem);
            // }else {
                this.unDisCountSelect();
            //}
            
        }
    },
   

    updateLabelPrice : function () {
        var discount = 1;
        if(this.currentDisCountItem != null) {
            discount = this.currentDisCountItem.discount / 10;
        }
        this.currentCost = Math.ceil(this.shop.need.count * discount);

        this.lblPrice.string = this.currentCost + "";
        this.silderCount.changeHandler = ()=> {
            var t = this.currentCost * this.silderCount.curValue;
            this.lblPrice.string = t + "";
        };
    },

    onDisCountSelect : function (t, e) {
        this.onShowDisCountSelect(t);
    },

    onShowDisCountSelect : function (t) {
        this.checkBox.interactable = true;
        this.checkBox.isChecked = true;
        this.lblNoDiscount.node.active = false;
        this.disCountSp.node.active = true;
        this.currentDisCountItem = t;
        var itemId = t.id;
        var item = localcache.getItem(localdb.table_item, itemId);
        this.disCountSp.url = UIUtils.uiHelps.getItemSlot(item ? item.icon : itemId);
        this.updateLabelPrice();
    },

    unDisCountSelect : function () {
        this.checkBox.interactable = false;
        this.currentDisCountItem = null;
        this.checkBox.isChecked = false;
        this.lblNoDiscount.node.active = true;
        this.disCountSp.node.active = false;
        this.updateLabelPrice();
    },

    onClickBuy : function() {
        var t = this.shop;
        if (t) {
            var e = this.silderCount.node.active
                ? this.silderCount.curValue
                : 1;
            if (t.vip > Initializer.playerProxy.userData.vip) {
                Utils.alertUtil.alert("SHOP_BUY_VIP_LIMIT", {
                    v: t.vip
                });
                return;
            }
            if (1 == t.is_limit && 0 == t.limit) {
                Utils.alertUtil.alert18n("SHOP_BUY_COUNT_LIMIT");
                return;
            }
            if (this.currentCost * e > Initializer.playerProxy.userData.cash) {
                Utils.alertUtil.alertItemLimit(1);
                return;
            }
            if (0 == e) return;

            Utils.utils.showConfirmItem(
                i18n.t("JINGYI_BUY_TIP", {
                    num: this.currentCost
                }),
                1,
                Initializer.playerProxy.userData.cash,
                ()=> {
                    var discountId = 0;
                    if(this.currentDisCountItem != null) {
                        discountId = this.currentDisCountItem.id;
                    }
                    Initializer.jingYiHuaShangProxy.LimitBuy(t.id, discountId, 1);
                    this.onClickClost();
                }
            );
            

        }
    },

    onClickClost : function() {
        Utils.utils.closeView(this);
    },

    onCheckBox : function (e, customData) {
        
        if(e.isChecked) {

        }else {
            this.unDisCountSelect();
        }
    },

    onOpenDisCountSelect : function () {
        Utils.utils.openPrefabView(
            "jingYiHuaShang/DisCountSelectView",
            !1,
            null,
        );
    },
});
