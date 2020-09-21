var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.bg = null;
            e.lblFuQi = null;
            e.btnLinQu = null;
            e.btnYiLinQu = null;
            e.btnNoLinQu = null;
            e.btnNoLinQuImg = null;
            e.lblJBjuqing = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (null != t) {
                if (t.id == 4) {
                    this.list.content.width = 100;
                    this.list.node.x = (this.node.width - 100) >> 1;
                    this.lblJBjuqing.node.active = true;
                    for (
                        var i = 0, n = 0; n < l.qixiProProxy.data.rwds.length; n++
                    )
                        if (
                            l.qixiProProxy.data.rwds[n].hid ==
                            l.qixiProProxy.selectHeroId
                        ) {
                            var a = l.qixiProProxy.data.rwds[n];
                            i = a.rwd[3].items[0].id;
                        }
                    var _ = localcache.getItem(localdb.table_heropve, i);
                    this.lblJBjuqing.string =
                        _.name + i18n.t("WISHING_JB_JU_QING");
                }
                this.list.data = t.items;
                var d = localcache.getItem(
                        localdb.table_hero,
                        l.qixiProProxy.selectHeroId
                    ),
                    u = l.qixiProProxy.getHeroRwd(l.qixiProProxy.selectHeroId),
                    p = i18n.t("QIXI_PRO_LEI_JI_JI_FEN", {
                        name: d ? d.name : "",
                        num1: u.cons,
                        num2: t.need
                    });
                this.lblFuQi.string = p;
                this.btnLinQu.node.active = u.cons >= t.need && !t.get;
                this.btnNoLinQu.active = u.cons < t.need;
                this.btnYiLinQu.node.active = u.cons >= t.need && 1 == t.get;
                r.shaderUtils.setImageGray(this.btnNoLinQuImg);
            }
        };
        e.prototype.onClickLingQu = function () {
            var t = this._data;
            null != t && l.qixiProProxy.sendLingQu(t.id, l.qixiProProxy.selectHeroId);
        };
        e.prototype.setWidthHeigth = function (t, e) {
            this.node.height = e;
            this.bg.height = e;
            this.btnLinQu.node.y = this.btnLinQu.node.height - e;
            this.btnYiLinQu.node.y = this.btnYiLinQu.node.height - e;
            this.btnNoLinQu.y = this.btnNoLinQu.height - e;
        };
        __decorate([c(n.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "bg", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFuQi", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnLinQu", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnYiLinQu", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnNoLinQu", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "btnNoLinQuImg", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblJBjuqing", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;