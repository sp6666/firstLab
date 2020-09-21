var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../views/item/ItemSlotUI"),
    n = require("../utils/Utils"),
    init = require("../Initializer"),
    l = require("../models/BagProxy"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.lblDes = null;
            e.nodeUse = null;
            e.nodeBg = null;
            e._curData = null;
            e.setClose = false; //保证只执行一次关闭
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("CLOST_ITEM_SHOW", this.onClickClost, this);
            var t = this.node.openParam;
            if (null != t) {
                this._curData = t;
                this.itemSlot.data = t;
                var e = t.id ? t.id : t.itemid,
                    o = t.kind ? t.kind : 1;
                this.nodeUse.active = !1;
                switch (o) {
                    case l.DataType.HEAD_BLANK:
                        var i = localcache.getItem(localdb.table_userblank, e);
                        this.lblDes.string = i.des;
                        break;

                    case l.DataType.CLOTHE:
                        var n = localcache.getItem(localdb.table_userClothe, e);
                        this.lblDes.string = n.des;
                        break;

                    case l.DataType.JB_ITEM:
                        var r = localcache.getItem(localdb.table_heropve, t.id);
                        this.lblDes.string = r.msg;
                        break;

                    case l.DataType.CHENGHAO:
                        var a = localcache.getItem(localdb.table_fashion, t.id);
                        this.lblDes.string = a ? a.des : "";
                        break;

                    default:
                        var s = localcache.getItem(localdb.table_item, e),
                            c = s ? s.explain.split("|") : [];
                        s.explain.split("|");
                        this.lblDes.string =
                            c.length > 1
                                ? c[1]
                                : s
                                ? s.explain
                                : i18n.t("COMMON_NULL");
                        this.nodeUse.active = s.type && "item" == s.type[0];
                }
                var _ = this.lblDes.node.getContentSize().height + 10;
                this.nodeBg &&
                    (this.nodeBg.parent.height = this.nodeBg.height =
                        _ < 126 ? 126 : _);
            }
        };
        e.prototype.lateUpdate = function(){
            if(init.kaixueProxy.onAutoPlay && !this.setClose){
                this.scheduleOnce(this.onClickClost, 0.6);
                this.setClose = true;
            }
        };
        e.prototype.onClickUse = function() {
            n.utils.openPrefabView("bag/BagUse", !1, this._curData);
            if(init.confidanteProxy.getStatus() == 0)  //新玩家才走这里
            {
                facade.send(init.guideProxy.UPDATE_TRIGGER_GUIDE, {
                    type: 11,
                    value: init.taskProxy.mainTask.id
                });
            }
            
            this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            n.utils.popNext(!1);
        };
        __decorate([s(i.default)], e.prototype, "itemSlot", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeUse", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
