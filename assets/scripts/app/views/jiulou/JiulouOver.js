var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblPeople = null;
            e.lblScore = null;
            e.lblGold = null;
            e.lblTotalPrpo = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = n.jiulouProxy.win.yhnew;
            this.lblPeople.string = i18n.t("JIULOU_ALL_PEOPLE", {
                c: t.maxnum
            });
            this.lblScore.string = this.lblGold.string =
                "+" + i.utils.formatMoney(t.allscore);
            this.lblTotalPrpo.string = n.jiulouProxy.win.yhnew.allep + "";
            this.list.data = t.list;
            n.jiulouProxy.sendJlInfo();
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
            i.utils.closeNameView("jiulou/JiulouDinnce");
            n.jiulouProxy.win = null;
        };
        __decorate([s(l.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblPeople", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTotalPrpo", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
