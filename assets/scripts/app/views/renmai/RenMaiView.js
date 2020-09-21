var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("./RenMaiRender"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemList = [];
            e.scroll = null;
            e.lblQy = null;
            e.tipNode = null;
            e.lblDes_1 = null;
            e.lblDes_2 = null;
            e.belief = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(i.confidanteProxy.ON_GET_CONFIDANTE_INFO, this.onConfidante, this); //打开蓝颜界面
            facade.subscribe(i.confidanteProxy.ON_CON_GIFT_BACK, this.init, this); //赠送返回
            this.init();
        };
        e.prototype.init = function() {
            for (
                var t = [10, 18, 11, 17, 15, 14, 13, 16, 12],
                    e = l.utils.getParamStrs("renmai_task"),
                    o = i.timeProxy.getLoacalValue("REN_MAI_JI_BAN"),
                    n = i.timeProxy.getLoacalValue("REN_MAI_QI_YUN"),
                    r = null == o ? "" : o.split("|"),
                    a = null == n ? "" : n.split("|"),
                    s = 0;
                s < this.itemList.length;
                s++
            ) {
                var c = r.length > s ? r[s] : 0,
                    _ = a.length > s ? a[s] : 0;
                this.itemList[s].data = {
                    heroId: t[s],
                    taskId: e[s],
                    oldJb: c,
                    oldQy: _
                };
            }
            var d = [],
                u = [];
            for (s = 0; s < t.length; s++) {
                d.push(i.jibanProxy.getHeroJB(t[s]));
                u.push(i.jibanProxy.getHeroSW(t[s]));
            }
            var p = d.join("|"),
                h = u.join("|"),
                y = 0,
                f = 0;
            for (s = 0; s < d.length; s++)
                if (r.length >= s + 1) {
                    if (
                        parseInt(r[s]) < parseInt(d[s]) &&
                        f < parseInt(d[s]) - parseInt(r[s])
                    ) {
                        f = parseInt(d[s]) - parseInt(r[s]);
                        y = t[s];
                    }
                } else if (f < parseInt(d[s])) {
                    f = parseInt(d[s]);
                    y = t[s];
                }
            var I = 0,
                m = 0;
            for (s = 0; s < u.length; s++)
                if (a.length >= s + 1) {
                    if (
                        parseInt(a[s]) < parseInt(u[s]) &&
                        m < parseInt(u[s]) - parseInt(a[s])
                    ) {
                        m = parseInt(u[s]) - parseInt(a[s]);
                        m = t[s];
                    }
                } else if (m < parseInt(u[s])) {
                    m = parseInt(u[s]);
                    I = t[s];
                }
            0 != I
                ? 17 == I || 16 == I
                    ? this.scroll.scrollToRight(1)
                    : (10 != I && 11 != I) || this.scroll.scrollToLeft(1)
                : 17 == y || 16 == y
                ? this.scroll.scrollToRight(1)
                : (10 != y && 11 != y) || this.scroll.scrollToLeft(1);
            this.belief = i.timeProxy.getLoacalValue("REN_MAI_MY_QY_VALUE")
                ? parseInt(i.timeProxy.getLoacalValue("REN_MAI_MY_QY_VALUE"))
                : 0;
            this.lblQy.string = this.belief + "";
            this.belief < i.jibanProxy.belief &&
                this.scheduleOnce(this.showChange, 1);
            i.timeProxy.saveLocalValue("REN_MAI_JI_BAN", p);
            i.timeProxy.saveLocalValue("REN_MAI_QI_YUN", h);
            i.timeProxy.saveLocalValue(
                "REN_MAI_MY_QY_VALUE",
                i.jibanProxy.belief + ""
            );
            var b = 0,
                g = 0,
                v = i.jibanProxy.belief,
                L = 0;
            for (s = 0; s < t.length; s++) {
                var N = i.jibanProxy.getHeroJB(t[s]);
                if (b < N) {
                    b = N;
                    g = t[s];
                }
                var E = i.jibanProxy.getHeroSW(t[s]);
                if (v < E) {
                    v = E;
                    L = t[s];
                }
            }
            if (0 == g) this.lblDes_1.string = i18n.t("REM_MAI_DES_1");
            else {
                var T = localcache.getItem(localdb.table_hero, g);
                this.lblDes_1.string = i18n.t("REM_MAI_DES_2", {
                    name: T.name
                });
            }
            if (0 == L) this.lblDes_2.string = i18n.t("REM_MAI_DES_4");
            else {
                T = localcache.getItem(localdb.table_hero, L);
                this.lblDes_2.string = i18n.t("REM_MAI_DES_3", {
                    name: T.name
                });
            }
            0 == I && 0 == y
                ? this.showTip()
                : this.scheduleOnce(this.showTip, 3);

            //facade.send(i.guideProxy.UPDATE_TRIGGER_GUIDE, {type: 11, value: i.taskProxy.mainTask.id});
        };
        e.prototype.showTip = function() {
            this.tipNode.active = !0;
        };
        e.prototype.showChange = function() {
            r.uiUtils.showNumChange(
                this.lblQy,
                this.belief,
                i.jibanProxy.belief
            );
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onCloseWin = function() {
            this.tipNode.active = !1;
        };
        e.prototype.onConfidante = function() {
            l.utils.openPrefabView("confidante/ConfidanteView");
        };
        __decorate([c([n.default])], e.prototype, "itemList", void 0);
        __decorate([c(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblQy", void 0);
        __decorate([c(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes_1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes_2", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
