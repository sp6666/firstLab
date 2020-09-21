var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../formula"),
    r = require("../component/RedDot"),
    cfg = require("../Config"),
    a = require("./TimeProxy"),
    s = (function () {
        function t() {
            this.UPDATE_FLOWER_BASE = "UPDATE_FLOWER_BASE";
            this.UPDATE_FLOWER_FEILD = "UPDATE_FLOWER_FEILD";
            this.UPDATE_FLOWER_LEVEL = "UPDATE_FLOWER_LEVEL";
            this.UPDATE_FLOWER_MYRANK = "UPDATE_FLOWER_MYRANK";
            this.UPDATE_FLOWER_RANK = "UPDATE_FLOWER_RANK";
            this.UPDATE_FLOWER_CHENLU = "UPDATE_FLOWER_CHENLU";
            this.UPDATE_FLOWER_LOGS = "UPDATE_FLOWER_LOGS";
            this.UPDATE_FLOWER_CD = "UPDATE_FLOWER_CD";
            this.UPDATE_FLOWER_STEAL = "UPDATE_FLOWER_STEAL";
            this.UPDATE_FLOWER_TREE = "UPDATE_FLOWER_TREE";
            this.UPDATE_FLOWER_PROTECT = "UPDATE_FLOWER_PROTECT";
            this.UPDATE_FLOWER_PROTECT_COUNT_OVER = "UPDATE_FLOWER_PROTECT_COUNT_OVER"; //倒数计时结束的时候发一下这个消息
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.flower.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.flower.feild, this.onFeild, this);
            JsonHttp.subscribe(proto_sc.flower.level, this.onLevel, this);
            JsonHttp.subscribe(proto_sc.flower.myRank, this.onMyrank, this);
            JsonHttp.subscribe(proto_sc.flower.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.flower.chenlu, this.onChenlu, this);
            JsonHttp.subscribe(proto_sc.flower.logs, this.onLogs, this);
            JsonHttp.subscribe(proto_sc.flower.cd, this.onCD, this);
            JsonHttp.subscribe(proto_sc.flower.steal, this.onSteal, this);
            JsonHttp.subscribe(proto_sc.flower.autoshou, this.onAutoShou, this);
            JsonHttp.subscribe(
                proto_sc.flower.worldtree,
                this.onWorldTree,
                this
            );
            JsonHttp.subscribe(
                proto_sc.flower.myTreeRank,
                this.onMyTreerank,
                this
            );
            JsonHttp.subscribe(proto_sc.flower.treerank, this.onTreeRank, this);
            JsonHttp.subscribe(proto_sc.flower.protect, this.onProtect, this);
        };
        t.prototype.clearData = function () {
            this.base = null;
            this.feild = null;
            this.rank = null;
            this.myrank = null;
            this.level = null;
            this.chenlu = null;
            this.logs = null;
            this.cd = null;
            this.steal = null;
            this.autoshou = null;
            this.worldTree = null;
            this.myTreerank = null;
            this.rankTree = null;
        };
        t.prototype.onWorldTree = function (t) {
            this.worldTree = t;
            facade.send(this.UPDATE_FLOWER_TREE);
        };
        t.prototype.showAutoShow = function () {
            this.autoshou &&
                this.autoshou.id > 0 &&
                i.utils.showSingeConfirm(
                    i18n.t("FLOWER_AUTO_CHEN", {
                        d: this.autoshou.id
                    }),
                    null
                );
            this.autoshou = null;
        };
        t.prototype.onAutoShou = function (t) {
            this.autoshou = t;
        };
        t.prototype.onSteal = function (t) {
            this.steal = t;
            for (
                var e = [], o = n.playerProxy.userData.uid, i = 0; i < this.steal.types.length; i++
            )
                1 != this.steal.types[i].rwd &&
                -1 == this.steal.types[i].sUids.indexOf(o) &&
                e.push(this.steal.types[i]);
            this.steal.types = e;
            facade.send(this.UPDATE_FLOWER_STEAL);
        };
        t.prototype.onCD = function (t) {
            this.cd = t;
            facade.send(this.UPDATE_FLOWER_CD);
        };
        t.prototype.onLogs = function (t) {
            if (null != t && 0 != t.length) {
                if (null == this.logs) this.logs = t;
                else
                    for (var e = 0; e < t.length; e++) this.logs.push(t[e]);
                this.logs.sort(function (t, e) {
                    return e.time - t.time;
                });
                facade.send(this.UPDATE_FLOWER_LOGS);
            }
        };
        t.prototype.onChenlu = function (t) {
            null == this.chenlu ?
                (this.chenlu = t) :
                i.utils.copyList(this.chenlu, t);
            for (var e = [], o = 0; o < this.chenlu.length; o++)
                1 != this.chenlu[o].rwd && e.push(this.chenlu[o]);
            this.chenlu = e;
            this.updateChenluRed();
            facade.send(this.UPDATE_FLOWER_CHENLU);
        };
        t.prototype.onBase = function (t) {
            this.base = t;
            facade.send(this.UPDATE_FLOWER_BASE);
        };
        t.prototype.onFeild = function (t) {
            this.feild = t;
            this.updateFlowerRed();
            facade.send(this.UPDATE_FLOWER_FEILD);
        };
        t.prototype.onLevel = function (t) {
            this.level = t;
            null != this.level.isNewChenlu &&
                r.default.change(
                    "chenlu",
                    this.level.isNewChenlu &&
                    a.funUtils.isOpenFun(a.funUtils.flower)
                );
            null != this.level.isNewFlower &&
                r.default.change(
                    "flower",
                    this.level.isNewFlower &&
                    a.funUtils.isOpenFun(a.funUtils.flower)
                );
            facade.send(this.UPDATE_FLOWER_LEVEL);
        };
        t.prototype.onMyTreerank = function (t) {
            this.myTreerank = t;
        };
        t.prototype.onTreeRank = function (t) {
            this.rankTree = t;
        };
        t.prototype.onMyrank = function (t) {
            this.myrank = t;
        };
        t.prototype.onRank = function (t) {
            this.rank = t;
        };
        t.prototype.updateRed = function () {
            this.updateFlowerRed();
        };
        t.prototype.updateFlowerRed = function () {
            if (null != this.feild && null != this.feild.feilds) {
                for (
                    var t = !1, e = i.timeUtil.second, o = 0; o < this.feild.feilds.length; o++
                ) {
                    var n = this.feild.feilds[o];
                    if (0 != n.pid) {
                        var l = localcache.getItem(
                            localdb.table_flowerCore,
                            n.pid
                        );
                        if (n.sTime + l.time <= e) {
                            t = !0;
                            break;
                        }
                    }
                }
                r.default.change(
                    "flower",
                    t && a.funUtils.isOpenFun(a.funUtils.flower)
                );
            }
        };
        t.prototype.updateChenluRed = function () {
            if (null != this.chenlu) {
                for (
                    var t = !1, e = i.timeUtil.second, o = 0; o < this.chenlu.length; o++
                )
                    if (
                        1 != this.chenlu[o].rwd &&
                        !t &&
                        this.chenlu[o].time <= e
                    ) {
                        t = !0;
                        break;
                    }
                r.default.change(
                    "chenlu",
                    t && a.funUtils.isOpenFun(a.funUtils.flower)
                );
            }
        };
        t.prototype.sendOpen = function (t) {
            var e = new proto_cs.flower.open();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendInfo = function () {
            JsonHttp.send(new proto_cs.flower.info());
        };
        t.prototype.sendFlush = function (t) {
            void 0 === t && (t = 0);
            var e = new proto_cs.flower.flush();
            e.id = t;
            JsonHttp.send(
                e,
                function () {
                    i.utils.openPrefabView("flower/FlowerSteal");
                },
                null,
                !0
            );
        };
        t.prototype.sendPlant = function (t, e) {
            var o = new proto_cs.flower.plant();
            o.id = t;
            o.uid = e;
            JsonHttp.send(o);
        };
        t.prototype.sendPlantRwd = function (t) {
            var e = new proto_cs.flower.plantRwd();
            e.id = t;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendRank = function () {
            var t = this;
            JsonHttp.send(new proto_cs.flower.rank(), function () {
                var e = {};
                e.rank = t.myrank.rid;
                e.value = t.myrank.score;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: "FLOWER_RANK",
                    list: t.rank,
                    mine: e
                });
            });
        };
        t.prototype.sendTreeRank = function () {
            var t = this;
            JsonHttp.send(new proto_cs.flower.treeRank(), function () {
                var e = {};
                e.rank = t.myTreerank.rid;
                e.value = t.myTreerank.score;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: "FLOWER_RANK_TREE",
                    list: t.rankTree,
                    mine: e
                });
            });
        };
        t.prototype.sendRwd = function (t) {
            var e = new proto_cs.flower.rwd();
            e.id = t;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendSteal = function (t, e) {
            var o = new proto_cs.flower.steal();
            o.id = t;
            o.uid = e;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendWorldTree = function (t) {
            var e = new proto_cs.flower.wordlTree();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.getStatu = function (t, e) {
            var o = 0,
                n = i.timeUtil.second;
            n > t + e / 3 && (o = 1);
            n > t + (e / 3) * 2 && (o = 2);
            return o;
        };
        t.prototype.isNextUnlock = function (t) {
            if (-1 != this.feild.openid.indexOf(t - 1)) return !0;
            var e = localcache.getItem(localdb.table_flowerFeild, t - 1);
            return !!(e && e.lv <= this.level.lv);
        };
        t.prototype.sendStealCheck = function (t) {
            var e = this;
            void 0 === t && (t = 0);
            if (this.cd.num > 0) this.sendFlush(t);
            else {
                var o = l.formula.flower_cost(this.cd.isopen + 1);
                i.utils.showConfirmItem(
                    i18n.t("FLOWER_BAIFANG_CONFIRM", {
                        d: o
                    }),
                    4,
                    n.playerProxy.userData.army,
                    function () {
                        n.playerProxy.userData.army < o ?
                            i.alertUtil.alertItemLimit(4) :
                            e.sendFlush(t);
                    },
                    "FLOWER_BAIFANG_CONFIRM"
                );
            }
        };
        t.prototype.getPoint = function (t) {
            if (null == this.base) return null;
            for (var e = 0; e < this.base.length; e++)
                if (this.base[e].id == t) return this.base[e];
            return null;
        };
        t.prototype.onProtect = function (t) {
            this.flowerProtect = t;
            facade.send(this.UPDATE_FLOWER_PROTECT);
        };
        t.prototype.sendProtect = function (t, e) {
            void 0 === e && (e = 0);
            var o = new proto_cs.flower.protectCover();
            o.id = t;
            o.type = e;
            JsonHttp.send(o);
        };
        t.prototype.getOtherProtectCd = function () {
            return null == this.steal ?
                0 :
                null == this.steal.ptime || 0 == this.steal.ptime ?
                0 :
                Math.max(0, this.steal.ptime - i.timeUtil.second);
        };
        t.prototype.getProtectCd = function () {
            return null == this.flowerProtect ?
                0 :
                null == this.flowerProtect.cur || 0 == this.flowerProtect.cur ?
                0 :
                null == this.flowerProtect.ctime ?
                0 :
                this.flowerProtect.ctime;
        };
        t.prototype.getProtectLeftCd = function () {
            return Math.max(0, this.getProtectCd() - i.timeUtil.second);
        };
        t.prototype.getProtectCoolEndCd = function () {
            if (null == this.flowerProtect) return 0;
            if (null == this.flowerProtect.cd) return 0;
            if (this.flowerProtect.cd.length <= 0) return 0;
            for (var t = 0, e = 0; e < this.flowerProtect.cd.length; e++) {
                var o = this.flowerProtect.cd[e];
                null != o.over &&
                    0 != o.over &&
                    (null != o.id && 0 != o.id && (t = Math.max(t, o.over)));
            }
            return t;
        };
        t.prototype.getProtectCoolCd = function () {
            if (null == this.flowerProtect) return 0;
            if (null == this.flowerProtect.cd) return 0;
            if (this.flowerProtect.cd.length <= 0) return 0;
            for (var t = 0, e = 0; e < this.flowerProtect.cd.length; e++) {
                var o = this.flowerProtect.cd[e];
                null != o.over &&
                    0 != o.over &&
                    (null != o.id && 0 != o.id && (t = Math.max(t, o.over)));
            }
            return Math.max(0, t - i.timeUtil.second);
        };
        t.prototype.sendYjsq = function () {
            JsonHttp.send(new proto_cs.flower.yjRwd(), function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendYjsh = function () {
            JsonHttp.send(new proto_cs.flower.yjPlantRwd(), function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendYjPlant = function (t) {
            var e = new proto_cs.flower.yjPlant();
            e.arr = t;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };

        t.prototype.lvCanUse = function () {
            if (cc.sys.os == cc.sys.OS_WINDOWS) {
                return true;
            }

            return cfg.Config.zone == "GAT";
        };
        return t;
    })();
o.FlowerProxy = s;