var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.unionName = null;
            e.humanShili = null;
            e.uniManifesto = null;
            e.list = null;
            e.lblLv = null;
            e.nodeApply = null;
            e.bg = null;
            e.mask = null;
            e.nodeLbl = null;
            e.nodeName = null;
            e.nodePos = null;
            e.unionId = 0;
            return e;
        }
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.unionName.string = t.name;
                for (var e = 0, o = 0; o < t.members.length; o++)
                    e += t.members[o].shili;
                this.humanShili.string =
                    i18n.t("UNION_TOTAL_POWER") +
                    "：" +
                    n.utils.formatMoney(e || t.allShiLi);
                this.uniManifesto.string = i18n.has(t.outmsg)
                    ? i18n.t(t.outmsg)
                    : t.outmsg;
                this.list.data = t.members;
                this.lblLv.string = i18n.t("UNION_LEVEL_TXT", {
                    num: t.level
                });
                this.nodeApply.active =
                    null == l.unionProxy.memberInfo ||
                    0 == l.unionProxy.memberInfo.cid;
                this.bg.height =
                    null == l.unionProxy.memberInfo ||
                    0 == l.unionProxy.memberInfo.cid
                        ? 640
                        : 703;
                this.mask.height =
                    null == l.unionProxy.memberInfo ||
                    0 == l.unionProxy.memberInfo.cid
                        ? 585
                        : 650;
                this.unionId = t.id;
                var i = n.stringUtil.isBlank(t.members[0].shili + "");
                this.nodeLbl.active =
                    l.unionProxy.clubInfo &&
                    l.unionProxy.clubInfo.id == t.id &&
                    !i;
                if (i) {
                    this.nodeName.x = -125;
                    this.nodePos.x = 130;
                } else {
                    this.nodeName.x = -195;
                    this.nodePos.x = 226;
                }
            }
        };
        e.prototype.onClickApply = function() {
            l.unionProxy.sendApplyUnion(this.unionId);
            this.eventClose();
        };
        __decorate([s(cc.Label)], e.prototype, "unionName", void 0);
        __decorate([s(cc.Label)], e.prototype, "humanShili", void 0);
        __decorate([s(cc.Label)], e.prototype, "uniManifesto", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeApply", void 0);
        __decorate([s(cc.Node)], e.prototype, "bg", void 0);
        __decorate([s(cc.Node)], e.prototype, "mask", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeLbl", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeName", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodePos", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
