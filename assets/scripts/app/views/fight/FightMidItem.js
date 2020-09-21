var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.spriteList = [];
            e.nodeOver = null;
            e.nodeClost = null;
            e.lblName = null;
            e.lblKey = null;
            e.urlLoad = null;
            e.nodeBoss = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data,
                e = r.playerProxy.userData;
            if (t && t.bmap) {
                var o = t;
                this.lblKey.string = i18n.t("FIGHT_MID_TIP", {
                    s: o.mdtext
                });
                this.lblName.string = o.mname;
                for (var i = 0; i < this.spriteList.length; i++)
                    e.mmap <= o.id
                        ? s.shaderUtils.clearShader(this.spriteList[i])
                        : s.shaderUtils.setGray(this.spriteList[i]);
                this.nodeBoss.active = !1;
                this.nodeOver.active = this.nodeClost.active = e.mmap > o.id;
                this.urlLoad.url = l.uiHelps.getServantHead(o.index);
            }
            if (t && t.bossname) {
                var n = t,
                    c = localcache.getGroup(localdb.table_midPve, "bmap", n.id);
                this.nodeBoss.active = !0;
                this.lblKey.string = i18n.t("FIGHT_MID_TIP", {
                    s: a.utils.getHanzi(c.length + 1)
                });
                this.lblName.string = n.bossname;
                this.urlLoad.url = l.uiHelps.getServantHead(n.index);
            }
        };
        __decorate([d([cc.Sprite])], e.prototype, "spriteList", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeOver", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeClost", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblKey", void 0);
        __decorate([d(n.default)], e.prototype, "urlLoad", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeBoss", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
