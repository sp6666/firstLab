var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = require("../chat/ChatBlankItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.head = null;
            e.blank = null;
            e.bItem = null;
            e.bItem1 = null;
            e.isLoadPlayer = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            this.isLoadPlayer && this.updateUserHead();
        };
        e.prototype.updateUserHead = function() {
            var t = 1,
                e = 1;
            if (null != l.playerProxy.headavatar) {
                e = l.playerProxy.headavatar.blank;
                var o = localcache.getItem(
                    localdb.table_userhead,
                    l.playerProxy.headavatar.head
                );
                t =
                    0 == l.playerProxy.headavatar.head ||
                    (o && 0 != o.job && o.job != l.playerProxy.userData.job)
                        ? l.playerProxy.userData.job + 1e4
                        : l.playerProxy.headavatar.head;
            } else t = l.playerProxy.userData.job + 1e4;
            this.setHead(t, e);
        };
        e.prototype.setUserHead = function(t, e) {
            var o = localcache.getItem(localdb.table_userhead, e.head),
                i =
                    null == e ||
                    null == e.head ||
                    0 == e.head ||
                    (null != o && o.job != t && 0 != o.job)
                        ? t + 1e4
                        : e.head,
                n = null != e && null != e.blank && 0 != e.blank ? e.blank : 1;
            this.setHead(i, n);
        };
        e.prototype.setHead = function(t, e) {
            var o = localcache.getItem(localdb.table_userblank, e),
                i = localcache.getItem(localdb.table_userhead, t);
            this.head.url = n.uiHelps.getAvatar(i ? i.id : 1);
            this.blank.url = n.uiHelps.getBlank(o ? o.blankmodel : 1);
            this.bItem &&
                this.bItem.node.active &&
                o &&
                this.bItem.setBlank(
                    o.chatblank,
                    o.minwidth,
                    o.minheight,
                    o.spine,
                    o.chatcolor
                );
            this.bItem1 &&
                this.bItem1.node.active &&
                o &&
                this.bItem1.setBlank(
                    o.chatblank,
                    o.minwidth,
                    o.minheight,
                    o.spine,
                    o.chatcolor
                );
        };
        __decorate([c(i.default)], e.prototype, "head", void 0);
        __decorate([c(i.default)], e.prototype, "blank", void 0);
        __decorate([c(r.default)], e.prototype, "bItem", void 0);
        __decorate([c(r.default)], e.prototype, "bItem1", void 0);
        __decorate(
            [
                c({
                    tooltip: "是否加载主角头像"
                })
            ],
            e.prototype,
            "isLoadPlayer",
            void 0
        );
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
