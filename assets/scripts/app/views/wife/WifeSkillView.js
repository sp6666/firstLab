var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.txt_expValue = null;
            e.lblLv = null;
            e.lblEff = null;
            e.listView = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("WIFE_LIST_UPDATE", this.showSkillData, this);
            this.showSkillData();
        };
        e.prototype.showSkillData = function() {
            this.txt_expValue.string = n.wifeProxy.curSelectWife.exp.toString();
            n.wifeProxy.skillWifeId = n.wifeProxy.curSelectWife.id;
            this.listView.data = n.wifeProxy.curSelectWife.skill;
            var t = n.jibanProxy.getWifeJbLv(n.wifeProxy.curSelectWife.id);
            this.lblLv.string = i18n.t("WIFE_YOU_QING_LV", {
                lv: t.level % 100
            });
            this.lblEff.string = i18n.t("WIFE_SKILL_EFF", {
                num: t.prop / 100
            });
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "txt_expValue", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblEff", void 0);
        __decorate([s(i.default)], e.prototype, "listView", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
