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
            this.UPDATE_BLACK_MSG();
            facade.subscribe("UPDATE_BLACK_MSG", this.UPDATE_BLACK_MSG, this);
        };
        e.prototype.onClickDel = function(t, e) {
            var o = e.data;
            o && n.chatProxy.sendDelBlack(o.id);
        };
        e.prototype.UPDATE_BLACK_MSG = function() {
            this.list.data = n.chatProxy.blackList;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
