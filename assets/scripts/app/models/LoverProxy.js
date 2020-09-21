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
            this.leijiData =null;
            // this.itemYueLing = 0;
            //赠送者id
            this.userId = "";
            this.userData = null;

            this.LOVER_LEIJI_PAIHANG = "LOVER_LEIJI_PAIHANG";
            this.LOVER_OPEN_PAIHANG = "LOVER_OPEN_PAIHANG";
            this.LOVER_BASE_UPDATE = "LOVER_BASE_UPDATE";
            this.LOVER_DATA_UPDATE = "LOVER_DATA_UPDATE";
            this.LOVER_DATA_RECORDS = "LOVER_DATA_RECORDS";
            this.LOVER_MY_RANK = "LOVER_MY_RANK";
            this.LOVER_UPDATE_ITEM = "LOVER_UPDATE_ITEM";
            this.LOVER_ON_FRIEND_LIST_SELECTED = "LOVER_ON_FRIEND_LIST_SELECTED";

            this.LOVER_ITEM_LI_HE = 1449;
            this.LOVER_ITEM_LIAN_HUA = 1455;
            this.LOVER_ITEM_YUE_LING = 1456;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.valentine.info, this.onData, this);
            JsonHttp.subscribe(proto_sc.valentine.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.valentine.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.valentine.exchange, this.onDhShop, this);
            JsonHttp.subscribe(proto_sc.valentine.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.valentine.rwdLog, this.onRwdLog, this);
            JsonHttp.subscribe(proto_sc.valentine.lists, this.onLeijiRwd, this);
            JsonHttp.subscribe(proto_sc.valentine.flist, this.onFriends, this);
        };

        t.prototype.clearData = function() {
            this.data = null;
            this.rank = null;
            this.myRank = null;
            this.shop = {};
            this.dhShop = {};
            this.foodList = [];

            this.records = null;
            this.sjShop = [];
            this.userId = "";
            this.userData = null;
            this.friends = null;
            this.userData = null;
            this.leijiData =null;
             // this.need = 0;
        };

        t.prototype.clearUserData = function () {
            this.userId = "";
            this.userData = null;
        };
        
        t.prototype.onLeijiRwd = function(t) {
            
            this.leijiData= t;
            l.default.change("lover_reward", this.hasRed());
            facade.send(this.LOVER_LEIJI_PAIHANG);
        };

        t.prototype.onData = function(t) {
            this.data = t;
            if(this.data)
            {
                // this.onSettings(this.data.settings);
                //好友列表
                
                this.data.need = this.LOVER_ITEM_LI_HE;

                
            }

            facade.send(this.LOVER_DATA_UPDATE);
        };

        t.prototype.onFriends = function(t) {
            this.friends = t;
        };
        

        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            facade.send(i.tangyuanProxy.TANG_YUAN_MY_RANK);
        };
        
        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.LOVER_MY_RANK);
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
            facade.send(this.LOVER_DATA_RECORDS);
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
            JsonHttp.send(new proto_cs.huodong.hd6509info(), function() {
                i.timeProxy.floatReward();
            });
        };

        //排行
        t.prototype.sendRank = function(t) {
            JsonHttp.send(new proto_cs.huodong.hd6509rank());
        };

        t.prototype.sendLeiji = function(call) {
            JsonHttp.send(new proto_cs.huodong.hd6509rank(),call);
        };

        //兑换商城
        t.prototype.sendExchange = function() {
            var e = new proto_cs.huodong.hd6509exchange();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //开启礼盒
        t.prototype.sendRwd = function(t,callback) {
            var e = new proto_cs.huodong.hd6509rwd();
            e.id = t;
            e.type = 1;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
                
                callback && callback();
            });
        };

        //制作
        t.prototype.sendMerge = function() {
            var e = new proto_cs.huodong.hd6509merge();
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //上交
        t.prototype.sendHandItem = function(id,num) {
            var e = new proto_cs.huodong.hd6509HandItem();
            e.id =id;
            e.num =num;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        //赠送
        t.prototype.sendGift = function(itemId,count,callback) {
            var e = new proto_cs.huodong.hd6509GiveGifts();
            e.id = itemId;
            e.count = count;
            e.fuid = this.userId;

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

        t.prototype.isUserIdValid = function(){
           return n.stringUtil.isBlank(this.userId);
        };

        t.prototype.sendLingQu = function (t) {
            var e = this,
                o = new proto_cs.huodong.hd6509rwd();
            o.id = t;
            o.type = 2;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
                facade.send(e.LOVER_OPEN_PAIHANG);
            });
        };

        t.prototype.hasRed = function () {
            for (var t = !1, e = 0; e < this.leijiData.total.length; e++)
                if (
                    this.leijiData.score >= this.leijiData.total[e].need &&
                    0 == this.leijiData.total[e].get
                ) {
                    t = !0;
                    break;
                }
            return t;
        };

        return t;
    })();
o.LoverProxy = r;
