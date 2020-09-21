var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblScore = null;
            e.itemArr = [];
            e.lblArr = [];
            e.tipNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                "JIU_LOU_SELECT_FOOD_UPDATE",
                this.onFoodUpdate,
                this
            );
            this.list.data = r.bagProxy.getFoodList();
            this.tipNode.active = 0 == r.bagProxy.getFoodList().length;
            this.onFoodUpdate();
        };
        e.prototype.onFoodUpdate = function() {
            for (var t = 0, e = 0; e < this.itemArr.length; e++)
                if (e < r.jiulouProxy.selectFood.length) {
                    var o = new a.ItemSlotData();
                    o.id = r.jiulouProxy.selectFood[e].id;
                    this.itemArr[e].data = o;
                    var i = localcache.getItem(
                        localdb.table_feastFood,
                        r.jiulouProxy.selectFood[e].id
                    );
                    this.lblArr[e].string = i.addition / 100 + "%";
                    t += i.addition;
                } else {
                    this.lblArr[e].string = "";
                    this.itemArr[e].data = null;
                }
            this.lblScore.string = i18n.t("JIU_LOU_JI_FEN_JIA_CHENG_2", {
                value: t / 100
            });
            this.list.updateItemShow();
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_([n.default])], e.prototype, "itemArr", void 0);
        __decorate([_([cc.Label])], e.prototype, "lblArr", void 0);
        __decorate([_(cc.Node)], e.prototype, "tipNode", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
