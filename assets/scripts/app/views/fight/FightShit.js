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
    s = require("./FightEnemyItem"),
    c = require("../../models/FightProxy"),
    _ = require("../../component/RoleSpine"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.rightHead = null;
            e.lblName = null;
            e.prgLeft = null;
            e.lblLeftPrg = null;
            e.lblLeftWuli = null;
            e.lblLost = null;
            e.prgRight = null;
            e.lblRightPrg = null;
            e.lblRightWuli = null;
            e.rightSp = null;
            e.leftSp = null;
            e.btnStart = null;
            e.list = null;
            e.lblDamage = null;
            e.nodeServantTalk = null;
            e.lblServantTalk = null;
            e.nodeEnemyTalk = null;
            e.lblEnemyTalk = null;
            e.roleSpine = null;
            e.enemyItems = [];
            e.isOver = !1;
            e.isStart = !1;
            e.fightType = 0;
            e.context = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.fightType = this.node.openParam ? this.node.openParam.id : 0;
            this.showBattleData();
            facade.subscribe("FIGHT_CLOST_WIN_VIEW", this.clostWin, this);
            facade.subscribe("FIGHT_CLOST_LOST_VIEW", this.onClickBack, this);
            facade.subscribe("BATTLE_ENEMY_OVER", this.onBattleSendend, this);
            facade.subscribe(
                r.playerProxy.PLAYER_USER_UPDATE,
                this.onUpdateArmy,
                this
            );
        };
        e.prototype.onUpdateArmy = function() {
            if (!this.isStart) {
                var t = r.fightProxy.battleData;
                t.leftArmy = r.playerProxy.userData.army;
                a.uiUtils.showNumChange(this.lblLeftPrg, 0, t.leftArmy);
            }
        };
        e.prototype.showBattleData = function() {
            if (null != r.fightProxy.battleData) {
                var t = r.fightProxy.battleData,
                    e = t.rightArmy - r.playerProxy.userData.mkill;
                a.uiUtils.showPrgChange(this.prgLeft);
                a.uiUtils.showPrgChange(this.prgRight, 0, e / t.rightArmy);
                a.uiUtils.showNumChange(this.lblLeftPrg, 0, t.leftArmy);
                a.uiUtils.showNumChange(this.lblRightPrg, 0, e);
                this.isStart = this.isOver = !1;
                this.btnStart.node.active = !0;
                this.nodeEnemyTalk.active = !1;
                this.nodeServantTalk.active = !1;
                this.lblDamage.node.active = !1;
                this.rightHead.url =
                    0 != t.rightSex ? a.uiHelps.getServantHead(t.rightSex) : "";
                this.lblLeftWuli.string =
                    i18n.t("COMMON_PROP1") + n.utils.formatMoney(t.leftEp);
                this.lblRightWuli.string =
                    i18n.t("COMMON_PROP1") + n.utils.formatMoney(t.rightEp);
                this.lblLost.string = i18n.t("FIGHT_LOST") + this.getLostStr();
                this.lblName.string = t.bname;
                this.createEnemy1();
                if (0 == this.fightType) {
                    this.list.node.active = !0;
                    var o = localcache.getItem(
                            localdb.table_smallPve,
                            parseInt(r.playerProxy.userData.smap + "") + 1
                        ),
                        i = localcache.getGroup(
                            localdb.table_smallPve,
                            "mmap",
                            o.mmap
                        );
                    i.sort(function(t, e) {
                        return t.id - e.id;
                    });
                    this.list.data = i;
                } else this.list.node.active = !1;
            }
        };
        e.prototype.getLostStr = function() {
            var t = r.fightProxy.battleData,
                e = t.leftEp / t.rightEp;
            return e > 2
                ? i18n.t("FIGHT_LOST_1")
                : e > 1
                ? i18n.t("FIGHT_LOST_2")
                : i18n.t("FIGHT_LOST_3");
        };
        e.prototype.createEnemy1 = function() {
            for (
                var t = r.fightProxy.battleData.rightJob.split("|"), e = 0;
                e < this.enemyItems.length;
                e++
            )
                if (t.length > e) {
                    var o = new c.EnemyDataItem();
                    o.hp = 3 * Math.random() + 2;
                    o.job = parseInt(t[e]);
                    o.index = e + 1e3;
                    o.atkRank = 60 + 100 * Math.random();
                    o.isGray = 1 == e ? 1 : 3 == e || 4 == e ? 2 : 0;
                    this.enemyItems[e].data = o;
                    this.enemyItems[e].node.active = !0;
                } else this.enemyItems[e].node.active = !1;
        };
        e.prototype.onClickBattle = function() {
            if (r.fightProxy.isEnoughArmy()) {
                this.btnStart.node.active = !1;
                if (0 == this.fightType) r.fightProxy.sendEnemyFight();
                else
                    switch (this.fightType) {
                        case 1:
                            r.fightProxy.battleData.leftKill = 0;
                            r.fightProxy.battleData.rightKill =
                                r.fightProxy.battleData.rightArmy;
                            r.fightProxy.sendSpecBoss(1, this.fightType);
                    }
            } else {
                n.alertUtil.alert18n("GAME_LEVER_NO_SOLDIER");
                n.alertUtil.alertItemLimit(4, r.fightProxy.needArmy());
            }
        };
        e.prototype.onBattleSendend = function() {
            this.isStart = !0;
            this.scheduleOnce(this.showDamage, 0.5);
        };
        e.prototype.onClickClost = function() {
            if (this.isStart) n.alertUtil.alert(i18n.t("FIGHT_IS_FIGHTING"));
            else {
                n.utils.closeView(this);
                facade.send("FIGHT_CLOES_VIEW");
            }
        };
        e.prototype.showDamage = function() {
            var t = r.fightProxy.battleData;
            this.context = localcache.getItem(
                localdb.table_wordsPve,
                t.context
            );
            if (0 == t.context) {
                var e = localcache.getList(localdb.table_wordsPve);
                this.context = e[Math.floor(Math.random() * e.length)];
            }
            this.nodeEnemyTalk.active = !0;
            n.utils.showNodeEffect(this.nodeEnemyTalk);
            this.lblEnemyTalk.string = this.context ? this.context.content : "";
            this.scheduleOnce(this.showRoleDamage, 1);
            r.fightProxy.playerRandomHit();
        };
        e.prototype.showRoleDamage = function() {
            var t = r.fightProxy.battleData;
            this.rightSp.node.active = !0;
            this.rightSp.animation = "animation";
            a.uiUtils.showShake(this.roleSpine);
            if (this.lblDamage) {
                var e = this;
                this.lblDamage.string = -t.leftKill + "";
                this.lblDamage.node.active = !0;
                n.utils.showEffect(this.lblDamage, 0, function() {
                    e.lblDamage.node.active = !1;
                });
            }
            a.uiUtils.showNumChange(
                this.lblLeftPrg,
                t.leftArmy,
                r.playerProxy.userData.army
            );
            a.uiUtils.showPrgChange(
                this.prgLeft,
                1,
                r.playerProxy.userData.army / t.leftArmy
            );
            this.scheduleOnce(this.showRightText, 1);
            r.fightProxy.playerRandomHit();
        };
        e.prototype.showRightText = function() {
            this.nodeEnemyTalk.active = !1;
            this.nodeServantTalk.active = !0;
            this.lblServantTalk.string = this.context
                ? this.context.player
                : "";
            n.utils.showNodeEffect(this.nodeServantTalk);
            this.scheduleOnce(this.showRightDamage, 1);
        };
        e.prototype.showRightDamage = function() {
            var t = r.fightProxy.battleData;
            this.leftSp.node.active = !0;
            this.leftSp.animation = "animation";
            var e =
                0 == r.playerProxy.userData.mkill
                    ? t.rightArmy - t.rightKill
                    : t.rightArmy - r.playerProxy.userData.mkill;
            a.uiUtils.showNumChange(
                this.lblRightPrg,
                parseInt(this.lblRightPrg.string),
                e
            );
            a.uiUtils.showPrgChange(
                this.prgRight,
                this.prgRight.progress,
                e / t.rightArmy
            );
            for (var o = 0; o < this.enemyItems.length; o++)
                a.uiUtils.showShake(this.enemyItems[o]);
            this.scheduleOnce(this.fightOver, 1);
        };
        e.prototype.fightOver = function() {
            if (!this.isOver) {
                this.nodeEnemyTalk.active = !1;
                this.nodeServantTalk.active = !1;
                var t = r.fightProxy.battleData;
                this.isStart = !1;
                this.isOver = !0;
                var e =
                    0 == r.playerProxy.userData.mkill
                        ? t.rightArmy - t.rightKill
                        : t.rightArmy - r.playerProxy.userData.mkill;
                e = e < 0 ? 0 : e;
                this.lblLeftPrg.string = n.utils.formatMoney(
                    r.playerProxy.userData.army
                );
                this.lblRightPrg.string = n.utils.formatMoney(e);
                this.prgLeft.progress =
                    r.playerProxy.userData.army / t.leftArmy;
                this.prgRight.progress = e / t.rightArmy;
                this.scheduleOnce(this.clearObj, 1);
            }
        };
        e.prototype.clearObj = function() {
            for (var t = 0; t < this.enemyItems.length; t++) {
                this.enemyItems[t].data = null;
                this.enemyItems[t].node.active = !1;
            }
            var e = r.fightProxy.battleData;
            e.rightKill >= e.rightArmy
                ? n.utils.openPrefabView("battle/FightWinView")
                : e.leftKill >= e.leftArmy &&
                  n.utils.openPrefabView("battle/FightLostView");
            1 == this.fightType && this.clostWin();
        };
        e.prototype.clostWin = function() {
            var t = r.fightProxy.battleData,
                e = !1;
            if (
                !n.stringUtil.isBlank(t.storyId) &&
                r.playerProxy.getStoryData(t.storyId)
            ) {
                r.playerProxy.addStoryId(t.storyId);
                n.utils.openPrefabView("StoryView");
                e = !0;
            }
            if (
                r.fightProxy.isFirstmMap() ||
                0 != this.fightType ||
                r.playerProxy.userData.army <= 0
            ) {
                n.utils.closeView(this);
                e || facade.send("FIGHT_SHOW_GUIDE");
            } else {
                n.utils.showEffect(this, 0);
                this.showBattleData();
            }
        };
        e.prototype.hideEnemyItem = function() {
            for (var t = 0; t < this.enemyItems.length; t++) {
                this.enemyItems[t].data = null;
                this.enemyItems[t].node.active = !1;
            }
        };
        e.prototype.clostLost = function() {
            this.hideEnemyItem();
            n.utils.closeView(this);
            n.utils.closeNameView("battle/FightView");
        };
        e.prototype.onClickBack = function() {
            if (this.isStart) n.alertUtil.alert(i18n.t("FIGHT_IS_FIGHTING"));
            else {
                this.hideEnemyItem();
                n.utils.closeView(this);
            }
        };
        __decorate([p(l.default)], e.prototype, "rightHead", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(cc.ProgressBar)], e.prototype, "prgLeft", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblLeftPrg", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblLeftWuli", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblLost", void 0);
        __decorate([p(cc.ProgressBar)], e.prototype, "prgRight", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblRightPrg", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblRightWuli", void 0);
        __decorate([p(sp.Skeleton)], e.prototype, "rightSp", void 0);
        __decorate([p(sp.Skeleton)], e.prototype, "leftSp", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnStart", void 0);
        __decorate([p(i.default)], e.prototype, "list", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblDamage", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeServantTalk", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblServantTalk", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeEnemyTalk", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblEnemyTalk", void 0);
        __decorate([p(_.default)], e.prototype, "roleSpine", void 0);
        __decorate([p([s.default])], e.prototype, "enemyItems", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
