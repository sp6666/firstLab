var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
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
            var t = Math.ceil(n.dragonBoatProxy.cfg.rwd[0].member.length / 6),
                e = 100 * t + 10 * (t - 1) + 100;
            this.list.setWidthHeight(550, e);
            this.list.data = n.dragonBoatProxy.cfg.rwd;
            n.dragonBoatProxy.sendLookRank();
        };
        e.prototype.onClickRank = function() {
            l.utils.openPrefabView("dragonboat/DragonBoatRank");
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
