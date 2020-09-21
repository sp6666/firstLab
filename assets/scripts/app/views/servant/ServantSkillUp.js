var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblUpNeed = null;
            e.lblCurEff = null;
            e.lblNextEff = null;
            e.lblName = null;
            e.lblExp = null;
            e._curSkillData = null;
            e._curHero = null;
            e.skill = null;
            e._oldLv = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SERVANT_SKILL_UP", this.onDataUpdate, this);
            var t = this.node.openParam;
            this.skill = t._skill;
            this._curHero = t._hero;
            this._oldLv = this.skill.level;
            this.onSkillUpdate();
        };
        e.prototype.onDataUpdate = function() {
            this._curHero = n.servantProxy.getHeroData(this._curHero.id);
            for (var t = 0; t < this._curHero.pkskill.length; t++)
                if (this._curHero.pkskill[t].id == this.skill.id) {
                    this._oldLv < this._curHero.pkskill[t].level &&
                        i.alertUtil.alert(i18n.t("SERVANT_TE_CHANG_LEVEL_UP"));
                    this.skill = this._curHero.pkskill[t];
                    break;
                }
            this.onSkillUpdate();
        };
        e.prototype.onSkillUpdate = function() {
            if (this.skill) {
                this._curSkillData = this.skill;
                var t = localcache.getItem(
                        localdb.table_pkSkill,
                        this.skill.id
                    ),
                    e = localcache.getItem(
                        localdb.table_pkLvUp,
                        this.skill.level
                    );
                this.lblName.string = i18n.t("SERVANT_SKILL_NAME_TXT", {
                    name: t.name,
                    lv: this._curSkillData.level
                });
                this.lblUpNeed.string = e.exp + "";
                this.lblExp.string = this._curHero.pkexp + "";
                this.lblCurEff.string =
                    (t.base + t.upgrade * this.skill.level) / 100 +
                    "%" +
                    t.comm;
                this.skill.level < t.maxLevel
                    ? (this.lblNextEff.string =
                          (t.base + t.upgrade * (this.skill.level + 1)) / 100 +
                          "%" +
                          t.comm)
                    : (this.lblNextEff.string = i18n.t("SERVANT_MAX_LEVEL"));
            }
        };
        e.prototype.onClickSkillUp = function(t, e) {
            var o = this._curSkillData,
                l = localcache.getItem(localdb.table_pkSkill, o.id),
                r = localcache.getItem(localdb.table_pkLvUp, o.level);
            if (o.level < l.maxLevel)
                if (r.exp > this._curHero.pkexp)
                    i.alertUtil.alert(i18n.t("SERVANT_SKILL_EXP_LIMIT"));
                else {
                    n.servantProxy.sendUpPkSkill(this._curHero.id, o.id);
                    i.audioManager.playSound("levelup", !0, !0);
                }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblUpNeed", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCurEff", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNextEff", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblExp", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
