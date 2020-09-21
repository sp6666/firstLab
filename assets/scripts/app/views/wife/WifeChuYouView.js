var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemNode = null;
            e.childNode = null;
            e.expNode = null;
            e.itemSlot = null;
            e.lblItemName = null;
            e.lblTxt = null;
            e.lblPro = null;
            e.lblExp = null;
            e.lblLove = null;
            e.roleImg = null;
            e.content1 = null;
            e.content2 = null;
            e.openData = null;
            e.curType = 0;
            e.flag = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                var e = localcache.getItem(localdb.table_wife, t.wifeid);
                if (0 == t.type) {
                    var o = localcache.getItem(localdb.table_item, t.itemid);
                    this.lblItemName.string = o.name;
                    var i = new l.ItemSlotData();
                    i.itemid = o.id;
                    this.itemSlot.data = i;
                    this.curType = 0;
                } else if (1 == t.type) {
                    this.lblTxt.string = i18n.t(
                        "WIFE_CHU_YOU_CHILD_" + t.babysex,
                        {
                            name: e.wname2
                        }
                    );
                    this.openData = t;
                    this.curType = 1;
                }
                this.roleImg.url = l.uiHelps.getServantSpine(e.res);
                var n = Math.ceil(2 * Math.random()),
                    r = i18n.t("WIFE_CHU_YOU_ITEM_" + n).split("|");
                this.content1.string = r[0];
                this.content2.string = r[1];
                this.scheduleOnce(this.cdCountDonw, 1);
            }
        };
        e.prototype.showChild = function() {
            n.utils.openPrefabView("ChildShow", null, [this.openData]);
        };
        e.prototype.showItem = function() {
            r.timeProxy.floatReward();
        };
        e.prototype.cdCountDonw = function() {
            this.flag = !0;
        };
        e.prototype.onClickCiMing = function() {
            n.utils.openPrefabView("child/ChildView");
            n.utils.closeNameView("wife/WifeListView");
            n.utils.closeNameView("wife/WifeSelectView");
            n.utils.closeView(this);
        };
        e.prototype.onClickClose = function() {
            if (0 != this.flag) {
                0 == this.curType
                    ? this.showItem()
                    : 1 == this.curType && this.showChild();
                -1 == this.curType && n.utils.closeView(this);
                this.curType = -1;
            }
        };
        __decorate([_(cc.Node)], e.prototype, "itemNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "childNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "expNode", void 0);
        __decorate([_(i.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblItemName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLove", void 0);
        __decorate([_(a.default)], e.prototype, "roleImg", void 0);
        __decorate([_(cc.Label)], e.prototype, "content1", void 0);
        __decorate([_(cc.Label)], e.prototype, "content2", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
