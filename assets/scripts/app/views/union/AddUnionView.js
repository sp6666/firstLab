var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.role = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("UNION_CREATE_SUCCESS", this.eventClose, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.eventClose, this);
            facade.subscribe("UPDATE_MEMBER_INFO", this.joinClub, this);

            var t = "";
            if (n.playerProxy.heroShow > 200) {
                var e = localcache.getItem(
                    localdb.table_wife,
                    n.playerProxy.heroShow - 200
                );
                t = r.uiHelps.getWifeBody(e.res);
            } else t = r.uiHelps.getServantSpine(n.playerProxy.heroShow);
            this.role.url = t;
        };

        e.prototype.joinClub = function () {
            if (i.utils.isOpenView("union/UnionAddFriendView")) {
                i.utils.closeNameView("union/UnionAddFriendView");
            }
            i.utils.closeView(this);
            n.unionProxy.enterUnion();
        };
        e.prototype.eventClose = function () {
            i.utils.closeView(this);
        };
        e.prototype.eventCreateUnion = function () {
            i.utils.openPrefabView("union/UnionCreate");
        };
        e.prototype.eventRandomUnion = function () {
            n.unionProxy.sendRandomAdd();
        };
        e.prototype.eventLookUpUnion = function () {
            i.utils.openPrefabView("union/UnionSearch");
        };
        e.prototype.eventFriendJoin = function () {
            i.utils.openPrefabView("union/UnionAddFriendView");
        };
        e.prototype.eventListUnion = function () {
            n.unionProxy.sendRankList(n.unionProxy.memberInfo.cid);
        };
        __decorate([c(l.default)], e.prototype, "role", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;