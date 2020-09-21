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
            if (l.fightProxy.isBoss) {
                this.list.data = l.fightProxy.pvbData
                    ? l.fightProxy.pvbData.items
                    : null;
                l.fightProxy.isBoss = !1;
            } else
                this.list.data = l.fightProxy.pveData
                    ? l.fightProxy.pveData.items
                    : null;
            this.list.node.x = -this.list.node.width / 2;
        };
        e.prototype.onClickView = function() {
            if (n.utils.closeView(this)) {
                facade.send("FIGHT_CLOST_WIN_VIEW");
                l.fightProxy.initSmapData();
                l.taskProxy.setDelayShow(!1);
            }
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
