var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    List = require("../../component/List"),
    redDot = require("../../component/RedDot"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;

            e.btnRwd = null;
            e.totalList = null;
            e.lblRwd = null;
            return e;
        }
        e.prototype.onLoad = function () {

            this.totalList.data = i.cooperateProxy.data.compensate_rwd;

            if (i.cooperateProxy.rwdData.compensate === 0) {
                this.btnRwd.interactable = true;

                this.lblRwd.string = i18n.t("ACHIEVE_GET");
            } else {
                this.btnRwd.interactable = false;
                this.lblRwd.string = i18n.t("ACHIEVE_GETED");
            }
        };

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };

        e.prototype.getRwd = function () {
            i.cooperateProxy.getHfRwd();
            this.btnRwd.interactable = false;
            this.lblRwd.string = i18n.t("ACHIEVE_GETED");

            i.cooperateProxy.rwdData.compensate = 1;

            redDot.default.change("cooperate_hfjl", false);
        };

        __decorate([_(List.default)], e.prototype, "totalList", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnRwd", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRwd", void 0);

        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;