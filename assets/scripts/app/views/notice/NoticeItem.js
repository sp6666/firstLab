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
            e.lbl = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lbl.string = t.body;
                this.scheduleOnce(this.updateSize, 0.1);
            }
        };
        e.prototype.updateSize = function() {
            this.node.height = this.lbl.node.height;
        };
        __decorate([r(cc.Label)], e.prototype, "lbl", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
