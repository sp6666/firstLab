var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/RenderListItem"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblLead = null;
            e.lblSl = null;
            e.lblSf = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblName.string = t.name;
                this.lblLead.string = i.unionProxy.getPostion(t.post);
                this.lblSl.string = t.shili ? l.utils.formatMoney(t.shili) : "";
                var e = localcache.getItem(localdb.table_officer, t.level);
                this.lblSf.string = e ? e.name : "";
                if (l.stringUtil.isBlank(t.shili + "")) {
                    this.lblName.node.x = -125;
                    this.lblLead.node.x = 130;
                } else {
                    this.lblName.node.x = -195;
                    this.lblLead.node.x = 226;
                }
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLead", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSl", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSf", void 0);
        return (e = __decorate([a], e));
    })(n.default);
o.default = c;
