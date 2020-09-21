var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("./TimeProxy"),
    r = (function() {
        function t() {
            this.battleData = null;
            this.bossData = null;
            this.isBoss = !1;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.user.win, this.onSetWinData, this);
            JsonHttp.subscribe(proto_sc.user.pvb, this.onPvbList, this);
        };
        t.prototype.clearData = function() {
            this.pvb2Data = null;
            this.pvbData = null;
            this.pveData = null;
            this.pvbList = null;
            this.battleData = null;
            this.bossData = null;
            this.isBoss = !1;
        };
        t.prototype.onSetWinData = function(t) {
            null != t.pvb2win && (this.pvb2Data = t.pvb2win);
            null != t.pvbwin && (this.pvbData = t.pvbwin);
            null != t.pvewin && (this.pveData = t.pvewin);
        };
        t.prototype.onPvbList = function(t) {
            this.pvbList = t;
            facade.send("BATTLE_BOSS_LIST");
        };
        t.prototype.getCanFight = function() {
            for (
                var t = [], e = 0;
                i.servantProxy.getServantList() &&
                e < i.servantProxy.getServantList().length;
                e++
            ) {
                var o = !1,
                    n = i.servantProxy.getServantList()[e];
                if (null != n) {
                    for (
                        var l = 0;
                        this.pvbList && l < this.pvbList.length;
                        l++
                    ) {
                        var r = this.pvbList[l];
                        r.id == n.id && 0 == r.h && (o = !0);
                    }
                    o || t.push(n);
                }
            }
            t.sort(function(t, e) {
                return e.aep.e1 - t.aep.e1;
            });
            return t;
        };
        t.prototype.getMaxHid = function() {
            for (
                var t = 0, e = 0, o = 0;
                i.servantProxy.getServantList() &&
                o < i.servantProxy.getServantList().length;
                o++
            )
                if (i.servantProxy.getServantList()[o].aep.e1 > t) {
                    t = i.servantProxy.getServantList()[o].aep.e1;
                    e = i.servantProxy.getServantList()[o].id;
                }
            return e;
        };
        t.prototype.needArmy = function() {
            var t = i.playerProxy.userData,
                e = localcache.getItem(localdb.table_smallPve, t.smap + 1),
                o = e.army - t.mkill,
                n = i.playerProxy.userEp.e1,
                l = Math.round((o / n) * e.ep1);
            e.bmap <= 10 && (l = Math.round(o / 2 + ((o / 2) * e.ep1) / n));
            return (l = l > 0 ? l : 1);
        };
        t.prototype.isEnoughArmy = function() {
            return i.playerProxy.userData.army >= this.needArmy();
        };
        t.prototype.sendEnemyFight = function(t) {
            void 0 === t && (t = !1);
            var e = this,
                o = i.playerProxy.userData.army;
            JsonHttp.send(new proto_cs.user.pve(), function(n) {
                if (e.battleData) {
                    if (null == e.pveData) return;
                    var l = e.pveData ? parseInt(e.pveData.deil + "") : 0;
                    e.battleData.leftKill = l || 0;
                    e.battleData.leftKill =
                        e.battleData.leftKill > e.battleData.leftArmy
                            ? e.battleData.leftArmy
                            : e.battleData.leftKill;
                    e.battleData.rightKill =
                        0 == e.pveData.kill || 0 == i.playerProxy.userData.mkill
                            ? e.battleData.rightArmy
                            : e.pveData.kill;
                    e.battleData.rightKill =
                        e.battleData.rightKill > e.battleData.rightArmy
                            ? e.battleData.rightArmy
                            : e.battleData.rightKill;
                }
                if (t) {
                    var r = o - i.playerProxy.userData.army;
                    r > 0 && facade.send("STORY_SHOW_ARMY", r);
                }
                facade.send("BATTLE_ENEMY_OVER");
            });
        };
        t.prototype.sendBossFight = function(t) {
            var e = new proto_cs.user.pvb();
            e.id = t;
            JsonHttp.send(e, function(e) {
                facade.send("BATTLE_BOSS_OVER", t);
            });
        };
        t.prototype.sendBackHid = function(t) {
            var e = new proto_cs.user.comeback();
            e.id = t;
            JsonHttp.send(e, function() {
                facade.send("BATTLE_BACK_HID");
            });
        };
        t.prototype.sendSpecBoss = function(t, e) {
            facade.send("BATTLE_ENEMY_OVER");
            facade.send("BATTLE_BOSS_OVER");
        };
        t.prototype.initSmapData = function() {
            var t;
            this.battleData = null;
            var e = i.playerProxy.userData;
            if (
                null !=
                (t = localcache.getItem(localdb.table_smallPve, e.smap + 1))
            ) {
                var o = localcache.getItem(
                    localdb.table_bigPve,
                    i.playerProxy.userData.bmap
                );
                this.battleData = new a();
                this.battleData.leftArmy = parseInt(e.army + "");
                this.battleData.leftEp = i.playerProxy.userEp.e1;
                this.battleData.leftSex = e.sex;
                this.battleData.leftJob = e.job;
                this.battleData.rightArmy = parseFloat(t.army + "");
                this.battleData.rightEp = parseFloat(t.ep1 + "");
                this.battleData.rightSex = t.index;
                this.battleData.rightJob = t.action;
                this.battleData.index = t.sindex;
                this.battleData.bname = o.name;
                this.battleData.storyId = t.endStoryId + "";
                this.battleData.context = t.content;
            }
        };
        t.prototype.initBMapBossData = function() {
            var t;
            this.bossData = null;
            var e = i.playerProxy.userData;
            if (
                null != (t = localcache.getItem(localdb.table_bigPve, e.bmap))
            ) {
                this.bossData = new s();
                this.bossData.bname = t.name;
                this.bossData.id = t.id;
                this.bossData.maxHp = t.hp;
                this.bossData.photo = t.poto;
                this.bossData.storyId = t.endStoryId + "";
                this.bossData.bossCharacter = t.character;
            }
        };
        t.prototype.isFirstmMap = function() {
            var t = i.playerProxy.userData,
                e = localcache.getItem(localdb.table_smallPve, t.smap + 1);
            if (null == e) return !0;
            var o = localcache.getGroup(localdb.table_smallPve, "mmap", e.mmap);
            o.sort(function(t, e) {
                return t.id - e.id;
            });
            return o[0].id > t.smap;
        };
        t.prototype.isFirstBMap = function() {
            var t = i.playerProxy.userData,
                e = localcache.getItem(localdb.table_midPve, t.mmap);
            if (null == e) return !0;
            var o = localcache.getGroup(localdb.table_midPve, "bmap", e.bmap);
            o.sort(function(t, e) {
                return t.id - e.id;
            });
            return o[0].id >= e.id;
        };
        t.prototype.showEnemyShow = function(t) {
            void 0 === t && (t = 0);
            n.utils.openPrefabView(
                "battle/FightShit",
                !1,
                0 != t
                    ? {
                          id: t
                      }
                    : null
            );
        };
        t.prototype.showBossShow = function(t) {
            void 0 === t && (t = 0);
            10 * Math.random() < 5
                ? l.funUtils.openView(l.funUtils.battleBossView.id)
                : n.utils.openPrefabView(
                      "battle/FightBossSay",
                      !1,
                      0 != t
                          ? {
                                id: t
                            }
                          : null
                  );
        };
        t.prototype.playerRandomHit = function() {
            n.audioManager.playSound(
                "hit" + (Math.floor(3 * Math.random()) + 1),
                !0
            );
        };
        t.prototype.isCanFight = function(t, e) {
            var o = !0,
                r = "";
            if (0 == t || n.stringUtil.isBlank(e)) return !0;
            switch (t) {
                case 1:
                    o = i.playerProxy.userData.level >= parseInt(e);
                    var a = localcache.getItem(localdb.table_officer, e);
                    r = i18n.t("FIGHT_USER_LV_LIMIT", {
                        n: a.name
                    });
                    break;

                case 2:
                    o = i.taskProxy.mainTask.id > parseInt(e);
                    if (i.taskProxy.mainTask.id == parseInt(e)) {
                        var s = localcache.getItem(localdb.table_mainTask, e);
                        r = i18n.t("FIGHT_TASK_LIMIT", {
                            n: s.name
                        });
                    } else r = i18n.t("FIGHT_TASK_OVER_TIP");
                    break;

                case 3:
                    if ((c = e.split("|")).length > 1) {
                        o = i.playerProxy.userEp["e" + c[0]] >= parseInt(c[1]);
                        r = i18n.t("FIGHT_EP_LIMIT", {
                            n: i18n.t("COMMON_PROP" + c[0]),
                            c: c[1]
                        });
                        o ||
                            n.utils.showConfirm(r, function() {
                                l.funUtils.openView(l.funUtils.servantView.id);
                            });
                    } else o = !0;
                    break;

                case 4:
                    var c;
                    if ((c = e.split("|")).length > 1) {
                        var _ = i.servantProxy.getHeroData(parseInt(c[0])),
                            d = localcache.getItem(localdb.table_hero, c[0]);
                        o = _ && _.level >= parseInt(c[1]);
                        r = i18n.t("FIGHT_HERO_LIMIT", {
                            n: d.name,
                            c: c[1]
                        });
                        o ||
                            n.utils.showConfirm(r, function() {
                                l.funUtils.openView(l.funUtils.servantView.id);
                            });
                    } else o = !0;
            }
            o || n.alertUtil.alert(r);
            return o;
        };
        return t;
    })();
o.FightProxy = r;
var a = function() {
    this.index = 0;
    this.storyId = "";
    this.context = 0;
};
o.BattleData = a;
var s = function() {
    this.storyId = "";
};
o.BossData = s;
var c = function() {
    this.isGray = 0;
};
o.EnemyDataItem = c;
