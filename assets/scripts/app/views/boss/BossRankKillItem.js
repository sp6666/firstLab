var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex = null;
            e.lblName = null;
            e.lblTime = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string = t.id + "";
                this.lblName.string = t.name;
                this.lblTime.string = n.timeUtil.format(t.num);
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;