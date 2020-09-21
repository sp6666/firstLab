var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/Utils"),
    a = require("../../Initializer"),
    List = require("../../component/List"),
    c = require("../../models/TimeProxy"),
    _ = require("../../utils/ShaderUtils"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.btnGet = null;
            e.lblGet = null;
            e.ndUnOver = null;
            return e;
        }
        o = e;

        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                this.list.data = t.items;

                this.btnGet.interactable = false;
                this.lblGet.string = i18n.t("ACHIEVE_UNOVER");
                this.ndUnOver.opacity = 255;

                if (a.oldUsersProProxy.data.cons >= t.need) {

                    var curId = Math.floor(t.need / a.oldUsersProProxy.scoreBase) - 1;
                    if (curId === a.oldUsersProProxy.data.rwd) {
                        this.btnGet.interactable = true;
                        this.lblGet.string = i18n.t("ACHIEVE_GET");
                    } else if (curId < a.oldUsersProProxy.data.rwd) {
                        this.btnGet.interactable = false;
                        this.lblGet.string = i18n.t("ACHIEVE_GETED");
                    } else {
                        this.btnGet.interactable = false;
                        this.lblGet.string = i18n.t("ACHIEVE_GET");
                    }

                    this.ndUnOver.opacity = 0;
                }

            }
        };



        __decorate([p(List.default)], e.prototype, "list", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblGet", void 0);
        __decorate([p(cc.Node)], e.prototype, "ndUnOver", void 0);
        return (e = o = __decorate([u], e));
    })(i.default);
o.default = h;