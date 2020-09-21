var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../views/item/ItemSlotUI"),
    n = require("./RenderListItem"),
    l = require("../utils/UIUtils"),
    r = require("./UrlLoad"),
    a = require("../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urlload = null;
            e.itemslot = null;
            e.lblCount = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.urlload && (this.urlload.node.active = 2 == t.kind);
                this.itemslot.node.active = 2 != t.kind;
                this.itemslot.node.active && (this.itemslot.data = t);
                this.urlload &&
                    this.urlload.node.active &&
                    (this.urlload.url = l.uiHelps.getResIcon(t.id));
                this.lblCount.string = i18n.t("COMMON_ADD", {
                    n: "",
                    c: a.utils.formatMoney(t.count)
                });
            }
        };
        __decorate([_(r.default)], e.prototype, "urlload", void 0);
        __decorate([_(i.default)], e.prototype, "itemslot", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([c], e));
    })(n.default);
o.default = d;
