var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.UPDATE_RANK_CLUB_KUA = "UPDATE_RANK_CLUB_KUA";
            this.UPDATE_RANK_GUAN_KA = "UPDATE_RANK_GUAN_KA";
            this.UPDATE_RANK_LOVE = "UPDATE_RANK_LOVE";
            this.UPDATE_RANK_MOBAI = "UPDATE_RANK_MOBAI";
            this.UPDATE_RANK_MY_CLUB_RID = "UPDATE_RANK_MY_CLUB_RID";
            this.UPDATE_RANK_SELF_RID = "UPDATE_RANK_SELF_RID";
            this.UPDATE_RANK_SHILI = "UPDATE_RANK_SHILI";
            this.UPDATE_RANK_SHILI_KUA = "UPDATE_RANK_SHILI_KUA";
            this.UPDATE_RANK_WIN = "UPDATE_RANK_WIN";
            this.TREASURE_RANK = "TREASURE_RANK";
            this.TREASURE_TIDY_RANK = "TREASURE_TIDY_RANK";
            this.JIU_LOU_RANK = "JIU_LOU_RANK";
            this.BOSS_HURT_RANK = "BOSS_HURT_RANK";
            this.BOSS_SCORE_RANK = "BOSS_SCORE_RANK";
            this.CLOTHE_RANK_UPDATE = "CLOTHE_RANK_UPDATE";
            this.CLOTHE_RANK = "CLOTHE_RANK";
            this.DALISI_RANK = "DALISI_RANK";
            this.CLOTHE_PVE_RANK = "CLOTHE_PVE_RANK";
            this.CLOTHE_PVP_RANK = "CLOTHE_PVP_RANK";
            this.FLOWER_RANK = "FLOWER_RANK";
            this.FLOWER_FRIEND_RANK = "FLOWER_FRIEND_RANK";
            this.FLOWER_RANK_TREE = "FLOWER_RANK_TREE";
            this.FLOWER_RANK_FRIEND = "FLOWER_RANK_FRIEND";
            this.ACTBOSS_RANK = "ACTBOSS_RANK";
            this.clubKua = null;
            this.guanKa = null;
            this.love = null;
            this.mobai = null;
            this.myClubKuaRid = null;
            this.selfRid = null;
            this.shili = null;
            this.shiliKua = null;
            this.win = null;
            this.clotheRank = null;
            this.myClotheRank = null;
            this.rankType = "";
            this.isShowGuanKa = !1;
            this.showRankType = 1;
            this.lastTime = 0;
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.ranking.clubKua, this.onClubKua, this);
            JsonHttp.subscribe(proto_sc.ranking.guanka, this.onGuanKa, this);
            JsonHttp.subscribe(proto_sc.ranking.love, this.onLove, this);
            JsonHttp.subscribe(proto_sc.ranking.mobai, this.onMobai, this);
            JsonHttp.subscribe(
                proto_sc.ranking.myclubkuaRid,
                this.onClubKuaRid,
                this
            );
            JsonHttp.subscribe(proto_sc.ranking.selfRid, this.onSelfRid, this);
            JsonHttp.subscribe(proto_sc.ranking.shili, this.onShili, this);
            JsonHttp.subscribe(
                proto_sc.ranking.shiliKua,
                this.onShiliKua,
                this
            );
            JsonHttp.subscribe(proto_sc.ranking.win, this.onWin, this);
            JsonHttp.subscribe(
                proto_sc.clothe.rankList,
                this.onClotheRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.clothe.myClotheRank,
                this.onMyClothe,
                this
            );
        };
        t.prototype.clearData = function () {
            this.clubKua = null;
            this.guanKa = null;
            this.love = null;
            this.mobai = null;
            this.myClubKuaRid = null;
            this.selfRid = null;
            this.shili = null;
            this.shiliKua = null;
            this.win = null;
            this.rankType = "";
            this.myClotheRank = null;
            this.clotheRank = null;
        };
        t.prototype.onClotheRank = function (t) {
            this.clotheRank = t;
            facade.send(this.CLOTHE_RANK_UPDATE);
        };
        t.prototype.onMyClothe = function (t) {
            this.myClotheRank = t;
            facade.send(this.CLOTHE_RANK_UPDATE);
        };
        t.prototype.onClubKua = function (t) {
            this.clubKua = t;
            facade.send(this.UPDATE_RANK_CLUB_KUA);
        };
        t.prototype.onMobai = function (t) {
            this.mobai = t;
            l.default.change(
                "mobai",
                0 == t.shili || 0 == t.guanka || 0 == t.love
            );
            facade.send(this.UPDATE_RANK_MOBAI);
        };
        t.prototype.onGuanKa = function (t) {
            this.guanKa = t;
            this.guanKa.sort(this.sortRankList);
            facade.send(this.UPDATE_RANK_GUAN_KA);
        };
        t.prototype.onLove = function (t) {
            this.love = t;
            this.love.sort(this.sortRankList);
            facade.send(this.UPDATE_RANK_LOVE);
        };
        t.prototype.onClubKuaRid = function (t) {
            this.myClubKuaRid = t;
            facade.send(this.UPDATE_RANK_MY_CLUB_RID);
        };
        t.prototype.onSelfRid = function (t) {
            null == this.selfRid &&
                (this.selfRid = new proto_sc.ranking.selfRid());
            i.utils.copyData(this.selfRid, t);
            facade.send(this.UPDATE_RANK_SELF_RID);
        };
        t.prototype.onShili = function (t) {
            this.shili = t;
            this.shili.sort(this.sortRankList);
            facade.send(this.UPDATE_RANK_SHILI);
        };
        t.prototype.onShiliKua = function (t) {
            this.shiliKua = t;
            facade.send(this.UPDATE_RANK_SHILI_KUA);
        };
        t.prototype.onWin = function (t) {
            this.win = t;
            facade.send(this.UPDATE_RANK_WIN);
        };
        t.prototype.sendMoBai = function (t) {
            var e = new proto_cs.ranking.mobai();
            e.type = t;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendRank = function (t) {
            var e = new proto_cs.ranking.paihang();
            e.type = t;
            JsonHttp.send(e);
        };
        t.prototype.getGuankaString = function (t) {
            t = parseInt(t + "");
            var e = localcache.getItem(localdb.table_smallPve, t + 1);
            if (null == e) return i18n.t("COMMON_DATA_ERROR");
            var o = localcache.getItem(localdb.table_bigPve, e.bmap);
            return i18n.t("RAKN_GUAN_TIP", {
                d: o.id,
                n: o.name
            });
        };
        t.prototype.sortRankList = function (t, e) {
            return t.rid - e.rid;
        };
        t.prototype.sendClotheRank = function () {
            var t = this;
            JsonHttp.send(new proto_cs.user.clotheRank(), function () {
                var e = {};
                e.rank = t.myClotheRank.rid;
                e.value = t.myClotheRank.score;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: t.CLOTHE_RANK,
                    list: t.clotheRank,
                    mine: e
                });
            });
        };
        t.prototype.sendRefresh = function (t) {
            var e = new proto_cs.ranking.flush();
            e.type = t;
            var o = this;
            JsonHttp.send(e, function () {
                o.lastTime = i.timeUtil.second;
                i.alertUtil.alert18n("RANK_REFRESH_SUCCESS");
            });
        };
        return t;
    })();
o.RankProxy = r;