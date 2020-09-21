const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const UIUtils = require("../../utils/UIUtils");
const List = require("../../component/List");
cc.Class({
    extends: cc.Component,

    properties: {
        lblBall: cc.Label,
        lblTime: cc.Label,
        pbReward: cc.ProgressBar,
        records: List.default,
        list: List.default,
        scrollLevel: cc.ScrollView,
        scroll: cc.ScrollView,
        rewardBtn: cc.Node,
        lblProgress: cc.Label,
    },

    onLoad() {
        facade.subscribe(Initializer.sakuraProxy.SAKURA_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe(Initializer.sakuraProxy.SAKURA_RECORDS, this.onRecords, this);
        facade.subscribe(Initializer.sakuraProxy.SAKURA_LEVELDATA, this.onDataUpdate, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM, this.onUpdateQuan, this);
        Initializer.timeProxy.itemReward = null;
        Initializer.sakuraProxy.sendOpenActivity();
        //this.onUpdateQuan();
    },

    onDataUpdate: function () {
        var data = Initializer.sakuraProxy.data;
        var level_data = Initializer.sakuraProxy.level_data;
        if (data == null || level_data == null) return;

        UIUtils.uiUtils.countDown(
            data.info.eTime,
            this.lblTime,
            () => {
                this.lblTime.string = i18n.t("ACTHD_OVERDUE");
            }
        );

        var progress = level_data.cs_tree / data.total;
        this.pbReward.progress = level_data.cs_tree / data.total;
        this.lblProgress.string = level_data.cs_tree + " / " + data.total;
        if (progress >= 1 && level_data.status == 0) {
            this.rewardBtn.children[2].active = true;
            this.rewardBtn.children[1].active = true;
            this.rewardBtn.children[0].active = true;
        } else {
            this.rewardBtn.children[2].active = false;
            this.rewardBtn.children[1].active = false;
            this.rewardBtn.children[0].active = false;
        }
        this.list.data = data.cts;
        var index = (level_data.cts && level_data.cts.length > 0) ? level_data.cts.length - 1 : 0
        this.scrollLevel.scrollToOffset(cc.v2(260 * index, 0), 0.1);
        this.onUpdateQuan();
    },

    onUpdateQuan: function () {
        if (Initializer.sakuraProxy.data == null) return;
        this.lblBall.string = Initializer.bagProxy.getItemCount(Initializer.sakuraProxy.data.need)
    },

    onRecords: function () {
        if (Initializer.sakuraProxy.records == null) return;
        this.records.data = Initializer.sakuraProxy.records;
        this.scroll.scrollToBottom();
    },

    onClickAdd: function () {
        Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: Initializer.sakuraProxy.shop[0],
            activityId: Initializer.sakuraProxy.data.info.type,
            buyOnce: 999,
        });
    },

    onClickGetProgressRwd: function () {
        var data = Initializer.sakuraProxy.data;
        var level_data = Initializer.sakuraProxy.level_data;
        var progress = level_data.cs_tree / data.total;
        if (level_data.status == 1 || progress < 1) {
            //已领取或者进度还没满
            Utils.utils.openPrefabView("ItemInfo", !1, data.cs_rwd[0]);
        } else {
            Initializer.sakuraProxy.sendRwd(1, 2);
        }
    },

    onClickClose: function () {
        Utils.utils.closeView(this);
    },

    onClickTab: function (t, e) {
        switch (e) {
            case "1":
                Utils.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    Initializer.sakuraProxy.exchange
                );
                break;
            case "2":
                Utils.utils.openPrefabView("sakura/SakuraReward");
                break;
            case "3":
                Utils.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null,
                    {
                        type: Initializer.limitActivityProxy.SAKURA_TYPE
                    }
                );
                break;
            case "4":
                Utils.utils.openPrefabView(
                    "sakura/SakuraLeiJi",
                    null,
                    {
                        type: Initializer.limitActivityProxy.SAKURA_TYPE
                    }
                );
                break;
            default:
                break;
        }
    },
});
