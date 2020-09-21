var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("./TreasureGroupItem"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.items = [];
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t)
                for (var e = 0; e < this.items.length; e++)
                    this.items[e].data = t.length > e ? t[e] : null;
        };
        __decorate([a([n.default])], e.prototype, "items", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
