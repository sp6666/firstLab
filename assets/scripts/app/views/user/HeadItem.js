var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.img = null;
            e.blank = null;
            e.btn = null;
            e.nodeLock = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t)
                if (null != t.blankmodel) {
                    var e = this;
                    this.blank.loadHandle = function() {
                        var t = e._data;
                        if (null != t.blankmodel) {
                            for (
                                var o = a.playerProxy.isHaveBlank(t.id),
                                    i = e.blank.node.getComponentsInChildren(
                                        sp.Skeleton
                                    ),
                                    n = 0;
                                n < i.length;
                                n++
                            )
                                i[n].animation = "";
                            if (!o) {
                                var l = e.blank.node.getComponentsInChildren(
                                    cc.Sprite
                                );
                                for (n = 0; n < l.length; n++)
                                    r.shaderUtils.setImageGray(l[n], !0);
                                for (n = 0; n < i.length; n++)
                                    r.shaderUtils.setGray(i[n]);
                            }
                        }
                    };
                    this.blank.url = l.uiHelps.getBlank(t.blankmodel);
                    this.img.node.active = !1;
                    var o = a.playerProxy.isHaveBlank(t.id);
                    this.nodeLock.active = !o;
                } else {
                    var e = this;
                    var o = a.playerProxy.isHaveHead(t.id);
                    this.nodeLock.active = !o;

                    this.blank.url = l.uiHelps.getBlank(1);
                    this.img.node.active = !0;
                    this.img.url = l.uiHelps.getAvatar(this._data.id);
                    this.img.loadHandle = function(){
                        var t = e._data;
                        var o = a.playerProxy.isHaveHead(t.id);
                        var i = e.img.node.getComponentsInChildren(sp.Skeleton);
                        for (var n = 0; n < i.length; n++)
                        {
                            i[n].animation = "";
                            if (!o) {
                                var l = e.img.node.getComponentsInChildren(cc.Sprite);

                                for (n = 0; n < l.length; n++)
                                    r.shaderUtils.setImageGray(l[n], !0);
                                for (n = 0; n < i.length; n++)
                                    r.shaderUtils.setGray(i[n]);
                            }
                        }
                    };
                }
        };
        __decorate([_(n.default)], e.prototype, "img", void 0);
        __decorate([_(n.default)], e.prototype, "blank", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLock", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
