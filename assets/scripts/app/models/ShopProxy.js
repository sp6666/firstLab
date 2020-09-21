var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("./TimeProxy"),
    r = (function() {
        function t() {
            this.UPDATE_SHOP_LIST = "UPDATE_SHOP_LIST";
            this.UPDATE_SHOP_LIMIT = "UPDATE_SHOP_LIMIT";
            this.list = null;
            this.giftList = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.shop.giftlist, this.onGifeList, this);
            JsonHttp.subscribe(proto_sc.shop.list, this.onList, this);
        };
        t.prototype.clearData = function() {
            this.list = null;
            this.giftList = null;
        };
        t.prototype.onGifeList = function(t) {
            this.giftList = t;
            facade.send(this.UPDATE_SHOP_LIMIT);
        };
        t.prototype.onList = function(t) {
            this.list = t;
            facade.send(this.UPDATE_SHOP_LIST);
        };
        t.prototype.isHaveItem = function(t, e) {
            void 0 === e && (e = 0);
            if (null == this.list) {
                var o = this;
                JsonHttp.send(new proto_cs.shop.shoplist(), function() {
                    var n = o.isHaveItem(t);
                    0 != e &&
                        (n = {
                            buy: n,
                            needCount: e
                        });
                    if (n) i.utils.openPrefabView("shopping/ShopBuy", !1, n);
                    else {
                        var r = localcache.getItem(localdb.table_item, t);
                        r && 0 != r.iconopen && l.funUtils.openView(r.iconopen);
                    }
                });
                return !1;
            }
            for (var n = null, r = 0; r < this.list.length; r++) {
                var a = this.list[r];
                if (a.item.id == t) {
                    n = a;
                    if (0 == a.islimit || (1 == a.islimit && a.limit > 0))
                        return a;
                }
            }
            n &&
                1 == n.islimit &&
                n.limit <= 0 &&
                i.alertUtil.alert18n("SHOP_DAY_BUY_LIMIT");
            return !1;
        };
        t.prototype.sendBuyGift = function(t) {
            var e = new proto_cs.shop.shopGift();
            e.id = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendBuyLimit = function(t, e, o) {
            void 0 === o && (o = !1);
            var i = new proto_cs.shop.shopLimit();
            i.id = t;
            i.count = e;
            JsonHttp.send(i, function() {
                o || n.timeProxy.floatReward();
                o && facade.send("SHOP_BUY_ITEM_ID", t, !0);
            });
        };
        t.prototype.sendList = function(t) {
            void 0 === t && (t = !0);
            JsonHttp.send(new proto_cs.shop.shoplist(), function() {
                t && i.utils.openPrefabView("shopping/ShopView");
            });
        };

        t.prototype.openShopBuyItem = function(data) {
            
            var self =this;
            JsonHttp.send(new proto_cs.shop.shoplist(), function() {

                if(!data){
                    i.utils.openPrefabView("shopping/ShopView");
                }else{
                    var index =-1;
                    var first =-1;
                    for(var itemId of data){

                        if(index < 0){
                            for (var e = self.list.length, o = 0; o < e; o++){
                                if (self.list[o].item.id == itemId) {
                                    if(first < 0){
                                        first = o;
                                    }
                                    if(self.list[o].limit > 0){
                                        index = o;
                                        break;
                                    }
                                }
                            }
                        }else{
                            break;
                        }
                        
                    }
                    if(index <0){
                        index =first;
                    }
                    if(index > 0){
                        i.utils.openPrefabView("shopping/ShopView",null,self.list[index].item);
                    }
                    else{
                        cc.log('活动配置item错误');
                        i.utils.openPrefabView("shopping/ShopView");
                    }
                    
                }
                
            });
        };

        t.prototype.openShopBuy = function(t) {
            for (var e = this.list.length, o = 0; o < e; o++)
                if (this.list[o].item.id == t) {
                    i.utils.openPrefabView(
                        "shopping/ShopBuy",
                        !1,
                        this.list[o]
                    );
                    break;
                }
        };
        return t;
    })();
o.ShopProxy = r;
