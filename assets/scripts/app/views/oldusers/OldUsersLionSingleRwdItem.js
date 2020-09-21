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
                this.list.data = t.rwd;

                this.btnGet.interactable = false;
                this.lblGet.string = i18n.t("ACHIEVE_UNOVER");
                this.ndUnOver.opacity = 255;

                var score = a.oldUsersProxy.regression.activity_score;
                var rwd_got = a.oldUsersProxy.regression.activity_rwd_got;

                if (score && score[t.day]) {
                    if (score[t.day] >= t.need) {
                        this.btnGet.interactable = true;
                        this.lblGet.string = i18n.t("ACHIEVE_GET");
                        this.ndUnOver.opacity = 0;

                        // 是否已领取
                        if (rwd_got && rwd_got[t.day]) {
                            for (var score of rwd_got[t.day]) {
                                if (score === t.need) {
                                    this.ndUnOver.opacity = 0;
                                    this.btnGet.interactable = false;
                                    this.lblGet.string = i18n.t("ACHIEVE_GETED");
                                    break;
                                }
                            }
                        }

                    }
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