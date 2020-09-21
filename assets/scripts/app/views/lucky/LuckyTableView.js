var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../truntable/TrunTableItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/List"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.items = [];
            e.lblNun = null;
            e.records = null;
            e.scroll = null;
            e.curIndex = 0;
            e.roundIndex = 0;
            e.isFirst = !0;
            e.oldScore = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.luckyTableProxy.LUCKY_TABLE_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe(
                n.luckyTableProxy.LUCKY_TABLE_RECORDS,
                this.onRecords,
                this
            );
            n.luckyTableProxy.sendOpenActivity();
        };
        e.prototype.onDataUpdate = function() {
            if (
                n.luckyTableProxy.data.prize &&
                n.luckyTableProxy.data.prize.length > 0
            ) {
                this.curIndex = n.luckyTableProxy.data.prize[0].dc;
                this.showEff(0);
            } else if (n.luckyTableProxy.data) {
                this.onItemUpdate();
                for (var t = 0; t < this.items.length; t++)
                    if (t < n.luckyTableProxy.data.list.length) {
                        this.items[t].data = n.luckyTableProxy.data.list[t];
                        this.items[t].select = 0 == t;
                    }
                var e = this;
                a.uiUtils.countDown(
                    n.luckyTableProxy.data.info.eTime,
                    this.lblTime,
                    function() {
                        e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            }
            if (this.isFirst) this.isFirst = !1;
            else if (!l.utils.isOpenView("ActivityScoreChange")) {
                var o = n.luckyTableProxy.data.cons - this.oldScore;
                0 != o &&
                    l.alertUtil.alert(
                        i18n.t("LUCKY_TABLE_YUAN_ADD", {
                            num1: o,
                            num2: o
                        })
                    );
            }
            this.oldScore = n.luckyTableProxy.data.cons;
        };
        e.prototype.showEff = function(t) {
            this.unscheduleAllCallbacks();
            this.schedule(this.showSelect, t);
        };
        e.prototype.showSelect = function() {
            for (
                var t = this.roundIndex % 10, e = 0;
                e < this.items.length;
                e++
            )
                this.items[e].select = t == e;
            this.roundIndex++;
            if (this.roundIndex >= 10 && this.roundIndex < 20)
                this.showEff(0.03);
            else if (this.roundIndex >= 20 && this.roundIndex < 30)
                this.showEff(0.03 + (this.roundIndex - 20) / 200);
            else if (
                this.roundIndex >= 30 + this.curIndex &&
                this.roundIndex < 100
            ) {
                this.roundIndex = 0;
                this.curIndex = 0;
                this.unscheduleAllCallbacks();
                n.timeProxy.floatReward();
            }
        };
        e.prototype.onClickRoll = function(t, e) {
            if (l.timeUtil.second > n.luckyTableProxy.data.info.eTime)
                l.alertUtil.alert18n("ACTHD_OVERDUE");
            else if (0 == this.curIndex) {
                var o = parseInt(e);
                if (n.bagProxy.getItemCount(n.luckyTableProxy.data.need) < o) {
                    l.alertUtil.alertItemLimit(n.luckyTableProxy.data.need);
                    l.utils.openPrefabView("ActivitySpecialBuy", null, {
                        data: n.luckyTableProxy.shop[0],
                        activityId: n.luckyTableProxy.data.info.id
                    });
                } else n.luckyTableProxy.sendRoll(o);
            } else l.alertUtil.alert18n("TRUN_TABLE_IS_ROLLING");
        };
        e.prototype.onClickRank = function(t, e) {
            l.utils.openPrefabView("luckytable/LuckyTableRwd", null, {
                type: parseInt(e)
            });
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onItemUpdate = function() {
            if (n.luckyTableProxy.data) {
                var t = n.bagProxy.getItemCount(n.luckyTableProxy.data.need);
                this.lblNun.string = t + "";
            }
        };
        e.prototype.onClickAdd = function() {
            l.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.luckyTableProxy.shop[0],
                activityId: n.luckyTableProxy.data.info.id
            });
        };
        e.prototype.onRecords = function() {
            this.records.data = n.luckyTableProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickScoreChange = function() {
            l.utils.openPrefabView("ActivityScoreChange", null, {
                activityId: n.luckyTableProxy.data.info.id,
                list: n.luckyTableProxy.scoreChange,
                score: n.luckyTableProxy.data.cons
            });
        };
        e.prototype.onClickActivity = function() {
            l.utils.openPrefabView("limitactivity/LimitActivityView", null, {
                type: n.limitActivityProxy.LUCKY_TABLE_TYPE
            });
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_([i.default])], e.prototype, "items", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNun", void 0);
        __decorate([_(r.default)], e.prototype, "records", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
