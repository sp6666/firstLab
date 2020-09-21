var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.activityType = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            this.activityType = l.limitActivityProxy.LIMIT_ACTIVITY_TYPE;
            var e = this.node.openParam;
            e && e.type && (this.activityType = e.type);
            this.list.selectHandle = function() {
                t.onClickClose();
            };
            facade.subscribe(
                "LIMIT_ACTIVITY_HUO_DONG_LIST",
                this.onHuoDongList,
                this
            );
            this.onHuoDongList();
        };
        e.prototype.onHuoDongList = function() {
            this.list.data = l.limitActivityProxy.getHuodongList(
                this.activityType
            );
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
