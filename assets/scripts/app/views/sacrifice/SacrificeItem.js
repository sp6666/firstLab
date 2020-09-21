var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.black = null;
            e.diban = null;
            e.lblIndex = null;
            e.lblNum = null;
            e.newNode = null;
            e.guwu = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.id);
                this.lblIndex.string = e.name;
                this.guwu.url = r.uiHelps.getItemSlot(t.id);
                this.lblNum.string = i18n.t("SPELL_HAVE_NUM", {
                    num: t.num ? t.num : 0
                });
                this.diban.active = !(this.black.active =
                    null == t.num || 0 != t.num);
                var o,
                    i = n.timeProxy.getLoacalValue("sacrifice");
                if ((o = JSON.parse(i)))
                    for (var l = 0; l < o.length; l++) {
                        var a = o[l];
                        a &&
                            a.id == t.id &&
                            (this.newNode.active = a.num < t.num);
                    }
            }
        };
        e.prototype.onClick = function() {
            var t = this._data;
            if (t.num > 0) {
                if (l.timeUtil.second > n.zhongyuanProxy.data.info.eTime) {
                    l.alertUtil.alert18n("ACTHD_OVERDUE");
                    return;
                }
                l.utils.openPrefabView("zhongyuan/SacrificeSend", null, {
                    itemId: t.id
                });
            } else {
                var e = localcache.getItem(localdb.table_item, t.id);
                l.alertUtil.alert(
                    i18n.t("SPELL_ITEN_LIMIT", {
                        name: e.name
                    })
                );
            }
        };
        __decorate([_(cc.Node)], e.prototype, "black", void 0);
        __decorate([_(cc.Node)], e.prototype, "diban", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([_(cc.Node)], e.prototype, "newNode", void 0);
        __decorate([_(a.default)], e.prototype, "guwu", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
