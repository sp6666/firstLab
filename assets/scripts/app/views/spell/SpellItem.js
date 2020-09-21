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
            e.black = null;
            e.lblIndex = null;
            e.lblNum = null;
            e.newNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if (n.spellProxy.cfg.debris) {
                    var e = n.spellProxy.cfg.debris.indexOf(t) + 1;
                    this.lblIndex.string = e + "";
                }
                this.lblNum.string = i18n.t("SPELL_HAVE_NUM", {
                    num: t.num ? t.num : 0
                });
                this.black.active = null == t.num || 0 == t.num;
                var o,
                    i = n.timeProxy.getLoacalValue("spell");
                if ((o = JSON.parse(i)))
                    for (var l = 0; l < o.length; l++) {
                        var r = o[l];
                        r &&
                            r.id == t.id &&
                            (this.newNode.active = r.num < t.num);
                    }
            }
        };
        __decorate([a(cc.Node)], e.prototype, "black", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([a(cc.Node)], e.prototype, "newNode", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
