var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../item/ItemSlotUI"),
    l = require("../../models/BagProxy"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.lblName = null;
            e.lblEffect = null;
            e.lblOut = null;
            e.lblCount = null;
            e.nodeItem = null;
            e.nodeTag = null;
            e.animation = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            t ? this.showInfo(t) : this.onClickClose();
        };
        e.prototype.showInfo = function(t) {
            if (null != t) {
                this.itemSlot.data = t;
                var e = t.id ? t.id : t.itemid;
                switch (t.kind ? t.kind : 1) {
                    case l.DataType.HEAD_BLANK:
                        var o = localcache.getItem(localdb.table_userblank, e);
                        this.lblName.string = o ? o.name : "";
                        this.lblOut.string = o ? o.des : "";
                        this.lblEffect.string = "";
                        break;

                    case l.DataType.CLOTHE:
                        var n = localcache.getItem(localdb.table_userClothe, e);
                        this.lblName.string = n.name;
                        this.lblOut.string = n.text;
                        this.lblEffect.string = n.des;
                        this.nodeTag.clotheData = n;
                        break;

                    case l.DataType.JB_ITEM:
                        var r = localcache.getItem(localdb.table_heropve, e);
                        this.lblName.string =
                            r.name + i18n.t("WISHING_JB_JU_QING");
                        this.lblEffect.string = r.msg;
                        this.lblOut.string =
                            6 == r.unlocktype
                                ? i18n.t("WISHING_GET_WAY_2")
                                : i18n.t("WISHING_GET_WAY");
                        break;

                    case l.DataType.HERO_CLOTHE:
                        var a = localcache.getItem(
                            localdb.table_heroClothe,
                            t.id
                        );
                        this.lblName.string = a.name;
                        this.lblOut.string = a.way;
                        this.lblEffect.string = a.txt;
                        break;

                    case l.DataType.CHENGHAO:
                        var s = localcache.getItem(localdb.table_fashion, t.id);
                        this.lblName.string = s ? s.name : "";
                        this.lblOut.string = s ? s.des : "";
                        this.lblEffect.string = "";
                        break;

                    default:
                        var c = localcache.getItem(localdb.table_item, e),
                            _ = c.explain.split("|");
                        this.lblName.string = c.name;
                        this.lblEffect.string = _.length > 1 ? _[1] : c.explain;
                        this.lblOut.string = i.stringUtil.isBlank(c.source)
                            ? i18n.t("COMMON_NULL")
                            : c.source;
                }
                this.lblCount &&
                    (this.lblCount.string =
                        t.count && t.count > 1
                            ? i18n.t("COMMON_COUNT", {
                                  c: t.count
                              })
                            : "");

                if(t.kind == l.DataType.CLOTHE) {
                    this.nodeTag.active = true;
                }else {
                    this.nodeTag.active = false;
                }
            }

        };

        e.prototype.start = function() {
            if(this.itemSlot.data) {
                if(this.itemSlot.data.kind == l.DataType.CLOTHE) {
                    this.animation.stop();
                    this.animation.play("ItemInfoopenClothe");
                }
            }
        };

        e.prototype.onClickClose = function() {
            if(this.itemSlot.data.kind == l.DataType.CLOTHE) {
                this.nodeTag.active = false;
            }
            i.utils.closeView(this);
        };
        __decorate([s(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblEffect", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblOut", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeTag", void 0);
        __decorate([s(cc.Animation)], e.prototype, "animation", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
