var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/RoleSpine"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.boss = null;
            e.lblPer = null;
            e.prg = null;
            e.lblName = null;
            e.nodeEffect = null;
            e.lblDamge2 = null;
            e.nodeBossText = null;
            e.lblBoss = null;
            e.leftlblPer = null;
            e.leftprg = null;
            e.nodeServantText = null;
            e.nodeServantEffect = null;
            e.lblDamge1 = null;
            e.lblServant = null;
            e.btnClost = null;
            e.btnBack = null;
            e.btnStart = null;
            e.roleSpine = null;
            e.fightType = 0;
            e.id = 1;
            e.isShow = !1;
            e.curList = null;
            e.curIndex = 0;
            e.leftKill = 0;
            e.rightKill = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.fightType = this.node.openParam ? this.node.openParam.type : 0;
            this.id = this.node.openParam ? this.node.openParam.id : 1;
            this.showBatInfo();
            facade.subscribe("BATTLE_ENEMY_OVER", this.onBattleEnd, this);
            facade.subscribe("FIGHT_CLOST_WIN_VIEW", this.clostWin, this);
            facade.subscribe("FIGHT_CLOST_LOST_VIEW", this.onClickBack, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickBack, this);
        };
        e.prototype.showBatInfo = function() {
            var t = l.fightProxy.battleData;
            this.curList = localcache.getGroup(
                localdb.table_lunZhanSingle,
                "groupid",
                this.id
            );
            this.curList.sort(function(t, e) {
                return t.order - e.order;
            });
            r.uiUtils.showPrgChange(this.leftprg);
            r.uiUtils.showNumChange(this.leftlblPer, 0, t.leftArmy);
            for (var e = 0; e < this.curList.length; e++)
                if (0 != this.curList[e].opponent) {
                    t.rightSex = this.curList[e].opponent;
                    t.bname = this.curList[e].op_name;
                    break;
                }
            this.boss.url = r.uiHelps.getServantSpine(t.rightSex);
            this.lblName.string = t.bname;
            r.uiUtils.showPrgChange(this.prg);
            r.uiUtils.showNumChange(this.lblPer, 0, t.rightArmy);
        };
        e.prototype.onClickStart = function() {
            this.curIndex = 0;
            this.btnStart.node.active = !1;
            this.btnBack.interactable = this.btnClost.interactable = !1;
            if (0 == this.fightType) l.fightProxy.sendEnemyFight();
            else
                switch (this.fightType) {
                    case 1:
                        l.fightProxy.battleData.leftKill = 0;
                        l.fightProxy.battleData.rightKill =
                            l.fightProxy.battleData.rightArmy;
                        l.fightProxy.sendSpecBoss(1, this.fightType);
                }
        };
        e.prototype.onBattleEnd = function() {
            this.curIndex = 0;
            this.playCurIndex();
        };
        e.prototype.playCurIndex = function() {
            var t = this.curList[this.curIndex];
            if (t) {
                var e = l.fightProxy.battleData;
                this.nodeBossText.active = 2 == t.speaker;
                this.nodeServantText.active = 1 == t.speaker;
                switch (t.speaker) {
                    case 1:
                        this.lblServant.string = t.content;
                        break;

                    case 2:
                        this.lblBoss.string = t.content;
                }
                this.curIndex++;
                switch (t.handle) {
                    case 1:
                    case 2:
                        var o =
                            (a =
                                1 -
                                ((this.leftKill / 1e4) * e.leftKill) /
                                    e.leftArmy) * e.leftArmy;
                        this.leftKill +=
                            2 == t.handle
                                ? -parseInt(t.value)
                                : parseInt(t.value);
                        var i =
                            (n =
                                1 -
                                ((this.leftKill / 1e4) * e.leftKill) /
                                    e.leftArmy) * e.leftArmy;
                        r.uiUtils.showPrgChange(this.leftprg, a, n);
                        r.uiUtils.showNumChange(this.leftlblPer, o, i);
                        this.scheduleOnce(this.playCurIndex, 2);
                        l.fightProxy.playerRandomHit();
                        break;

                    case 3:
                    case 4:
                        o =
                            (a =
                                1 -
                                ((this.rightKill / 1e4) * e.rightKill) /
                                    e.rightArmy) * e.rightArmy;
                        this.rightKill +=
                            4 == t.handle
                                ? -parseInt(t.value)
                                : parseInt(t.value);
                        var n;
                        i =
                            (n =
                                1 -
                                ((this.rightKill / 1e4) * e.rightKill) /
                                    e.rightArmy) * e.rightArmy;
                        r.uiUtils.showPrgChange(this.prg, a, n);
                        r.uiUtils.showNumChange(this.lblPer, o, i);
                        this.scheduleOnce(this.playCurIndex, 2);
                        l.fightProxy.playerRandomHit();
                        break;

                    case 5:
                        o =
                            (a =
                                1 -
                                ((this.leftKill / 1e4) * e.leftKill) /
                                    e.leftArmy) * e.leftArmy;
                        r.uiUtils.showPrgChange(this.leftprg, a, 0);
                        r.uiUtils.showNumChange(this.leftlblPer, o, 0);
                        this.scheduleOnce(this.fightOver, 2);
                        l.fightProxy.playerRandomHit();
                        break;

                    case 6:
                        var a;
                        o =
                            (a =
                                1 -
                                ((this.rightKill / 1e4) * e.rightKill) /
                                    e.rightArmy) * e.rightArmy;
                        r.uiUtils.showPrgChange(this.prg, a, n);
                        r.uiUtils.showNumChange(this.lblPer, o, i);
                        this.scheduleOnce(this.fightOver, 2);
                        l.fightProxy.playerRandomHit();
                        break;

                    case 7:
                        this.roleSpine && this.roleSpine.actionString(t.value);
                        this.scheduleOnce(this.playCurIndex, 2);
                }
            }
        };
        e.prototype.fightOver = function() {
            var t = l.fightProxy.battleData,
                e = t.leftArmy - t.leftKill,
                o = t.rightArmy - t.rightKill;
            this.leftlblPer.string = i.utils.formatMoney(e);
            this.lblPer.string = i.utils.formatMoney(o);
            this.leftprg.progress = e / t.leftArmy;
            this.prg.progress = o / t.rightArmy;
            t.leftKill == t.leftArmy
                ? i.utils.openPrefabView("battle/FightLostView")
                : t.rightArmy == t.rightKill &&
                  i.utils.openPrefabView("battle/FightWinView");
            1 == this.fightType && this.clostWin();
        };
        e.prototype.clostWin = function() {
            var t = l.fightProxy.battleData;
            if (
                !i.stringUtil.isBlank(t.storyId) &&
                l.playerProxy.getStoryData(t.storyId)
            ) {
                l.playerProxy.addStoryId(t.storyId);
                i.utils.openPrefabView("StoryView");
            } else {
                i.utils.closeView(this);
                facade.send("FIGHT_SHOW_GUIDE");
            }
        };
        e.prototype.clostLost = function() {
            if (this.btnClost.interactable) {
                i.utils.closeView(this);
                i.utils.closeNameView("battle/FightView");
            }
        };
        e.prototype.onClickBack = function() {
            this.btnBack.interactable && i.utils.closeView(this);
        };
        __decorate([_(n.default)], e.prototype, "boss", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeEffect", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDamge2", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBossText", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblBoss", void 0);
        __decorate([_(cc.Label)], e.prototype, "leftlblPer", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "leftprg", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeServantText", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeServantEffect", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDamge1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblServant", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnClost", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnBack", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnStart", void 0);
        __decorate([_(a.default)], e.prototype, "roleSpine", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
