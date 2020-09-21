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
            e.addExp = null;
            e.roleImage = null;
            e.shenji = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.addExp.string = t.exp.toString();
                this.shenji.node.active = 1 == t.shenji;
            }
        };
        __decorate([r(cc.Label)], e.prototype, "addExp", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "roleImage", void 0);
        __decorate([r(cc.Label)], e.prototype, "shenji", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
