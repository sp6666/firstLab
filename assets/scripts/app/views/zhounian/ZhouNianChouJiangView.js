const List = require("../../component/List");
const UrlLoad = require('../../component/UrlLoad');
const Initializer = require("../../Initializer");
const UIUtils = require("../../utils/UIUtils");
const Utils = require("../../utils/Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        lblNum : cc.Label,
        lblTime : cc.Label,
        rwdNode : cc.Node,
        urlArr : [UrlLoad.default],
        itemScroll : cc.ScrollView,
        eff_1 : sp.Skeleton,
        eff_2 : sp.Skeleton,
        rwdList : List.default,
        lblCost1 : cc.Label,
        lblCost2 : cc.Label,
    },



    onLoad () {
        this.flag = false;
        facade.subscribe(Initializer.zhouNianChouJiangProxy.ZNCJ_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM,this.onItemUpdate,this);
        facade.subscribe(Initializer.zhouNianChouJiangProxy.ZNCJ_SHOW_RWD_END, this.onShowRwdEnd, this);
        facade.subscribe(Initializer.zhouNianChouJiangProxy.ZNCJ_TRUN_RWD, this.onGetRwdEnd, this);
        Initializer.zhouNianChouJiangProxy.sendOpenGrilsDay();
        Initializer.zhouNianChouJiangProxy.sendLookRank();
        Initializer.shopProxy.sendList(false);

        this.eff_1.setAnimation(0, "idle", true);
        this.eff_2.setAnimation(0, "idle", true);
    },

    onDataUpdate : function(){
        var t = Initializer.zhouNianChouJiangProxy.data;
        if (t) {
            this.onItemUpdate();
            var e = this;
            UIUtils.uiUtils.countDown(t.info.eTime, this.lblTime, function () {
                e.lblTime.string = i18n.t("ACTHD_OVERDUE");
            });
        }
        
    },

    onClickRwd : function (t, e) {
        if (Utils.timeUtil.second > Initializer.zhouNianChouJiangProxy.data.info.eTime)
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
        else if (this.flag) Utils.alertUtil.alert18n("SHOPPING_STREET_ROLLING");
        else {
            var o = parseInt(e);
            var compareNum = o;
            if (Initializer.bagProxy.getItemCount(Initializer.zhouNianChouJiangProxy.data.need) >= compareNum) {
                this.flag = true;
                Initializer.zhouNianChouJiangProxy.sendReard(o);
                this.eff_1.clearTracks();
                this.eff_2.clearTracks();
                this.eff_1.setAnimation(1, "animation", false);
                this.eff_2.setAnimation(1, "animation", false);

                this.eff_1.setCompleteListener(()=> {
                    this.eff_1.setCompleteListener(null);
                    this.eff_1.setAnimation(1, "idle", true);
                })
        
                this.eff_2.setCompleteListener(()=> {
                    this.eff_2.setCompleteListener(null);
                    this.eff_2.setAnimation(1, "idle", true);
                })

                this.scheduleOnce(this.onShowEff_1, 1);
                for (var n = 0; n < this.urlArr.length; n++)
                    null != this.urlArr[n] &&
                    (this.urlArr[n].node.active = !1);
            } else {
                Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
                    data: Initializer.zhouNianChouJiangProxy.shop[0],
                    activityId: Initializer.zhouNianChouJiangProxy.data.info.id
                });
            }
        }
    },

    onGetRwdEnd : function() {
        //更新抽奖次数
        var countNum = Initializer.zhouNianChouJiangProxy.countNum;
        var timeTen = countNum / 10;
        if(timeTen > 0 && countNum % 10 == 0) {
            this.lblCost1.string = "10/10";
        }else {
            this.lblCost1.string = countNum % 10 + "/10";
        }

        var timeFifty = countNum / 50;
        if(timeFifty > 0 && countNum % 50 == 0) {
            this.lblCost2.string = "50/50";
        }else {
            this.lblCost2.string = countNum % 50 + "/50";
        }
    },

    onShowEff_1 : function () {
        Initializer.timeProxy.floatReward();
        //this.onTrunRwd();
    },

    onTrunRwd : function () {
        if (Initializer.zhouNianChouJiangProxy.trunRwd)
            for (var t = 0; t < Initializer.zhouNianChouJiangProxy.trunRwd.length; t++) {
                var e = Initializer.zhouNianChouJiangProxy.trunRwd[t].clothe,
                    o = Initializer.zhouNianChouJiangProxy.trunRwd[t].item,
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
            Initializer.zhouNianChouJiangProxy.trunRwd = null;
    },

    showReward : function () {
        Initializer.timeProxy.floatReward();
        //this.onTrunRwd();
    },



    onClickClose : function () {
        Utils.utils.closeView(this);
    },

    onClickCloseWin : function () {
        this.rwdNode.active = false;
        this.itemScroll.scrollToTop();
    },
    onItemUpdate : function () {
        if (Initializer.zhouNianChouJiangProxy.data) {
            var t = Initializer.bagProxy.getItemCount(Initializer.zhouNianChouJiangProxy.data.need);
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
                    Initializer.zhouNianChouJiangProxy.dhShop
                );

            }else if ("2" == e) {
                Utils.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null, {
                        type: Initializer.limitActivityProxy.ZNCJ_TYPE
                    }
                );
            }

            else if ("3" == e) {
                if (Initializer.zhouNianChouJiangProxy.data) {
                    this.rwdNode.active = true;
                    this.rwdList.data = Initializer.zhouNianChouJiangProxy.data.list;
                }
            } else if("4" == e) {
                Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
                    data: Initializer.zhouNianChouJiangProxy.shop[0],
                    activityId: Initializer.zhouNianChouJiangProxy.data.info.id
                });
            } else if("5" == e) {
                Utils.utils.openPrefabView("zhounian/ZhouNianChouJiangReward");
            }
        }else {
            Utils.alertUtil.alert18n("GIRLS_DAY_ROLLING");
        }
    },

    onClickItem : function () {
        var t = localcache.getItem(
            localdb.table_item,
            Initializer.zhouNianChouJiangProxy.data.need
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
