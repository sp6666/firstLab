var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/ApiUtils"),
    r = require("../../Initializer"),
    a = require("../../Config"),
    s = require("../../utils/UIUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGold = null;
            e.lblCost = null;
            e.nodeDouble = null;
            e.url = null;
            return e;
        }
        e.prototype.onClickItem = function() {
            var t = this._data;
            t &&
                l.apiUtils.recharge(
                    r.playerProxy.userData.uid,
                    a.Config.serId,
                    t.diamond,
                    t.ormb,
                    t.diamond + r.playerProxy.getKindIdName(1, 1),
                    0
                );
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblGold.string = t.diamond + "";
                this.lblCost.string = t.rmb + "";
                this.nodeDouble.active = 1 != t.beishu;
                this.url.url = s.uiHelps.getChargeItem(t.ormb);
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeDouble", void 0);
        __decorate([d(n.default)], e.prototype, "url", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
