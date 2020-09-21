var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./BossRankItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../user/UserHeadItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lbltotalHaogan = null;
            e.rank_1 = null;
            e.rank_2 = null;
            e.rank_3 = null;
            e.myRank = null;
            e.myName = null;
            e.myHaogan = null;
            e.userHead = null;
            e.items = [];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.bossPorxy.UPDATE_BOSS_HURTRANK,
                this.onRankData,
                this
            );
            facade.subscribe(
                n.bossPorxy.UPDATE_BOSS_GE2DANMYDMG,
                this.onMyData,
                this
            );
            var t = this.node.openParam;
            n.bossPorxy.sendG2dHitRank();
            if (t) {
                if (
                    0 == n.bossPorxy.ge2dan.damage ||
                    n.bossPorxy.ge2dan.damage == n.bossPorxy.ge2dan.allhp
                ) {
                    var e = localcache.getItem(
                        localdb.table_hero,
                        n.bossPorxy.ge2dan.heroId
                    );
                    this.lbltotalHaogan.string = i18n.t("BOSS_OVER_TXT_1", {
                        name: e ? e.name : ""
                    });
                } else this.lbltotalHaogan.string = i18n.t("BOSS_OVER_TXT_2");
                this.lbltotalHaogan.string = i18n.t("BOSS_REWARD_HAO_GAN", {
                    num: t.score
                });
                this.onRankData();
                this.onMyData();
            }
        };
        e.prototype.onRankData = function() {
            this.rank_1.data = n.bossPorxy.hurtRank[0];
            this.rank_2.data = n.bossPorxy.hurtRank[1];
            this.rank_3.data = n.bossPorxy.hurtRank[2];
        };
        e.prototype.onMyData = function() {
            if (n.bossPorxy.ge2danMyDmg) {
                this.myRank.string = n.bossPorxy.ge2danMyDmg.g2dmyrank + "";
                this.myHaogan.string =
                    i18n.t("BOSS_XIAN_LI_TXT") +
                    n.bossPorxy.ge2danMyDmg.g2dmydamage;
            }
            this.userHead.setUserHead(
                n.playerProxy.userData.job,
                n.playerProxy.headavatar
            );
            this.myName.string = n.playerProxy.userData.name;
        };
        e.prototype.onClickClose = function() {
            this.items &&
                this.items.length > 0 &&
                l.utils.openPrefabView(
                    "boss/BossRewardItems",
                    null,
                    this.items
                );
            l.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lbltotalHaogan", void 0);
        __decorate([c(i.default)], e.prototype, "rank_1", void 0);
        __decorate([c(i.default)], e.prototype, "rank_2", void 0);
        __decorate([c(i.default)], e.prototype, "rank_3", void 0);
        __decorate([c(cc.Label)], e.prototype, "myRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "myName", void 0);
        __decorate([c(cc.Label)], e.prototype, "myHaogan", void 0);
        __decorate([c(r.default)], e.prototype, "userHead", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
