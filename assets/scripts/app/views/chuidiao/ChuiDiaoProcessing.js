var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../views/item/ItemSlotUI"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.processList = null;
            e.lblShopName = null;
            e.firstItem = null;
            e.lblSashimiName = null;
            e.shopData = [];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(l.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.onDataUpdate, this);
            facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.updateSashimis, this);
            facade.subscribe(l.chuidiaoProxy.CHUIDIAO_SPECIAL_EXCHANGE_BACK, this.onListUpdate, this);
          
            //商城标题
            this.lblShopName.string = i18n.t("CHUIDIAO_SHOP_PROCESS_TITLE") + i18n.t("CHUIDIAO_SHOP_EXCHANGE_EX");

            this.onDataUpdate();

            //刷新数量
            this.updateSashimis();
        };

        //更新本地鱼片数量
        e.prototype.updateSashimis = function(){
            //更新数量
            var sashimi = l.bagProxy.getItemCount(1060);
            this.lblSashimiName.string = "(" + i18n.t("COMMON_HOLD") +":"+ sashimi +")";;
        };

        //刷新数据
        e.prototype.onDataUpdate = function(t) {
            if(l.chuidiaoProxy.specialExchange == null) return;

            this.onListUpdate();
   
            //头顶固定显示鱼片
            var item = localcache.getItem(localdb.table_item, this.shopData[0].target[0].id);
            //鱼片icon
            this.firstItem.data = item;   
            this.itemId = item.id;

            //刷新界面
            this.updateSashimis();  
            
        };
        e.prototype.onListUpdate = function(){
            if(l.chuidiaoProxy.specialExchange == null) return;

            this.shopData = [];
            var fishList = [];
            for(var i =0;i< l.chuidiaoProxy.specialExchange.length;++i){
                var item = l.chuidiaoProxy.specialExchange[i];
                if(item.tag ==2){
                    var sourceItem = item.source[0];
                    sourceItem.num =  l.bagProxy.getItemCount(sourceItem.id);
                    sourceItem.index = i;
                    sourceItem.target = item.target;
                    this.shopData.push(item);

                    fishList.push(sourceItem);
                }
            }
            fishList.sort(function(t, e){
                var o = 0 == t.num;
                return o != (0 == e.num) ? (o ? 1 : -1) : t.id - e.id;
            });

            this.processList.data = fishList;
        };

        __decorate([d(i.default)], e.prototype, "firstItem", void 0);           //选中的物品icon
        __decorate([d(n.default)], e.prototype, "processList", void 0);         //鱼列表
        __decorate([d(cc.Label)], e.prototype, "lblShopName", void 0);          //商城名字
        __decorate([d(cc.Label)], e.prototype, "lblSashimiName", void 0);       //鱼片名 + 数量
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
