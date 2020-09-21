var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblSize = null;
            e.pro = null;
            e.totalSize = 1;
            e.sizeStr = "";
            return e;
        }
        e.prototype.onLoad = function() {
            this.totalSize = this.node.openParam
                ? this.node.openParam.total
                : 1;
            var t = this.node.openParam ? this.node.openParam.size : 1;
            1 != t && this.onUpdatePro(t);
            this.sizeStr = i.utils.getSizeStr(this.totalSize);
            facade.subscribe("DWON_SHOW_PROGRESS", this.onUpdatePro, this);
            facade.subscribe("SOUND_DOWN_LOAD_OVER", this.onLoadOver, this);
        };
        e.prototype.onUpdatePro = function(t) {
            this.lblSize.string = i18n.t("COMMON_NUM", {
                f: i.utils.getSizeStr(t),
                s: this.sizeStr
            });
            this.totalSize =
                0 == this.totalSize || null == this.totalSize
                    ? 1
                    : this.totalSize;
            var e = t / this.totalSize;
            e = e > 1 ? 1 : e;
            this.pro.progress = e;
            t >= this.totalSize && i.utils.closeView(this);
        };
        e.prototype.onLoadOver = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickClost = function() {
            facade.send("DOWN_SHOW_CLOST");
            i.utils.closeView(this);
        };
        e.prototype.onClickCancel = function() {
            facade.send("DOWN_SHOW_CANCEL");
            i.utils.closeView(this);
        };
        __decorate([r(cc.Label)], e.prototype, "lblSize", void 0);
        __decorate([r(cc.ProgressBar)], e.prototype, "pro", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
