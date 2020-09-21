const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const List = require("../../component/List");
const UIUtils = require("../../utils/UIUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        list: List.default,
        scroll: cc.ScrollView,
        records: List.default,
        lblTime: cc.Label,
        lblNum: cc.Label,
        lblCount1: cc.Label,
        lblCount2: cc.Label,
        lblCount3: cc.Label,
        lblCount4: cc.Label,
        lblCount5: cc.Label,
        lblCount6: cc.Label,
        lblCount7: cc.Label,
        lblTitle1: cc.Label,
        lblTitle2: cc.Label,
        lblTitle3: cc.Label,
        lblTitle4: cc.Label,
        lblTitle5: cc.Label,
        lblTitle6: cc.Label,
        lblTitle7: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        facade.subscribe(Initializer.zhouNianProxy.ZHOUNIAN_DATA_UPDATE, this.onDataUpdate, this); //获得数据
        facade.subscribe(Initializer.zhouNianProxy.ZHOUNIAN_DATA_RECORDS, this.onRecords, this);
        facade.subscribe(Initializer.zhouNianChouJiangProxy.ZNCJ_DATA_UPDATE, this.onUpdateQuan, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM, this.onUpdateQuan, this);
        Initializer.zhouNianChouJiangProxy.sendOpenGrilsDay();
        Initializer.zhouNianProxy.sendOpenActivity();
        Initializer.purchaseProxy.sendOpenPrince();
    },

    start() {

    },

    onDataUpdate: function () {
        if (Initializer.zhouNianProxy.data == null) return;
        cc.log("onDataUpdate success");
        UIUtils.uiUtils.countDown(Initializer.zhouNianProxy.data.info.eTime, this.lblTime, () => {
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");
        });
        var shopList = Initializer.zhouNianProxy.data.show;
        var itemListData = [];
        for (i = 0; i < shopList.length; i++) {
            var itemSlotData = new UIUtils.ItemSlotData();
            itemSlotData.id = shopList[i].id;
            itemSlotData.kind = shopList[i].kind;
            itemSlotData.count = shopList[i].count;
            itemListData.push(itemSlotData);
        }
        this.list.data = itemListData;

        //更新时间
        // UIUtils.uiUtils.countDown(Initializer.zhouNianProxy.data.info.eTime, this.lblCount1, ()=> {
        //     this.lblTitle1.string = i18n.t("ACTHD_OVERDUE");
        //     this.lblCount1.node.active = false;
        // });
        this.lblTitle2.string = i18n.t("ZHOUNIAN_HUODONG_END");
        UIUtils.uiUtils.countDown(Initializer.zhouNianProxy.data.info.eTime, this.lblCount2, () => {
            this.lblTitle2.string = i18n.t("ACTHD_OVERDUE");
            this.lblCount2.node.active = false;
        });

        var activity = Initializer.zhouNianProxy.data.activity;
        if (Utils.timeUtil.second < activity[0].startTime) {
            this.lblTitle3.string = i18n.t("ZHOUNIAN_HUODONG_START");
            UIUtils.uiUtils.countDown(activity[0].startTime, this.lblCount3, () => {
                UIUtils.uiUtils.countDown(activity[0].endTime, this.lblCount3, () => {
                    this.lblTitle3.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount3.node.active = false;
                });
            });
        } else {
            this.lblTitle3.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(activity[0].startTime, this.lblCount3, () => {
                UIUtils.uiUtils.countDown(activity[0].endTime, this.lblCount3, () => {
                    this.lblTitle3.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount3.node.active = false;
                });
            });
        }
        if (Utils.timeUtil.second < activity[1].startTime) {
            this.lblTitle4.string = i18n.t("ZHOUNIAN_HUODONG_START");
            UIUtils.uiUtils.countDown(activity[1].startTime, this.lblCount4, () => {
                UIUtils.uiUtils.countDown(activity[1].endTime, this.lblCount4, () => {
                    this.lblTitle4.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount4.node.active = false;
                });
            });
        } else {
            this.lblTitle4.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(activity[1].startTime, this.lblCount4, () => {
                UIUtils.uiUtils.countDown(activity[1].endTime, this.lblCount4, () => {
                    this.lblTitle4.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount4.node.active = false;
                });
            });
        }

        if (Utils.timeUtil.second < activity[2].startTime) {
            this.lblTitle5.string = i18n.t("ZHOUNIAN_HUODONG_START");
            UIUtils.uiUtils.countDown(activity[2].startTime, this.lblCount5, () => {
                UIUtils.uiUtils.countDown(activity[2].endTime, this.lblCount5, () => {
                    this.lblTitle5.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount5.node.active = false;
                });
            });
        } else {
            this.lblTitle5.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(activity[2].startTime, this.lblCount5, () => {
                UIUtils.uiUtils.countDown(activity[2].endTime, this.lblCount5, () => {
                    this.lblTitle5.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount5.node.active = false;
                });
            });
        }

        if (Utils.timeUtil.second < activity[3].startTime) {
            this.lblTitle6.string = i18n.t("ZHOUNIAN_HUODONG_START");
            UIUtils.uiUtils.countDown(activity[3].startTime, this.lblCount6, () => {
                UIUtils.uiUtils.countDown(activity[3].endTime, this.lblCount6, () => {
                    this.lblTitle6.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount6.node.active = false;
                });
            });
        } else {
            this.lblTitle6.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(activity[3].startTime, this.lblCount6, () => {
                UIUtils.uiUtils.countDown(activity[3].endTime, this.lblCount6, () => {
                    this.lblTitle6.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount6.node.active = false;
                });
            });
        }

        if (Utils.timeUtil.second < activity[4].startTime) {
            this.lblTitle7.string = i18n.t("ZHOUNIAN_HUODONG_START");
            UIUtils.uiUtils.countDown(activity[4].startTime, this.lblCount7, () => {
                UIUtils.uiUtils.countDown(activity[4].endTime, this.lblCount7, () => {
                    this.lblTitle7.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount7.node.active = false;
                });
            });
        } else {
            this.lblTitle7.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(activity[4].startTime, this.lblCount7, () => {
                UIUtils.uiUtils.countDown(activity[4].endTime, this.lblCount7, () => {
                    this.lblTitle7.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount7.node.active = false;
                });
            });
        }

    },

    onUpdateQuan: function () {
        if (Initializer.zhouNianChouJiangProxy.data) {
            var t = Initializer.bagProxy.getItemCount(Initializer.zhouNianChouJiangProxy.data.need);
            this.lblNum.string = t + "";

            this.lblTitle1.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(Initializer.zhouNianChouJiangProxy.data.info.eTime, this.lblCount1, () => {
                this.lblTitle1.string = i18n.t("ACTHD_OVERDUE");
                this.lblCount1.node.active = false;
            });

        }
    },

    onCloseClick: function () {
        Utils.utils.closeView(this);
    },

    onJumpClick: function (evt, customData) {
        var index = parseInt(customData);
        if (isNaN(index)) return;

        var param = null;
        var url = null;
        var startTime = 0;
        var endTime = Number.POSITIVE_INFINITY;
        switch (index) {
            case 0:
                //抽奖
                url = "zhounian/ZhouNianChouJiangView";
                Utils.utils.closeView(this);
                break;

            case 1:
                //兑换1
                url = "zhounian/ZhouNianShopView";
                param = Initializer.zhouNianProxy.dhShop1
                break;
            case 2:
                //兑换2
                startTime = Initializer.zhouNianProxy.data.activity[0].startTime;
                url = "zhounian/ZhouNianShopZhenView";
                param = Initializer.zhouNianProxy.dhShop2
                break;
            case 3:
                //堆雪人
                startTime = Initializer.zhouNianProxy.data.activity[1].startTime;
                endTime = Initializer.zhouNianProxy.data.activity[1].endTime;
                url = "snowman/SnowManView";
                break;
            case 4:
                //奇幻夜复刻
                startTime = Initializer.zhouNianProxy.data.activity[2].startTime;
                endTime = Initializer.zhouNianProxy.data.activity[2].endTime;
                url = "xiuyunge/XiuYunMainView";
                break;
            case 5:
                //圣诞节
                startTime = Initializer.zhouNianProxy.data.activity[3].startTime;
                endTime = Initializer.zhouNianProxy.data.activity[3].endTime;
                url = "shengdan/ShengDanView";
                break;
            case 6:
                //元旦
                startTime = Initializer.zhouNianProxy.data.activity[4].startTime;
                endTime = Initializer.zhouNianProxy.data.activity[4].endTime;
                url = "newyear/NewYearView";
                break;
            case 7:
                //元旦
                url = "purchase/PurchaseView";
                break;
            case 8:
                //目标
                url = "zhounian/ZhouNianBiaoView";
                break;
            case 9:
                //当周冲榜
                url = "limitactivity/AtListView";
                break;
        }
        if (Utils.timeUtil.second < startTime) {
            Utils.alertUtil.alert18n("COMMON_NOOPEN");
            return;
        }

        if (Utils.timeUtil.second > endTime) {
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
            return;
        }

        if (url == null) return;
        Utils.utils.openPrefabView(url, null, param);
    },



    onClickAdd: function () {
        Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: Initializer.zhouNianChouJiangProxy.shop[0],
            activityId: Initializer.zhouNianChouJiangProxy.data.info.id
        });
    },

    onRecords: function () {
        this.records.data = Initializer.zhouNianProxy.records;
        this.scroll.scrollToBottom();
    },
});