var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblSp = null;
            e.lblOrg = null;
            e.lblAdd = null;
            e.nodeRole = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this.lblName.string = t.name;
            this.lblSp.string = t.sp;
            this.lblOrg.string = t.org;
            this.lblAdd.string = t.add;
            this.nodeRole.active = null != t.role;
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
            i.utils.popNext(!1);
        };
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblSp", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblOrg", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblAdd", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeRole", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
