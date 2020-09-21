var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    uiUtils = require("../../utils/UIUtils"),
    ini = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.cityUrl = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                this.cityUrl.url = uiUtils.uiHelps.getLookBuild(t.icon);
            }
        };
        e.prototype.onClickPoint = function () {
            var t = this._data;
            if (t) {
                facade.send(ini.fineFoodProxy.ON_FINE_FOOD_CLICK_POINT, t);
                //i.utils.openPrefabView("chuidiao/ChuiDiaoBuildInfo", null, t.id);
            }
        };
        __decorate([a(n.default)], e.prototype, "cityUrl", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;