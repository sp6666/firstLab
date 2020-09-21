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
        e.prototype.onLoad = function() {
            this.setSprite();
        };
        e.prototype.setSprite = function() {
            var t = i.qixiProxy.result.draw[0].type,
                e = i.qixiProxy.result.draw[0].hid,
                o = i.qixiProxy.result.draw[0].id;
            console.log(t, e, o, i.qixiProxy.result);
            this.head.url = l.uiHelps.getServantHead(e);
            this.qian.url = l.uiHelps.getChouQianImg(t, o);
            this.kuang.url = l.uiHelps.getChouQianKuangImg(t);
        };
        __decorate([s(n.default)], e.prototype, "qian", void 0);
        __decorate([s(n.default)], e.prototype, "kuang", void 0);
        __decorate([s(n.default)], e.prototype, "head", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
