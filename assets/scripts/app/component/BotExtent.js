var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeUp = null;
            e.nodeDown = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("BOT_EXTEND_HIDE", this.onHide, this);
            facade.subscribe("BOT_EXTEND_SHOW", this.onShow, this);
        };
        e.prototype.onShow = function() {
            this.nodeUp.active && this.onClickMore();
        };
        e.prototype.onHide = function() {
            this.nodeDown.active && this.onClickMore();
        };
        e.prototype.onClickMore = function() {
            var t = this.nodeUp.active ? 1 : 0;
            i.utils.showNodeEffect(this.node, 1 == t ? 0 : 1);
            this.nodeUp.active = 0 == t;
            this.nodeDown.active = 1 == t;
        };
        __decorate([r(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeDown", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
