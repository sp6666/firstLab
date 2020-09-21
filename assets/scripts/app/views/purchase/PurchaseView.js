var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/RedDot"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.newBieNode = null;
            e.actNode = null;
            e.dailyNode = null;
            e.scroll = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.purchaseProxy.PURCHASE_DATA_UPDATA,
                this.onShowData,
                this
            );
            facade.subscribe("RECHARGE_FAIL", this.resetLimitBuy, this);
            l.purchaseProxy.sendOpenPrince();

            this.newBieNode.node.active = false;
            this.actNode.node.active = false;

            this.type = l.purchaseProxy.ACTIVITY;

            this.bDefault = true;
        };
        e.prototype.onShowData = function () {

            this.newBieNode.node.active = false;
            this.actNode.node.active = false;


            for (var t = [], e = 0; e < l.purchaseProxy.gift.length; e++) {
                if (null == l.purchaseProxy.gift[e].type && l.purchaseProxy.gift[e].id != 98) {

                    if (l.purchaseProxy.gift[e].stype === l.purchaseProxy.NEWBIE || l.purchaseProxy.gift[e].stype === undefined) {
                        this.newBieNode.node.active = true;
                    } else if (l.purchaseProxy.gift[e].stype === l.purchaseProxy.ACTIVITY) {
                        this.actNode.node.active = true;
                    }
                }
            }

            if (this.bDefault) {

                if (this.actNode.node.active) {
                    this.type = l.purchaseProxy.ACTIVITY;
                } else if (this.newBieNode.node.active) {
                    this.type = l.purchaseProxy.NEWBIE;
                } else {
                    this.type = l.purchaseProxy.DAILY;
                }

                this.bDefault = false;
            }

            this.newBieNode.isChecked = this.type == l.purchaseProxy.NEWBIE;
            this.actNode.isChecked = this.type == l.purchaseProxy.ACTIVITY;
            this.dailyNode.isChecked = this.type == l.purchaseProxy.DAILY;

            for (var t = [], e = 0; e < l.purchaseProxy.gift.length; e++) {
                if (null == l.purchaseProxy.gift[e].type && l.purchaseProxy.gift[e].id != 98) {
                    if (l.purchaseProxy.gift[e].stype && l.purchaseProxy.gift[e].stype === this.type) {
                        t.push(l.purchaseProxy.gift[e]);
                    } else if (l.purchaseProxy.gift[e].stype === undefined && l.purchaseProxy.NEWBIE === this.type) {
                        t.push(l.purchaseProxy.gift[e]);
                    }
                }
            }

            t.sort(function (t, e) {
                var o = t.limit > 0;
                if (o != e.limit > 0) return o ? -1 : 1;
                var i = t.end - n.timeUtil.second <= 31536e3;
                return i != e.end - n.timeUtil.second <= 31536e3 ?
                    i ?
                    -1 :
                    1 :
                    t.id - e.id;
            });
            this.list.data = t;

            this.scroll.stopAutoScroll();
            this.scroll.scrollToTop(0);
        };
        e.prototype.changeType = function (t, e) {

            this.bDefault = false;

            this.type = parseInt(e);
            this.onShowData();
        };
        e.prototype.resetLimitBuy = function () {
            l.purchaseProxy.setGiftNum(0, 1);
            l.purchaseProxy.limitBuy = !1;
        };
        e.prototype.onclickClose = function () {
            r.default.change("purchase", !1);
            n.utils.closeView(this);
        };
        __decorate([c(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "actNode", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "newBieNode", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "dailyNode", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;