var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.wifeImages = null;
            e.wifeTitles = null;
            e.wifeD = null;
            e.mark = null;
            e.roleImage = null;
            e.nameImage = null;
            e.txt_love = null;
            e.txt_charm = null;
            e.txt_info = null;
            e.txt_condition = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = n.wifeProxy.wifeMaps.get(t.wid.toString());
                if (e) {
                    this.wifeD.active = !0;
                    this.mark.active = !1;
                    this.txt_charm.string = e.flower.toString();
                    this.txt_love.string = e.love.toString();
                } else {
                    this.wifeD.active = !1;
                    this.mark.active = !0;
                    this.txt_info.string =
                        2 == n.playerProxy.userData.sex
                            ? t.wname2 + "：" + t.info2
                            : t.wname + "：" + t.info;
                    var o = "";
                    "juqing" == t.from
                        ? (o = i18n.t("WIFE_GET_WAY_JU_QING"))
                        : "xf" == t.from
                        ? (o = i18n.t("WIFE_GET_WAY_XUN_FANG"))
                        : "shili" == t.from
                        ? (o = i18n.t("WIFE_GET_WAY_SHI_LI", {
                              value: t.condition
                          }))
                        : "vip" == t.from
                        ? (o = i18n.t("WIFE_GET_WAY_VIP", {
                              value: t.condition
                          }))
                        : "huodong" == t.from &&
                          (o = i18n.t("WIFE_GET_WAY_HUO_DONG"));
                    this.txt_condition.string = o;
                }
            }
        };
        __decorate([a(cc.SpriteAtlas)], e.prototype, "wifeImages", void 0);
        __decorate([a(cc.SpriteAtlas)], e.prototype, "wifeTitles", void 0);
        __decorate([a(cc.Node)], e.prototype, "wifeD", void 0);
        __decorate([a(cc.Node)], e.prototype, "mark", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "roleImage", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "nameImage", void 0);
        __decorate([a(cc.Label)], e.prototype, "txt_love", void 0);
        __decorate([a(cc.Label)], e.prototype, "txt_charm", void 0);
        __decorate([a(cc.Label)], e.prototype, "txt_info", void 0);
        __decorate([a(cc.Label)], e.prototype, "txt_condition", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
