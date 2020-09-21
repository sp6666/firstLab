var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.face = null;
            e.nodeCook = null;
            e.nodeItem = null;
            e.nodeWife = null;
            e.btnCancel = null;
            e.btnWife = null;
            e.nodeAddWife = null;
            e.btnItem = null;
            e.nodeAddItem = null;
            e.curItem = null;
            e.curWife = 0;
            e.curStove = null;
            e._saveSelect = {};
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("KITCHEN_SELECT_WIFE", this.onSelectWife, this);
            facade.subscribe("KITCHEN_SELECT_ITEM", this.onSelectItem, this);
            facade.subscribe("KITCHEN_SELECT_STOVE", this.onSelectStove, this);
            var t = r.timeProxy.getLoacalValue("KITCHEN_WIFE_SELECT");
            this._saveSelect = l.stringUtil.isBlank(t) ? {} : JSON.parse(t);
            this.item.data = null;
        };
        e.prototype.onSelectStove = function(t) {
            this.curItem = null;
            this.curStove = t;
            this.node.active = !0;
            this.onShow();
        };
        e.prototype.onSelectWife = function(t) {
            var e = localcache.getItem(localdb.table_wife, t);
            e && (this.face.url = a.uiHelps.getWifeHead(e.res));
            this.node.active = !0;
            this.curWife = t;
            this._saveSelect &&
                this._saveSelect[t] &&
                this.onSelectItem(this._saveSelect[t], !1);
            this.updateX();
        };
        e.prototype.updateX = function() {
            this.nodeItem.active =
                0 != this.curWife ||
                (this.curStove && 0 != this.curStove.itemId);
            this.nodeWife.x =
                (null == this.curStove && 0 != this.curStove.wid) ||
                0 != this.curWife
                    ? -this.nodeItem.x
                    : 0;
        };
        e.prototype.onSelectItem = function(t, e) {
            void 0 === e && (e = !0);
            this.curItem = {
                id: t
            };
            var o = this.curItem
                ? localcache.getItem(localdb.table_kitchen, t)
                : null;
            this.item.data = {
                id: o ? o.itemid : t
            };
            this.node.active = !0;
            this.nodeAddItem.active = 0 == this.curItem.id;
            if (this._saveSelect[this.curWife] != t && e) {
                this._saveSelect[this.curWife] = t;
                r.timeProxy.saveLocalValue(
                    "KITCHEN_WIFE_SELECT",
                    JSON.stringify(this._saveSelect)
                );
            }
            e && this.onClickCook();
        };
        e.prototype.onShow = function() {
            var t = "";
            if (this.curStove) {
                this.curItem =
                    0 != this.curStove.itemId
                        ? {
                              id: this.curStove.itemId
                          }
                        : null;
                var e = localcache.getItem(
                    localdb.table_wife,
                    this.curStove.wid
                );
                t =
                    0 != this.curStove.wid && e
                        ? a.uiHelps.getWifeHead(e.res)
                        : "";
                this.curWife = this.curStove.wid;
            }
            var o = this.curItem
                ? localcache.getItem(localdb.table_kitchen, this.curItem.id)
                : null;
            o &&
                (this.item.data = {
                    id: o.itemid
                });
            this.curItem;
            var i =
                this.curStove &&
                0 != this.curStove.wid &&
                null != this.curStove.wid;
            this.nodeAddWife.active = this.btnItem.interactable = this.btnWife.interactable = this.nodeCook.active = !i;
            this.updateX();
            this.nodeAddItem.active =
                null == this.curStove ||
                0 == this.curStove.itemId ||
                0 == this.curItem.id;
            this.btnCancel.node.x = i ? 0 : this.nodeItem.x;
            this.face.url = t;
        };
        e.prototype.onClickFood = function() {
            l.utils.openPrefabView("kitchen/KitItemSelect", !1, {
                id: this.curWife
            });
        };
        e.prototype.onClickOepn = function(t, e) {
            l.utils.openPrefabView(e);
        };
        e.prototype.onClickCook = function() {
            if (null != this.curItem)
                if (0 != this.curWife) {
                    if (
                        null !=
                        localcache.getItem(
                            localdb.table_kitchen,
                            this.curItem.id
                        )
                    ) {
                        r.kitchenProxy.sendStart(
                            this.curWife,
                            this.curStove.id,
                            this.curItem ? this.curItem.id : 0
                        );
                        var t = r.timeProxy.getLoacalValue("KITCHEN_PARAM"),
                            e = JSON.parse(t);
                        null == e && (e = {});
                        for (var o in e)
                            null != e[o] &&
                                e[o].wid == this.curWife &&
                                (e[o] = null);
                        var i = {};
                        i.wid = this.curWife;
                        i.itemId = this.curItem ? this.curItem.id : 0;
                        e[this.curStove.id] = i;
                        r.timeProxy.saveLocalValue(
                            "KITCHEN_PARAM",
                            JSON.stringify(e)
                        );
                        this.onClickClost();
                    } else
                        l.alertUtil.alert18n("KITCHEN_SELECT_ITEM_COUNR_LIMIT");
                } else l.alertUtil.alert18n("KITCHEN_SELECT_WIFE_LIMIT");
            else l.alertUtil.alert18n("KITCHEN_SELECT_ITEM_LIMIT");
        };
        e.prototype.onClickClost = function() {
            this.item.data = null;
            this.curItem = null;
            this.curWife = 0;
            this.curStove = null;
            this.node.active = !1;
        };
        __decorate([_(i.default)], e.prototype, "item", void 0);
        __decorate([_(n.default)], e.prototype, "face", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeCook", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeWife", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnCancel", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnWife", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAddWife", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnItem", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAddItem", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
