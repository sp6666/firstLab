var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblNum = null;
            e.numNode = null;
            e.icon = null;
            e.selectImg = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectImg.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this.data;
            if (t && t.id) {
                var e = l.bagProxy.getItemCount(t.id);
                this.numNode.active = e > 0;
                this.lblNum.string = e + "";
                this.icon.url = r.uiHelps.getItemSlot(t.id);
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Node)], e.prototype, "numNode", void 0);
        __decorate([c(n.default)], e.prototype, "icon", void 0);
        __decorate([c(cc.Node)], e.prototype, "selectImg", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
