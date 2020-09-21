var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = n.playerProxy.getKindIdName(t.item.kind, t.item.id);
                this.lblTitle.string = i18n.t("LUCKY_TABLE_RECORDS", {
                    name: t.name,
                    name2: e
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblTitle", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
