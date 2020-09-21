const List = require("../../component/List");
const UrlLoad = require('../../component/UrlLoad');
const Initializer = require("../../Initializer");
const UIUtils = require("../../utils/UIUtils");
const TimeProxy = require("../../models/TimeProxy");
const Utils = require("../../utils/Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        lblNum : cc.Label,
        lblTime : cc.Label,
        rwdNode : cc.Node,
        urlArr : [UrlLoad.default],
        scroll : cc.ScrollView,
        itemScroll : cc.ScrollView,
        eff_1 : sp.Skeleton,
        eff_2 : sp.Skeleton,
        records :List.default,
        rwdList : List.default,
        lblTenNum : cc.Label,
        lineNode : cc.Node,
        orgTenNumNode : cc.Label,
    },



    onLoad () {
        this.flag = false;
        facade.subscribe(Initializer.shoppingStreetProxy.SHOPPINGSTREET_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe(Initializer.shoppingStreetProxy.SHOPPINGSTREET_RECORDS, this.onRecords, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM,this.onItemUpdate,this);
        facade.subscribe(Initializer.shoppingStreetProxy.SHOPPINGSTREET_SHOW_RWD_END, this.onShowRwdEnd, this);
        Initializer.shoppingStreetProxy.sendOpenGrilsDay();
        Initializer.shoppingStreetProxy.sendLookRank();
        Initializer.shopProxy.sendList(false);
    },

    onDataUpdate : function(){
        var t = Initializer.shoppingStreetProxy.data;
        if (t) {
            this.onItemUpdate();
            var e = this;
            UIUtils.uiUtils.countDown(t.info.eTime, this.lblTime, function () {
                e.lblTime.string = i18n.t("ACTHD_OVERDUE");
            });
            this.lblTenNum.string = Initializer.shoppingStreetProxy.tenNum;

            if(Initializer.shoppingStreetProxy.tenNum < 10) {
                this.lineNode.active = true;
                this.lblTenNum.node.active = true;
            }else {
                this.lineNode.active = false;
                this.lblTenNum.node.active = false;
            }
        }
        
    },

    onClickRwd : function (t, e) {
        if (Utils.timeUtil.second > Initializer.shoppingStreetProxy.data.info.eTime)
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
        else if (this.flag) Utils.alertUtil.alert18n("SHOPPING_STREET_ROLLING");
        else {
            var o = parseInt(e);
            var compareNum = o;
            if(o != 1) {
                compareNum = Initializer.shoppingStreetProxy.tenNum;
            }
            if (Initializer.bagProxy.getItemCount(Initializer.shoppingStreetProxy.data.need) >= compareNum) {
                this.flag = true;
                Initializer.shoppingStreetProxy.sendReard(o);
                this.eff_1.node.active = !0;
                this.eff_1.animation = "animation";
                this.scheduleOnce(this.onShowEff_1, 1);
                for (var n = 0; n < this.urlArr.length; n++)
                    null != this.urlArr[n] &&
                    (this.urlArr[n].node.active = !1);
            } else {
                Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
                    data: Initializer.shoppingStreetProxy.shop[0],
                    activityId: Initializer.shoppingStreetProxy.data.info.id
                });
            }
            //Utils.alertUtil.alertItemLimit(Initializer.shoppingStreetProxy.data.need);
        }
    },

    onShowEff_1 : function () {
        // if (Initializer.shoppingStreetProxy.getShowItem()) {
        //     this.eff_2.node.active = true;
        //     this.eff_2.animation = "animation";
        //     this.scheduleOnce(this.onShowItem, 1);
        // } else {
        //     Initializer.timeProxy.floatReward();
        //     this.onTrunRwd();
        // }

        Initializer.timeProxy.floatReward();
        this.onTrunRwd();
    },

    onTrunRwd : function () {
        if (Initializer.shoppingStreetProxy.trunRwd)
            for (var t = 0; t < Initializer.shoppingStreetProxy.trunRwd.length; t++) {
                var e = Initializer.shoppingStreetProxy.trunRwd[t].clothe,
                    o = Initializer.shoppingStreetProxy.trunRwd[t].item,
                    n = localcache.getItem(localdb.table_userClothe, e.id),
                    r = localcache.getItem(localdb.table_item, o.id);
                Utils.alertUtil.alert(
                    i18n.t("SHOPPING_STREET_TRUN_RWD_TXT", {
                        clothe: n.name,
                        name: r.name,
                        num: o.count
                    })
                );
            }
            Initializer.shoppingStreetProxy.trunRwd = null;
    },

    onShowItem : function () {
        var t = Initializer.shoppingStreetProxy.getShowItem();
        if (t) {
            this.eff_2.node.active = false;
            for (var e = 0; e < this.urlArr.length; e++)
                if (null != this.urlArr[e]) {
                    this.urlArr[e].node.active = e == t.part;
                    this.urlArr[e].url =
                        e == t.part ? Initializer.shoppingStreetProxy.getItemUrl(t) : "";
                    if (6 == e && t.location) {
                        this.urlArr[e].node.x =
                            t.location.length > 0 ? t.location[0] : 0;
                        this.urlArr[e].node.y =
                            t.location.length > 1 ? t.location[1] : 0;
                    }
                }
            this.scheduleOnce(this.showReward, 1);
        }
    },

    showReward : function () {
        Initializer.timeProxy.floatReward();
        this.onTrunRwd();
    },

    onRecords : function () {
        this.records.data = Initializer.shoppingStreetProxy.records;
        this.scroll.scrollToBottom();
    },

    onClickClose : function () {
        Utils.utils.closeView(this);
    },

    onClickCloseWin : function () {
        this.rwdNode.active = false;
        this.itemScroll.scrollToTop();
    },
    onItemUpdate : function () {
        if (Initializer.shoppingStreetProxy.data) {
            var t = Initializer.bagProxy.getItemCount(Initializer.shoppingStreetProxy.data.need);
            this.lblNum.string = t + "";
        }
    },


    onClickTab : function (t, e) {
        if (!this.flag) {
            if ("1" == e) {
                //TimeProxy.funUtils.openView(6262);

                Utils.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    Initializer.shoppingStreetProxy.dhShop
                );

            }else if ("2" == e) {
                Utils.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null, {
                        type: Initializer.limitActivityProxy.SHOPPINGSTREET_TYPE
                    }
                );
            }

            else if ("3" == e) {
                if (Initializer.shoppingStreetProxy.data) {
                    this.rwdNode.active = true;
                    this.rwdList.data = Initializer.shoppingStreetProxy.data.list;
                }
            } else if("4" == e) {
                    //Initializer.shopProxy.openShopBuy(Initializer.shoppingStreetProxy.data.need);
                //Utils.alertUtil.alertItemLimit(Initializer.shoppingStreetProxy.data.need);
                Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
                    data: Initializer.shoppingStreetProxy.shop[0],
                    activityId: Initializer.shoppingStreetProxy.data.info.id
                });
            } else if("5" == e) {
                // Utils.utils.openPrefabView("limitactivity/AtListRankView", null, {
                //     isTangYuan: !0,
                //     id: Initializer.shoppingStreetProxy.data.info.id
                // });
                Utils.utils.openPrefabView("shoppingStreet/ShoppingStreetReward");
            }
        }else {
            Utils.alertUtil.alert18n("GIRLS_DAY_ROLLING");
        }
    },

    onClickItem : function () {
        var t = localcache.getItem(
            localdb.table_item,
            Initializer.shoppingStreetProxy.data.need
        );
        Utils.utils.openPrefabView("ItemInfo", false, t);
    },
    onShowRwdEnd : function () {
        this.scheduleOnce(this.onTimerEnd, 2);
    },

    onTimerEnd : function () {
        Initializer.timeProxy.floatReward();
        this.flag = false;
    },
});
