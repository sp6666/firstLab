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
            this.friends = null;
            //食材列表
            this.foodList =[];
            // this.itemYueLing = 0;
            //赠送者id
            this.userId = "";
            this.userData = null;

            this.THANKSGIVING_BASE_UPDATE = "THANKSGIVING_BASE_UPDATE";
            this.THANKSGIVING_DATA_UPDATE = "THANKSGIVING_DATA_UPDATE";
            this.THANKSGIVING_DATA_RECORDS = "THANKSGIVING_DATA_RECORDS";
            this.THANKSGIVING_MY_RANK = "THANKSGIVING_MY_RANK";
            this.THANKSGIVING_UPDATE_ITEM = "THANKSGIVING_UPDATE_ITEM";
            this.THANKSGIVING_ON_FRIEND_LIST_SELECTED = "THANKSGIVING_ON_FRIEND_LIST_SELECTED";

            this.THANKSGIVING_ITEM_LI_HE = 1400;
            this.THANKSGIVING_ITEM_LIAN_HUA = 1406;
            this.THANKSGIVING_ITEM_YUE_LING = 1407;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.thanksGiving.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.info, this.onData, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.exchange, this.onDhShop, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.rwdLog, this.onRwdLog, this);
            JsonHttp.subscribe(proto_sc.thanksGiving.flist, this.onFriends, this);
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
            this.userData = null;
            this.friends = null;
            this.userData = null;
             // this.need = 0;
        };

        t.prototype.clearUserData = function () {
            this.userId = "";
            this.userData = null;
        };
        
        t.prototype.onBase = function(t) {
            this.base = t;
            facade.send(this.THANKSGIVING_BASE_UPDATE);
        };

        t.prototype.onData = function(t) {
            this.data = t;
            if(this.data)
            {
                // this.onSettings(this.data.settings);

                this.data.need = this.THANKSGIVING_ITEM_LI_HE;
            }

            facade.send(this.THANKSGIVING_DATA_UPDATE);
        };

        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            facade.send(i.tangyuanProxy.TANG_YUAN_MY_RANK);
        };
        
        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.THANKSGIVING_MY_RANK);
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
            facade.send(this.THANKSGIVING_DATA_RECORDS);
        };
        //接收数据
        t.prototype.onFriends = function(t) {
            //好友列表
            this.friends = t.data;
            //this.friends.sort(this.sortFriends);
        };

        t.prototype.sortFriends = function(t, r) {
            //好友列表排序
            if(Math.abs(r.last_operation - t.last_operation) < 60)
            {
                return -(t.shili - r.shili);
            }
            else
            {
                return -(t.last_operation - r.last_operation);
            }
        };

        //查询
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6264info());
        };

        //排行
        t.prototype.sendRank = function(t) {
            JsonHttp.send(new proto_cs.huodong.hd6264rank());
        };

        //兑换商城
        t.prototype.sendExchange = function() {
            var e = new proto_cs.huodong.hd6264exchange();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //开启礼盒
        t.prototype.sendRwd = function(t,callback) {
            var e = new proto_cs.huodong.hd6264rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
                
                callback && callback();
            });
        };

        //制作
        t.prototype.sendMerge = function() {
            var e = new proto_cs.huodong.hd6264merge();
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //赠送
        t.prototype.sendGift = function(itemId,count,callback) {
            var e = new proto_cs.huodong.hd6264gift();
            e.id = itemId;
            e.count = count;
            e.target_uid = this.userId;

            JsonHttp.send(e,function(ret) {
                //提醒结果
                i.timeProxy.floatReward();
                callback && callback(ret);
            });
        };

        t.prototype.isEnough = function() {
            if (this.foodList && this.foodList.length > 0)
                for (var t = !0, e = 0; e < 5; e++)
                    if (
                        null == this.foodList[e].num ||
                        0 == this.foodList[e].num
                    ) {
                        t = !1;
                        break;
                    }

            return t;
        };

        t.prototype.sendFriends = function() {
            //拉好友列表
            JsonHttp.send(new proto_cs.huodong.hd6264flist());
        }

        t.prototype.isUserIdValid = function(){
           return n.stringUtil.isBlank(this.userId);
        };

        return t;
    })();
o.ThanksGivingProxy = r;
