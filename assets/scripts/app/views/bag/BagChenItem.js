var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblOut = null;
            e.lblEff = null;
            e.lblTime = null;
            e.nodeUse = null;
            e.nodeCancel = null;
            e.urlload = null;
            return e;
        }
        e.prototype.onClickUse = function() {};
        e.prototype.onClickCancel = function() {};
        e.prototype.showData = function() {
            this._data;
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblOut", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblEff", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeUse", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeCancel", void 0);
        __decorate([a(n.default)], e.prototype, "urlload", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
