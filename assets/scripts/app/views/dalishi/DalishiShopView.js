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
            e.lblMoney = null;
            e.lblAtkAdd = null;
            e.lblSkillBaojiAdd = null;
            e.lblSkillBaoshangAdd = null;
            e.lblHp = null;
            e.checkBox = null;
            e.prg = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.dalishiProxy.UPDATE_DALISHI_FIGHT,
                this.updateFight,
                this
            );
            this.updateFight();
            this.checkBox.isChecked =
                parseInt(n.timeProxy.getLoacalValue("DALISI_SHOP")) ==
                n.dalishiProxy.info.qhid;
        };
        e.prototype.onClickCheck = function() {
            var t = this.checkBox.isChecked ? n.dalishiProxy.info.qhid : 0;
            n.timeProxy.saveLocalValue("DALISI_SHOP", t + "");
        };
        e.prototype.updateFight = function() {
            this.lblMoney.string = l.utils.formatMoney(
                n.dalishiProxy.fight.money
            );
            this.lblAtkAdd.string = i18n.t("DALISI_ATK_ADD", {
                d: n.dalishiProxy.fight.ackadd
            });
            this.lblSkillBaojiAdd.string = i18n.t("DALISI_SKILLBAOJI_ADD", {
                d: n.dalishiProxy.fight.skill1add
            });
            this.lblSkillBaoshangAdd.string = i18n.t("DALISI_SKILLBAOSHANG_ADD", {
                d: n.dalishiProxy.fight.skill2add
            });
            this.lblHp.string = i18n.t("COMMON_NUM", {
                f: n.dalishiProxy.fight.hp,
                s: n.dalishiProxy.fight.hpmax
            });
            this.prg.progress =
                n.dalishiProxy.fight.hp / n.dalishiProxy.fight.hpmax;
            this.list.data = n.dalishiProxy.fight.shop;
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblMoney", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblAtkAdd", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSkillBaojiAdd", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSkillBaoshangAdd", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblHp", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "checkBox", void 0);
        __decorate([s(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
