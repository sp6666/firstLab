var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../item/ItemSlotUI"),
    a = require("../../utils/UIUtils"),
    s = require("../../formula"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCur = null;
            e.lblNext = null;
            e.itemSlot = null;
            e.itemName1 = null;
            e.itemName2 = null;
            e.gailv1 = null;
            e.gailv2 = null;
            e.iconArr = [];
            e.icon_1 = null;
            e.icon_2 = null;
            e.costSys = null;
            e.heroData = null;
            e.upSys = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SERVANT_UP", this.updateData, this);
            this.curData = this.node.openParam;
            this.heroData = l.servantProxy.getHeroData(
                l.servantProxy.curSelectId
            );
            this.onShowData();
        };
        e.prototype.updateData = function() {
            var t = this.curData.level;
            this.heroData = l.servantProxy.getHeroData(
                l.servantProxy.curSelectId
            );
            if (this.heroData)
                for (var e = 0; e < this.heroData.epskill.length; e++)
                    if (this.curData.id == this.heroData.epskill[e].id) {
                        this.curData = this.heroData.epskill[e];
                        break;
                    }
            t < this.curData.level
                ? n.alertUtil.alert(i18n.t("SERVANT_EPSKILL_UP_SUCCESS"))
                : n.alertUtil.alert(i18n.t("SERVANT_EPSKILL_UP_FAIL"));
            this.onShowData();
        };
        e.prototype.onShowData = function() {
            if (this.curData) {
                var t = localcache.getItem(
                        localdb.table_epSkill,
                        this.curData.id + ""
                    ),
                    e = s.formula.partner_prop(
                        this.heroData.level,
                        t.star,
                        this.curData.level - 1
                    ),
                    o = s.formula.partner_prop(
                        this.heroData.level,
                        t.star,
                        this.curData.level
                    );
                this.lblName.string = t.name + " Lv." + this.curData.level;
                this.lblCur.string = "+" + e;
                this.lblNext.string = "+" + o;
                var i = localcache.getItem(
                    localdb.table_epSkill,
                    this.curData.id
                );
                this.upSys = localcache.getItem(localdb.table_epLvUp, i.star);
                this.gailv1.string =
                    i18n.t("SERVANT_UP_GAI_LV") + this.upSys.prob_100 + "%";
                this.gailv2.string = i18n.t("SERVANT_UP_GAI_LV") + "100%";
                1 == i.ep
                    ? (this.costSys = localcache.getItem(
                          localdb.table_item,
                          61
                      ))
                    : 2 == i.ep
                    ? (this.costSys = localcache.getItem(
                          localdb.table_item,
                          62
                      ))
                    : 3 == i.ep
                    ? (this.costSys = localcache.getItem(
                          localdb.table_item,
                          63
                      ))
                    : 4 == i.ep &&
                      (this.costSys = localcache.getItem(
                          localdb.table_item,
                          64
                      ));
                (this.itemName1.string =
                    this.costSys.name +
                    "(" +
                    l.bagProxy.getItemCount(this.costSys.id) +
                    "/" +
                    this.upSys.quantity +
                    ")"),
                    (this.itemName2.string =
                        i18n.t("COMMON_SJJY") +
                        "：" +
                        this.heroData.zzexp +
                        "/" +
                        this.upSys.exp);
                var n = new a.ItemSlotData();
                n.id = this.costSys.id;
                this.itemSlot.data = n;
                this.icon_1.url = this.icon_2.url = a.uiHelps.getLangSp(i.ep);
            }
        };
        e.prototype.onClickUp = function(t, e) {
            if (1 == parseInt(e)) {
                if (this.heroData.zzexp < this.upSys.exp) {
                    n.alertUtil.alert(
                        i18n.t("COMMON_LIMIT", {
                            n: i18n.t("COMMON_SJJY")
                        })
                    );
                    return;
                }
            } else if (2 == parseInt(e)) {
                if (l.bagProxy.getItemCount(this.costSys.id) < 1) {
                    n.alertUtil.alertItemLimit(this.costSys.id);
                    return;
                }
            }
            l.servantProxy.sendUpZzSkill(
                l.servantProxy.curSelectId,
                this.curData.id,
                parseInt(e)
            );
            n.audioManager.playSound("levelup", !0, !0);
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCur", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblNext", void 0);
        __decorate([d(r.default)], e.prototype, "itemSlot", void 0);
        __decorate([d(cc.Label)], e.prototype, "itemName1", void 0);
        __decorate([d(cc.Label)], e.prototype, "itemName2", void 0);
        __decorate([d(cc.Label)], e.prototype, "gailv1", void 0);
        __decorate([d(cc.Label)], e.prototype, "gailv2", void 0);
        __decorate([d([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([d(i.default)], e.prototype, "icon_1", void 0);
        __decorate([d(i.default)], e.prototype, "icon_2", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
