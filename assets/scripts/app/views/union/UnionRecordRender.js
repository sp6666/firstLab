var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lbldes = null;
            e.lbltime = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblname.string = t.name;
                this.lbltime.string = n.timeUtil.format(t.time);
                this.lbldes.string = i18n.t("UNION_RECORD_TXT", {
                    name: t.heroname,
                    num: t.hit
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([a(cc.Label)], e.prototype, "lbldes", void 0);
        __decorate([a(cc.Label)], e.prototype, "lbltime", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
