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
            e.lblHurt = null;
            e.lblGx = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblRank.string = t.rid;
                this.lblName.string = t.name;
                this.lblHurt.string = t.hit + "";
                this.lblGx.string = t.gx + "";
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblHurt", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblGx", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
