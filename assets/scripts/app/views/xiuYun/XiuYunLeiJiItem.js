var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.list = null;
            e.bg = null;
            e.lblFuQi = null;
            e.btnLinQu = null;
            e.btnYiLinQu = null;
            e.btnNoLinQu = null;
            e.btnNoLinQuImg = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            this.lblRank.string = i18n.t("SINGLE_RECHARGE_DANG_CI", {
                num: t.id
            });
            this.list.data = t.items;
            this.lblFuQi.string =
                i18n.t("HEDENG_LEI_JI_JI_FEN") +
                ":(" +
                l.xiuYunProxy.ljjlData.cons +
                "/" +
                t.need +
                ")";
            this.btnLinQu.node.active =
                l.xiuYunProxy.ljjlData.cons >= t.need && l.xiuYunProxy.ljjlData.score_rwd_got[t.id] == null;
            this.btnNoLinQu.active = l.xiuYunProxy.ljjlData.cons < t.need;
            this.btnYiLinQu.node.active =
                l.xiuYunProxy.ljjlData.cons >= t.need && l.xiuYunProxy.ljjlData.score_rwd_got[t.id] != null;
            r.shaderUtils.setImageGray(this.btnNoLinQuImg);
        };
        e.prototype.onClickLingQu = function () {
            var t = this._data;
            l.xiuYunProxy.sendLingQu(t.id);
            this.btnLinQu.node.active =
                l.xiuYunProxy.ljjlData.cons >= t.need && l.xiuYunProxy.ljjlData.score_rwd_got[t.id] == null;
            this.btnYiLinQu.node.active =
                l.xiuYunProxy.ljjlData.cons >= t.need &&  l.xiuYunProxy.ljjlData.score_rwd_got[t.id] != null;
        };
        e.prototype.setWidthHeigth = function (t, e) {
            this.node.height = e + 30;
            this.bg.height = e + 30;
            this.btnLinQu.node.y = -e - 8;
            this.btnYiLinQu.node.y = -e - 8;
            this.lblFuQi.node.y = -e - 8;
            this.btnNoLinQu.y = -e - 8;
        };
        __decorate([c(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([c(n.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "bg", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFuQi", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnLinQu", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnYiLinQu", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnNoLinQu", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "btnNoLinQuImg", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;