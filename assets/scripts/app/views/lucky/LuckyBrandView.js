var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblCount = null;
            e.lblTip = null;
            e.lblTime = null;
            e.lblTotal = null;
            e.recordNode = null;
            e.recordList = null;
            e.lblMax = null;
            e.flag = !1;
            e.isFirst = !0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            facade.subscribe(
                l.luckyBrandProxy.LUCKY_BRAND_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.luckyBrandProxy.LUCKY_BRAND_RECORD_UPDATE,
                this.onRecord,
                this
            );
            this.list.selectHandle = function(e) {
                var o = e.data,
                    i = e.index,
                    r = l.luckyBrandProxy.getCount();
                if (o) 1 == l.luckyBrandProxy.data.reset && t.initList();
                else {
                    if (r <= 0) {
                        n.alertUtil.alert18n("LUCKY_BRAND_COUNT_LIMIT");
                        return;
                    }
                    if (t.flag) return;
                    t.flag = !0;
                    t.scheduleOnce(t.onTimer, 0.5);
                    if (
                        n.timeUtil.second >=
                        l.luckyBrandProxy.data.cfg.info.showTime
                    ) {
                        n.alertUtil.alert18n("ACTHD_OVERDUE");
                        return;
                    }
                    l.luckyBrandProxy.sendGetRewad(i);
                }
            };
            l.luckyBrandProxy.sendOpenActivity();
            this.schedule(this.onTimer2, 30);
        };
        e.prototype.onTimer = function() {
            this.flag = !1;
        };
        e.prototype.onDataUpdate = function() {
            for (var t = this, e = [], o = 0; o < 9; o++) {
                var i = {
                    index: o,
                    data: l.luckyBrandProxy.getIndexData(o)
                };
                e.push(i);
            }
            this.list.data = e;
            this.lblCount.string = i18n.t("LUCKY_BRAND_SHENG_YU", {
                num: l.luckyBrandProxy.getCount()
            });
            this.lblTip.active =
                1 == l.luckyBrandProxy.data.reset &&
                l.luckyBrandProxy.playList.length > 0;
            r.uiUtils.countDown(
                l.luckyBrandProxy.data.cfg.info.showTime,
                this.lblTime,
                function() {
                    n.timeUtil.second >=
                        l.luckyBrandProxy.data.cfg.info.showTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                }
            );
            this.lblTotal.string = i18n.t("LUCKY_TOTAL_RECHARGE", {
                value: l.luckyBrandProxy.data.cfg.need
            });
            if (this.isFirst) {
                this.onTimer2();
                this.isFirst = !1;
            }
            this.lblMax.string = i18n.t("LUCKY_BRAND_MAX_COUNT", {
                num: l.luckyBrandProxy.data.cfg.numMax
            });
        };
        e.prototype.initList = function() {
            l.luckyBrandProxy.playList = [];
            for (var t = [], e = 0; e < 9; e++) {
                var o = {
                    index: e,
                    data: null
                };
                t.push(o);
            }
            this.list.data = t;
        };
        e.prototype.onClickClose = function() {
            l.luckyBrandProxy.playList = [];
            n.utils.closeView(this);
        };
        e.prototype.onClickReward = function() {
            if(l.luckyBrandProxy.rwdList){
                var t = l.luckyBrandProxy.rwdList;
                t && n.utils.openPrefabView("luckybrand/LuckyBrandRwdView", !1, t);
            }
        };
        e.prototype.onClickReset = function() {
            if (
                1 == l.luckyBrandProxy.data.reset &&
                l.luckyBrandProxy.playList.length > 0
            ) {
                this.initList();
                this.lblTip.active = !1;
            }
        };
        e.prototype.onRecord = function() {
            this.recordList.data = l.luckyBrandProxy.records;
        };
        e.prototype.onTimer2 = function() {
            l.luckyBrandProxy.data && l.luckyBrandProxy.sendGetRecord();
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblTip", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([c(cc.Node)], e.prototype, "recordNode", void 0);
        __decorate([c(i.default)], e.prototype, "recordList", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMax", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
