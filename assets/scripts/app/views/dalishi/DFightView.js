var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("./DalishiServantItem"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblEnemy = null;
            e.lblEnemyZZ = null;
            e.lblEnemyPer = null;
            e.prgEnemy = null;
            e.enemyUrl = null;
            e.enemy = null;
            e.lblEnemyTalk = null;
            e.nodeEnemyTalk = null;
            e.rightSp = null;
            e.lblDamge2 = null;
            e.servant = null;
            e.lblName = null;
            e.lblZZ = null;
            e.lblPer = null;
            e.prg = null;
            e.url = null;
            e.lblTalk = null;
            e.nodeTalk = null;
            e.leftSp = null;
            e.lblDamge1 = null;
            e._curIndex = 0;
            e._enemyHp = 0;
            e._meHp = 0;
            e._enemyMax = 0;
            e._meMax = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = a.dalishiProxy.win.fight,
                e = t.base[0],
                o = localcache.getItem(localdb.table_hero, e.hid);
            this.url.url = l.uiHelps.getServantHead(e.hid);
            this.servant.data = {
                id: e.hid
            };
            this.lblName.string = i18n.t("DALISI_NAME_SERVANT", {
                n: o ? o.name : "",
                d: e.level
            });
            this.lblZZ.string = i18n.t("SERVANT_ZHZZ", {
                zz: e.azz
            });
            this.lblPer.string = i18n.t("COMMON_NUM", {
                f: e.hp,
                s: e.hpmax
            });
            this.prg.progress = e.hp / e.hpmax;
            this._meHp = e.hp;
            this._meMax = e.hpmax;
            var i = t.base[1],
                n = localcache.getItem(localdb.table_hero, i.hid);
            this.enemyUrl.url = l.uiHelps.getServantHead(i.hid);
            this.enemy.data = {
                id: i.hid
            };
            this.lblEnemy.string = i18n.t("DALISI_NAME_SERVANT", {
                n: n ? n.name : "",
                d: i.level
            });
            this.lblEnemyZZ.string = i18n.t("SERVANT_ZHZZ", {
                zz: i.azz
            });
            this.lblEnemyPer.string = i18n.t("COMMON_NUM", {
                f: i.hpmax,
                s: i.hpmax
            });
            this.prgEnemy.progress = i.hp / i.hpmax;
            this._enemyHp = this._enemyMax = i.hpmax;
            this._curIndex = 0;
            this.showCurIndex();
            this.schedule(this.showCurIndex, 2);
        };

        e.prototype.showCurIndex = function() {
            var t = a.dalishiProxy.win.fight,
                e = t ? t.log[this._curIndex] : null;
            if (null != e) {
                if (1 == e.aid) {
                    var o = this._meHp / this._meMax;
                    this._meHp -= e.damge;
                    this._meHp = this._meHp < 0 ? 0 : this._meHp;
                    this.lblPer.string = i18n.t("COMMON_NUM", {
                        f: this._meHp,
                        s: this._meMax
                    });
                    l.uiUtils.showPrgChange(
                        this.prg,
                        o,
                        this._meHp / this._meMax
                    );
                    this.nodeTalk.active = !1;
                    this.nodeEnemyTalk.active = !0;
                    i.utils.showNodeEffect(this.nodeEnemyTalk, 0);
                    this.lblEnemyTalk.string = a.dalishiProxy.getTalkType(4);
                    l.uiUtils.showShake(this.servant);
                    this.leftSp.node.active = !0;
                    this.leftSp.animation = "animation";
                    this.lblDamge1.string = "-" + i.utils.formatMoney(e.damge);
                    this.lblDamge1.node.active = !0;
                    i.utils.showEffect(this.lblDamge1, 0);
                } else if (0 == e.aid) {
                    o = this._enemyHp / this._enemyMax;
                    this._enemyHp -= e.damge;
                    this._enemyHp = this._enemyHp < 0 ? 0 : this._enemyHp;
                    this.lblEnemyPer.string = i18n.t("COMMON_NUM", {
                        f: this._enemyHp,
                        s: this._enemyMax
                    });
                    l.uiUtils.showPrgChange(
                        this.prgEnemy,
                        o,
                        this._enemyHp / this._enemyMax
                    );
                    this.nodeTalk.active = !0;
                    this.nodeEnemyTalk.active = !1;
                    i.utils.showNodeEffect(this.nodeTalk, 0);
                    this.lblTalk.string = a.dalishiProxy.getTalkType(3);
                    l.uiUtils.showShake(this.enemy);
                    this.rightSp.node.active = !0;
                    this.rightSp.animation = "animation";
                    this.lblDamge2.string = "-" + i.utils.formatMoney(e.damge);
                    this.lblDamge2.node.active = !0;
                    i.utils.showEffect(this.lblDamge2, 0);
                }
                this._curIndex += 1;
                //this.schedule(this.showCurIndex, 2);
            } else {
                this.onClickSkip();
            } 
        };
        e.prototype.onClickSkip = function() {
            var t = a.dalishiProxy.win.fight;
            t && 1 == t.win
                ? i.utils.openPrefabView("dalishi/FightWin")
                : t &&
                  0 == t.win &&
                  i.utils.openPrefabView("dalishi/FightLost");
            this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            this.unschedule(this.showCurIndex);
            i.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblEnemy", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblEnemyZZ", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblEnemyPer", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prgEnemy", void 0);
        __decorate([_(n.default)], e.prototype, "enemyUrl", void 0);
        __decorate([_(r.default)], e.prototype, "enemy", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblEnemyTalk", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeEnemyTalk", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "rightSp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDamge2", void 0);
        __decorate([_(r.default)], e.prototype, "servant", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblZZ", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_(n.default)], e.prototype, "url", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTalk", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeTalk", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "leftSp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDamge1", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
