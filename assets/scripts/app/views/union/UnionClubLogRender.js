var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTxt = null;
            e.lblTime = null;
            e.lblname = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblTxt.string = n.unionProxy.getClubLog(t);
                this.lblTime.string = l.timeUtil.format(t.time);
                5 == t.type || 7 == t.type
                    ? (this.lblname.string = t.fname)
                    : (this.lblname.string = t.name);
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblname", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
