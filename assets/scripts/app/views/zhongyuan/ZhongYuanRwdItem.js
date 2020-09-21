var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/RenderListItem"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.list = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                t.rand.rs == t.rand.re
                    ? (this.lblRank.string = i18n.t("AT_LIST_RAND_TXT_2", {
                          num: t.rand.rs
                      }))
                    : (this.lblRank.string = i18n.t("AT_LIST_RAND_TXT_1", {
                          num1: t.rand.rs,
                          num2: t.rand.re
                      }));
                this.list.data = t.member;
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.bg.height = e;
        };
        __decorate([a(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([a(i.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Node)], e.prototype, "bg", void 0);
        return (e = __decorate([r], e));
    })(n.default);
o.default = s;
