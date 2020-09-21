var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("./AcademyRoleItem"),
    s = require("../../utils/UIUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblAddExp = null;
            e.lblTime = null;
            e.lblLv = null;
            e.lblName = null;
            e.lblGetExp = null;
            e.masterImg = null;
            e.list = null;
            e.role1 = null;
            e.role2 = null;
            e.role3 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            JsonHttp.subscribe(
                "ACADEMY_DESK_INFO_UPDATE",
                this.onDeskInfo,
                this
            );
            this.onDeskInfo();
        };
        e.prototype.onDeskInfo = function() {
            this.lblName.string = l.academyProxy.deskInfo.master.name;
            this.lblLv.string = i18n.t("COMMON_PALACE", {
                lv: l.academyProxy.deskInfo.master.level
            });
            var t = localcache.getItem(
                    localdb.table_governmentIncome,
                    l.academyProxy.deskInfo.master.level
                ),
                e =
                    l.academyProxy.deskInfo.master.num2 -
                    l.academyProxy.deskInfo.master.num;
            if (t) {
                this.lblAddExp.string = i18n.t("ACADEMY_EXP_ADD", {
                    value: t.exp
                });
                this.lblGetExp.string =
                    i18n.t("ACADEMY_EXP_TOTAL") + "：" + (e / 60) * t.exp;
            }
            s.uiUtils.countDown(
                l.academyProxy.deskInfo.master.num2,
                this.lblTime
            );
            this.list.data = l.academyProxy.deskInfo.log;
            for (var o = 0; o < 3; o++)
                l.academyProxy.deskInfo.desks.length >= o + 1
                    ? 1 == l.academyProxy.deskInfo.desks[o].rid
                        ? (this.role1.data = l.academyProxy.deskInfo.desks[o])
                        : 2 == l.academyProxy.deskInfo.desks[o].rid
                        ? (this.role2.data = l.academyProxy.deskInfo.desks[o])
                        : 3 == l.academyProxy.deskInfo.desks[o].rid &&
                          (this.role3.data = l.academyProxy.deskInfo.desks[o])
                    : 1 == o
                    ? (this.role1.data = null)
                    : 2 == o
                    ? (this.role2.data = null)
                    : 3 == o && (this.role3.data = null);
        };
        e.prototype.onClickRole = function(t, e) {
            var o = e.data;
            null == o
                ? r.utils.showConfirm(i18n.t("ACADEMY_IS_JOIN"), function() {
                      l.academyProxy.sendJoin(
                          l.academyProxy.deskInfo.master.uid,
                          parseInt(e)
                      );
                  })
                : r.utils.showConfirm(i18n.t("ACADEMY_KICK_ROLE"), function() {
                      l.academyProxy.sendKick(
                          l.academyProxy.deskInfo.master.uid,
                          parseInt(e),
                          o.uid
                      );
                  });
        };
        e.prototype.onClickClost = function() {
            r.utils.closeView(this);
        };
        __decorate([d(cc.Label)], e.prototype, "lblAddExp", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblGetExp", void 0);
        __decorate([d(i.default)], e.prototype, "masterImg", void 0);
        __decorate([d(n.default)], e.prototype, "list", void 0);
        __decorate([d(a.default)], e.prototype, "role1", void 0);
        __decorate([d(a.default)], e.prototype, "role2", void 0);
        __decorate([d(a.default)], e.prototype, "role3", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
