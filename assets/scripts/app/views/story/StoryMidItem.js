var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/ShaderUtils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.bgs = [];
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = null == t.mname;
                this.lblName.string = e ? t.name : t.mname;
                var o = e
                    ? l.playerProxy.userData.bmap > t.id
                    : l.playerProxy.userData.mmap > t.id;
                this.btn.interactable = o;
                for (var i = 0; i < this.bgs.length; i++)
                    n.shaderUtils.setImageGray(this.bgs[i], !o);
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s([cc.Sprite])], e.prototype, "bgs", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
