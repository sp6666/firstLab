var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.base = null;
            this.data = null;
            this.rank = null;
            this.myRank = null;
            this.records = null;
            this.shop = {};
            this.dhShop = {};
            this.sjShop =[];

            //食材列表
            this.foodList =[];
            // this.itemYueLing = 0;
            //赠送者id
            this.userId = "";

            this.MINGYUE_BASE_UPDATE = "MINGYUE_BASE_UPDATE";
            this.MINGYUE_DATA_UPDATE = "MINGYUE_DATA_UPDATE";
            this.MINGYUE_DATA_RECORDS = "MINGYUE_DATA_RECORDS";
            // this.MINGYUE_OPEN_RANK = "TANG_YUAN_MY_RANK";
            this.MINGYUE_MY_RANK = "MINGYUE_MY_RANK";

            this.MINGYUE_UPDATE_ITEM = "MINGYUE_UPDATE_ITEM";


            this.MINGYUE_ITEM_LI_HE = 1049;
            this.MINGYUE_ITEM_LIAN_HUA = 1050;
            this.MINGYUE_ITEM_YUE_LING = 1051;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.mingyue.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.mingyue.info, this.onData, this);
            JsonHttp.subscribe(proto_sc.mingyue.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.mingyue.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.mingyue.exchange, this.onDhShop, this);
            JsonHttp.subscribe(proto_sc.mingyue.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.mingyue.rwdLog, this.onRwdLog, this);
        };

        t.prototype.clearData = function() {
            this.data = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.shop = {};
            this.dhShop = {};
            this.foodList = [];

            this.records = null;
            this.sjShop = [];
            this.userId = "";
             // this.need = 0;
        };
        
        t.prototype.onBase = function(t) {
            this.base = t;
            facade.send(this.MINGYUE_BASE_UPDATE);
        };

        t.prototype.onData = function(t) {
            this.data = t;
            if(this.data)
            {
                // this.onSettings(this.data.settings);

                this.data.need = this.MINGYUE_ITEM_LI_HE;
            }

            facade.send(this.MINGYUE_DATA_UPDATE);
        };

        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            facade.send(i.tangyuanProxy.TANG_YUAN_MY_RANK);
        };
        
        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.MINGYUE_MY_RANK);
        };

        t.prototype.onShop = function(t) {
            this.shop = t;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.shop);
        };

        t.prototype.onDhShop = function(t) {
            this.dhShop.hid =
                this.data && this.data.info ? this.data.info.type : 1;

                // this.dhShop.rwd = t;
            this.dhShop.rwd = [];
            this.sjShop = [];
            for(var index = 0;index<t.length;++index){
                var item = t[index];
                if(item.id < 1000){
                    this.dhShop.rwd.push(item);
                }
                else{
                    this.sjShop.push(item);
                }
            }
            
            this.dhShop.stime =
                this.data && this.data.info ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };

        t.prototype.onRwdLog = function(t) {
            this.records = t;
            facade.send(this.MINGYUE_DATA_RECORDS);
        };

        //查询
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6252info());
        };

        //排行
        t.prototype.sendRank = function(t) {
            JsonHttp.send(new proto_cs.huodong.hd6252rank());
        };

        //兑换商城
        t.prototype.sendExchange = function() {
            var e = new proto_cs.huodong.hd6252exchange();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //开启礼盒
        t.prototype.sendRwd = function(t,callback) {
            var e = new proto_cs.huodong.hd6252rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
                
                callback && callback();
            });
        };

        //制作
        t.prototype.sendMerge = function() {
            var e = new proto_cs.huodong.hd6252merge();
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //赠送
        t.prototype.sendGift = function(itemId,count,callback) {
            var e = new proto_cs.huodong.hd6252gift();
            e.id = itemId;
            e.count = count;
            e.target_uid = this.userId;

            JsonHttp.send(e,function(ret) {
                //提醒结果
                callback && callback(ret);
            });
        };

        t.prototype.isEnough = function() {
            if (this.foodList && this.foodList.length > 0)
                for (var t = !0, e = 0; e < this.foodList.length; e++)
                    if (
                        null == this.foodList[e].num ||
                        0 == this.foodList[e].num
                    ) {
                        t = !1;
                        break;
                    }

            return t;
        };

        t.prototype.isUserIdValid = function(){
           return n.stringUtil.isBlank(this.userId);
        };

        return t;
    })();
o.MingYueProxy = r;
