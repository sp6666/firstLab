var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("./BagServantSelect"),
    s = require("../../component/SelectMax"),
    c = require("../../utils/Utils"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.imgHead = null;
            e.lblName = null;
            e.lblLv = null;
            e.lblProp = null;
            e.lblZZ = null;
            e.silderCount = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.id),
                    o = localcache.getItem(
                        localdb.table_item,
                        a.default.curSelectItemId
                    );
                this.imgHead.url = n.uiHelps.getServantHead(t.id);
                this.lblName.string = e ? e.name : "";
                this.lblLv.string = i18n.t("COMMON_LV", {
                    lv: t.level
                });
                var i = "";
                switch (o.type[1]) {
                    case "ep":
                        var r = parseInt(o.type[2]);
                        i = i18n.t("COMMON_PROP" + r) + " ";
                        i +=
                            5 == r
                                ? t.aep.e1 + t.aep.e2 + t.aep.e3 + t.aep.e4
                                : t.aep["e" + r];
                        break;

                    default:
                        i = i18n.t("COMMON_" + o.type[1]) + " " + t[o.type[1]];
                }
                this.lblProp.string = i;
                this.lblZZ.string =
                    i18n.t("SERVANT_TALENT") +
                    " " +
                    (t.zz.e1 + t.zz.e2 + t.zz.e3 + t.zz.e4);
                var s = l.bagProxy.getItemCount(a.default.curSelectItemId),
                    _ = c.utils.getParamInt("show_slider_count");
                this.silderCount.node.active = s >= _;
                this.silderCount.max = s;
            }
        };
        __decorate([u(r.default)], e.prototype, "imgHead", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblProp", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblZZ", void 0);
        __decorate([u(s.default)], e.prototype, "silderCount", void 0);
        __decorate([u(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([d], e));
    })(i.default);
o.default = p;
