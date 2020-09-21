var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/LabelShadow"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.lblLv = null;
            e.lblPer = null;
            e.prg = null;
            e.nodeFloat = null;
            e.url = null;
            e.lblChenlu = null;
            e.sp = null;
            e.nodeShui = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.flowerProxy.UPDATE_FLOWER_TREE,
                this.onShow,
                this
            );
            facade.subscribe(
                n.flowerProxy.UPDATE_FLOWER_LEVEL,
                this.onChenlu,
                this
            );
            r.uiUtils.floatPos(this.nodeFloat, 0, 10, 3);
            this.onShow();
            this.onChenlu();
        };
        e.prototype.onChenlu = function() {
            this.lblChenlu.string = i.utils.formatMoney(
                n.flowerProxy.level.chenlu
            );
        };
        e.prototype.onShow = function() {
            var t = n.flowerProxy.worldTree,
                e = localcache.getItem(localdb.table_worldtree, t.level);
            this.lblDes.string = i18n.t("FLOWER_TREE_DUIHUAN", {
                d: e.point
            });
            this.lblLv.string = i18n.t("COMMON_LV", {
                lv: t.level
            });
            this.lblPer.string =
                0 == e.dew
                    ? i18n.t("COMMON_MAX")
                    : i18n.t("COMMON_NUM", {
                          f: t.all,
                          s: e.dew
                      });
            this.prg.progress = t.all / e.dew;
            this.url.url = r.uiHelps.getWorldTree(t.level);
        };
        e.prototype.onClickRank = function() {
            n.flowerProxy.sendTreeRank();
        };
        e.prototype.onClickGX = function() {
            var t = this,
                e = this;
            i.utils.showConfirmItemMore(
                i18n.t("FLOWER_GX_CONFIRM"),
                10001,
                n.flowerProxy.level.chenlu,
                function(o) {
                    if (o > n.flowerProxy.level.chenlu)
                        i.alertUtil.alert18n("FLOWER_CHENLU_GX_LIMIT");
                    else {
                        n.flowerProxy.sendWorldTree(o);
                        e.nodeShui.active = !1;
                        e.sp.node.active = !0;
                        e.sp.animation = "animation";
                        e.scheduleOnce(t.onClostShui, 1.2);
                    }
                },
                null,
                null,
                null,
                null,
                1
            );
        };
        e.prototype.onClostShui = function() {
            this.nodeShui.active = !0;
            this.sp.node.active = !1;
            n.timeProxy.floatReward();
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(l.default)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFloat", void 0);
        __decorate([_(a.default)], e.prototype, "url", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblChenlu", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "sp", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeShui", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
