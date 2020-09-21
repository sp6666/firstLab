var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblMailNum = null;
            e.list = null;
            e.btnGet = null;
            e.btnDelete = null;
            e.mailTip = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("MAIL_UPDATE", this.onMailUpdate, this);
            this.list.selectHandle = function(t) {
                var e = t;
                (null != e.rts && 0 != e.rts) || l.mailProxy.sendOpenMail(e.id);
                i.utils.openPrefabView("mail/MailDetail", null, e);
            };
            this.onMailUpdate();
        };
        e.prototype.onMailUpdate = function() {
            l.mailProxy.mailList.sort(l.mailProxy.sortList);
            this.list.data = l.mailProxy.mailList;
            this.lblMailNum.string = i18n.t("MAIL_NUM", {
                cur: l.mailProxy.getMailNum(!1),
                total: l.mailProxy.mailList.length
            });
            this.btnGet.active = this.btnDelete.active =
                l.mailProxy.mailList.length > 0;
            this.mailTip.active = 0 == l.mailProxy.mailList.length;
        };
        e.prototype.onClickDeleteAll = function() {
            i.utils.showConfirm(i18n.t("MAIN_DELETE_ALL"), function() {
                l.mailProxy.sendDeleteAll();
            });
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onOneKeyGet = function() {
            for (var t = 0; t < l.mailProxy.mailList.length; t++)
                1 == l.mailProxy.mailList[t].mtype &&
                    0 == l.mailProxy.mailList[t].rts &&
                    l.mailProxy.sendReadMail(l.mailProxy.mailList[t].id);
        };
        __decorate([s(cc.Label)], e.prototype, "lblMailNum", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnGet", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnDelete", void 0);
        __decorate([s(cc.Node)], e.prototype, "mailTip", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
