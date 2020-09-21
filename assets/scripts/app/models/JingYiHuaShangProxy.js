var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    r = (function() {
        function t() {
            this.info = null;
            this.discountList = null;
            this.dhShop = {};
            this.JINGYIHUASHANG_DISCOUNT_SELECT = "DISCOUNT_SELECT";
            this.JINGYIHUASHANG_INFO_UPDATE = "JINGYIHUASHANG_INFO_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.jingYiHuaShang.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.jingYiHuaShang.exchange, this.onDhShop, this);
            JsonHttp.subscribe(proto_sc.jingYiHuaShang.shop, this.onShop, this);
        };
        t.prototype.clearData = function() {
            this.info = null;
            this.shop = null;
            this.discountList = null;
            this.dhShop = {};
        };
        t.prototype.onInfo = function(t) {
            this.info = t;
            if(this.info)
            {
                this.discountList = this.info.discount;
                this.discountList.sort((a, b) => {
                    return a.id - b.id;
                })
            }
            facade.send(this.JINGYIHUASHANG_INFO_UPDATE);
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
            facade.send(this.JINGYIHUASHANG_INFO_UPDATE);
        }
        t.prototype.onDhShop = function(t) {
            this.dhShop.hid =
                this.info && this.info.info ? this.info.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
                this.info && this.info.info ? this.info.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        
        t.prototype.getInfo = function (cb) {
            JsonHttp.send(new proto_cs.huodong.hd6263Info(), (info)=> {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
            });
        };

        t.prototype.LimitBuy = function(t, e, num) {
            var o = new proto_cs.huodong.hd6263LimitBuy();
            o.id = t;
            o.discountId = e;
            o.num = num;
            JsonHttp.send(o, function (info) {
                if(info.a.system.errror == null) {
                    n.alertUtil.alert18n("USER_CLOTHE_UNLOCK_SUC");
                }
            });
        };

        return t;
    })();
o.JingYiHuaShangProxy = r;
