var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../utils/ShaderUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblTime = null;
            e.yidu = null;
            e.weidu = null;
            e.imgArr = [];
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblTime.string = n.timeUtil.format(t.fts, "yyyy-MM-dd");
                this.lblTitle.string = i18n.has(t.mtitle)
                    ? i18n.t(t.mtitle)
                    : t.mtitle;
                this.weidu.active = null == t.rts || t.rts <= 0;
                this.yidu.active = t.rts > 0;
                for (var e = 0; e < this.imgArr.length; e++)
                    l.shaderUtils.setImageGray(this.imgArr[e], t.rts > 0);
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Node)], e.prototype, "yidu", void 0);
        __decorate([s(cc.Node)], e.prototype, "weidu", void 0);
        __decorate([s([cc.Sprite])], e.prototype, "imgArr", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
