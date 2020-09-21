var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    utils = require("../../utils/ShaderUtils"),
    timeProxy = require("../../models/TimeProxy"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblState = null;
            e.lblDes = null;
            e.lblNum = null;
            e.lblRwdCount = null;
            e.nodeGetEffect = null;

            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_lion_task, t.id);
                this.lblState.string = 0 == t.get || null == t.get ? t.num >= e.num ? i18n.t("SEVEN_CAN_GET") : i18n.t("ACHIEVE_UNOVER") : i18n.t("ACT66_HAVE_RECEIVE");
                this.lblDes.string = e.name;
                if(t.num == undefined)
                {
                    t.num = 0;
                }
                if(e.num == undefined)
                {
                    e.num = 0;
                }
                var str = i18n.t("COMMON_NEED", {f: t.num, s: e.num});
                this.lblNum.string = str;

                this.nodeGetEffect.active = false;
                if( (0 == t.get || null == t.get) && t.num >= e.num){
                    this.nodeGetEffect.active = true;
                }
 
                //set item gray when task is finished 
                var imgs = this.lblDes.node.parent.getComponentsInChildren(cc.Sprite);
                for (var o = 0; o < imgs.length; o++)
                {
                    utils.shaderUtils.setImageGray(imgs[o], t.get);
                }

                //经验数量
                this.lblRwdCount.string = "x " + e.rwd;
            }
        };
        e.prototype.onClickItem = function() {
            n.lionProxy.curData = this._data;
            var t = this._data,
                e = localcache.getItem(localdb.table_lion_task, t.id);
            (0 == t.get || null == t.get) &&
                t.num >= e.num &&
                n.lionProxy.sendGetTask(t.id);

                if((t.get == 0 || t.get == null) && t.num < e.num){
                    timeProxy.funUtils.openView(e.use);
                    facade.send(n.lionProxy.LION_VIEW_CLOSE);
                }
        };
        __decorate([a(cc.Label)], e.prototype, "lblState", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblRwdCount", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeGetEffect", void 0);
        

        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
