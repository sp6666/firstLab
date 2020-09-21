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
    },



    onLoad () {
        this.flag = false;
        facade.subscribe(Initializer.xingYuDengLuoProxy.XINGYUDENGLUO_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe(Initializer.xingYuDengLuoProxy.XINGYUDENGLUO_RECORDS, this.onRecords, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM,this.onItemUpdate,this);
        facade.subscribe(Initializer.xingYuDengLuoProxy.XINGYUDENGLUO_SHOW_RWD_END, this.onShowRwdEnd, this);
        Initializer.timeProxy.itemReward = null;
        Initializer.xingYuDengLuoProxy.sendOpenGrilsDay();
        //Initializer.xingYuDengLuoProxy.sendLookRank();
        Initializer.shopProxy.sendList(false);
    },

    onDataUpdate : function(){
        var t = Initializer.xingYuDengLuoProxy.data;
        if (t) {
            this.onItemUpdate();
            var e = this;
            UIUtils.uiUtils.countDown(t.info.eTime, this.lblTime, function () {
                e.lblTime.string = i18n.t("ACTHD_OVERDUE");
            });
            this.lblTenNum.string = Initializer.xingYuDengLuoProxy.tenNum;
        }
        
    },

    onClickRwd : function (t, e) {
        if (Utils.timeUtil.second > Initializer.xingYuDengLuoProxy.data.info.eTime)
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
        else if (this.flag) Utils.alertUtil.alert18n("SHOPPING_STREET_ROLLING");
        else {
            var o = parseInt(e);
            var compareNum = o;
            if(o != 1) {
                compareNum = Initializer.xingYuDengLuoProxy.tenNum;
            }
            if (Initializer.bagProxy.getItemCount(Initializer.xingYuDengLuoProxy.data.need) >= compareNum) {
                this.flag = true;
                Initializer.xingYuDengLuoProxy.sendReard(o);
                if(o == 1) {
                    this.eff_1.node.active = !0;
                    this.eff_1.animation = "animation";
                }else {
                    this.eff_2.node.active = !0;
                    this.eff_2.animation = "animation";
                }
                this.scheduleOnce(this.onShowEff_1, 1);
                for (var n = 0; n < this.urlArr.length; n++)
                    null != this.urlArr[n] &&
                    (this.urlArr[n].node.active = !1);
            } else {
                Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
                    data: Initializer.xingYuDengLuoProxy.shop[0],
                    activityId: Initializer.xingYuDengLuoProxy.data.info.id
                });
            }
            //Utils.alertUtil.alertItemLimit(Initializer.xingYuDengLuoProxy.data.need);
        }
    },

    onShowEff_1 : function () {
        Initializer.timeProxy.floatReward();
        this.onTrunRwd();
    },

    onTrunRwd : function () {
        if (Initializer.xingYuDengLuoProxy.trunRwd != null) {
            for (var t = 0; t < Initializer.xingYuDengLuoProxy.trunRwd.length; t++) {
                var e = Initializer.xingYuDengLuoProxy.trunRwd[t].clothe,
                    o = Initializer.xingYuDengLuoProxy.trunRwd[t].item,
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
            Initializer.xingYuDengLuoProxy.trunRwd = null;
        }

        
    },

    onShowItem : function () {
        var t = Initializer.xingYuDengLuoProxy.getShowItem();
        if (t) {
            this.eff_2.node.active = false;
            for (var e = 0; e < this.urlArr.length; e++)
                if (null != this.urlArr[e]) {
                    this.urlArr[e].node.active = e == t.part;
                    this.urlArr[e].url =
                        e == t.part ? Initializer.xingYuDengLuoProxy.getItemUrl(t) : "";
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
        this.records.data = Initializer.xingYuDengLuoProxy.records;
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
        if (Initializer.xingYuDengLuoProxy.data) {
            var t = Initializer.bagProxy.getItemCount(Initializer.xingYuDengLuoProxy.data.need);
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
                    Initializer.xingYuDengLuoProxy.dhShop
                );

            }else if ("2" == e) {
                Utils.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null, {
                        type: Initializer.limitActivityProxy.XINGYUDENGLUO_TYPE
                    }
                );
            }

            else if ("3" == e) {
                if (Initializer.xingYuDengLuoProxy.data) {
                    this.rwdNode.active = true;
                    this.rwdList.data = Initializer.xingYuDengLuoProxy.data.list;
                }
            } else if("4" == e) {
                Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
                    data: Initializer.xingYuDengLuoProxy.shop[0],
                    activityId: Initializer.xingYuDengLuoProxy.data.info.id
                });
            } else if("5" == e) {
                Initializer.xingYuDengLuoProxy.sendLookRank(()=> {
                    Utils.utils.openPrefabView("xingYuDengLuo/XingYuDengLuoReward");
                })
                
            } else if("6" == e) {
                if(Initializer.xingYuDengLuoProxy.base == null) {
                    Utils.alertUtil.alert18n("COMMON_DATA_ERROR");
                    return;
                }
                Utils.utils.openPrefabView("xingYuDengLuo/XingYuDengLuoLeiJi");
            }
        }else {
            Utils.alertUtil.alert18n("GIRLS_DAY_ROLLING");
        }
    },

    onClickItem : function () {
        var t = localcache.getItem(
            localdb.table_item,
            Initializer.xingYuDengLuoProxy.data.need
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
