var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../formula"),
    a = require("../../models/TreasureProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblGate = null;
            e.lblChnage = null;
            e.lblCost = null;
            e.btnWin = null;
            e.nodeOver = null;
            e.lblNext = null;
            e.lblResetCount = null;
            e.lblResetCost = null;
            e.nodeAddBtn = null;
            e.lblRank = null;
            e.lblCount = null;
            e.nodeBuy = null;
            e.datas = null;
            e.lastClick = -1;
            e.lastClick1 = -1;
            e.listIds = null;
            e.maxGate = 0;
            e.itemW = 160;
            e.itemH = 240;
            return e;
        }
        e.prototype.onLoad = function() {
            l.treasureProxy.tidy.lastTime < n.timeUtil.getTodaySecond() &&
                l.treasureProxy.sendInfo();
            this.maxGate = this.getCurMax();
            facade.subscribe(
                l.treasureProxy.UPDATE_TREASURE_TIDY,
                this.updateShow,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickBack, this);
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            this.lastClick1 = this.lastClick = -1;
            var t = l.treasureProxy.tidy,
                e = localcache.getItem(localdb.table_treasureTidy, t.curgate);
            this.list.repeatX = e ? e.column : 4;
            var o = e ? 660 / e.column : this.itemW,
                i = (o * this.itemH) / this.itemW;
            i * (e ? e.row : 0) > 960 &&
                (o = ((i = 960 / e.row) / this.itemH) * this.itemW);
            i = Math.floor(i);
            o = Math.floor(o);
            this.list.setWidthHeight(o, i);
            this.list.data = this.getDatas();
            this.list.node.x = -this.list.node.width / 2;
            this.list.node.y = this.list.node.height / 2;
            this.lblChnage.string = e
                ? i18n.t("TREASURE_REMAIN_SKIP", {
                      v: e.chance + t.buyCount - t.curlost
                  })
                : "";
            this.lblGate.string = i18n.t("TREASURE_GATE", {
                f: t.curgate > this.maxGate ? this.maxGate : t.curgate,
                s: this.maxGate
            });
            this.lblCost.string = e ? e.pass + "" : "";
            this.lblRank.string = (t.dayOver ? t.dayOver : 0) + "";
            this.btnWin.active = null != e;
            this.nodeAddBtn.active = !1;
            if (
                e &&
                e.open <= l.treasureProxy.score &&
                e.chance + t.buyCount > t.curlost
            ) {
                this.nodeOver.active = !1;
                this.nodeAddBtn.active = e.chance + t.buyCount < t.curlost + 3;
            } else {
                this.nodeBuy.active = e && e.chance + t.buyCount <= t.curlost;
                this.nodeOver.active = !0;
                var a = n.utils.getParamInt("tidy_change_max");
                this.lblCount.string = i18n.t("TREASURE_BUY_TIP", {
                    f: a - t.buyCount,
                    s: a
                });
                this.lblResetCost.string =
                    r.formula.linklink_times(t.count) + "";
                this.lblResetCount.string = i18n.t("TREASURE_RESET", {
                    v: t.count
                });
                this.lblNext.string =
                    null == e
                        ? i18n.t("TREASURE_OVER_TIP")
                        : e.chance <= t.curlost
                        ? i18n.t("TREASURE_LOST_TIP")
                        : i18n.t("TREASURE_TIDY_UNLOCK_TIP", {
                              v: e.open
                          });
            }
        };
        e.prototype.getIds = function() {
            var t = l.treasureProxy.tidy.pics.length / 2,
                e = localcache.getList(localdb.table_treasure),
                o = e.length,
                i = [],
                n = Math.floor(o / t);
            i.push(0);
            for (var r = 0; r < t; r++) {
                var a = r * n + Math.floor(Math.random() * n);
                a = a >= o ? o - 1 : a;
                i.push(e[a].id);
            }
            return i;
        };
        e.prototype.getDatas = function() {
            var t = l.treasureProxy.tidy;
            (null != this.listIds &&
                this.listIds.length == t.pics.length / 2 + 1) ||
                (this.listIds = this.getIds());
            this.datas = [];
            for (var e = 0; e < t.pics.length; e++) {
                var o = new a.TreasureTidyItem();
                o.id = this.listIds[parseInt(t.pics[e] + "")];
                o.isShow = e == this.lastClick || e == this.lastClick1;
                o.index = e;
                this.datas.push(o);
            }
            return this.datas;
        };
        e.prototype.getCurMax = function() {
            for (
                var t = localcache.getList(localdb.table_treasureTidy), e = 0;
                e < t.length;
                e++
            )
                if (t[e].open > l.treasureProxy.score) return t[e].barrier - 1;
            return t[t.length - 1].barrier;
        };
        e.prototype.onClickPass = function() {
            var t = l.treasureProxy.tidy,
                e = localcache.getItem(localdb.table_treasureTidy, t.curgate);
            null == e ||
                (-1 != this.lastClick && -1 != this.lastClick1) ||
                n.utils.showConfirmItem(
                    i18n.t("TREASURE_OVER_CONFIRM", {
                        v: e.pass
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function() {
                        l.playerProxy.userData.cash < e.pass
                            ? n.alertUtil.alertItemLimit(1)
                            : l.treasureProxy.sendWin();
                    },
                    "TREASURE_OVER_CONFIRM"
                );
        };
        e.prototype.onClickReset = function() {
            var t = l.treasureProxy.tidy,
                e = r.formula.linklink_times(t.count);
            n.utils.showConfirmItem(
                i18n.t("TREASURE_RESET_CONFIRM", {
                    v: e
                }),
                1,
                l.playerProxy.userData.cash,
                function() {
                    l.playerProxy.userData.cash < e
                        ? n.alertUtil.alertItemLimit(1)
                        : l.treasureProxy.sendReset();
                },
                "TREASURE_RESET_CONFIRM"
            );
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            n.utils.closeNameView("treasure/TreasureView");
        };
        e.prototype.onClickBack = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickCard = function(t, e) {
            var o = e ? e.data : null;
            if (o) {
                if (-1 != this.lastClick1 || 0 == o.id) return;
                if (-1 == this.lastClick) {
                    this.lastClick = o.index;
                    this.datas[o.index].isShow = !0;
                    this.list.updateItemShow();
                } else {
                    if (this.lastClick == o.index) return;
                    this.lastClick1 = o.index;
                    this.datas[o.index].isShow = !0;
                    this.list.updateItemShow();
                    var i = this.lastClick,
                        n = this.lastClick1;
                    this.datas[this.lastClick].id ==
                    this.datas[this.lastClick1].id
                        ? facade.send("TIME_RUN_FUN", {
                              fun: function() {
                                  l.treasureProxy.sendTrun(i, n);
                              },
                              time: 0.3
                          })
                        : facade.send("TIME_RUN_FUN", {
                              fun: function() {
                                  l.treasureProxy.sendTrun(i, n);
                              },
                              time: 1
                          });
                }
            }
        };
        e.prototype.onClickRank = function() {
            l.treasureProxy.sendTidyRank();
        };
        e.prototype.onClickBuy = function() {
            if (
                l.treasureProxy.tidy.buyCount >=
                n.utils.getParamInt("tidy_change_max")
            )
                n.alertUtil.alert18n("TREASURE_BUY_COUNT_LIMIT");
            else {
                var t = r.formula.tidy_chance_price(
                    l.treasureProxy.tidy.buyCount
                );
                n.utils.showConfirmItem(
                    i18n.t("TREASURE_BUY_COMFIRM", {
                        d: t
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function() {
                        t > l.playerProxy.userData.cash
                            ? n.alertUtil.alertItemLimit(1)
                            : l.treasureProxy.sendBuyCount();
                    },
                    "TREASURE_BUY_COMFIRM"
                );
            }
        };
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblGate", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblChnage", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnWin", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeOver", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNext", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblResetCount", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblResetCost", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAddBtn", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBuy", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
