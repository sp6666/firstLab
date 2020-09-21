var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            l.arborDayProxy.sendLookRank();
            var t = l.arborDayProxy.data.rwd[0].member.length,
                e = 10 * (Math.ceil(t / 6) - 1),
                o = 100 * Math.ceil(t / 6) + e + 100;
            this.list.setWidthHeight(680, o);
            this.list.data = l.arborDayProxy.data.rwd;
        };
        e.prototype.onClickRank = function() {
            n.utils.openPrefabView("arborday/ArborDayRank");
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
