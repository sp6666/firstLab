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
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBall = null;
            e.lblTime = null;
            e.tipNode = null;
            e.item = null;
            e.oneDengEff = null;
            e.dengNum = 0;
            e.bClick = !1;
            e.denging = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.qiuyinProxy.QIUYIN_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(n.qiuyinProxy.QIUYI_ITEM_RED, this.onItemRed, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            n.qiuyinProxy.sendOpenQIUYI();
            n.shopProxy.sendList(!1);
            this.onItemUpdate();
        };
        e.prototype.onDataUpdate = function() {
            var t = this,
                e = n.qiuyinProxy.data;
            if (e) {
                l.uiUtils.countDown(e.info.eTime, this.lblTime, function() {
                    i.timeUtil.second >= e.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                this.lblBall.string =
                    n.bagProxy.getItemCount(n.qiuyinProxy.data.need) + "";
                this.tipNode.active =
                    0 == n.bagProxy.getItemCount(n.qiuyinProxy.data.need);
            }
            if (this.bClick) {
                this.bClick = !1;
                i.utils.openPrefabView("qiuyin/QiuYinChouQian");
            }
        };
        e.prototype.onActData = function() {};
        e.prototype.onItemRed = function() {};
        e.prototype.onItemUpdate = function() {
            if (n.qiuyinProxy.data) {
                var t = n.bagProxy.getItemCount(n.qiuyinProxy.data.need);
                this.tipNode.active = 0 == t;
                this.lblBall.string = t + "";
            }
        };
        e.prototype.onClickQian = function(t, e) {
            if (this.denging) i.alertUtil.alert18n("QIUYIN_BUILDING");
            else if (null != n.qiuyinProxy.data) {
                this.dengNum = parseInt(e);
                if (
                    n.bagProxy.getItemCount(n.qiuyinProxy.data.need) >=
                    this.dengNum
                ) {
                    this.denging = !0;
                    this.bClick = !0;
                    this.oneDengEff.node.active = !0;
                    this.oneDengEff.animation = "animation";
                    this.scheduleOnce(this.onTimer, 1.5);
                } else {
                    i.alertUtil.alertItemLimit(n.qiuyinProxy.data.need);
                    this.onClickAdd();
                }
            }
        };
        e.prototype.onTimer = function() {
            this.denging = !1;
            n.qiuyinProxy.sendQIUYI(this.dengNum);
        };
        e.prototype.onClickTab = function(t, e) {
            switch (e) {
                case "0":
                    i.utils.openPrefabView(
                        "ActivityShopView",
                        null,
                        n.qiuyinProxy.dhShop
                    );
                    break;

                case "1":
                    var o = n.limitActivityProxy.QIUYIN_TYPE;
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: o
                        }
                    );
                    break;

                case "2":
                case "3":
                    n.qiuyinProxy.sendPaiHang(e);
            }
        };
        e.prototype.onClickAdd = function() {
            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.qiuyinProxy.shop[0],
                activityId: n.qiuyinProxy.data.info.id
            });
            n.shopProxy.openShopBuy(n.qiuyinProxy.data.need);
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "item", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "oneDengEff", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
