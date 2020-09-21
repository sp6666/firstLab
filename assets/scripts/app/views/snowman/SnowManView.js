var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/List"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBall = null;
            e.lblJindu = null;
            e.lblLevel = null;
            e.lblTime = null;
            e.proBar = null;
            e.snowUrl = null;
            e.snowEff = null;
            e.effArr = [];
            e.giftEff = null;
            e.tipNode = null;
            e.record = null;
            e.scroll = null;
            e.springEff_1 = null;
            e.springEff_10 = null;
            e.snowNum = 0;
            e.snowing = !1;
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.snowmanProxy.SNOWMAN_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe(
                l.snowmanProxy.SNOWMAN_RECORDS_UPDATE,
                this.onRecord,
                this
            );
            r.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            l.snowmanProxy.sendOpenSnowMan();
            this.onItemUpdate();
        };
        e.prototype.onDataUpdate = function () {
            var t = this,
                e = l.snowmanProxy.data;
            if (e) {


                l.limitActivityProxy.SNOWMAN_ID == l.snowmanProxy.data.info.type ?
                    (this.snowUrl.url = r.uiHelps.getSnowmanIcon(
                        e.bossinfo.skin
                    )) :
                    (this.snowUrl.url = r.uiHelps.getSpringBz(1));
                r.uiUtils.countDown(e.info.showTime, this.lblTime, function () {
                    i.timeUtil.second >= e.info.showTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                this.lblJindu.string =
                    e.bossinfo.lv >= 10 ?
                    i18n.t("SNOWMAN_ZUI_GAO_JI") :
                    i18n.t("COMMON_NUM", {
                        f: e.bossinfo.val,
                        s: e.bossinfo.hp
                    });
                this.proBar.progress =
                    e.bossinfo.lv >= 10 ? 1 : e.bossinfo.val / e.bossinfo.hp;
                this.lblLevel.string = i18n.t("COMMON_LEVEL_TXT", {
                    lv: e.bossinfo.lv
                });
                this.lblBall.string =
                    l.bagProxy.getItemCount(l.snowmanProxy.data.need) + "";
                this.tipNode.active =
                    0 == l.bagProxy.getItemCount(l.snowmanProxy.data.need);
                l.snowmanProxy.hasRed() ?
                    (this.giftEff.animation = "tx") :
                    (this.giftEff.animation = "zc");
            }
        };
        e.prototype.onItemUpdate = function () {
            if (l.snowmanProxy.data) {
                var t = l.bagProxy.getItemCount(l.snowmanProxy.data.need);
                this.tipNode.active = 0 == t;
                this.lblBall.string = t + "";
            }
        };
        e.prototype.onClickSnow = function (t, e) {
            if (null != l.snowmanProxy.data)
                if (this.snowing) i.alertUtil.alert18n("SNOWMAN_BUILDING");
                else {
                    this.snowNum = parseInt(e);
                    if (
                        l.bagProxy.getItemCount(l.snowmanProxy.data.need) >=
                        this.snowNum
                    ) {
                        if (1 == this.snowNum) {
                            if (l.limitActivityProxy.SNOWMAN_ID == l.snowmanProxy.data.info.type) {
                                this.snowEff.node.active = !0;
                                this.snowEff.animation = "animation";
                            } else {
                                this.springEff_1.node.active = !0;
                                this.springEff_1.animation = "animation";
                            }
                            this.scheduleOnce(this.onTimer, 1);
                        } else if (10 == this.snowNum)
                            if (l.limitActivityProxy.SNOWMAN_ID == l.snowmanProxy.data.info.type)
                                this.schedule(this.onShowEff, 0.25);
                            else {
                                this.springEff_10.node.active = !0;
                                this.springEff_10.animation = "animation";
                                this.scheduleOnce(this.onTimer2, 1);
                            }
                        this.snowing = !0;
                    } else i.alertUtil.alertItemLimit(l.snowmanProxy.data.need);
                }
        };
        e.prototype.onTimer = function () {
            1 == this.snowNum &&
                l.bagProxy.getItemCount(l.snowmanProxy.data.need) >= 1 &&
                l.snowmanProxy.sendSnowManOnce();
            this.snowing = !1;
        };
        e.prototype.onShowEff = function () {
            for (var t = 0; t < this.effArr.length; t++)
                if (this.curIndex == t) {
                    this.effArr[t].node.active = !0;
                    this.effArr[t].animation = "animation";
                }
            this.curIndex++;
            if (this.curIndex >= this.effArr.length - 1) {
                l.snowmanProxy.sendSnowManTen();
                this.curIndex = 0;
                this.snowing = !1;
                this.unscheduleAllCallbacks();
            }
        };
        e.prototype.onTimer2 = function () {
            this.snowing = !1;
            l.snowmanProxy.sendSnowManTen();
        };
        e.prototype.onClickGift = function () {
            i.utils.openPrefabView("snowman/SnowManReward");
        };
        e.prototype.onClickTab = function (t, e) {
            if ("0" == e) {

                i.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    l.snowmanProxy.dhShop
                );

                //l.snowmanProxy.sendExchange();

            } else if ("1" == e) {
                var o = l.limitActivityProxy.SNOWMAN_TYPE;
                i.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null, {
                        type: o
                    }
                );
            } else if ("2" == e) {
                i.utils.openPrefabView("snowman/SnowManRankReward");
            } else {
                l.snowmanProxy.sendLjPaiHang();
            }
        };
        e.prototype.onClickAdd = function () {

            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: l.snowmanProxy.shop[0],
                activityId: l.snowmanProxy.data.info.type
            });

        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        e.prototype.onRecord = function () {
            if (this.record) {
                this.record.data = l.snowmanProxy.records;
                this.scroll.scrollToBottom();
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblJindu", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "proBar", void 0);
        __decorate([_(n.default)], e.prototype, "snowUrl", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "snowEff", void 0);
        __decorate([_([sp.Skeleton])], e.prototype, "effArr", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "giftEff", void 0);
        __decorate([_(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([_(a.default)], e.prototype, "record", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "springEff_1", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "springEff_10", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;