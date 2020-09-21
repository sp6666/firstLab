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
            e.servantTip = null;
            e.spEffect = null;
            e.lblDamge1 = null;
            e.lblDamge2 = null;
            e.lblBoss = null;
            e.lblServant = null;
            e.nodeBossText = null;
            e.nodeServantText = null;
            e.spServantEffect = null;
            e.nodeFight = null;
            e.lblFight = null;
            e.lblQishi = null;
            e.lastMap = -1;
            e.fightType = 0;
            e.isShow = !1;
            e.damage = 0;
            e.lastHp = 0;
            e.heroid = 0;
            e.bossLunZhan = null;
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
            var t = this;
            if (r.playerProxy.userEp.e1 < this.getRemain())
                n.utils.showConfirm(
                    i18n.t("FIGHT_BOSS_LOST"),
                    function(e) {
                        if (e == s.default.NO) t.onClickBack();
                        else {
                            t.nodeFight.active = !1;
                            t.checkEnd();
                        }
                    },
                    null,
                    null,
                    i18n.t("FIGHT_BATTLE_CONTINUE"),
                    i18n.t("FIGHT_EXIT")
                );
            else {
                this.nodeFight.active = !1;
                this.checkEnd();
            }
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
            this.showBossDialog(0);
        };
        e.prototype.showBossDialog = function(t) {
            var e = r.fightProxy.bossData;
            0 == t && (this.bossLunZhan = this.getLunZhan(e.bossCharacter));
            if (this.bossLunZhan) {
                this.nodeBossText.active = !0;
                this.nodeServantText.active = !1;
                switch (t) {
                    case 0:
                        this.servantTip.active = !0;
                        this.lblBoss.string = this.bossLunZhan.opening;
                        n.utils.showNodeEffect(this.nodeBossText);
                        break;

                    case 1:
                        this.lblBoss.string = this.bossLunZhan.fight;
                        n.utils.showNodeEffect(this.nodeBossText);
                        this.scheduleOnce(this.startServant, 2);
                        break;

                    case 2:
                        this.lblBoss.string = this.bossLunZhan.exchange;
                        n.utils.showNodeEffect(this.nodeBossText);
                        this.bossLunZhan = this.getLunZhan(e.bossCharacter);
                        break;

                    case 3:
                        r.fightProxy.isBoss = !0;
                        this.nodeBossText.active = !1;
                        this.nodeServantText.active = !0;
                        this.lblServant.string = this.bossLunZhan.win;
                        n.utils.showNodeEffect(this.nodeServantText);
                        n.utils.openPrefabView("battle/FightWinView");
                        break;

                    case 4:
                        this.lblBoss.string = this.bossLunZhan.lose;
                        n.utils.showNodeEffect(this.nodeBossText);
                        var o = this;
                        n.utils.showConfirmItem(
                            i18n.t("FIGHT_LOST_CONFIRM", {
                                v: 100
                            }),
                            1,
                            r.playerProxy.userData.cash,
                            function(t) {
                                if (t == s.default.NO) {
                                    c.funUtils.openView(
                                        c.funUtils.servantView.id
                                    );
                                    o.onClickClost();
                                } else {
                                    if (r.playerProxy.userData.cash > 100) {
                                        n.alertUtil.alertItemLimit(1);
                                        n.utils.closeView(o);
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
                }
            }
        };
        e.prototype.getLunZhan = function(t) {
            for (
                var e = localcache.getList(localdb.table_lunZhan),
                    o = [],
                    i = 0;
                i < e.length;
                i++
            )
                e[i].character == t && o.push(e[i]);
            return o.length > 0
                ? o[Math.floor(o.length * Math.random())]
                : null;
        };
        e.prototype.showCurHero = function() {
            var t = r.fightProxy.getCanFight();
            this.list.data = t;
        };
        e.prototype.checkEnd = function() {
            var t = this,
                e = r.fightProxy.getCanFight();
            r.fightProxy.bossData;
            this.getRemain() <= 0
                ? this.scheduleOnce(function() {
                      t.showBossDialog(3);
                  }, 2)
                : null == e || 0 == e.length
                ? this.scheduleOnce(function() {
                      t.showBossDialog(4);
                  }, 2)
                : this.showServantDamage();
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
                    l = e ? e.data : null;
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
        e.prototype.showServantDamage = function() {
            var t = r.servantProxy.getHeroData(this.heroid);
            if (t) {
                var e = t.aep.e1 + t.aep.e3 + t.aep.e2 + t.aep.e4;
                e *= 0.5 * Math.random() + 1.5;
                this.lblDamge2.string =
                    "-" + n.utils.formatMoney(Math.floor(e));
                this.lblDamge2.node.active = !0;
                n.utils.showEffect(this.lblDamge2, 0);
                this.spServantEffect.node.active = !0;
                this.spServantEffect.animation = "animation";
                a.uiUtils.showShake(this.servantUrl);
                this.nodeBossText.active = !0;
                this.lblBoss.string = this.bossLunZhan.lose;
                r.fightProxy.playerRandomHit();
            }
            this.scheduleOnce(this.showBossAtkEnd, 2);
        };
        e.prototype.showBossAtkEnd = function() {
            n.utils.showEffect(this.servantUrl, 5);
            this.nodeBossText.active = !1;
            this.isShow = !1;
            this.showBossDialog(2);
            this.showCurInfo();
        };
        e.prototype.onBossAtk = function(t) {
            var e = this.getRemain();
            this.damage = this.lastHp - e;
            this.lastHp = e;
            0 != t ? this.startServant() : this.showCurInfo();
            this.servantTip.active = !1;
        };
        e.prototype.startServant = function() {
            if (this.bossLunZhan) {
                var t = this.bossLunZhan.answer.split("|"),
                    e = localcache.getItem(localdb.table_hero, this.heroid);
                if (e) {
                    this.nodeBossText.active = !1;
                    this.nodeServantText.active = !0;
                    this.lblServant.string = t[e.disposition - 1];
                    n.utils.showNodeEffect(this.nodeServantText);
                }
            }
            r.fightProxy.playerRandomHit();
            this.nodeBossText.active = !1;
            var o = r.fightProxy.bossData;
            this.lblDamge1.string =
                "-" + n.utils.formatMoney(Math.floor(this.damage));
            this.lblDamge1.node.active = !0;
            n.utils.showEffect(this.lblDamge1, 0);
            this.spEffect.node.active = !0;
            this.spEffect.animation = "animation";
            a.uiUtils.showShake(this.boss);
            var i = this.lastHp + this.damage,
                l = this.lastHp + 0;
            l = l < 0 ? 0 : l;
            var s = (i = i > o.maxHp ? o.maxHp : i) / o.maxHp,
                c = l / o.maxHp;
            a.uiUtils.showPrgChange(this.prg, s, c);
            a.uiUtils.showNumChange(this.lblPer, i, l);
            this.scheduleOnce(this.checkEnd, 2);
        };
        __decorate([u(l.default)], e.prototype, "boss", void 0);
        __decorate([u(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(l.default)], e.prototype, "servantUrl", void 0);
        __decorate([u(i.default)], e.prototype, "list", void 0);
        __decorate([u(cc.Node)], e.prototype, "servantTip", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "spEffect", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblDamge1", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblDamge2", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblBoss", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblServant", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeBossText", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeServantText", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "spServantEffect", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeFight", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblFight", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblQishi", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
