var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = require("../../component/BotExtent"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.numLabel = null;
            e.titleLabel = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.flowerFriendProxy.UPDATE_FLOWER_FRIENDS,
                this.onUpdateLevel,
                this
            );
            l.flowerFriendProxy.sendFriends();
        };

        e.prototype.onUpdateLevel = function () {

            this.numLabel.string = i18n.t("COMMON_COUNT", {
                c: l.flowerFriendProxy.flowerInfo.count
            });

            var k = localcache.getItem(localdb.table_item, l.flowerFriendProxy.flowerInfo.id);

            this.titleLabel.string = i18n.t("FLOWER_FRIEND_TITLE_NAME", {
                d: k.type[3]
            });

            this.list.data = l.flowerFriendProxy.friends.lists;
        };

        e.prototype.onClickClost = function () {
            r.utils.closeView(this);
        };

        __decorate([d(cc.Label)], e.prototype, "titleLabel", void 0);
        __decorate([d(cc.Label)], e.prototype, "numLabel", void 0);
        __decorate([d(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;