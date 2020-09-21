var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.number = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.UPDATE_SEARCH_INFO();
            facade.subscribe(
                "UPDATE_SEARCH_INFO",
                this.UPDATE_SEARCH_INFO,
                this
            );
            l.unionProxy.sendGetMemberInfo(l.unionProxy.clubInfo.id);
        };
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickChange = function(t, e) {
            var o = e.data;
            if (o) {
                l.unionProxy.changePosParam = o;
                n.utils.openPrefabView("union/UnionPos");
            }
        };
        e.prototype.eventQuit = function() {
            var t = this;
            n.utils.showConfirm(i18n.t("UNION_TUI_CHU_TI_SHI"), function() {
                l.unionProxy.sendOut();
                t.eventClose();
            });
        };
        e.prototype.UPDATE_SEARCH_INFO = function() {
            var t = l.unionProxy.clubInfo,
                e = l.unionProxy.getUnionLvMaxCount(t.level);
            this.number.string =
                i18n.t("UNION_MENBER_COUNT") +
                i18n.t("COMMON_NUM", {
                    f: t.members.length,
                    s: e
                });
            t.members.sort(this.sortMembers);
            this.list.data = t.members;
        };
        e.prototype.sortMembers = function(t, e) {
            return t.post - e.post;
        };
        __decorate([s(cc.Label)], e.prototype, "number", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
