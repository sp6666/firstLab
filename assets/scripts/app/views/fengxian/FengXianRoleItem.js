var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var role = require("../../component/RoleSpine");
var chenghao = require("../chenghao/ChengHaoItem");
var cfg = require("../../Config");
var time = require("../../models/TimeProxy");

var r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.roleSpine = null;
            e.lblServer = null;
            e.nodeChenghao = null;
            e.nodeNoChenghao = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if(t == null)
            {
                return;
            }
            
            //称号
            this.nodeChenghao.node.active = 
                cfg.Config.isShowChengHao &&
                time.funUtils.isOpen(time.funUtils.chenghao) &&
                t != null;
            if(this.nodeChenghao.node.active == true)
            {
                var d = localcache.getGroup(localdb.table_fashion, "kuatype", t.curIndex);
                if (d && d.length > 0) {
                    var u = d[0];
                    this.nodeChenghao.data = u;
                    this.nodeNoChenghao.active = !u;
                }
            }
            //名字
            this.lblServer.string = t.sevname + " " + t.name;

            //role
            this.roleSpine.setClothes(t.sex, t.job, t.level, t.clothe);
        };
        __decorate([s(role.default)], e.prototype, "roleSpine", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblServer", void 0);
        __decorate([s(chenghao.default)], e.prototype, "nodeChenghao", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeNoChenghao", void 0);
        return (e = __decorate([a], e));
    })(item.default);
o.default = c;

