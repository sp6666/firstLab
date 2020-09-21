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
            e.lblName = null;
            e.lblLead = null;
            e.lblHurt = null;
            e.lblgx = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblName.string = t.rid;
                this.lblLead.string = t.name;
                this.lblHurt.string = t.hit + "";
                this.lblgx.string = t.gx + "";
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblLead", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblHurt", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblgx", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
