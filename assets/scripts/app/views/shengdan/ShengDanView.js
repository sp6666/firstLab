const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const UIUtils = require("../../utils/UIUtils");
const List = require("../../component/List");
cc.Class({
    extends: cc.Component,

    properties: {
        lblBall: cc.Label,
        lblTime:cc.Label,
        pbReward:cc.ProgressBar,
        records: List.default,
        list : List.default,
        scrollLevel: cc.ScrollView,
        scroll: cc.ScrollView,
        rewardBtn: cc.Node,
        lblProgress : cc.Label,
    },

    onLoad() {
        facade.subscribe(Initializer.shengDanProxy.SHENGDAN_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe(Initializer.shengDanProxy.SHENGDAN_RECORDS,this.onRecords, this);
        facade.subscribe(Initializer.shengDanProxy.SHENGDAN_LEVELDATA,this.onDataUpdate, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM,this.onUpdateQuan,this);
        Initializer.timeProxy.itemReward = null;
        Initializer.shengDanProxy.sendOpenActivity();
        //this.onUpdateQuan();
    },

    onDataUpdate : function() {
        var data = Initializer.shengDanProxy.data;
        var level_data = Initializer.shengDanProxy.level_data;
        if(data == null || level_data == null) return;

        UIUtils.uiUtils.countDown(
            data.info.eTime,
            this.lblTime,
            ()=> {
                this.lblTime.string = i18n.t("ACTHD_OVERDUE");
            }
        );

        var progress = level_data.cs_tree / data.total;
        this.pbReward.progress = level_data.cs_tree / data.total;
        this.lblProgress.string = level_data.cs_tree + " / " + data.total;
        if(progress >= 1 && level_data.status == 0) {
            this.rewardBtn.children[2].active = true;
            this.rewardBtn.children[1].active = true;
            this.rewardBtn.children[0].active = true;
        }else {
            this.rewardBtn.children[2].active = false;
            this.rewardBtn.children[1].active = false;
            this.rewardBtn.children[0].active = false;
        }
        this.list.data = data.cts;
        this.scrollLevel.scrollToPercentHorizontal(Initializer.shengDanProxy.getLevelProgress(), 0.2);
        //this.lblBall.string = Initializer.shengDanProxy.getCount();
        this.onUpdateQuan();
    },

    onUpdateQuan : function() {
        if(Initializer.shengDanProxy.data == null) return;
        this.lblBall.string = Initializer.bagProxy.getItemCount(Initializer.shengDanProxy.data.need)
    },

    onRecords: function() {
        if(Initializer.shengDanProxy.records == null) return;
        this.records.data = Initializer.shengDanProxy.records;
        this.scroll.scrollToBottom();
    },

    onClickAdd: function() {
        Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: Initializer.shengDanProxy.shop[0],
            activityId: Initializer.shengDanProxy.data.info.type,
            buyOnce : 999,
        });
    },

    onClickGetProgressRwd : function() {
        var data = Initializer.shengDanProxy.data;
        var level_data = Initializer.shengDanProxy.level_data;
        var progress = level_data.cs_tree / data.total;
        if(level_data.status == 1 || progress < 1) {
            //已领取或者进度还没满
            Utils.utils.openPrefabView("thanksGiving/ThanksGivingRwdView", false, data.cs_rwd);
        }else {
            Initializer.shengDanProxy.sendRwd(1, 2);
        }
    },

    onClickClose: function() {
        Utils.utils.closeView(this);
    },

    onClickTab: function(t, e) {
        switch (e) {
            case "1":
                Utils.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    Initializer.shengDanProxy.exchange
                );
                break;
            case "2":
                Utils.utils.openPrefabView("shengdan/ShengDanReward");
                break;
            case "3":
                Utils.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: Initializer.limitActivityProxy.SHENGDAN_TYPE
                        }
                    );
                    break;
            default:
                break;
        }
    },
});
