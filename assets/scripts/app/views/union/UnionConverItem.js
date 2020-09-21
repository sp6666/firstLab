var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../item/ItemSlotUI"),
    bp = require("../../models/BagProxy"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLock = null;
            e.lblCost = null;
            e.lblCount = null;
            e.lblName = null;
            e.nodeLock = null;
            e.itemSlot = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.btn &&
                this.btn.clickEvents &&
                this.btn.clickEvents.length > 0 &&
                (this.btn.clickEvents[0].customEventData = this);
        };
        e.prototype.onClickItem = function () {
            this.data;
        };
        e.prototype.showData = function () {
            var t = this.data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.item.id);



                var it = localcache.getItem(localdb.table_item, 1414);

                this.lblCost.string = t.need.count + it.name;

                if (t.item.kind === bp.DataType.CLOTHE) {
                    e = localcache.getItem(
                        localdb.table_userClothe,
                        t.item.id
                    );
                } else if (t.item.kind === bp.DataType.JB_ITEM) {
                    e = localcache.getItem(
                        localdb.table_heropve,
                        t.item.id
                    );
                } else if (t.item.kind === bp.DataType.HEAD_BLANK) {
                    e = localcache.getItem(
                        localdb.table_userblank,
                        t.item.id
                    );
                } else {
                    this.lblCost.string = i18n.t("union_gx", {
                        c: t.need.count
                    });
                }

                if (e) {
                    this.lblName.string = e.name;

                    this.nodeLock.active = t.lock > 0;
                    this.lblCount.string = t.num + "";
                    var o = new n.ItemSlotData();
                    o.id = t.item.id;
                    o.kind = t.item.kind;
                    this.itemSlot.data = o;
                    this.lblLock.string = i18n.t("UNION_LOCK_LEVEL_TXT", {
                        num: t.lock
                    });
                } else {
                    cc.error(t.item.id + ' not exist');
                }

            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblLock", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeLock", void 0);
        __decorate([s(l.default)], e.prototype, "itemSlot", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;