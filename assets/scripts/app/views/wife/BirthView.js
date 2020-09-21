var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.Image_talent = null;
            e.Image_Baby = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.Image_Baby.url = l.uiHelps.getBabyBody();
            var t = this.node.openParam;
            if (t) {
                var e = r.sonProxy.getSon(t.id);
                this.Image_talent.string = i18n.t("SON_ZIZHI_" + e.talent);
            }
        };
        e.prototype.onClickYes = function() {
            i.utils.openPrefabView("child/ChildView");
            i.utils.closeView(this);
        };
        e.prototype.onClickNo = function() {
            facade.send("CLOSE_XXOO");
            i.utils.closeView(this);
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "Image_talent", void 0);
        __decorate([c(n.default)], e.prototype, "Image_Baby", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
