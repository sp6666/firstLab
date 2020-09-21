var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeBei = null;
            e.nodeShow = null;
            e.urlload = null;
            e.btn = null;
            e.nodeItem = null;
            e.lastShow = !1;
            e.lastId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t)
                if (0 != t.id) {
                    this.nodeBei.active = this.nodeShow.active = !0;
                    if (t.isShow != this.lastShow) {
                        this.lastId = t.id;
                        r.utils.showNodeEffect(this.nodeItem, t.isShow ? 0 : 1);
                    } else if (t.id != this.lastId) {
                        this.lastId = t.id;
                        r.utils.showNodeEffect(this.nodeItem, 1);
                    }
                    this.lastShow = t.isShow;
                    this.urlload.url = l.uiHelps.getMatchFind(t.id);
                    this.urlload.node.active = t.isShow;
                } else {
                    this.nodeBei.active = this.nodeShow.active = this.urlload.node.active = !1;
                    this.urlload.url = "";
                }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.width = this.btn.node.width = this.nodeBei.width = this.nodeShow.width = t;
            this.node.height = this.btn.node.height = this.nodeBei.height = this.nodeShow.height = e;
            this.nodeItem.x = t / 2;
            this.nodeItem.y = -e / 2;
            this.urlload.node.scaleX = this.urlload.node.scaleY = t / 550;
        };
        __decorate([c(cc.Node)], e.prototype, "nodeBei", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeShow", void 0);
        __decorate([c(n.default)], e.prototype, "urlload", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeItem", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
