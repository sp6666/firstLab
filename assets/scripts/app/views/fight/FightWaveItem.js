var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.imgWin = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            t && (this.imgWin.active = n.playerProxy.userData.smap >= t.id);
        };
        __decorate([a(cc.Node)], e.prototype, "imgWin", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
