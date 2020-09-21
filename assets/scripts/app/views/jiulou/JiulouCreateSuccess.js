var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblId = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("JIU_LOU_TYPE_CHANGE", this.onYhType, this);
            this.onYhType();
        };
        e.prototype.onYhType = function() {
            var t = "";
            1 == n.jiulouProxy.yhType.type
                ? (t = i18n.t("JIU_LOU_JIA_YAN_TXT"))
                : 2 == n.jiulouProxy.yhType.type &&
                  (t = i18n.t("JIU_LOU_GUAN_TAN_TXT"));
            this.lblName.string = i18n.t("JIU_LOU_CREATE_SUCCESS_1", {
                str: t
            });
            this.lblId.string =
                i18n.t("JIULOU_PLAYER_INFO") + n.playerProxy.userData.uid;
        };
        e.prototype.onClickClose = function() {
            n.jiulouProxy.isCreate = !1;
            i.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblId", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
