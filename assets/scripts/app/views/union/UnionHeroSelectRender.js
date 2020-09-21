var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lbllv = null;
            e.lblpro = null;
            e.btnSelect = null;
            e.btnHuifu = null;
            e.head = null;
            e.roleUrl = null;
            e.itemNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this,
                e = this._data;
            if (e) {
                localcache.getItem(localdb.table_hero, e.id);
                this.lblpro.string = l.utils.formatMoney(e.aep.e1);
                var o = n.unionProxy.getHeroFightData(e.id);
                this.btnHuifu.active = null != o && 0 == o.h && 1 == o.f;
                this.roleUrl.url = a.uiHelps.getServantSmallSpine(e.id);
                s.shaderUtils.setImageGray(this.itemNode, o && 0 == o.h);
                o && 0 == o.h
                    ? s.shaderUtils.setNodeGray(this.roleUrl.node)
                    : (null != o && 1 != o.h) ||
                      s.shaderUtils.clearNodeShader(this.roleUrl.node);
                this.roleUrl.loadHandle = function() {
                    o && 0 == o.h
                        ? s.shaderUtils.setNodeGray(t.roleUrl.node)
                        : (null != o && 1 != o.h) ||
                          s.shaderUtils.clearNodeShader(t.roleUrl.node);
                };
            }
        };
        e.prototype.onClickSelect = function() {
            var t = this._data,
                e = n.unionProxy.getHeroFightData(t.id);
            if (!n.unionProxy.fighting && (null == e || 1 == e.h)) {
                n.unionProxy.curSelectId = t.id;
                facade.send("UNION_COPY_HERO_CHANGE");
                l.utils.closeNameView("union/UnionHeroSelect");
            }
        };
        e.prototype.onClickHuifu = function() {
            var t = this,
                e = localcache.getItem(localdb.table_item, 124);
            l.utils.showConfirmItem(
                i18n.t("UNION_COST_CHU_ZHAN", {
                    name: e.name,
                    num: 1
                }),
                124,
                n.bagProxy.getItemCount(124),
                function() {
                    if (n.bagProxy.getItemCount(124) <= 0)
                        l.alertUtil.alertItemLimit(124);
                    else {
                        var e = t._data;
                        n.unionProxy.sendHeroFuhuo(e.id);
                    }
                },
                "UNION_COST_CHU_ZHAN"
            );
        };
        __decorate([d(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([d(cc.Label)], e.prototype, "lbllv", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblpro", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnSelect", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnHuifu", void 0);
        __decorate([d(r.default)], e.prototype, "head", void 0);
        __decorate([d(r.default)], e.prototype, "roleUrl", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "itemNode", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
