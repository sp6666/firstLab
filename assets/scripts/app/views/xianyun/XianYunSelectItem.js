var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblPro = null;
            e.headUrl = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t) {
                var e = localcache.getItem(localdb.table_hero, t.id);
                this.lblName.string = e ? e.name : "";
                var o = t.aep.e1 + t.aep.e2 + t.aep.e3 + t.aep.e4;
                this.lblPro.string = i18n.t("COMMON_PROP5") + o;
                this.headUrl.url = l.uiHelps.getServantHead(t.id);
            }
        };
        e.prototype.onClickAnZhi = function() {
            if (r.servantProxy.getServantList().length <= 10)
                a.alertUtil.alert18n("XIAN_YUN_TEN_TXT");
            else {
                var t = this._data;
                r.xianyunProxy.curSelectHero = t.id;
                facade.send("XIAN_YUN_AN_ZHI");
                a.utils.closeNameView("xianyun/XianYunSelect");
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([_(n.default)], e.prototype, "headUrl", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
