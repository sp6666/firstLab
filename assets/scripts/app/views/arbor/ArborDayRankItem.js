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
                this.lblNum.string = t.score + "";
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblNum", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
