var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.lblEffect = null;
            e.list = null;
            e.itemInfo = null;
            return e;
        }
        o = e;
        e.prototype.onLoad = function() {
            this.itemInfo = this.node.openParam;
            if (this.itemInfo) {
                o.curSelectItemId = this.itemInfo.id;
                var t = localcache.getItem(
                    localdb.table_item,
                    this.itemInfo.id
                );
                this.lblCount.string = i18n.t("COMMON_COUNT", {
                    c: n.bagProxy.getItemCount(this.itemInfo.id)
                });
                var e = t.explain.split("|");
                this.lblEffect.string = e.length > 1 ? e[1] : t.explain;
                this.list.data = n.servantProxy.getServantList();
            }
            facade.subscribe(n.bagProxy.UPDATE_BAG_ITEM, this.updateItem, this);
        };
        e.prototype.onClickUse = function(t, e) {
            var o = e,
                ii = e.data;
            // i &&
            //     n.bagProxy.sendUseItemHero(
            //         this.itemInfo.id,
            //         o.silderCount.node.active ? o.silderCount.curValue : 1,
            //         i.id
            //     );
            if(ii != null) {
                var num = n.bagProxy.getItemCount(this.itemInfo.id);
                if(o.silderCount.curValue > num) {
                    i.alertUtil.alert18n("ITEMS_NUMBER_SHORT");
                    return;
                }

                n.bagProxy.sendUseItemHero(
                    this.itemInfo.id,
                    o.silderCount.node.active ? o.silderCount.curValue : 1,
                    ii.id
                );
            }
            this.onClost();
        };
        e.prototype.updateItem = function() {
            this.list.data = n.servantProxy.getServantList();
        };
        e.prototype.onClost = function() {
            i.utils.closeView(this);
        };
        e.curSelectItemId = 0;
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblEffect", void 0);
        __decorate([s(l.default)], e.prototype, "list", void 0);
        return (e = o = __decorate([a], e));
        var o;
    })(cc.Component);
o.default = c;
