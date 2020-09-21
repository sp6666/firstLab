var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../Config"),
    a = require("../../component/SelectMax"),
    s = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.lblName = null;
            e.lblEffect = null;
            e.lblOut = null;
            e.nodeUse = null;
            e.nodeSC = null;
            e.nodeGo = null;
            e.silder = null;
            e.nodeBg = null;
            e.itemInfo = null;
            e.nodeZY = null;
            e.zwlid = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            this.itemInfo = this.node.openParam;
            this.updateShow();
            facade.subscribe("BAG_CLICK_BLANK", this.onClickClose, this);
            facade.subscribe("BAG_CLICK_HECHENG", this.onClickClose, this);
            facade.subscribe("BAG_CLICK_USE", this.onClickOther, this);
        };
        e.prototype.onClickOther = function (t) {
            this.itemInfo = t;
            this.updateShow();
        };
        e.prototype.updateShow = function () {
            var t = this.itemInfo;
            if (t) {
                this.zwlid = i.utils.getParamInt("zw_cost_item_id");
                var e = localcache.getItem(localdb.table_item, t.id + "");
                this.itemSlot.data = t;
                if (e) {
                    this.lblName.string =
                        e.name + (r.Config.DEBUG ? "(" + t.id + ")" : "");
                    var o = e.explain.split("|");
                    this.lblEffect.string = o.length > 1 ? o[1] : e.explain;
                    this.lblOut.string = i.stringUtil.isBlank(e.source) ?
                        i18n.t("COMMON_NULL") :
                        e.source;
                    this.nodeUse.active =
                        e.type && ("item" == e.type[0] || t.id == this.zwlid);
                    var n = 900 != e.id && 901 != e.id && 902 != e.id;
                    this.nodeSC.active = e.type && "hero" == e.type[0] && n;
                    this.nodeGo.active =
                        e.use &&
                        0 != e.use &&
                        !this.nodeSC.active &&
                        !this.nodeUse.active;

                    if (e.type && e.type[1] === 'fnum') {
                        this.nodeZY.active = true;
                        this.nodeGo.active = false;
                        this.nodeUse.active = false;
                        this.nodeSC.active = false;
                    } else {
                        this.nodeZY.active = false;
                    }
                }
                var a = l.bagProxy.getItemCount(t.id);
                this.silder.node.active =
                    this.nodeUse.active &&
                    a > i.utils.getParamInt("show_slider_count") &&
                    115 != t.id &&
                    140 != t.id &&
                    352 != t.id;
                this.silder.node.active && (this.silder.max = a);
                this.nodeBg.height =
                    this.nodeUse.active ||
                    this.nodeZY.active ||
                    this.nodeSC.active ||
                    this.nodeGo.active ?
                    400 :
                    300;
            }
        };

        e.prototype.onClickZY = function () {
            var t = this.itemInfo;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.id + "");

                if (e.type && e.type.length > 1 && e.type[1] === "fnum") {
                    l.flowerFriendProxy.flowerInfo = t;
                    i.utils.openPrefabView("flower/FlowerFriendSend");
                } else {
                    e.use && 0 != e.use && s.funUtils.openView(e.use);
                }

            }
            this.onClickClose();
        };

        e.prototype.onClickUse = function () {
            var t = this.itemInfo;
            if (t)
                if (115 == t.id)
                    i.utils.openPrefabView("ChangeNameView", null, {
                        type: 1
                    });
                else if (140 == t.id)
                i.utils.openPrefabView("ChangeNameView", null, {
                    type: 2
                });
            else {
                var e = localcache.getItem(localdb.table_item, t.id + "");
                if ("item" == e.type[0]) {
                    if (
                        l.bagProxy.getItemCount(t.id) < this.silder.curValue
                    ) {
                        i.alertUtil.alertItemLimit(t.id);
                        return;
                    }
                    l.bagProxy.sendUse(t.id, this.silder.curValue);
                } else
                    "hero" == e.type[0] ?
                    i.utils.openPrefabView(
                        "bag/BagServantSelect",
                        !1,
                        t
                    ) :
                    t.id == i.utils.getParamInt("zw_cost_item_id") &&
                    l.jingyingProxy.sendZwl(this.silder.curValue);
            }
            this.onClickClose();
        };
        e.prototype.onClickGo = function () {
            var t = this.itemInfo;
            if (t) {

                var e = localcache.getItem(localdb.table_item, t.id + "");
                e.use && 0 != e.use && s.funUtils.openView(e.use);
            }
            i.utils.closeView(this);
            i.utils.closeNameView("bag/BagView");
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        __decorate([d(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblEffect", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblOut", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeUse", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeSC", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeGo", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeZY", void 0);
        __decorate([d(a.default)], e.prototype, "silder", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;