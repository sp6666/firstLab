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
            e.lblDes = null;
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
                this.lblDes.string = i18n.t("COOPERATE_REWARD_SCORE_TIP", {
                    n: t.need
                });

                this.btnGet.interactable = true;
                this.lblGet.string = i18n.t("ACHIEVE_GET");
                this.ndUnOver.opacity = 0;

                if (a.cooperateProxy.rwdData) {
                    if (t.need > a.cooperateProxy.rwdData.score) {
                        this.btnGet.interactable = false;
                        this.lblGet.string = i18n.t("ACHIEVE_UNOVER");
                        this.ndUnOver.opacity = 255;
                    } else {
                        for (var score of a.cooperateProxy.rwdData.score_rwd_got) {
                            if (score === t.need) {
                                this.btnGet.interactable = false;
                                this.lblGet.string = i18n.t("ACHIEVE_GETED");
                            }
                        }
                    }
                }
            }
        };

        e.prototype.getRwd = function () {
            var index = 0;
            for (var key of a.cooperateProxy.data.score_rwd) {
                if (this._data.need === key.need) {
                    break;
                }
                index++;
            }
            a.cooperateProxy.getRwd(index);
        };

        __decorate([p(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([p(List.default)], e.prototype, "list", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblGet", void 0);
        __decorate([p(cc.Node)], e.prototype, "ndUnOver", void 0);
        return (e = o = __decorate([u], e));
    })(i.default);
o.default = h;