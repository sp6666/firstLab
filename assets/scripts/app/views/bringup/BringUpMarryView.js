var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/Utils"),
    r = require("../../component/ChildSpine"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblShuXing = null;
            e.lblFather = null;
            e.checkBox1 = null;
            e.checkBox2 = null;
            e.childSpine = null;
            e.input = null;
            e.lblCost = null;
            e.checkBox3 = null;
            e.lblShenfen = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.bagProxy.UPDATE_BAG_ITEM,
                this.showItemCount,
                this
            );
            this.input.placeholder = i18n.t("SON_TO_QIN_UID");
            this.curData = this.node.openParam;
            if (this.curData) {
                this.lblName.string = this.curData.name;
                var t =
                    this.curData.ep.e1 +
                    this.curData.ep.e2 +
                    this.curData.ep.e3 +
                    this.curData.ep.e4;
                this.lblShuXing.string = t + "";
                localcache.getItem(localdb.table_wife, this.curData.mom);
                this.lblFather.string = i.playerProxy.userData.name;
                this.childSpine.setKid(this.curData.id, this.curData.sex);
                this.adult = localcache.getItem(
                    localdb.table_adult,
                    this.curData.honor
                );
                new n.ItemSlotData().itemid = this.adult.itemid;
                var e = localcache.getItem(
                    localdb.table_item,
                    this.adult.itemid
                );
                this.lblCost.string =
                    i18n.t("SON_MARRY_COST_ITEM", {
                        str: e.name
                    }) +
                    i18n.t("COMMON_NEED", {
                        f: i.bagProxy.getItemCount(e.id),
                        s: 1
                    });
                this.lblShenfen.string = i.sonProxy.getHonourStr(
                    this.curData.honor
                );
            }
        };
        e.prototype.showItemCount = function() {
            var t = localcache.getItem(localdb.table_item, this.adult.itemid);
            this.lblCost.string =
                i18n.t("SON_MARRY_COST_ITEM", {
                    str: t.name
                }) +
                i18n.t("COMMON_NEED", {
                    f: i.bagProxy.getItemCount(t.id),
                    s: 1
                });
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onTiQin = function() {
            if (
                !this.checkBox1.isChecked ||
                ("" != this.input.string && null != this.input.string)
            )
                if (i.bagProxy.getItemCount(this.adult.itemid) <= 0)
                    l.alertUtil.alertItemLimit(this.adult.itemid);
                else {
                    var t = this.checkBox1.isChecked
                        ? parseInt(this.input.string)
                        : 0;
                    i.sonProxy.sendTiQin(
                        t,
                        2,
                        this.curData.id,
                        this.checkBox3.isChecked ? 1 : 0
                    );
                    l.utils.closeView(this);
                }
            else l.alertUtil.alert(i18n.t("SON_TO_QIN_UID"));
        };
        e.prototype.onClickCheckBox1 = function() {
            this.checkBox1.isChecked = !0;
            this.checkBox2.isChecked = !1;
        };
        e.prototype.onClickCheckBox2 = function() {
            this.checkBox1.isChecked = !1;
            this.checkBox2.isChecked = !0;
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShuXing", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFather", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "checkBox1", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "checkBox2", void 0);
        __decorate([c(r.default)], e.prototype, "childSpine", void 0);
        __decorate([c(cc.EditBox)], e.prototype, "input", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "checkBox3", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShenfen", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
