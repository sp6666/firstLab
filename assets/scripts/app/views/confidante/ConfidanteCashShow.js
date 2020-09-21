var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var item = require("../item/ItemSlotUI");
var time = require("../../models/TimeProxy");
var a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.lblCount = null;
            e.nodeAdd = null;
            e.intRes = 1;
            return e;
        }
        e.prototype.onLoad = function() {
            
        };
        e.prototype.updateItem = function(itemId) {
            //输入物品id
            if(utils.stringUtil.isBlank(itemId))
            {
                return;
            }
            this.intRes = itemId;

            var itemCfg = localcache.getItem(localdb.table_item, this.intRes);
            if(itemCfg)
            {
                var date = new uiUtils.ItemSlotData();
                date.id = this.intRes;
                date.kind = itemCfg.kind;

                //icon
                this.item.data = date;
                //count
                this.onUpdateCash();
            }
        };
        e.prototype.onClickItem = function() {
            utils.utils.openPrefabView("ItemInfo", !1, {
                id: this.intRes
            });
        };
        e.prototype.onUpdateCash = function() {
            this.lblCount.string = init.bagProxy.getItemCount(this.intRes);
        };
        e.prototype.onClickOpen = function() {
            time.funUtils.openView(time.funUtils.shopping.id, {id: this.intRes});
        };
        __decorate([c(item.default)], e.prototype, "item", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeAdd", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;