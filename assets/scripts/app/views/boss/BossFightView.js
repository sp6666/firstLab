var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/List"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.servantImg = null;
            e.bossImg = null;
            e.lblServantName = null;
            e.lblMeili = null;
            e.lblBossName = null;
            e.lblHaogan = null;
            e.lblCount = null;
            e.pro_bar = null;
            e.pro_xin = null;
            e.servantList = null;
            e.flowerEff = null;
            e.curHero = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            facade.subscribe(
                l.bossPorxy.UPDATE_BOSS_GE2DAN,
                this.onBossGe2Dan,
                this
            );
            facade.subscribe(
                l.bossPorxy.UPDATE_BOSS_G2DFT,
                this.onServantListUpdate,
                this
            );
            facade.subscribe("GE_2_DAN_HIT", this.onG2dHit, this);
            this.servantList.selectHandle = function(e) {
                var o = e;
                o && t.onClickServantItem(o);
            };
            var e = l.servantProxy.getBossServantList(
                l.bossPorxy.ge2dan.heroId
            );
            e.sort(l.servantProxy.sortList);
            this.servantList.data = e;
            this.servantList.selectIndex = 0;
            this.onBossGe2Dan();
        };
        e.prototype.onClickLeft = function(t) {
            t < 340 || this.onClickClost();
        };
        e.prototype.onBossGe2Dan = function() {
            var t = localcache.getItem(
                localdb.table_hero,
                l.bossPorxy.ge2dan.heroId
            );
            this.lblBossName.string = t.name;
            if (2 == l.bossPorxy.ge2dan.state) {
                this.lblHaogan.string =
                    n.utils.formatMoney(l.bossPorxy.ge2dan.damage) +
                    "/" +
                    n.utils.formatMoney(l.bossPorxy.ge2dan.allhp);
                this.pro_bar.progress = this.pro_xin.progress =
                    l.bossPorxy.ge2dan.damage / l.bossPorxy.ge2dan.allhp;
            } else {
                this.lblHaogan.string =
                    l.bossPorxy.ge2dan.allhp + "/" + l.bossPorxy.ge2dan.allhp;
                this.pro_bar.progress = this.pro_xin.progress = 1;
            }
            this.bossImg.url = a.uiHelps.getServantSpine(t.heroid);
            if (3 == l.bossPorxy.ge2dan.state) {
                l.bossPorxy.sendWordBoss();
                n.utils.closeView(this);
            }
        };
        e.prototype.onShowMenghu = function() {};
        e.prototype.onShowGe2Dan = function() {};
        e.prototype.onClickRank = function() {
            l.bossPorxy.sendG2dHitRank(!0);
        };
        e.prototype.onClickShop = function() {
            n.utils.openPrefabView("boss/BossChange");
        };
        e.prototype.onClickGift = function(t, e) {
            var o = this;
            if (3 != l.bossPorxy.ge2dan.state)
                if (l.bossPorxy.getServantHitCount(this.curHero.id) > 0) {
                    if ("1" == e) {
                        var i = n.utils.getParamInt("world_boss_cost_src");
                        n.utils.showConfirmItem(
                            i18n.t("BOSS_COST_COIN", {
                                num: i
                            }),
                            3,
                            l.playerProxy.userData.food,
                            function() {
                                l.playerProxy.userData.food < i
                                    ? n.alertUtil.alertItemLimit(3)
                                    : l.bossPorxy.sendHitGeerdan(
                                          o.curHero.id,
                                          e
                                      );
                            },
                            "BOSS_COST_COIN"
                        );
                    } else if ("2" == e) {
                        var r = n.utils.getParamInt("world_boss_cost_gold");
                        n.utils.showConfirmItem(
                            i18n.t("BOSS_COST_CASH", {
                                num: r
                            }),
                            1,
                            l.playerProxy.userData.cash,
                            function() {
                                l.playerProxy.userData.cash < r
                                    ? n.alertUtil.alertItemLimit(1)
                                    : l.bossPorxy.sendHitGeerdan(
                                          o.curHero.id,
                                          e
                                      );
                            },
                            "BOSS_COST_CASH"
                        );
                    }
                } else n.alertUtil.alert18n("BOSS_CI_SHU_BU_ZU");
            else n.alertUtil.alert18n("BOSS_IS_OVER");
        };
        e.prototype.onClickAdd = function() {
            var t = this,
                e = l.bossPorxy.getServantBuyCount(this.curHero.id);
            if (
                l.bossPorxy.getServantHitCount(this.curHero.id, !0) ==
                l.bossPorxy.getServantHitCount(this.curHero.id)
            )
                n.alertUtil.alert18n("BOSS_HIT_COUNT_MAX");
            else if (e <= 0) n.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
            else if (e > 0) {
                var o = n.utils.getParamInt("world_boss_cost_numberbuycost");
                n.utils.showConfirmItem(
                    i18n.t("BOSS_HIT_COUNT_BU", {
                        num: o,
                        value: e
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function() {
                        l.playerProxy.userData.cash < o
                            ? n.alertUtil.alertItemLimit(1)
                            : l.bossPorxy.sendComeBackG2D(t.curHero.id);
                    },
                    "BOSS_HIT_COUNT_BU"
                );
            }
        };
        e.prototype.onClickServantItem = function(t) {
            var e = localcache.getItem(localdb.table_hero, t.id);
            this.lblServantName.string = e.name;
            var o = l.servantProxy.getHeroData(t.id);
            this.lblMeili.string = i18n.t("WIFE_MEI_LI_VALUE") + " " + o.aep.e4;
            this.servantImg.url = a.uiHelps.getServantSpine(t.id);
            this.lblCount.string =
                l.bossPorxy.getServantHitCount(t.id) +
                "/" +
                l.bossPorxy.getServantHitCount(t.id, !0);
            this.curHero = t;
        };
        e.prototype.onServantListUpdate = function() {
            var t = l.servantProxy.getBossServantList(
                l.bossPorxy.ge2dan.heroId
            );
            t.sort(l.servantProxy.sortList);
            this.servantList.data = t;
            this.onClickServantItem(this.curHero);
        };
        e.prototype.onG2dHit = function() {
            this.flowerEff.node.active = !0;
            this.flowerEff.animation = "animation";
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "servantImg", void 0);
        __decorate([_(i.default)], e.prototype, "bossImg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblServantName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMeili", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblBossName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblHaogan", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "pro_bar", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "pro_xin", void 0);
        __decorate([_(r.default)], e.prototype, "servantList", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "flowerEff", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
