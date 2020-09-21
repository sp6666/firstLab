var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../component/List"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblHp = null;
            e.lblName = null;
            e.lblPower = null;
            e.hpBar = null;
            e.bossImg = null;
            e.servantImg = null;
            e.lblPro = null;
            e.heroList = null;
            e.flowerEff = null;
            e.nodeFight = null;
            e.nodeRecord = null;
            e.recordList = null;
            e.nodeUp = null;
            e.nodeDown = null;
            e.scorll = null;
            e.flag = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UNION_COPY_HERO_CHANGE", this.onHeroChange, this);
            facade.subscribe("UPDATE_BOSS_INFO", this.onUpdateBoss, this);
            facade.subscribe("UNION_CLOSE_WINDOW", this.onCloseWindow, this);
            facade.subscribe("UNION_FT_LIST_UPDATE", this.onUpdateList, this);
            facade.subscribe("UNION_RECORD_UPDATE", this.onRecordUpdate, this);
            this.bossImg.url = l.uiHelps.getServantSpine(
                r.unionProxy.openCopyParam.image
            );
            this.onShowHero();
            this.onHeroChange();
            this.onUpdateBoss();
            this.onUpdateList();
            r.unionProxy.sendGetBossRecord(r.unionProxy.openCopyParam.id);
        };
        e.prototype.onClickLeft = function(t) {
            t < 340 || this.eventClose();
        };
        e.prototype.onUpdateBoss = function() {
            for (
                var t = null, e = 0;
                r.unionProxy.bossInfo && e < r.unionProxy.bossInfo.length;
                e++
            )
                if (
                    r.unionProxy.bossInfo[e].id == r.unionProxy.openCopyParam.id
                ) {
                    t = r.unionProxy.bossInfo[e];
                    break;
                }
            this.lblName.string = r.unionProxy.openCopyParam.name;
            var o = t.hp < 0 ? 0 : t.hp,
                i = ((o / r.unionProxy.openCopyParam.hp) * 100).toFixed(2);
            this.hpBar.progress = o / r.unionProxy.openCopyParam.hp;
            this.lblHp.string = i + "%";
            3 == t.type ? i18n.t("union_scaped") : i18n.t("union_killed");
        };
        e.prototype.eventClose = function() {
            r.unionProxy.fighting = !1;
            i.utils.closeView(this);
        };
        e.prototype.onClickFight = function() {
            if (0 != r.unionProxy.curSelectId) {
                var t = r.unionProxy.getHeroFightData(r.unionProxy.curSelectId);
                if (null == t || 1 == t.h) {
                    this.nodeFight.active = !1;
                    this.flowerEff.node.active = !0;
                    this.flowerEff.animation = "animation";
                    this.scheduleOnce(this.onTimer, 1.5);
                    r.fightProxy.playerRandomHit();
                    r.unionProxy.fighting = !0;
                } else i.alertUtil.alert18n("HERO_RESTING");
            } else i.alertUtil.alert18n("UNION_NO_CHOSE");
        };
        e.prototype.onTimer = function() {
            r.unionProxy.sendFightBoss(
                r.unionProxy.openCopyParam.id,
                r.unionProxy.curSelectId
            );
            r.unionProxy.fighting = !1;
        };
        e.prototype.onClickServant = function() {
            i.utils.openPrefabView("union/UnionHeroSelect");
        };
        e.prototype.onHeroChange = function() {
            if (0 != r.unionProxy.curSelectId) {
                this.servantImg.url = l.uiHelps.getServantSpine(
                    r.unionProxy.curSelectId
                );
                var t = r.servantProxy.getHeroData(r.unionProxy.curSelectId);
                this.lblPro.string = i18n.t("COMMON_PROP1") + t.aep.e1;
            } else {
                i.alertUtil.alert18n("UNION_NO_HERO_FIGHT");
                this.lblPro.string = i18n.t("UNION_NO_CHOSE");
            }
        };
        e.prototype.onShowHero = function() {
            var t = r.servantProxy.getServantList();
            t.sort(r.servantProxy.sortServantEp);
            for (var e = 0; e < t.length; e++) {
                var o = r.unionProxy.getHeroFightData(t[e].id);
                if (null == o || 1 == o.h) {
                    r.unionProxy.curSelectId = t[e].id;
                    break;
                }
            }
        };
        e.prototype.onUpdateList = function() {
            var t = r.servantProxy.getServantList();
            t.sort(r.servantProxy.sortServantEp);
            this.heroList.data = t;
        };
        e.prototype.onCloseWindow = function() {
            this.onShowHero();
            this.onHeroChange();
            this.scheduleOnce(this.onTimer2, 0.2);
        };
        e.prototype.onTimer2 = function() {
            for (
                var t = null, e = 0;
                r.unionProxy.bossInfo && e < r.unionProxy.bossInfo.length;
                e++
            )
                if (
                    r.unionProxy.bossInfo[e].id == r.unionProxy.openCopyParam.id
                ) {
                    t = r.unionProxy.bossInfo[e];
                    break;
                }
            this.nodeFight.active = t && t.hp > 0;
        };
        e.prototype.onClickRecord = function() {
            if (1 == this.flag) {
                this.flag = !1;
                this.nodeRecord.y = -(this.node.height / 2 - 40);
            } else {
                this.flag = !0;
                this.scorll.scrollToTop();
                this.nodeRecord.y = -(this.node.height / 2 - 390);
            }
            this.nodeUp.active = !this.flag;
            this.nodeDown.active = this.flag;
        };
        e.prototype.onRecordUpdate = function() {
            this.recordList.data = r.unionProxy.heroLog;
        };
        __decorate([_(cc.Label)], e.prototype, "lblHp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPower", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "hpBar", void 0);
        __decorate([_(n.default)], e.prototype, "bossImg", void 0);
        __decorate([_(n.default)], e.prototype, "servantImg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([_(a.default)], e.prototype, "heroList", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "flowerEff", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFight", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeRecord", void 0);
        __decorate([_(a.default)], e.prototype, "recordList", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeDown", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scorll", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
