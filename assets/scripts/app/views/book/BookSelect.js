var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeAll = null;
            e.list = null;
            e.nodeUnhave = null;
            e.lblAdd = null;
            e.urlload = null;
            e.desk = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.desk = this.node.openParam;
            for (
                var t = [], e = 0;
                e < l.servantProxy.getServantList().length;
                e++
            ) {
                for (
                    var o = l.servantProxy.getServantList()[e], i = !1, r = 0;
                    r < l.bookProxy.list.length;
                    r++
                ) {
                    if (l.bookProxy.list[r].hid == o.id) {
                        i = !0;
                        break;
                    }
                }
                i || t.push(o);
            }
            this.lblAdd.string = i18n.t("BOOK_ADD_TIP", {
                d: n.utils.getParamInt("school_study_exp"),
                t: n.utils.getParamInt("school_skill_exp")
            });
            var s = n.timeUtil.getCurData();
            t.sort(function(t, e) {
                var o = localcache.getItem(localdb.table_hero, t.id),
                    i = localcache.getItem(localdb.table_hero, e.id),
                    n =
                        s > 0 &&
                        s < 5 &&
                        (s == o.spec[0] ||
                            (o.spec.length > 1 && o.spec[1] == s))
                            ? -1
                            : 1,
                    l =
                        s > 0 &&
                        s < 5 &&
                        (s == i.spec[0] ||
                            (i.spec.length > 1 && i.spec[1] == s))
                            ? -1
                            : 1;
                return n != l
                    ? n - l
                    : e.aep.e1 +
                          e.aep.e2 +
                          e.aep.e3 +
                          e.aep.e4 -
                          t.aep.e1 -
                          t.aep.e2 -
                          t.aep.e3 -
                          t.aep.e4;
            });
            this.list.data = t;
            this.urlload.node.active = s > 0 && s < 5;
            this.nodeAll.active = !this.urlload.node.active;
            this.nodeUnhave.active = 0 == t.length;
            this.urlload.node.active &&
                (this.urlload.url = a.uiHelps.getLangSp(s));
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = e ? e.data : null;
            if (o) {
                l.bookProxy.sendStart(o.id, this.desk.id);
                var i = l.timeProxy.getLoacalValue("BOOK_STUDY_PARAM"),
                    n = JSON.parse(i);
                null == n && (n = {});
                for (var r in n) n[r] == o.id && (n[r] = 0);
                n[this.desk.id] = o.id;
                l.timeProxy.saveLocalValue(
                    "BOOK_STUDY_PARAM",
                    JSON.stringify(n)
                );
            }
            this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([_(cc.Node)], e.prototype, "nodeAll", void 0);
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnhave", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblAdd", void 0);
        __decorate([_(r.default)], e.prototype, "urlload", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
