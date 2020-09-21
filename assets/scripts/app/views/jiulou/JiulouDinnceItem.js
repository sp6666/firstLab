var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../component/UrlLoad"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.head_jia = null;
            e.head_guan = null;
            e.letfKuai_jia = null;
            e.letfShao_jia = null;
            e.rightKuai_jia = null;
            e.rightShao_jia = null;
            e.letfKuai_Guan = null;
            e.letfShao_Guan = null;
            e.rightKuai_Guan = null;
            e.rightShao_Guan = null;
            e.nameNode = null;
            e.lblname = null;
            e.guan_node = null;
            e.jia_node = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.guan_node.active = 2 == r.jiulouProxy.yhInfo.id;
                this.jia_node.active = 1 == r.jiulouProxy.yhInfo.id;
                this.head_jia.url = this.head_guan.url =
                    0 == t.hid ? null : a.uiHelps.getServantSmallSpine(t.hid);
                this.head_jia.node.active = this.head_guan.node.active =
                    0 != t.hid;
                this.letfKuai_jia.active =
                    t.id % 2 == 1 && 1 == r.jiulouProxy.yhInfo.id;
                this.letfShao_jia.active =
                    t.id % 2 == 1 && 0 == t.hid && 1 == r.jiulouProxy.yhInfo.id;
                this.letfKuai_Guan.active =
                    t.id % 2 == 1 && 2 == r.jiulouProxy.yhInfo.id;
                this.letfShao_Guan.active =
                    t.id % 2 == 1 && 0 == t.hid && 2 == r.jiulouProxy.yhInfo.id;
                this.rightKuai_jia.active =
                    t.id % 2 == 0 && 1 == r.jiulouProxy.yhInfo.id;
                this.rightShao_jia.active =
                    t.id % 2 == 0 && 0 == t.hid && 1 == r.jiulouProxy.yhInfo.id;
                this.rightKuai_Guan.active =
                    t.id % 2 == 0 && 2 == r.jiulouProxy.yhInfo.id;
                this.rightShao_Guan.active =
                    t.id % 2 == 0 && 0 == t.hid && 2 == r.jiulouProxy.yhInfo.id;
                this.nameNode.active = 0 != t.hid;
                this.lblname.string = t.name;
            }
        };
        e.prototype.onClickRender = function() {
            var t = this._data;
            if (0 == t.hid) {
                r.jiulouProxy.xwId = t.id;
                n.utils.openPrefabView("jiulou/JiulouHeroSelect");
            } else
                t.uid != r.playerProxy.userData.uid &&
                    r.playerProxy.sendGetOther(t.uid);
        };
        __decorate([_(l.default)], e.prototype, "head_jia", void 0);
        __decorate([_(l.default)], e.prototype, "head_guan", void 0);
        __decorate([_(cc.Node)], e.prototype, "letfKuai_jia", void 0);
        __decorate([_(cc.Node)], e.prototype, "letfShao_jia", void 0);
        __decorate([_(cc.Node)], e.prototype, "rightKuai_jia", void 0);
        __decorate([_(cc.Node)], e.prototype, "rightShao_jia", void 0);
        __decorate([_(cc.Node)], e.prototype, "letfKuai_Guan", void 0);
        __decorate([_(cc.Node)], e.prototype, "letfShao_Guan", void 0);
        __decorate([_(cc.Node)], e.prototype, "rightKuai_Guan", void 0);
        __decorate([_(cc.Node)], e.prototype, "rightShao_Guan", void 0);
        __decorate([_(cc.Node)], e.prototype, "nameNode", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([_(cc.Node)], e.prototype, "guan_node", void 0);
        __decorate([_(cc.Node)], e.prototype, "jia_node", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
