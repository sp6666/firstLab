var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("./JingYingWeiPai"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblProp = null;
            e.face = null;
            e.nodeLock = null;
            e.nodeProp = null;
            e.lblName = null;
            e.nodeUnselect = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t.islock) {
                this.nodeLock.active = 1 == t.islock;
                this.nodeProp.active = !1;
                this.face.url = "";
            } else if (null != t.heroid) {
                var e = r.default.curSelect;
                this.nodeLock && (this.nodeLock.active = !1);
                this.nodeProp && (this.nodeProp.active = !0);
                var o = a.jingyingProxy.isWeipai(t.heroid, r.default.curSelect);
                this.lblName && (this.lblName.string = t.name);
                var i = a.servantProxy.getHeroData(t.heroid);
                this.lblProp.string =
                    i18n.t("COMMON_PROP" + e) + (i ? i.aep["e" + e] : 0);
                this.face.url = l.uiHelps.getServantHead(t.heroid);
                this.nodeUnselect && (this.nodeUnselect.active = o);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblProp", void 0);
        __decorate([_(n.default)], e.prototype, "face", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLock", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeProp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnselect", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
