var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urlIcon = null;
            e.lblName = null;
            e.lblSolder = null;
            e.lblRwd1 = null;
            e.lblRwd2 = null;
            e.list = null;
            return e;
        }
        e.prototype.showData = function() {
            this.data;
        };
        e.prototype.onClickBat = function() {};
        __decorate([s(n.default)], e.prototype, "urlIcon", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSolder", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRwd1", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRwd2", void 0);
        __decorate([s(l.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
