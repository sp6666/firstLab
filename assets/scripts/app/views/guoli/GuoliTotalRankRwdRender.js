var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblScore = null;
            e.rwdList = null;
            e.rwdList_2 = null;
            e.rwdNode = null;
            e.isDayRwd = !0;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                t.rand.rs == t.rand.re
                    ? (this.lblTitle.string = i18n.t("AT_LIST_RAND_TXT_2", {
                          num: t.rand.rs
                      }))
                    : (this.lblTitle.string = i18n.t("AT_LIST_RAND_TXT_1", {
                          num1: t.rand.rs,
                          num2: t.rand.re
                      }));
                if (this.isDayRwd) {
                    var e = i18n.t("GUO_LI_TITLE_" + l.guoliPorxy.lookType),
                        o = i18n.t("GUO_LI_TEXT_" + l.guoliPorxy.lookType);
                    this.lblScore.string = i18n.t("GUO_LI_E_WAI_HUO_DE_1", {
                        title: e,
                        name: o,
                        num: t.need
                    });
                } else
                    this.lblScore.string = i18n.t("GUO_LI_E_WAI_HUO_DE_2", {
                        num: t.need
                    });
                this.rwdList.data = t.member;
                this.rwdList_2.data = t.added;
                this.rwdNode.active = t.added && t.added.length > 0;
                this.rwdList.node.x = -this.rwdList.node.width / 2;
                this.rwdList_2.node.x = -this.rwdList_2.node.width / 2;
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(n.default)], e.prototype, "rwdList", void 0);
        __decorate([s(n.default)], e.prototype, "rwdList_2", void 0);
        __decorate([s(cc.Node)], e.prototype, "rwdNode", void 0);
        __decorate(
            [
                s({
                    tooltip: "是否今日国力排行"
                })
            ],
            e.prototype,
            "isDayRwd",
            void 0
        );
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
