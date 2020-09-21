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
            e.lblScore = null;
            e.lblRank = null;
            e.lblName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblScore.string = n.utils.formatMoney(t.num) + "";
                this.lblRank.string = t.rid + "";
                this.lblName.string = t.name;
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
