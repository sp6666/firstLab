var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.nodeName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            t && (this.lblName.string = t.name);
        };
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeName", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
