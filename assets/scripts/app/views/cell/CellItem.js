var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/ShaderUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLv = null;
            e.lock = null;
            e.eff = null;
            e.item = null;
            e.url = null;
            e.btnClick = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.eff.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnClick);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.url.url = l.uiHelps.getCellHeadIcon(t.mod1);
                var e = r.cellProxy.getPestInfo(t.id);
                this.lblLv.string = i18n.t("COMMON_LV", {
                    lv: e ? e.lv : 1
                });
                this.lock.active = null == e;
                null == e && a.shaderUtils.setNodeGray(this.item);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([_(cc.Node)], e.prototype, "lock", void 0);
        __decorate([_(cc.Node)], e.prototype, "eff", void 0);
        __decorate([_(cc.Node)], e.prototype, "item", void 0);
        __decorate([_(n.default)], e.prototype, "url", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnClick", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
