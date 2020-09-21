var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblBainHao = null;
            e.lblShiLi = null;
            e.lblWuLi = null;
            e.lblZhiLi = null;
            e.lblZhengZhi = null;
            e.lblMeiLi = null;
            e.lblWangJue = null;
            e.lblZhengJi = null;
            e.lblQinMi = null;
            e.lblGuanQia = null;
            e.vipImg = null;
            e.jueWeiImg = null;
            e.headImg = null;
            e.fashionImg = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.lblName.string = t.name;
                this.lblBainHao.string = i18n.t("USER_ID", {
                    id: t.id
                });
                this.lblShiLi.string = i18n.t("COMMON_SHILI") + "：" + t.shili;
                this.lblWuLi.string = i18n.t("COMMON_PROP1") + "：" + t.ep.e1;
                this.lblZhiLi.string = i18n.t("COMMON_PROP2") + "：" + t.ep.e2;
                this.lblZhengJi.string =
                    i18n.t("COMMON_PROP3") + "：" + t.ep.e3;
                this.lblMeiLi.string = i18n.t("COMMON_PROP4") + "：" + t.ep.e4;
                this.lblWangJue.string = i18n.t("PALACE_QIN_WANG", {
                    value: t.level
                });
                this.lblQinMi.string = i18n.t("WIFE_QINMIN") + "：" + t.love;
                this.lblZhengJi.string =
                    i18n.t("COMMON_ZHENGJI") + "：" + t.exp;
                var e = localcache.getItem(localdb.table_midPve, t.mmap),
                    o = localcache.getItem(localdb.table_smallPve, t.smap);
                this.lblGuanQia.string = t.bmap + "." + e.mdtext + o.sindex;
            }
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblBainHao", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblShiLi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblWuLi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblZhiLi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblZhengZhi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblMeiLi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblWangJue", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblZhengJi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblQinMi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblGuanQia", void 0);
        __decorate([a(i.default)], e.prototype, "vipImg", void 0);
        __decorate([a(i.default)], e.prototype, "jueWeiImg", void 0);
        __decorate([a(i.default)], e.prototype, "headImg", void 0);
        __decorate([a(i.default)], e.prototype, "fashionImg", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
