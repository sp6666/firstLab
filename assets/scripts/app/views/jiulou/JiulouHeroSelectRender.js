var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = require("../../component/ConfirmView"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblTotal = null;
            e.head = null;
            e.btnFY = null;
            e.yfyNode = null;
            e.lblYfy = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t) {
                var e = r.servantProxy.getHeroData(t.hid);
                this._data.flag;
                if (e) {
                    var o = localcache.getItem(localdb.table_hero, e.id);
                    this.lblName.string = o.name;
                    this.head.url = l.uiHelps.getServantHead(e.id);
                    var i = e.aep.e1 + e.aep.e2 + e.aep.e3 + e.aep.e4;
                    this.lblTotal.string = i + "";
                    this.yfyNode.active = !1;
                    this.btnFY.active = !0;
                    this.lblYfy.string = i18n.t("JIU_LOU_JIN_RI_YFY", {
                        num: t.count
                    });
                }
            }
        };
        e.prototype.onClickGoTo = function() {
            var t = this;
            r.playerProxy.userData &&
            r.jiulouProxy.yhInfo &&
            r.jiulouProxy.yhInfo.uid == r.playerProxy.userData.uid
                ? a.utils.showConfirm(i18n.t("JIU_LOU_JOIN_OWN_TIP"), function(
                      e
                  ) {
                      e != s.default.NO && t.onJoin();
                  })
                : this.onJoin();
        };
        e.prototype.onJoin = function() {
            var t = this._data,
                e = r.servantProxy.getHeroData(t.hid);
            if (t.count > 0) {
                var o = Math.pow(1.2, t.count - 1),
                    i = Math.floor(50 * o);
                a.utils.showConfirmItem(
                    i18n.t("JIU_LOU_FY_COST", {
                        num: i
                    }),
                    1,
                    r.playerProxy.userData.cash,
                    function() {
                        if (r.playerProxy.userData.cash < i)
                            a.alertUtil.alertItemLimit(1);
                        else {
                            r.jiulouProxy.sendYhChi(
                                r.jiulouProxy.yhInfo.uid,
                                r.jiulouProxy.xwId,
                                e.id
                            );
                            a.utils.closeNameView("jiulou/JiulouHeroSelect");
                        }
                    },
                    "JIU_LOU_FY_COST"
                );
            } else {
                r.jiulouProxy.sendYhChi(
                    r.jiulouProxy.yhInfo.uid,
                    r.jiulouProxy.xwId,
                    e.id
                );
                a.utils.closeNameView("jiulou/JiulouHeroSelect");
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([d(n.default)], e.prototype, "head", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnFY", void 0);
        __decorate([d(cc.Node)], e.prototype, "yfyNode", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblYfy", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
