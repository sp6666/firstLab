var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.listView = null;
            e.txt_love = null;
            e.txt_charm = null;
            e.itemArr = [
                {
                    id: 91
                },
                {
                    id: 92
                },
                {
                    id: 93
                },
                {
                    id: 94
                }
            ];
            e.itemArr2 = [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                }
            ];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_WIFE_JB", this.showData, this);
            facade.subscribe(n.bagProxy.UPDATE_BAG_ITEM, this.showData, this);
            this.showData();
        };
        e.prototype.showData = function() {
            this.txt_love.string =
                n.jibanProxy.getWifeJB(n.wifeProxy.wifeGiftId) + "";
            var t = n.wifeProxy.getWifeData(n.wifeProxy.wifeGiftId),
                e = localcache.getItem(
                    localdb.table_wife,
                    n.wifeProxy.wifeGiftId
                ),
                o = n.wifeProxy.getGiftList(null != t, e.type);
            this.listView.data = o;
        };
        e.prototype.closeBtn = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "listView", void 0);
        __decorate([s(cc.Label)], e.prototype, "txt_love", void 0);
        __decorate([s(cc.Label)], e.prototype, "txt_charm", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
