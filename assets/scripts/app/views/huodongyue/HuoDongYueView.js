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
        facade.subscribe(Initializer.huoDongYueProxy.HUODONGYUE_DATA_UPDATE, this.onDataUpdate, this); //获得数据
        facade.subscribe(Initializer.huoDongYueProxy.HUODONGYUE_DATA_RECORDS, this.onRecords, this);
        facade.subscribe(Initializer.huoDongYueChouJiangProxy.HDY_DATA_UPDATE, this.onUpdateQuan, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM, this.onUpdateQuan, this);
        Initializer.huoDongYueChouJiangProxy.sendOpenGrilsDay();
        Initializer.huoDongYueProxy.sendOpenActivity();
        Initializer.purchaseProxy.sendOpenPrince();
    },

    start() {

    },

    onDataUpdate: function () {
        if (Initializer.huoDongYueProxy.data == null) return;
        cc.log("onDataUpdate success");
        UIUtils.uiUtils.countDown(Initializer.huoDongYueProxy.data.info.eTime, this.lblTime, () => {
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");
        });
        var shopList = Initializer.huoDongYueProxy.data.show;
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
        var activity = Initializer.huoDongYueProxy.data.activity;
        // UIUtils.uiUtils.countDown(Initializer.huoDongYueProxy.data.info.eTime, this.lblCount1, ()=> {
        //     this.lblTitle1.string = i18n.t("ACTHD_OVERDUE");
        //     this.lblCount1.node.active = false;
        // });

        if (Utils.timeUtil.second < activity[0].startTime) {
            this.lblTitle1.string = i18n.t("ZHOUNIAN_HUODONG_START");
            UIUtils.uiUtils.countDown(activity[0].startTime, this.lblCount1, () => {
                UIUtils.uiUtils.countDown(activity[0].endTime, this.lblCount1, () => {
                    this.lblTitle1.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount1.node.active = false;
                });
            });
        } else {
            this.lblTitle1.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(activity[0].startTime, this.lblCount1, () => {
                UIUtils.uiUtils.countDown(activity[0].endTime, this.lblCount1, () => {
                    this.lblTitle1.string = i18n.t("ACTHD_OVERDUE");
                    this.lblCount1.node.active = false;
                });
            });
        }

        this.lblTitle2.string = i18n.t("ZHOUNIAN_HUODONG_END");
        UIUtils.uiUtils.countDown(Initializer.huoDongYueProxy.data.info.eTime, this.lblCount2, () => {
            this.lblTitle2.string = i18n.t("ACTHD_OVERDUE");
            this.lblCount2.node.active = false;
        });

        
        // if (Utils.timeUtil.second < activity[0].startTime) {
        //     this.lblTitle3.string = i18n.t("ZHOUNIAN_HUODONG_START");
        //     UIUtils.uiUtils.countDown(activity[0].startTime, this.lblCount3, () => {
        //         UIUtils.uiUtils.countDown(activity[0].endTime, this.lblCount3, () => {
        //             this.lblTitle3.string = i18n.t("ACTHD_OVERDUE");
        //             this.lblCount3.node.active = false;
        //         });
        //     });
        // } else {
        //     this.lblTitle3.string = i18n.t("ZHOUNIAN_HUODONG_END");
        //     UIUtils.uiUtils.countDown(activity[0].startTime, this.lblCount3, () => {
        //         UIUtils.uiUtils.countDown(activity[0].endTime, this.lblCount3, () => {
        //             this.lblTitle3.string = i18n.t("ACTHD_OVERDUE");
        //             this.lblCount3.node.active = false;
        //         });
        //     });
        // }
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
        if (Initializer.huoDongYueChouJiangProxy.data) {
            this.lblTitle3.string = i18n.t("ZHOUNIAN_HUODONG_END");
            UIUtils.uiUtils.countDown(Initializer.huoDongYueChouJiangProxy.data.info.eTime, this.lblCount3, () => {
                this.lblTitle3.string = i18n.t("ACTHD_OVERDUE");
                this.lblCount3.node.active = false;
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
                //兑换2
                startTime = Initializer.huoDongYueProxy.data.activity[0].startTime;
                //url = "huodongyue/HuoDongYueShopZhenView";
                url = Initializer.huoDongYueProxy.data.activity[0].url;
                param = Initializer.huoDongYueProxy.dhShop2
                
                break;

            case 1:
                //兑换1
                url = "huodongyue/HuoDongYueShopView";
                param = Initializer.huoDongYueProxy.dhShop1
                break;
            case 2:
                //抽奖
                url = "huodongyue/HuoDongYueChouJiangView";
                Utils.utils.closeView(this);
                break;
            case 3:
                //堆雪人
                startTime = Initializer.huoDongYueProxy.data.activity[1].startTime;
                endTime = Initializer.huoDongYueProxy.data.activity[1].endTime;
                url = Initializer.huoDongYueProxy.data.activity[1].url;
                break;
            case 4:
                //奇幻夜复刻
                startTime = Initializer.huoDongYueProxy.data.activity[2].startTime;
                endTime = Initializer.huoDongYueProxy.data.activity[2].endTime;
                url = Initializer.huoDongYueProxy.data.activity[2].url;
                break;
            case 5:
                //圣诞节
                startTime = Initializer.huoDongYueProxy.data.activity[3].startTime;
                endTime = Initializer.huoDongYueProxy.data.activity[3].endTime;
                url = Initializer.huoDongYueProxy.data.activity[3].url;
                break;
            case 6:
                //元旦
                startTime = Initializer.huoDongYueProxy.data.activity[4].startTime;
                endTime = Initializer.huoDongYueProxy.data.activity[4].endTime;
                url = Initializer.huoDongYueProxy.data.activity[4].url;
                break;
            case 7:
                //元旦
                url = "purchase/PurchaseView";
                break;
            case 8:
                //目标
                url = "huodongyue/HuoDongYueBiaoView";
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

        if (url == null || url == "") return;
        Utils.utils.openPrefabView(url, null, param);
    },



    onClickAdd: function () {
        Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: Initializer.huoDongYueChouJiangProxy.shop[0],
            activityId: Initializer.huoDongYueChouJiangProxy.data.info.id
        });
    },

    onRecords: function () {
        this.records.data = Initializer.huoDongYueProxy.records;
        this.scroll.scrollToBottom();
    },
});