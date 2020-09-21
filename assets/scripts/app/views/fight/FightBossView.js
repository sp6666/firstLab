var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../component/UrlLoad"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("../../component/ConfirmView"),
    c = require("../../models/TimeProxy"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.boss = null;
            e.prg = null;
            e.lblPer = null;
            e.lblName = null;
            e.servantUrl = null;
            e.list = null;
            e.spEffect = null;
            e.lblDamge1 = null;
            e.lblDamge2 = null;
            e.lblBoss = null;
            e.lblServant = null;
            e.nodeBossText = null;
            e.nodeServantText = null;
            e.spServant = null;
            e.nodeFight = null;
            e.lblFight = null;
            e.lblQishi = null;
            e.lastMap = -1;
            e.fightType = 0;
            e.isShow = !1;
            e.damage = 0;
            e.lastHp = 0;
            e.heroid = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.fightType = this.node.openParam ? this.node.openParam.id : 0;
            this.servantUrl.url = "";
            this.showCurInfo();
            this.lastHp = this.getRemain();
            this.damage = 0;
            this.lblFight.string = i18n.t("FIGHT_NEED_FIGHT", {
                t: n.utils.formatMoney(r.fightProxy.bossData.maxHp)
            });
            this.lblQishi.string = i18n.t("FIGHT_ALL_QISHI", {
                t: n.utils.formatMoney(r.playerProxy.userEp.e1)
            });
            facade.subscribe("BATTLE_BOSS_OVER", this.onBossAtk, this);
            facade.subscribe("BATTLE_BACK_HID", this.showCurInfo, this);
            facade.subscribe("FIGHT_CLOST_WIN_VIEW", this.onClickBack, this);
            facade.subscribe("FIGHT_CLOST_LOST_VIEW", this.onClickBack, this);
            facade.subscribe("FIGHT_LOST_CLICK", this.onClickLost, this);
        };
        e.prototype.onClickLeft = function(t) {
            t < 340 || this.onClickBack();
        };
        e.prototype.onClickLost = function(t) {
            if (0 == t) {
                this.nodeFight.active = !1;
                this.checkEnd();
            } else this.onClickBack();
        };
        e.prototype.onClickFight = function() {
            if (r.playerProxy.userEp.e1 < this.getRemain())
                n.utils.openPrefabView("battle/FightLostView");
            else {
                this.nodeFight.active = !1;
                this.checkEnd();
            }
        };
        e.prototype.onBossAtk = function(t) {
            var e = this.getRemain();
            this.damage = this.lastHp - e;
            this.lastHp = e;
            t && 0 != t ? this.showDamage(1) : this.showCurInfo();
        };
        e.prototype.getRemain = function() {
            var t = r.fightProxy.bossData,
                e = r.playerProxy.userData.mkill;
            this.lastMap != r.playerProxy.userData.bmap &&
                0 == this.fightType &&
                (e = t.maxHp);
            return t.maxHp - e;
        };
        e.prototype.showCurInfo = function() {
            -1 == this.lastMap && (this.lastMap = r.fightProxy.bossData.id);
            var t = r.fightProxy.bossData;
            if (t) {
                this.boss.url = a.uiHelps.getServantSpine(t.photo);
                this.lblName.string = t.bname;
                var e = this.getRemain(),
                    o = e / t.maxHp;
                o = o < 0 ? 0 : o;
                this.prg.progress = o;
                this.lblPer.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: t.maxHp
                });
            }
            this.showCurHero();
        };
        e.prototype.showCurHero = function() {
            var t = r.fightProxy.getCanFight();
            this.list.data = t;
        };
        e.prototype.checkEnd = function() {
            for (
                var t,
                    e = r.fightProxy.getCanFight(),
                    o = this.getRemain(),
                    i = this,
                    l = r.fightProxy.getMaxHid(),
                    a = 0,
                    _ = 0;
                _ < r.fightProxy.pvbList.length;
                _++
            )
                if (r.fightProxy.pvbList[_].id == l) {
                    a = null == (a = r.fightProxy.pvbList[_].b) ? 0 : a;
                    break;
                }
            t = Math.floor(100 * Math.pow(1.2, a));
            if (o <= 0) {
                r.fightProxy.isBoss = !0;
                n.utils.openPrefabView("battle/FightWinView");
            } else
                (null != e && 0 != e.length) ||
                    n.utils.showConfirmItem(
                        i18n.t("FIGHT_LOST_CONFIRM", {
                            v: t
                        }),
                        1,
                        r.playerProxy.userData.cash,
                        function(e) {
                            if (e == s.default.NO) {
                                c.funUtils.openView(c.funUtils.servantView.id);
                                i.onClickClost();
                            } else {
                                if (r.playerProxy.userData.cash < t) {
                                    n.alertUtil.alertItemLimit(1);
                                    n.utils.closeView(i);
                                    return;
                                }
                                r.fightProxy.sendBackHid(
                                    r.fightProxy.getMaxHid()
                                );
                            }
                        },
                        "FIGHT_LOST_CONFIRM",
                        null,
                        null,
                        i18n.t("FIGHT_LOST_REBIRTH"),
                        i18n.t("FIGHT_LOST_UP")
                    );
        };
        e.prototype.onClickClost = function() {
            this.checkStory();
            n.utils.closeView(this);
            n.utils.closeNameView("battle/FightView");
        };
        e.prototype.checkStory = function() {
            var t = r.fightProxy.bossData;
            if (
                this.getRemain() <= 0 &&
                !n.stringUtil.isBlank(t.storyId) &&
                r.playerProxy.getStoryData(t.storyId)
            ) {
                r.playerProxy.addStoryId(t.storyId);
                n.utils.openPrefabView("StoryView");
            } else facade.send("FIGHT_SHOW_GUIDE");
        };
        e.prototype.onClickBack = function() {
            this.checkStory();
            n.utils.closeView(this);
        };
        e.prototype.onClickSelect = function(t, e) {
            if (
                !this.isShow &&
                null != e &&
                null != e.data &&
                !this.nodeFight.active
            ) {
                this.isShow = !0;
                var o = e,
                    i = Math.floor(5 * Math.random()),
                    l = o.data;
                this.heroid = l.id;
                this.servantUrl.url = a.uiHelps.getServantSpine(l.id);
                this.servantUrl.node.active = !0;
                o.node.active = !1;
                n.utils.showEffect(this.servantUrl, i);
                if (0 == this.fightType) r.fightProxy.sendBossFight(l.id);
                else
                    switch (this.fightType) {
                        case 1:
                            r.playerProxy.userData.mkill =
                                r.fightProxy.bossData.maxHp;
                            r.fightProxy.sendSpecBoss(l.id, this.fightType);
                    }
            }
        };
        e.prototype.showDamage = function(t) {
            var e = r.fightProxy.bossData;
            r.fightProxy.playerRandomHit();
            this.nodeBossText.active = !1;
            this.lblDamge1.string =
                "-" + n.utils.formatMoney(Math.floor(this.damage / 2));
            this.lblDamge1.node.active = !0;
            n.utils.showEffect(this.lblDamge1, 0);
            this.spEffect.node.active = !0;
            this.spEffect.animation = "animation";
            a.uiUtils.showShake(this.boss);
            var o =
                    this.lastHp +
                    (1 == t ? this.damage : Math.floor(this.damage / 2)),
                i = this.lastHp + (1 == t ? Math.floor(this.damage / 2) : 0);
            i = i < 0 ? 0 : i;
            var l = (o = o > e.maxHp ? e.maxHp : o) / e.maxHp,
                s = i / e.maxHp;
            a.uiUtils.showPrgChange(this.prg, l, s);
            a.uiUtils.showNumChange(this.lblPer, o, i);
            if (1 == t) this.showServantDialog();
            else if (2 == t)
                if (this.lastHp > 0) {
                    this.nodeServantText.active = !0;
                    var c =
                        0 != this.heroid
                            ? this.getShowString(1, this.heroid)
                            : null;
                    c && (this.lblServant.string = c.losdialog);
                    this.scheduleOnce(this.showBossAtkEnd, 2);
                } else {
                    this.isShow = !1;
                    this.scheduleOnce(this.checkEnd, 2);
                }
        };
        e.prototype.showServantDialog = function() {
            this.nodeServantText.active = !0;
            var t =
                0 != this.heroid ? this.getShowString(1, this.heroid) : null;
            t && (this.lblServant.string = t.atkdialog1);
            this.scheduleOnce(this.showBossDialog, 2);
        };
        e.prototype.showDamage2 = function() {
            this.nodeServantText.active = !1;
            this.showDamage(2);
        };
        e.prototype.getShowString = function(t, e) {
            for (
                var o = localcache.getGroup(
                        localdb.table_battledialog,
                        "type",
                        t
                    ),
                    i = 0;
                i < o.length;
                i++
            )
                if (o[i].param == e) return o[i];
            return null;
        };
        e.prototype.showBossDialog = function() {
            this.nodeServantText.active = !1;
            this.nodeBossText.active = !0;
            var t = r.fightProxy.bossData,
                e = this.getShowString(2, t.id);
            e && (this.lblBoss.string = e.atkdialog1);
            this.showServantDamage();
        };
        e.prototype.showServantDamage = function() {
            var t = r.servantProxy.getHeroData(this.heroid);
            if (t) {
                var e = t.aep.e1 + t.aep.e3 + t.aep.e2 + t.aep.e4;
                e *= 0.5 * Math.random() + 1.5;
                this.lblDamge2.string =
                    "-" + n.utils.formatMoney(Math.floor(e));
                this.lblDamge2.node.active = !0;
                n.utils.showEffect(this.lblDamge2, 0);
                this.spServant.node.active = !0;
                this.spServant.animation = "animation";
                a.uiUtils.showShake(this.servantUrl);
            }
            r.fightProxy.playerRandomHit();
            this.scheduleOnce(this.showDamage2, 2);
        };
        e.prototype.showBossAtkEnd = function() {
            n.utils.showEffect(this.servantUrl, 5);
            this.nodeServantText.active = !1;
            this.isShow = !1;
            this.showCurInfo();
            this.checkEnd();
        };
        __decorate([u(l.default)], e.prototype, "boss", void 0);
        __decorate([u(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(l.default)], e.prototype, "servantUrl", void 0);
        __decorate([u(i.default)], e.prototype, "list", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "spEffect", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblDamge1", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblDamge2", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblBoss", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblServant", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeBossText", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeServantText", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "spServant", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeFight", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblFight", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblQishi", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
