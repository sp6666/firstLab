var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./NoticeItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeContext = null;
            e.item = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.item.node.active = !1;
            for (var t = 0; t < n.timeProxy.noticeMsg.length; t++) {
                var e = cc.instantiate(this.item.node),
                    o = e.getComponent(i.default);
                if (o) {
                    o.data = n.timeProxy.noticeMsg[t];
                    e.active = !0;
                }
                this.nodeContext.addChild(e);
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this) && facade.send("CLOSE_NOTICE");
        };
        __decorate([s(cc.Node)], e.prototype, "nodeContext", void 0);
        __decorate([s(i.default)], e.prototype, "item", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
