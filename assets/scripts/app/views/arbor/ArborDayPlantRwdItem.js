var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/LabelShadow"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.lblNum = null;
            e.btnGet = null;
            e.btnYlq = null;
            e.bg = null;
            e.bottom = null;
            e.list = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblRank.string = i18n.t("LIMIT_REWARD_NUMBER", {
                    value: t.id
                });
                this.list.data = t.items;
                this.btnGet.node.active = 0 == t.get;
                this.btnYlq.active = 1 == t.get;
                this.btnGet.interactable =
                    l.arborDayProxy.myRid.score >= t.need;
                this.lblNum.string = i18n.t("ARBOR_DAY_LING_QU_FANG_SHI", {
                    num: l.arborDayProxy.myRid.score,
                    need: t.need
                });
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.bg.height = e;
            this.node.height = e;
            this.bottom.y = -(e - 30);
        };
        e.prototype.onClickGet = function() {
            var t = this.data;
            l.arborDayProxy.sendGetRwd(t.id);
        };
        __decorate([c(r.default)], e.prototype, "lblRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnYlq", void 0);
        __decorate([c(cc.Node)], e.prototype, "bg", void 0);
        __decorate([c(cc.Node)], e.prototype, "bottom", void 0);
        __decorate([c(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
