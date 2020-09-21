var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../component/List"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblPro = null;
            e.urlLoad = null;
            e.btnSelect = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnSelect);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = r.wifeProxy.getWifeData(t.id),
                    o = localcache.getItem(localdb.table_wife, t.id);
                this.lblName.string = r.playerProxy.getWifeName(t.id);
                this.urlLoad.url = l.uiHelps.getWifeHead(o ? o.res : t.id);
                this.lblPro.string = i18n.t("WIFE_QIN_MI_DU", {
                    value: e ? e.love : 0
                });
                for (
                    var i = localcache.getItem(localdb.table_kitwife, t.id),
                        n = [],
                        a = 0;
                    a < i.kitchenid.length;
                    a++
                ) {
                    var s = localcache.getItem(
                        localdb.table_kitchen,
                        i.kitchenid[a]
                    );
                    n.push({
                        id: s.itemid
                    });
                }
                this.list.data = n;
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([_(n.default)], e.prototype, "urlLoad", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnSelect", void 0);
        __decorate([_(a.default)], e.prototype, "list", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
