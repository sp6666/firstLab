var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.slot = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.slot.data = t;
                var e = l.servantProxy.nobility.need.indexOf(t.id);
                this.lblCount.string = i18n.t("COMMON_NUM", {
                    f: l.bagProxy.getItemCount(t.id),
                    s: l.servantProxy.nobility.need_count[e]
                });
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(n.default)], e.prototype, "slot", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
