var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.show = null;
            e.lblNum = null;
            e.lblName = null;
            return e;
        }
        e.prototype.onClick = function() {
            r.utils.openPrefabView("treasure/TreasureDetail", !1, this._data);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.data.name;
                for (var e = 0, o = 0; o < t.items.length; o++)
                    1 == t.items[o].rwd && (e += 1);
                this.lblNum.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: t.items.length
                });
                this.show.url = l.uiHelps.getTreasureGroup(t.data.photo);
            }
        };
        __decorate([c(n.default)], e.prototype, "show", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
