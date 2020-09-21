var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.qian = null;
            e.kuang = null;
            e.head = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.setSprite = function(t) {
            var e = i.qixiProxy.result.draw[t].type,
                o = i.qixiProxy.result.draw[t].hid,
                n = i.qixiProxy.result.draw[t].id;
            this.head.url = l.uiHelps.getServantHead(o);
            this.qian.url = l.uiHelps.getChouQianImg(e, n);
            this.kuang.url = l.uiHelps.getChouQianKuangImg(e);
        };
        __decorate([s(n.default)], e.prototype, "qian", void 0);
        __decorate([s(n.default)], e.prototype, "kuang", void 0);
        __decorate([s(n.default)], e.prototype, "head", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
