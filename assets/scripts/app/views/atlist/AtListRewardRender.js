var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRand = null;
            e.list = null;
            e.bg = null;
            e.listMz = null;
            e.listCy = null;
            e.unionNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if(this.lblRand != null) {
                    t.rand.rs < 4
                    ? (this.lblRand.string = i18n.t("AT_LIST_RAND_TXT_2", {
                          num: t.rand.rs
                      }))
                    : t.rand.rs == t.rand.re
                    ? (this.lblRand.string = i18n.t("AT_LIST_RAND_TXT_2", {
                          num: t.rand.rs
                      }))
                    : (this.lblRand.string = i18n.t("AT_LIST_RAND_TXT_1", {
                          num1: t.rand.rs,
                          num2: t.rand.re
                      }));
                }

                this.list.node.active = null == t.mengzhu;
                this.unionNode && (this.unionNode.active = null != t.mengzhu);
                this.listCy && (this.listCy.data = t.member);
                this.listMz && (this.listMz.data = t.mengzhu);
                this.list.data = t.member;
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.bg.height = e;
        };
        __decorate([a(cc.Label)], e.prototype, "lblRand", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Node)], e.prototype, "bg", void 0);
        __decorate([a(n.default)], e.prototype, "listMz", void 0);
        __decorate([a(n.default)], e.prototype, "listCy", void 0);
        __decorate([a(cc.Node)], e.prototype, "unionNode", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
