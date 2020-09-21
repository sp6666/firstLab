var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    b = require("../../models/BagProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
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
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t) {
                // var e = l.qiuyinProxy.data.rwds[l.qiuyinProxy.data.rwds.length - 1],
                //     o = e.rwd[e.rwd.length - 1];
                var isJiBan = false;
                var jibanId = null;
                for(var i = 0;i<t.items.length;++i){
                    var item = t.items[i];
                    if(item.kind && item.kind == b.DataType.JB_ITEM){
                        isJiBan = true;
                        jibanId = item.id;
                        break;
                    }
                }

                // if (o && t.id == o.id)
                if(isJiBan)
                 {
                    this.list.content.width = 100;
                    this.list.node.x = (this.node.width - 100) >> 1;
                    this.lblJBjuqing.node.active = !0;
                    // for (
                    //     var i = 0, n = 0;
                    //     n < l.qiuyinProxy.data.rwds.length;
                    //     n++
                    // )
                    //     if (
                    //         l.qiuyinProxy.data.rwds[n].hid ==
                    //         l.qiuyinProxy.selectHeroId
                    //     ) {
                    //         var a = l.qiuyinProxy.data.rwds[n],
                    //             s = a.rwd.length,
                    //             c = a.rwd[s - 1].items.length;
                    //         i = a.rwd[s - 1].items[c - 1].id;
                    //     }
                    var _ = localcache.getItem(localdb.table_heropve, jibanId);
                    this.lblJBjuqing.string =
                        _.name + i18n.t("WISHING_JB_JU_QING");
                }
                this.list.data = t.items;
                var d = localcache.getItem(
                        localdb.table_hero,
                        l.qiuyinProxy.selectHeroId
                    ),
                    u = l.qiuyinProxy.getHeroRwd(l.qiuyinProxy.selectHeroId),
                    p = i18n.t("QIUYIN_LEI_JI_JI_FEN", {
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
        e.prototype.onClickLingQu = function() {
            var t = this._data;
            null != t && l.qiuyinProxy.sendLingQu(t.id, l.qiuyinProxy.selectHeroId);
        };
        e.prototype.setWidthHeigth = function(t, e) {
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
