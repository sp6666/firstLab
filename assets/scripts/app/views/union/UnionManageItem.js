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
            e.btn = null;
            e.lblCount = null;
            e.nodeRed = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.btn &&
                this.btn.clickEvents &&
                this.btn.clickEvents.length > 0 &&
                (this.btn.clickEvents[0].customEventData = this);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblName.string = i18n.t(t.name);
                this.nodeRed.active = !!t.red;
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Button)], e.prototype, "btn", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeRed", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
