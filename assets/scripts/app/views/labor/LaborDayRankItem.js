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
            e.lblRank = null;
            e.lblName = null;
            e.lblNum = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblRank.string = t.rid + "";
                this.lblName.string = t.name;
                this.lblNum.string =
                    l.timeUtil.second > n.laborDayProxy.data.info.eTime - 86400
                        ? t.score + ""
                        : "***";
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblNum", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
