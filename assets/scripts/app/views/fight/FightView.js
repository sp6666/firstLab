var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("./FightMidItem"),
    r = require("../../Config"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBigName = null;
            e.lblDes = null;
            e.nodeMid = null;
            e.boss = null;
            e.lblTask = null;
            e.lblTask2 = null;
            e.scroll = null;
            e.effect = null;
            e.btnRecord = null;
            e.nodeSound = null;
            e.listMid = new Array();
            e.itemWidth = 0;
            e.isStroy = !1;
            e._lastMap = -1;
            e.curStorySelect = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("STORY_END", this.storyEnd, this);
            facade.subscribe("FIGHT_CLOST_WIN_VIEW", this.showData, this);
            facade.subscribe("FIGHT_CLOES_VIEW", this.closeBtn, this);
            facade.subscribe("STORY_SELECT", this.onStorySelect, this);
            facade.subscribe("MAIN_TASK_OPEN", this.closeBtn, this);
            facade.subscribe("FIGHT_SHOW_GUIDE", this.showGuide, this);
            facade.subscribe("BATTLE_ENEMY_OVER", this.showData, this);
            facade.subscribe(
                n.taskProxy.MAIN_TASK_REFESH,
                this.updateMainTask,
                this
            );
            facade.subscribe("SOUND_DOWN_LOAD_OVER", this.updateSound, this);
            n.taskProxy.setDelayShow(!0);
            this.updateMainTask();
            this.itemWidth = this.boss.node.width;
            this.showData();
            this.showGuide(!0);
            this.updateSound();

            //facade.send("MAIN_TOP_HIDE_PAO_MA");
        };
        e.prototype.updateSound = function () {
            var t = n.playerProxy.userData;
            this.nodeSound.active =
                i.audioManager.isNeedDown() &&
                t.bmap > 2 &&
                t.bmap <= i.utils.getParamInt("main_sound_id");
            var e = n.timeProxy.getLoacalValue("MAIN_SOUND_ID");
            if (
                this.nodeSound.active &&
                ((e && parseInt(e) < t.bmap) || null == e)
            ) {
                n.timeProxy.saveLocalValue("MAIN_SOUND_ID", t.bmap + "");
                this.onClickSound();
            }
            if (t.bmap == i.utils.getParamInt("main_sound_id") + 1) {
                (null == (e = n.timeProxy.getLoacalValue("MAIN_SOUND_NOT")) ||
                    parseInt(e) < t.bmap) &&
                i.utils.showSingeConfirm(i18n.t("FIGHT_SOUND_OVER"), null);
                n.timeProxy.saveLocalValue("MAIN_SOUND_NOT", t.bmap + "");
            }
        };
        e.prototype.showData = function () {
            var t = n.playerProxy.userData;
            this.btnRecord.active = t.bmap > 1;
            var e = localcache.getItem(localdb.table_midPve, t.mmap),
                o = localcache.getItem(localdb.table_bigPve, t.bmap);
            if (e) {
                this.lblDes.string = o.msg;
                this.lblBigName.string =
                    i18n.t("FIGHT_BIG_TIP", {
                        s: o.id
                    }) + o.name;
                this.showMidItem();
            }
        };
        e.prototype.showMidItem = function () {
            var t = n.playerProxy.userData,
                e = localcache.getGroup(localdb.table_midPve, "bmap", t.bmap),
                o = localcache.getItem(localdb.table_bigPve, t.bmap);
            e.sort(function (t, e) {
                return t.id - e.id;
            });
            this.boss.node.active = this.isBoss();
            this.boss.node.active && (this.boss.data = o);
            for (var i = 0; i < this.listMid.length; i++)
                this.listMid[i].node.active = !1;
            for (i = 0; i < e.length && !(e[i].id > t.mmap); i++) {
                var r = this.listMid.length > i ? this.listMid[i] : null;
                if (null == r) {
                    var a = cc.instantiate(this.boss.node);
                    r = a.getComponent(l.default);
                    this.listMid.push(r);
                    this.nodeMid.addChild(a);
                }
                r.node.active = !0;
                r.data = e[i];
            }
            this.updateItemPos();
        };
        e.prototype.updateItemPos = function () {
            for (var t = 0, e = 0; e < this.listMid.length; e++)
                t += this.listMid[e].node.active ? 1 : 0;
            var o = (-(t - 1) * this.itemWidth) / 2;
            for (e = 0; e < t; e++) {
                var i = this.listMid[e];
                i.node.y = 60 * (e % 2 == 0 ? 1 : -1);
                i.node.x = o + e * this.itemWidth;
            }
            this.nodeMid.width =
                this.itemWidth * t < this.scroll.node.width ?
                this.scroll.node.width :
                this.itemWidth * t;
            this.scroll.scrollToRight();
        };
        e.prototype.onClickFight = function (t, e) {
            var o = e.data;
            if (o && o.bmap && o.id < n.playerProxy.userData.mmap)
                i.alertUtil.alert18n("FIGHT_STORY_OVER");
            else {
                var l = this.isBoss();
                if (!l && n.playerProxy.userData.army <= 0)
                    i.alertUtil.alert18n("FIGHT_MINGSHENG_EMPTY");
                else {
                    l && n.fightProxy.sendBossFight(0);
                    this.isStroy = this.checkStory();
                    if (!this.isStroy) {
                        this.isStroy = !0;
                        this.storyEnd();
                    }
                }
            }
        };
        e.prototype.checkStory = function () {
            var t = 0,
                e = n.playerProxy.userData,
                o = 0,
                l = 0;
            if (this.isBoss()) {
                var r = localcache.getItem(localdb.table_bigPve, e.bmap);
                if (!n.fightProxy.isCanFight(r.type, r.condition + ""))
                    return !0;
                var a = n.timeProxy.getLoacalValue("FIGHT_BOSS_ID");
                o = i.stringUtil.isBlank(a) ? 0 : parseInt(a);
                t = r ? r.bossStoryId : 0;
            } else if (n.fightProxy.isFirstmMap()) {
                var s = localcache.getItem(localdb.table_midPve, e.mmap);
                if (!n.fightProxy.isCanFight(s.type, s.condition)) return !0;
                var c = n.timeProxy.getLoacalValue("FIGHT_ENEMY_ID");
                l = i.stringUtil.isBlank(c) ? 0 : parseInt(c);
                t = s ? s.storyId : 0;
            }
            var _ =
                (0 == o &&
                    l < parseInt(n.playerProxy.userData.smap + "") + 1) ||
                (0 == l && o < n.playerProxy.userData.bmap);
            if (0 != t && n.playerProxy.getStoryData(t) && _) {
                n.playerProxy.addStoryId(t);
                i.utils.openPrefabView("StoryView");
                return !0;
            }
            return !1;
        };
        e.prototype.showGuide = function (t) {
            void 0 === t && (t = !1);
            var e = n.playerProxy.userData;
            if (this._lastMap != e.mmap && !this.isStroy) {
                facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                    type: 2,
                    value: e.mmap
                });
                this._lastMap = e.mmap;
            }!n.fightProxy.isFirstBMap() ||
                t ||
                this.isBoss() ||
                this.isStroy ||
                i.utils.openPrefabView("renmai/RenMaiView");
        };
        e.prototype.storyEnd = function () {
            if (null == this.curStorySelect) {
                this.showData();
                this.showGuide();
                if (this.isStroy) {
                    this.isStroy = !1;
                    if (this.isBoss()) {
                        n.timeProxy.saveLocalValue(
                            "FIGHT_BOSS_ID",
                            n.playerProxy.userData.bmap + ""
                        );
                        n.fightProxy.initBMapBossData();
                        if (null == n.fightProxy.bossData) {
                            i.alertUtil.alert(i18n.t("FIGHT_NOT_FIND_BOSS"));
                            return;
                        }
                        a.funUtils.openView(a.funUtils.battleBossView.id);
                    } else {
                        n.timeProxy.saveLocalValue(
                            "FIGHT_ENEMY_ID",
                            parseInt(n.playerProxy.userData.smap + "") + 1 + ""
                        );
                        n.fightProxy.initSmapData();
                        if (null == n.fightProxy.battleData) {
                            i.alertUtil.alert(i18n.t("FIGHT_NOT_FIND"));
                            return;
                        }
                        n.fightProxy.showEnemyShow();
                    }
                }
            } else this.storyEndSelect();
        };
        e.prototype.storyEndSelect = function () {
            if (null != this.curStorySelect) {
                var t = this.isBoss();
                this.isStroy = !1;
                switch (this.curStorySelect.battle1) {
                    case 2:
                        if (t) {
                            n.fightProxy.initBMapBossData();
                            if (null == n.fightProxy.bossData) {
                                i.alertUtil.alert(
                                    i18n.t("FIGHT_NOT_FIND_BOSS")
                                );
                                return;
                            }
                            i.utils.openPrefabView("battle/FightBossSay");
                        }
                        this.curStorySelect = null;
                        break;

                    case 3:
                        var e = parseInt(n.playerProxy.userData.smap + "") + 1,
                            o = localcache.getGroup(
                                localdb.table_lunZhanSingle,
                                "groupid",
                                e
                            );
                        if (o && o.length > 0) {
                            n.fightProxy.initSmapData();
                            if (null == n.fightProxy.battleData) {
                                i.alertUtil.alert(i18n.t("FIGHT_NOT_FIND"));
                                return;
                            }
                            i.utils.openPrefabView("battle/FightSay", !1, {
                                type: 0,
                                id: e
                            });
                        }
                        this.curStorySelect = null;
                        break;

                    default:
                        this.isStroy = !0;
                }
            }
        };
        e.prototype.onStorySelect = function (t) {
            var e = localcache.getItem(localdb.table_storySelect2, t.id);
            if (e) {
                if (2 == e.battle1 || 3 == e.battle1) {
                    this.curStorySelect = e;
                    return;
                }
                var o = this.isBoss();
                this.isStroy = !1;
                switch (e.battle1) {
                    case 1:
                        if (!o)
                            for (
                                var i = localcache.getItem(
                                        localdb.table_smallPve,
                                        parseInt(
                                            n.playerProxy.userData.smap + ""
                                        ) + 1
                                    ),
                                    l = localcache.getGroup(
                                        localdb.table_smallPve,
                                        "mmap",
                                        i.mmap
                                    ),
                                    r = 0; r < l.length; r++
                            )
                                n.fightProxy.sendEnemyFight(!0);
                        break;

                    default:
                        this.isStroy = !0;
                }
            }
        };
        e.prototype.isBoss = function () {
            return (
                localcache.getItem(
                    localdb.table_midPve,
                    n.playerProxy.userData.mmap
                ).bmap > n.playerProxy.userData.bmap
            );
        };
        e.prototype.helpHd = function () {};
        e.prototype.closeBtn = function () {
            i.utils.closeView(this, !0);
            n.taskProxy.setDelayShow(!1, !1);
        };
        e.prototype.onClickMainTask = function () {
            a.funUtils.openView(a.funUtils.mainTask.id);
        };
        e.prototype.onClickOpen = function (t, e) {
            i.utils.openPrefabView(e + "", !1, {
                isTrigg: !1
            });
        };
        e.prototype.updateMainTask = function () {
            var t = n.taskProxy.mainTask,
                e = localcache.getItem(localdb.table_mainTask, t.id + "");
            e && n.taskProxy.isFiltTaskType(e.type) ?
                (this.lblTask.string = e ?
                    i18n.t(
                        r.Config.DEBUG ?
                        "MAIN_TASK_SHOW" :
                        "MAIN_TASK_UNID_SHOW", {
                            id: t.id,
                            t: e.name,
                            c: t.num < t.max ? 0 : 1,
                            m: 1
                        }
                    ) :
                    i18n.t("MAIN_TASK_OVER")) :
                (this.lblTask.string = e ?
                    i18n.t(
                        r.Config.DEBUG ?
                        "MAIN_TASK_SHOW" :
                        "MAIN_TASK_UNID_SHOW", {
                            id: t.id,
                            t: e.name,
                            c: t.num,
                            m: t.max
                        }
                    ) :
                    i18n.t("MAIN_TASK_OVER"));
            this.effect.active = t.num >= t.max;
            this.lblTask.node.color =
                t.num < t.max ?
                i.utils.WHITE :
                cc.Color.WHITE.fromHEX("#e4fba4");
            this.lblTask2.string = this.lblTask.string;
        };
        e.prototype.onClickStory = function () {
            i.utils.openPrefabView("battle/StoryRecord");
        };
        e.prototype.onClickSound = function () {
            facade.send("DOWNLOAD_SOUND");
        };
        __decorate([_(cc.Label)], e.prototype, "lblBigName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeMid", void 0);
        __decorate([_(l.default)], e.prototype, "boss", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTask", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTask2", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([_(cc.Node)], e.prototype, "effect", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnRecord", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeSound", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;