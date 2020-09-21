var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.slot = null;
            e.imgMask = null;
            e.btn = null;
            e.eff = null;
            e._isShow = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t && null != t.id) {
                this.slot.data = t;
                if (!this._isShow) {
                    this._isShow = !0;
                    l.utils.showNodeEffect(this.eff, 0);
                }
            }
        };
        __decorate([s(n.default)], e.prototype, "slot", void 0);
        __decorate([s(cc.Node)], e.prototype, "imgMask", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        __decorate([s(cc.Node)], e.prototype, "eff", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
