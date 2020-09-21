var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemslot = null;
            e.lblCost = null;
            e.nodePrice = null;
            e.nodeBuyed = null;
            e.nodeGray = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.itemslot.data = t.items[0];
                this.lblCost.string = t.need + "";
                this.nodeBuyed.active = 0 != t.buy;
                this.nodePrice.active = 0 == t.buy;
                0 != t.buy
                    ? r.shaderUtils.setNodeGray(this.nodeGray)
                    : r.shaderUtils.clearNodeShader(this.nodeGray);
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this._data;
            t && l.utils.openPrefabView("limitactivity/DayDayBuy", !1, t);
        };
        __decorate([c(n.default)], e.prototype, "itemslot", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodePrice", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeBuyed", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeGray", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
