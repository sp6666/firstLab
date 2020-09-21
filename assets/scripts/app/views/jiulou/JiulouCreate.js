var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("./JiulouCreateItem"),
    a = require("../item/ItemSlotUI"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item1 = null;
            e.item2 = null;
            e.itemArr = [];
            e.jiaImg = null;
            e.guanImg = null;
            e.lblCount = null;
            e.jiaCount = 0;
            e.guanCount = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                "JIU_LOU_SELECT_FOOD_UPDATE",
                this.onFoodUpdate,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            this.item1.data = localcache.getItem(localdb.table_feast, 1);
            this.item2.data = localcache.getItem(localdb.table_feast, 2);
            this.item2.node.active = !1;
            this.jiaCount = i.utils.getParamInt("jiulou_nor_count");
            this.guanCount = i.utils.getParamInt("jiulou_guan_count");
            var t = this.jiaCount - n.jiulouProxy.yhType.count;
            this.lblCount.string =
                t > 0
                    ? i18n.t("JIU_LOU_JIA_YAN_FREE", {
                          num: t
                      })
                    : "";
        };
        e.prototype.onClickChange = function() {
            if (this.item1.node.active) {
                this.item1.node.active = !1;
                this.item2.node.active = !0;
                this.jiaImg.active = !1;
                this.guanImg.active = !0;
                this.lblCount.string = "";
            } else {
                this.item1.node.active = !0;
                this.item2.node.active = !1;
                this.jiaImg.active = !0;
                this.guanImg.active = !1;
                var t = this.jiaCount - n.jiulouProxy.yhType.count;
                this.lblCount.string =
                    t > 0
                        ? i18n.t("JIU_LOU_JIA_YAN_FREE", {
                              num: t
                          })
                        : "";
            }
            n.jiulouProxy.selectFood = [];
            this.onFoodUpdate();
        };
        e.prototype.onFoodUpdate = function() {
            for (var t = 0; t < this.itemArr.length; t++)
                if (t < n.jiulouProxy.selectFood.length) {
                    var e = new l.ItemSlotData();
                    e.id = n.jiulouProxy.selectFood[t].id;
                    this.itemArr[t].data = e;
                } else this.itemArr[t].data = null;
        };
        e.prototype.onClickFood = function() {
            i.utils.openPrefabView("jiulou/JiulouFoodSelect");
        };
        e.prototype.onClickClost = function() {
            n.jiulouProxy.selectFood = [];
            i.utils.closeView(this);
        };
        e.prototype.onItemUpdate = function() {
            this.item1.node.active
                ? (this.item1.data = localcache.getItem(localdb.table_feast, 1))
                : this.item2.node.active &&
                  (this.item2.data = localcache.getItem(
                      localdb.table_feast,
                      2
                  ));
        };
        __decorate([_(r.default)], e.prototype, "item1", void 0);
        __decorate([_(r.default)], e.prototype, "item2", void 0);
        __decorate([_([a.default])], e.prototype, "itemArr", void 0);
        __decorate([_(cc.Node)], e.prototype, "jiaImg", void 0);
        __decorate([_(cc.Node)], e.prototype, "guanImg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
