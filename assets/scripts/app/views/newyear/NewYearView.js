var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBall = null;
            e.lblTime = null;
            e.oneDengEff = null;
            e.tenDenEff = null;
            e.tipNode = null;
            e.dengNum = 0;
            e.denging = !1;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                n.newYearProxy.NEW_YEAR_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                n.newYearProxy.NEW_YEAR_ITEM_RED,
                this.onItemRed,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            n.newYearProxy.sendOpenNewYear();
            n.shopProxy.sendList(!1);
            this.onItemUpdate();
        };
        e.prototype.onDataUpdate = function () {
            var t = this,
                e = n.newYearProxy.data;
            if (e) {
                l.uiUtils.countDown(e.info.eTime, this.lblTime, function () {
                    i.timeUtil.second >= e.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                this.lblBall.string =
                    n.bagProxy.getItemCount(n.newYearProxy.data.need) + "";
                this.tipNode.active =
                    0 == n.bagProxy.getItemCount(n.newYearProxy.data.need);
            }

        };

        e.prototype.onItemUpdate = function () {
            if (n.newYearProxy.data) {
                var t = n.bagProxy.getItemCount(n.newYearProxy.data.need);
                this.tipNode.active = 0 == t;
                this.lblBall.string = t + "";
            }
        };
        e.prototype.onClickDeng = function (t, e) {
            if (null != n.newYearProxy.data)
                if (this.denging) i.alertUtil.alert18n("NEW_YEAR_BUILDING");
                else {
                    this.dengNum = parseInt(e);
                    if (
                        n.bagProxy.getItemCount(n.newYearProxy.data.need) >=
                        this.dengNum
                    ) {
                        if (1 == this.dengNum) {
                            this.oneDengEff.node.active = !0;
                            this.oneDengEff.animation = "animation";
                            this.scheduleOnce(this.onTimer, 1);
                        } else if (10 == this.dengNum) {
                            this.tenDenEff.node.active = !0;
                            this.tenDenEff.animation = "animation";
                            this.scheduleOnce(this.onTimer2, 1);
                        }
                        this.denging = !0;
                    } else {
                        i.alertUtil.alertItemLimit(n.newYearProxy.data.need);
                        this.onClickAdd();
                    }
                }
        };
        e.prototype.onTimer = function () {
            1 == this.dengNum &&
                n.bagProxy.getItemCount(n.newYearProxy.data.need) >= 1 &&
                n.newYearProxy.sendNewYearOnce();
            this.denging = !1;
        };
        e.prototype.onTimer2 = function () {
            this.denging = !1;
            n.newYearProxy.sendNewYearTen();
        };
        e.prototype.onClickTab = function (t, e) {
            switch (e) {
                case "0":
                    n.newYearProxy.gotoActivityShopView();
                    break;

                case "1":
                    var o = n.limitActivityProxy.NEW_YEAR_TYPE;
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null, {
                            type: o
                        }
                    );
                    break;

                case "2":
                case "3":
                    n.newYearProxy.sendPaiHang(e);
            }
        };
        e.prototype.onClickAdd = function () {
            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.newYearProxy.shop[0],
                activityId: n.newYearProxy.data.info.id
            });
            n.shopProxy.openShopBuy(n.newYearProxy.data.need);
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "oneDengEff", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "tenDenEff", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;