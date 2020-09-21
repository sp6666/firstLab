var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTotal = null;
            e.lblZz = null;
            e.lblZj = null;
            e.lblDan = null;
            e.lblJb = null;
            e.lblClothe = null;
            e.lblLep = null;
            e.lblLanProp = null;
            e.lblLanClothe = null;
            e.lblLanGallery = null;
            e.lblConSkill = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data,
                e = i18n.t("COMMON_PROP" + t.type);
            this.lblTotal.string = i18n.t("SERVANT_SHU_XING_MING", {
                name: e,
                num: t.pro
            });
            this.lblZz.string = i18n.t("SERVANT_ZI_ZHI_JIA_CHENG", {
                num: t.zzAdd
            });
            this.lblZj.string = i18n.t("SERVANT_ZHI_JI_JI_NENG", {
                num: t.wifeAdd ? t.wifeAdd : 0
            });
            this.lblDan.string = i18n.t("SERVANT_DAN_YAO_JIA_CHENG", {
                num: t.dan ? t.dan : 0
            });
            this.lblJb.string = i18n.t("SERVNAT_JI_BAN_JIA_CHENG", {
                num: t.jiBan ? t.jiBan : 0
            });
            this.lblClothe.string = i18n.t("SERVANT_CLOTHE_JIA_CHENG", {
                num: t.clothe ? t.clothe : 0
            });
            this.lblLep.string = i18n.t("SERVANT_LEADER_JIA_CHENG", {
                num: t.lep ? t.lep : 0
            });
            this.lblLanProp.string = i18n.t("CONFIDANTE_SERVANT_PROP",{
                num: t.yep ? t.yep : 0
            });
            this.lblLanClothe.string = i18n.t("CONFIDANTE_SERVANT_CLOTHE",{
                num: t.sep ? t.sep : 0
            });
            this.lblLanGallery.string = i18n.t("CONFIDANTE_SERVANT_GALLERY",{
                num: t.tep ? t.tep : 0
            });
            this.lblConSkill.string = i18n.t("SERVANT_QING_SU_JI_NENG",{
                num: t.csep ? t.csep : 0
            });
            1 == t.type
                ? (this.lblTotal.node.color = cc.color(202, 101, 105))
                : 2 == t.type
                ? (this.lblTotal.node.color = cc.color(101, 158, 202))
                : 3 == t.type
                ? (this.lblTotal.node.color = cc.color(217, 131, 30))
                : 4 == t.type &&
                  (this.lblTotal.node.color = cc.color(137, 101, 202));
            this.bg.url = l.uiHelps.getDeatilBg(t.type);
        };
        __decorate([s(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblZz", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblZj", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDan", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblJb", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblClothe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLep", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLanProp", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLanClothe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLanGallery", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblConSkill", void 0);
        __decorate([s(n.default)], e.prototype, "bg", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
