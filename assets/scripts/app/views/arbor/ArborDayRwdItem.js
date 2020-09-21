var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../component/LabelShadow"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblRank = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.list.data = t.member;
                t.rand.rs == t.rand.re
                    ? (this.lblRank.string = i18n.t("AT_LIST_RAND_TXT_2", {
                          num: t.rand.rs
                      }))
                    : (this.lblRank.string = i18n.t("AT_LIST_RAND_TXT_1", {
                          num1: t.rand.rs,
                          num2: t.rand.re
                      }));
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.bg.height = e;
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(l.default)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Node)], e.prototype, "bg", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
