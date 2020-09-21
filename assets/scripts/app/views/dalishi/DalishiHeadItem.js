var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.head = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            t && (this.head.url = l.uiHelps.getServantHead(t.id));
        };
        __decorate([s(n.default)], e.prototype, "head", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
