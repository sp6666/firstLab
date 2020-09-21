var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblContent = null;
            e.btnSelect = null;
            e.nodeSelected = null;
            e.ndoeSp = null;
            e.nodeNor = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnSelect);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblContent.string = n.playerProxy.getReplaceName(
                    t.context
                );
                this.ndoeSp.node.active =
                    0 != t.tiaojian && l.stringUtil.isBlank(t.para);
                var e = n.timeProxy.isSelectedStory(t.id),
                    o = localcache.getItem(localdb.table_storySelect2, t.id),
                    i = o.group ? o.group.split("_") : "0";
                e = e && i.length <= 1;
                this.nodeSelected.active = e;
                r.shaderUtils.setImageGray(this.ndoeSp, e);
                r.shaderUtils.setImageGray(this.nodeNor, e);
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblContent", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnSelect", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeSelected", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "ndoeSp", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "nodeNor", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
