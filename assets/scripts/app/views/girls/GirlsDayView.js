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
    u = (function (t) {
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
            e.eff_2 = null;
            e.flag = !1;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.girlsDayProxy.GIRLS_DAY_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.girlsDayProxy.GIRLS_DAY_RECORDS,
                this.onRecords,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe("GIRLS_DAY_SHOW_RWD_END", this.onShowRwdEnd, this);
            l.girlsDayProxy.sendOpenGrilsDay();
            l.shopProxy.sendList(!1);
        };
        e.prototype.onDataUpdate = function () {
            var t = l.girlsDayProxy.data;
            if (t) {
                this.onItemUpdate();
                var e = this;
                r.uiUtils.countDown(t.info.eTime, this.lblTime, function () {
                    e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                });
            }
        };
        e.prototype.onClickRwd = function (t, e) {
            if (i.timeUtil.second > l.girlsDayProxy.data.info.eTime)
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else if (this.flag) i.alertUtil.alert18n("GIRLS_DAY_ROLLING");
            else {
                var o = parseInt(e);
                if (l.bagProxy.getItemCount(l.girlsDayProxy.data.need) >= o) {
                    this.flag = !0;
                    l.girlsDayProxy.sendReard(o);
                    this.eff_1.node.active = !0;
                    this.eff_1.animation = "animation";
                    this.scheduleOnce(this.onShowEff_1, 1);
                    for (var n = 0; n < this.urlArr.length; n++)
                        null != this.urlArr[n] &&
                        (this.urlArr[n].node.active = !1);
                } else i.alertUtil.alertItemLimit(l.girlsDayProxy.data.need);
            }
        };
        e.prototype.onShowEff_1 = function () {
            if (l.girlsDayProxy.getShowItem()) {
                this.eff_2.node.active = !0;
                this.eff_2.animation = "animation";
                this.scheduleOnce(this.onShowItem, 1);
            } else {
                l.timeProxy.floatReward();
                this.onTrunRwd();
            }
        };
        e.prototype.onTrunRwd = function () {
            if (l.girlsDayProxy.trunRwd)
                for (var t = 0; t < l.girlsDayProxy.trunRwd.length; t++) {
                    var e = l.girlsDayProxy.trunRwd[t].clothe,
                        o = l.girlsDayProxy.trunRwd[t].item,
                        n = localcache.getItem(localdb.table_userClothe, e.id),
                        r = localcache.getItem(localdb.table_item, o.id);
                    i.alertUtil.alert(
                        i18n.t("GIRLS_TRUN_RWD_TXT", {
                            clothe: n.name,
                            name: r.name,
                            num: o.count
                        })
                    );
                }
            l.girlsDayProxy.trunRwd = null;
        };
        e.prototype.onShowItem = function () {
            var t = l.girlsDayProxy.getShowItem();
            if (t) {
                this.eff_2.node.active = !1;
                for (var e = 0; e < this.urlArr.length; e++)
                    if (null != this.urlArr[e]) {
                        this.urlArr[e].node.active = e == t.part;
                        this.urlArr[e].url =
                            e == t.part ? l.girlsDayProxy.getItemUrl(t) : "";
                        if (6 == e && t.location) {
                            this.urlArr[e].node.x =
                                t.location.length > 0 ? t.location[0] : 0;
                            this.urlArr[e].node.y =
                                t.location.length > 1 ? t.location[1] : 0;
                        }
                    }
                this.scheduleOnce(this.showReward, 1);
            }
        };
        e.prototype.showReward = function () {
            l.timeProxy.floatReward();
            this.onTrunRwd();
        };
        e.prototype.onRecords = function () {
            this.records.data = l.girlsDayProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        e.prototype.onClickCloseWin = function () {
            this.rwdNode.active = !1;
            this.itemScroll.scrollToTop();
        };
        e.prototype.onItemUpdate = function () {
            if (l.girlsDayProxy.data) {
                var t = l.bagProxy.getItemCount(l.girlsDayProxy.data.need);
                this.lblNum.string = t + "";
            }
        };
        e.prototype.onClicTab = function (t, e) {
            if (1 != this.flag)
                if ("1" == e) a.funUtils.openView(a.funUtils.duihuanShop.id);
                else if ("2" == e)
                i.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null, {
                        type: l.limitActivityProxy.GIRLS_TYPE
                    }
                );
            else if ("3" == e) {
                if (l.girlsDayProxy.data) {
                    this.rwdNode.active = !0;
                    this.rwdList.data = l.girlsDayProxy.data.list;
                }
            } else
                "4" == e &&
                l.shopProxy.openShopBuy(l.girlsDayProxy.data.need);
            else i.alertUtil.alert18n("GIRLS_DAY_ROLLING");
        };
        e.prototype.onClickItem = function () {
            var t = localcache.getItem(
                localdb.table_item,
                l.girlsDayProxy.data.need
            );
            i.utils.openPrefabView("ItemInfo", !1, t);
        };
        e.prototype.onShowRwdEnd = function () {
            this.scheduleOnce(this.onTimerEnd, 3);
        };
        e.prototype.onTimerEnd = function () {
            l.timeProxy.floatReward();
            this.flag = !1;
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
        __decorate([d(sp.Skeleton)], e.prototype, "eff_2", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;