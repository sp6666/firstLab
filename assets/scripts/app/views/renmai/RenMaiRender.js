var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.qiyunValue = null;
            e.headIcon = null;
            e.line = null;
            e.lockNode = null;
            e.headNode = null;
            e.itemNode = null;
            e.jbValue = null;
            e.infoNode = null;
            e.effMask = null;
            e.arrowEff = null;
            e.yuanEff = null;
            e.nodeConf = null;
            e.lblConf = null;
            e.newY = 0;
            e.posX = 0;
            e.newLine = 0;
            e.hasConfidante = false;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data.heroId,
                e = l.jibanProxy.getHeroSW(t),
                o = l.jibanProxy.getHeroJB(t);
            this.qiyunValue.string = i18n.t("SERVANT_ROLE_SW") + e;
            this.jbValue.string =
                i18n.t("SERVANT_JI_BAN_VALUE") +
                " " +
                l.jibanProxy.getHeroJB(t);
            this.headIcon.url = r.uiHelps.getServantHead(t);
            var i = parseInt(this._data.taskId);
            this.lockNode.active = !1;
            this.node.active = l.taskProxy.mainTask.id > i;
            this.line.active =
                l.jibanProxy.getHeroJB(t) > 0 && l.taskProxy.mainTask.id > i;
            this.headNode.active = this.infoNode.active =
                l.taskProxy.mainTask.id > i;
            var n = parseInt(this._data.oldJb),
                a = parseInt(this._data.oldQy);
            r.uiUtils.showNumChange(this.qiyunValue, a, e);
            r.uiUtils.showNumChange(this.jbValue, n, l.jibanProxy.getHeroJB(t));
            var s =
                    l.jibanProxy.getHeroJB(t) / 2500 > 1
                        ? 1
                        : l.jibanProxy.getHeroJB(t) / 2500,
                c = 0.3 * s + 0.7;
            this.itemNode.scale = this.yuanEff.node.scale = c;
            this.infoNode.scale = 1 - 0.3 * s;
            var _ = 160 - 160 * (a / 999 < 1 ? a / 999 : 1),
                d = 160 * -(a / 999 < 1 ? a / 999 : 1);
            this.line.width = this.effMask.width = 160 + _;
            this.itemNode.y = d || 0;
            if (a != e) {
                this.newLine = 160 - 160 * (e / 999 < 1 ? e / 999 : 1);
                this.newY = -160 * (e / 999 < 1 ? e / 999 : 1);
                this.posX = this.itemNode.x;
                this.arrowEff.node.active = !0;
                this.arrowEff.animation = "animation";
                this.scheduleOnce(this.showChange, 1);
            }
            if (n != o) {
                this.yuanEff.node.active = !0;
                this.yuanEff.animation = "animation";
            }

            //蓝颜
            this.showConfidante();
        };
        e.prototype.showChange = function() {
            this.line.width = this.effMask.width = 160 + this.newLine;
            this.itemNode.runAction(
                cc.moveTo(1, new cc.Vec2(this.posX, this.newY))
            );
        };
        e.prototype.showConfidante = function() {
            //设置亲密等级
            var curItem = null;
            for(var idx = 0; idx < l.confidanteProxy.info.heros.length; idx++)
            {
                if(l.confidanteProxy.info.heros[idx].id == this._data.heroId && l.confidanteProxy.info.heros[idx].prince == 2)
                {
                    curItem = l.confidanteProxy.info.heros[idx];
                    break;
                }
            }

            this.hasConfidante = curItem != null;
            this.nodeConf.active = this.hasConfidante;
            if(curItem != null)
            {
                //亲密等级
                var lv = localcache.getItem(localdb.table_confidante_level, curItem.level);
                if(lv)
                {
                    this.lblConf.string = lv.name;
                }
            }
        };
        e.prototype.onClickItem = function() {
            var t = parseInt(this._data.taskId);
            if (l.taskProxy.mainTask.id <= t) 
            {
                var e = localcache.getItem(localdb.table_mainTask, t);
                a.alertUtil.alert(i18n.t("REN_MAI_LOCK_HERO", {name: e.name}));
            } else {
                
                var o = this._data.heroId,
                    i = localcache.getItem(localdb.table_hero, o);

                if(l.servantProxy.getHeroData(o) != null)
                {
                    l.confidanteProxy.sendUseHero(o);
                    /*
                    //已经获取该皇子
                    if(this.hasConfidante)
                    {
                        l.confidanteProxy.sendUseHero(o);
                    }
                    else
                    {
                        //情愫未开放,直接打开,把id传进去
                        //a.alertUtil.alert(i18n.t("CONFIDANTE_NO_OPEN"));
                        a.utils.openPrefabView("confidante/ConfidanteView", false, o);
                    }
                    */
                }
                else{
                    //未获得
                    a.utils.openPrefabView("servant/ServantInfo", !1, i);
                }
            }
        };
        __decorate([_(cc.Label)], e.prototype, "qiyunValue", void 0);
        __decorate([_(n.default)], e.prototype, "headIcon", void 0);
        __decorate([_(cc.Node)], e.prototype, "line", void 0);
        __decorate([_(cc.Node)], e.prototype, "lockNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "headNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "itemNode", void 0);
        __decorate([_(cc.Label)], e.prototype, "jbValue", void 0);
        __decorate([_(cc.Node)], e.prototype, "infoNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "effMask", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "arrowEff", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "yuanEff", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeConf", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblConf", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
