var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.wifeTitles = null;
            e.bg = null;
            e.button = null;
            e.wifeItem = null;
            e.xxooView = null;
            e.Image_name = null;
            e.Image_role1 = null;
            e.Image_role2 = null;
            e.txt_talk = null;
            e.loader1 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("CLOSE_XXOO", this.closeBtn, this);
            var t = this.node.openParam;
            if (t) {
                var e = l.wifeProxy.getWifeData(t.wifeId),
                    o = localcache.getItem(localdb.table_wife, e.id);
                this.txt_talk.string = this.txt_talk.string =
                    2 == l.playerProxy.userData.sex
                        ? o.talk2[Math.floor(Math.random() * o.talk.length)]
                        : o.talk[Math.floor(Math.random() * o.talk.length)];
                l.timeProxy.floatReward();
            }
        };
        e.prototype.closeBtn = function() {
            i.utils.closeView(this);
        };
        __decorate([s(cc.SpriteAtlas)], e.prototype, "wifeTitles", void 0);
        __decorate([s(cc.Node)], e.prototype, "bg", void 0);
        __decorate([s(cc.Node)], e.prototype, "button", void 0);
        __decorate([s(cc.Node)], e.prototype, "wifeItem", void 0);
        __decorate([s(cc.Node)], e.prototype, "xxooView", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "Image_name", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "Image_role1", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "Image_role2", void 0);
        __decorate([s(cc.Label)], e.prototype, "txt_talk", void 0);
        __decorate([s(n.default)], e.prototype, "loader1", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
