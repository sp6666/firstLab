var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../models/TimeProxy"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTen = null;
            e.lblFree = null;
            e.lblCost = null;
            e.nodeFree = null;
            e.nodeCost = null;
            e.eff_pt = null;
            e.eff_bj = null;
            e.cost = 0;
            e.isFirst = !0;
            e.isPlaying = !1;
            e.count = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.playerProxy.PLAYER_QIFU_UPDATE,
                this.qifuUpdate,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.qifuUpdate();
        };
        e.prototype.qifuUpdate = function() {
            var t = localcache.getItem(
                localdb.table_officer,
                i.playerProxy.userData.level
            );
            this.count =
                i.playerProxy.qifuData.lastTime >= n.timeUtil.getTodaySecond(0)
                    ? t.pray - i.playerProxy.qifuData.free
                    : t.pray;
            this.nodeFree.active = this.count > 0;
            this.nodeCost.active = this.count <= 0;
            if (this.count > 0)
                this.lblFree.string = i18n.t("QIFU_FREE_COUNT", {
                    num: this.count,
                    total: t.pray
                });
            else {
                var e = i.playerProxy.qifuData.buy + 1;
                this.cost = e * (1 + Math.floor(e / 10)) * 2;
                this.lblCost.string = this.cost + "";
            }
            var o = n.utils.getParamInt("qifu_ten_count");
            o - i.playerProxy.qifuData.ten == 0
                ? (this.lblTen.string = i18n.t("QIFU_CUR_FREE"))
                : (this.lblTen.string = i18n.t("QIFU_TEN_TXT", {
                      num: o - i.playerProxy.qifuData.ten
                  }));
            if (this.isFirst) this.isFirst = !1;
            else {
                if (0 == i.playerProxy.qifuData.isten) {
                    this.eff_pt.node.active = !0;
                    this.eff_pt.animation = "pt";
                } else {
                    this.eff_bj.node.active = !0;
                    this.eff_bj.animation = "bj";
                }
                this.scheduleOnce(this.onTimer, 1);
            }
        };
        e.prototype.onTimer = function() {
            i.timeProxy.floatReward();
            this.isPlaying = !1;
        };
        e.prototype.onClickQifu = function(t, e) {
            var o = this;
            if (!this.isPlaying)
                if (this.count <= 0)
                    n.utils.showConfirmItem(
                        i18n.t("QIFU_COST_TIP", {
                            num: this.cost
                        }),
                        1,
                        i.playerProxy.userData.cash,
                        function() {
                            if (i.playerProxy.userData.cash < o.cost)
                                n.alertUtil.alertItemLimit(1);
                            else {
                                i.playerProxy.sendQifu(parseInt(e));
                                o.isPlaying = !0;
                            }
                        },
                        "QIFU_COST_TIP"
                    );
                else {
                    i.playerProxy.sendQifu(parseInt(e));
                    this.isPlaying = !0;
                }
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickRecharge = function() {
            l.funUtils.openView(l.funUtils.recharge.id);
        };
        __decorate([s(cc.RichText)], e.prototype, "lblTen", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblFree", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeFree", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeCost", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "eff_pt", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "eff_bj", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
