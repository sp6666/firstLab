var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/TimeProxy"),
    s = require("../../component/UrlLoad"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblNum = null;
            e.lblTime = null;
            e.records = null;
            e.rwdNode = null;
            e.rwdList = null;
            e.scroll = null;
            e.itemScroll = null;
            e.urlArr = [];
            e.eff_1 = null;
            e.box_close = null;
            e.box_open = null;
            e.flag = !1;
            e._num = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.readingDayProxy.READING_DAY_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.readingDayProxy.READING_DAY_RECORDS,
                this.onReadingRecords,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            l.readingDayProxy.sendOpenReadingDay();
        };
        e.prototype.onDataUpdate = function() {
            var t = l.readingDayProxy.data;
            if (t) {
                this.onItemUpdate();
                var e = this;
                r.uiUtils.countDown(t.info.eTime, this.lblTime, function() {
                    e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                });
            }
        };
        e.prototype.onClickRwd = function(t, e) {
            if (i.timeUtil.second > l.readingDayProxy.data.info.eTime)
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else if (this.flag) i.alertUtil.alert18n("READING_DAY_ROLLING");
            else {
                var o = parseInt(e);
                if (l.bagProxy.getItemCount(l.readingDayProxy.data.need) >= o) {
                    this.flag = !0;
                    this.eff_1.node.active = !0;
                    this.eff_1.animation = "animation";
                    this.scheduleOnce(this.onShowEff_1, 1);
                    l.timeProxy.floatReward();
                    this._num = o;
                } else {
                    i.alertUtil.alertItemLimit(l.readingDayProxy.data.need);
                    i.utils.openPrefabView("ActivitySpecialBuy", null, {
                        data: l.readingDayProxy.shop[0],
                        activityId: l.readingDayProxy.data.info.id
                    });
                }
            }
        };
        e.prototype.onShowEff_1 = function() {
            this.box_close.active = !1;
            this.box_open.active = !0;
            this.scheduleOnce(this.onTimer2, 0.5);
        };
        e.prototype.onTimer2 = function() {
            l.readingDayProxy.sendReard(this._num);
            this.scheduleOnce(this.onTimer3, 1);
        };
        e.prototype.onTimer3 = function() {
            this.box_close.active = !0;
            this.box_open.active = !1;
            this.flag = !1;
        };
        e.prototype.showReward = function() {
            l.timeProxy.floatReward();
            this.flag = !1;
        };
        e.prototype.onReadingRecords = function() {
            this.records.data = l.readingDayProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
            l.jibanProxy.sendWishInfo();
        };
        e.prototype.onClickCloseWin = function() {
            this.rwdNode.active = !1;
            this.itemScroll.scrollToTop();
        };
        e.prototype.onItemUpdate = function() {
            if (l.readingDayProxy.data) {
                var t = l.bagProxy.getItemCount(l.readingDayProxy.data.need);
                this.lblNum.string = t + "";
            }
        };
        e.prototype.onClicTab = function(t, e) {
            if (1 != this.flag)
                if ("1" == e) a.funUtils.openView(a.funUtils.duihuanShop.id);
                else if ("2" == e)
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: l.limitActivityProxy.READING_TYPE
                        }
                    );
                else if ("3" == e) {
                    if (l.readingDayProxy.data) {
                        this.rwdNode.active = !0;
                        this.rwdList.data = l.readingDayProxy.data.list;
                    }
                } else
                    "4" == e &&
                        i.utils.openPrefabView("ActivitySpecialBuy", null, {
                            data: l.readingDayProxy.shop[0],
                            activityId: l.readingDayProxy.data.info.id
                        });
            else i.alertUtil.alert18n("READING_DAY_ROLLING");
        };
        e.prototype.onClickItem = function() {
            var t = localcache.getItem(
                localdb.table_item,
                l.readingDayProxy.data.need
            );
            i.utils.openPrefabView("ItemInfo", !1, t);
        };
        __decorate([d(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(n.default)], e.prototype, "records", void 0);
        __decorate([d(cc.Node)], e.prototype, "rwdNode", void 0);
        __decorate([d(n.default)], e.prototype, "rwdList", void 0);
        __decorate([d(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([d(cc.ScrollView)], e.prototype, "itemScroll", void 0);
        __decorate([d([s.default])], e.prototype, "urlArr", void 0);
        __decorate([d(sp.Skeleton)], e.prototype, "eff_1", void 0);
        __decorate([d(cc.Node)], e.prototype, "box_close", void 0);
        __decorate([d(cc.Node)], e.prototype, "box_open", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
