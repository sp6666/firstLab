var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("./ClotheGateItem"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.list = null;
            e.nodeContext = null;
            e.item = null;
            e.lblCount = null;
            e.lblScore = null;
            e.nodeOvered = null;
            e._renders = [];
            e.lblTheme = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.item.node.active = !1;
            (null == r.clothePveProxy.info ||
                (r.clothePveProxy.base &&
                    r.clothePveProxy.base.lastTime <
                        i.timeUtil.getTodaySecond())) &&
                r.clothePveProxy.sendInfo();
            facade.subscribe(
                r.clothePveProxy.UPDATE_CLOTHE_INFO,
                this.updateShow,
                this
            );
            facade.subscribe(
                r.clothePveProxy.UPDATE_CLOTHE_BASE,
                this.updateCount,
                this
            );
            facade.subscribe(
                r.clothePveProxy.UPDATE_CLOTHE_LOGS,
                this.onUpdateLog,
                this
            );
            this.updateCount();
        };
        e.prototype.updateOver = function() {
            if (null != r.clothePveProxy.info) {
                var t = r.clothePveProxy.info;
                this.nodeOvered.active = t.info.eTime < i.timeUtil.second;
                for (var e = 0; e < this._renders.length; e++)
                    this._renders[e].node.active = !1;
            }
        };
        e.prototype.updateShow = function() {
            if (null != r.clothePveProxy.info) {
                var t = r.clothePveProxy.info,
                    e = this;
                this.updateOver();
                a.uiUtils.countDown(
                    t.info.eTime,
                    this.lblTime,
                    function() {
                        e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                        e.updateOver();
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
                this.onUpdateLog();
                for (
                    var o = this.item.node.width,
                        i = this.item.node.height,
                        n = 0;
                    n < r.clothePveProxy.info.gate.length;
                    n++
                ) {
                    var s = this._renders[n];
                    if (null == s) {
                        var c = cc.instantiate(this.item.node);
                        s = c.getComponent(l.default);
                        c.active = !0;
                        this._renders.push(s);
                        this.nodeContext.addChild(c);
                        c.x = n * o;
                        c.y = n % 2 == 1 ? (5 * -i) / 4 : 0;
                    }
                    s.data = r.clothePveProxy.info.gate[n];
                }
                this.nodeContext.width = r.clothePveProxy.info.gate.length * o;
                r.clothePveProxy.base &&
                    (this.lblCount.string = i18n.t("CLOTHE_PVE_REMAIN", {
                        d:
                            r.clothePveProxy.info.count -
                            r.clothePveProxy.base.use
                    }));

                //主题
                var title = "CLOTHE_PVE_THEME_TYPE_" + r.clothePveProxy.curTheme.toString();
                this.lblTheme.string = i18n.t(title);
            }
        };
        e.prototype.onUpdateLog = function() {
            this.list.data = r.clothePveProxy.logs;
        };
        e.prototype.onClickRank = function() {
            r.clothePveProxy.sendRank();
        };
        e.prototype.onClickDui = function() {
            i.utils.openPrefabView("clothe/ClotheDuihuan");
        };
        e.prototype.updateCount = function() {
            this.updateShow();
            null == r.clothePveProxy.base &&
                (this.lblScore.string = r.clothePveProxy.base.score + "");
            null != r.clothePveProxy.info &&
                (this.lblCount.string = i18n.t("CLOTHE_PVE_REMAIN", {
                    d: r.clothePveProxy.info.count - r.clothePveProxy.base.use
                }));
        };
        e.prototype.onClickAdd = function() {
            if ( r.clothePveProxy.info && r.clothePveProxy.info.info.eTime < i.timeUtil.second )
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                i.utils.openPrefabView("ConfirmBuyMore",null, 1);

                /*
                i.utils.showConfirmItem(
                    i18n.t("CLOTHE_PVE_ADD_CONFIRM", {
                        d: t
                    }),
                    1,
                    r.playerProxy.userData.cash,
                    function() {
                        r.playerProxy.userData.cash < t
                            ? i.alertUtil.alertItemLimit(1)
                            : r.clothePveProxy.sendAdd();
                    },
                    "CLOTHE_PVE_ADD_CONFIRM"
                );
                */
            }
        };
        e.prototype.onClickRwd = function() {
            //目标奖励
            if(r.clothePveProxy.info.grade)
            {
                i.utils.openPrefabView("clothe/ClotheMuBiaoView");
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeContext", void 0);
        __decorate([_(l.default)], e.prototype, "item", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeOvered", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTheme", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
