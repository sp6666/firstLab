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
            e.lblName = null;
            e.lblTxt = null;
            e.lblTime = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name1;
                this.lblTxt.string = t.type + "";
                this.lblTime.string = n.timeUtil.format(t.time, "HH:mm:ss");
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
