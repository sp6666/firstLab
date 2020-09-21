var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lblscore = null;
            e.btnSelect = null;
            e.btnCancal = null;
            e.itemSlot = null;
            e.itemData = null;
            e.slotData = null;
            return e;
        }
        e.prototype.showData = function() {
            this.itemData = this._data;
            if (this.itemData) {
                var t = localcache.getItem(
                    localdb.table_item,
                    this.itemData.id
                );
                this.slotData = new l.ItemSlotData();
                this.slotData.id = t.id;
                this.itemSlot.data = t;
                this.lblname.string = t.name;
                var e = localcache.getItem(localdb.table_feastFood, t.id);
                this.lblscore.string = i18n.t("JIU_LOU_JI_FEN_JIA_CHENG", {
                    value: e.addition / 100
                });
                var o = r.jiulouProxy.selectFood.indexOf(this.itemData);
                this.btnSelect.active = o < 0;
                this.btnCancal.active = o >= 0;
            }
        };
        e.prototype.onClickSelect = function() {
            if (r.jiulouProxy.selectFood.length < 3) {
                r.jiulouProxy.selectFood.push(this.itemData);
                facade.send("JIU_LOU_SELECT_FOOD_UPDATE");
            } else a.alertUtil.alert(i18n.t("JIU_LOU_FOOD_MAX"));
        };
        e.prototype.onClickCancal = function() {
            r.jiulouProxy.selectFood.splice(
                r.jiulouProxy.selectFood.indexOf(this.itemData),
                1
            );
            facade.send("JIU_LOU_SELECT_FOOD_UPDATE");
        };
        __decorate([_(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblscore", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnSelect", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnCancal", void 0);
        __decorate([_(n.default)], e.prototype, "itemSlot", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
