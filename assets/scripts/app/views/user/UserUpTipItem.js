var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblContext = null;
            e.nodeBg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblContext.string = t.content;
                this.scheduleOnce(this.updateHeight, 0.1);
            }
        };
        e.prototype.updateHeight = function() {
            this.node.height = this.nodeBg.height =
                this.lblContext.node.height + 10;
        };
        __decorate([r(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
