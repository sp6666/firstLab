var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../user/UserHeadItem"),
    s = require("./DalishiServantItem"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.servant = null;
            e.lblEnemyName = null;
            e.lblEnemyCount = null;
            e.lblScore = null;
            e.lblServant = null;
            e.lblZZ = null;
            e.lblAtk = null;
            e.lblBaojiSkill = null;
            e.lblBaoshangSkill = null;
            e.prg = null;
            e.lblPrg = null;
            e.head = null;
            e.items = [];
            e._curSelect = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                "UPDATE_DALISHI_ZHUISHA",
                this.onUpdateZhuisha,
                this
            );
            facade.subscribe("UPDATE_DALISHI_FIGHT", this.onUpdateFight, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickBack, this);
            this.onUpdateFight();
            this.onUpdateZhuisha();
            var t = r.dalishiProxy.info;
            t &&
                t.fuser &&
                this.head.setUserHead(t.fuser.job, t.fuser.headavatar);
            this.lblEnemyName.string = t.fuser ? t.fuser.name : "";
            2 == r.dalishiProxy.fight.fstate &&
                n.utils.openPrefabView("dalishi/AwardDView");
        };
        e.prototype.onUpdateZhuisha = function() {
            this.lblScore.string = i18n.t("DALISI_SCORE", {
                d: r.dalishiProxy.zhuisha ? r.dalishiProxy.zhuisha.score : 0
            });
        };
        e.prototype.onUpdateFight = function() {
            if (0 != r.dalishiProxy.fight.hid) {
                for (var t = 0; t < this.items.length; t++)
                    this.items[t].data =
                        r.dalishiProxy.fight.fheros.length > t
                            ? r.dalishiProxy.fight.fheros[t]
                            : null;
                var e =
                    r.dalishiProxy.fight.fheronum -
                    r.dalishiProxy.fight.killnum;
                e = e < 0 ? 0 : e;
                this.lblEnemyCount.string = i18n.t("DALISI_SERVANT_NUM", {
                    v1: e,
                    v2: r.dalishiProxy.fight.fheronum
                });
                var o = r.servantProxy.getHeroData(r.dalishiProxy.fight.hid),
                    i = localcache.getItem(
                        localdb.table_hero,
                        r.dalishiProxy.fight.hid
                    );
                this.lblServant.string = i18n.t("DALISI_NAME_SERVANT", {
                    n: i ? i.name : "",
                    d: o ? o.level : 1
                });
                this.lblZZ.string = i18n.t("SERVANT_ZHZZ", {
                    zz: o ? o.zz.e1 + o.zz.e4 + o.zz.e3 + o.zz.e2 : 0
                });
                this.lblAtk.string = i18n.t("DALISI_ATK_ADD", {
                    d: r.dalishiProxy.fight.ackadd
                });
                this.lblBaojiSkill.string = i18n.t("DALISI_SKILLBAOJI_ADD", {
                    d: r.dalishiProxy.fight.skill1add
                });
                this.lblBaoshangSkill.string = i18n.t("DALISI_SKILLBAOSHANG_ADD", {
                    d: r.dalishiProxy.fight.skill2add
                });
                this.lblPrg.string = i18n.t("COMMON_NUM", {
                    f: r.dalishiProxy.fight.hp,
                    s: r.dalishiProxy.fight.hpmax
                });
                this.prg.progress =
                    r.dalishiProxy.fight.hp / r.dalishiProxy.fight.hpmax;
                this.servant.url = l.uiHelps.getServantHead(
                    r.dalishiProxy.fight.hid
                );
                this._curSelect = !1;
            }
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            n.utils.closeNameView("dalishi/DalishiView");
        };
        e.prototype.onClickBack = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickServant = function(t, e) {
            var o = this,
                i = e.data;
            if (i && !this._curSelect)
                if (
                    null == r.timeProxy.getLoacalValue("DALISI_ATTACT_CONFIRM")
                ) {
                    n.utils.showConfirm(
                        i18n.t("DALISI_ATTACT_CONFIRM"),
                        function() {
                            o._curSelect = !0;
                            r.dalishiProxy.sendFight(i.id);
                        }
                    );
                    r.timeProxy.saveLocalValue("DALISI_ATTACT_CONFIRM", "1");
                } else {
                    this._curSelect = !0;
                    r.dalishiProxy.sendFight(i.id);
                }
        };
        e.prototype.onClickUser = function() {
            var t = r.dalishiProxy.info.fuser;
            t && r.playerProxy.sendGetOther(t.uid);
        };
        e.prototype.onClickAdd = function() {
            n.utils.openPrefabView("dalishi/ShopDView");
        };
        __decorate([d(i.default)], e.prototype, "servant", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblEnemyName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblEnemyCount", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblServant", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblZZ", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblAtk", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBaojiSkill", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBaoshangSkill", void 0);
        __decorate([d(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblPrg", void 0);
        __decorate([d(a.default)], e.prototype, "head", void 0);
        __decorate([d([s.default])], e.prototype, "items", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
