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
            this.rwd = null;
            this.dhShop1 = {};
            this.dhShop2 = {};



            this.HUODONGYUE_DATA_UPDATE = "HUODONGYUE_DATA_UPDATE";
            this.HUODONGYUE_MUBIAO_UPDATE = "HUODONGYUE_MUBIAO_UPDATE";
            this.HUODONGYUE_DATA_RECORDS = "HUODONGYUE_DATA_RECORDS";
            this.HUODONGYUE_SHOP_UPDATE1 = "HUODONGYUE_SHOP_UPDATE1";
            this.HUODONGYUE_SHOP_UPDATE2 = "HUODONGYUE_SHOP_UPDATE2";


        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.huoDongYue.info, this.onData, this);
            JsonHttp.subscribe(proto_sc.huoDongYue.rwd, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.huoDongYue.exchange, this.onDhShop, this);
            JsonHttp.subscribe(proto_sc.huoDongYue.rwdLog, this.onRwdLog, this);
            l.default.change("huoDongYue_effect", true);
        };

        t.prototype.clearData = function() {
            this.data = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.shop = {};
            this.dhShop1 = {};
            this.dhShop2 = {};
            this.rwd = null;
            this.records = null;


        };

        t.prototype.clearUserData = function () {
            this.userId = "";
            this.userData = null;
        };
        


        t.prototype.onData = function(t) {
            this.data = t;
            facade.send(this.HUODONGYUE_DATA_UPDATE);
        };

        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            facade.send(i.tangyuanProxy.TANG_YUAN_MY_RANK);
        };
        


        t.prototype.onShop = function(t) {
            this.shop = t;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.shop);
        };

        t.prototype.onDhShop = function(t) {
            if(t == null || t.length <= 0) return;
            this.setDHShop(this.dhShop1, t[0]);
            facade.send(this.HUODONGYUE_SHOP_UPDATE1, this.dhShop1);
            this.setDHShop(this.dhShop2, t[1]);
            facade.send(this.HUODONGYUE_SHOP_UPDATE2, this.dhShop2);
        };

        t.prototype.setDHShop = function(dhShop, t) {
            dhShop.hid = this.data && this.data.info ? this.data.info.type : 1;

            dhShop.rwd = [];
            var allHave = true;
            for(var index = 0; index < t.source.length; ++index){
                var item = t.source[index];
                //var have = i.playerProxy.isUnlockCloth(item.id);
                item.have = item.have == 1;
                if(allHave) {
                    allHave = item.have;
                }
                dhShop.rwd.push(item);
            }
            dhShop.allHave = allHave;
            dhShop.buy = t.buy;
            dhShop.target = t.target[0];
            dhShop.limit_count = t.limit_count;//限兑换一件
            dhShop.stime = this.data && this.data.info ? this.data.info.showTime : 0;
            
        };

        t.prototype.onRwd = function(t) {
            this.rwd = t;
                    //开始计算
            var canGet = false;
            var lionOpen = this.rwd.lion == 1;
            var countNum = this.rwd.countNum;
            for(var i = 0; i < this.rwd.gear.length; i ++ ) {
                var item = this.rwd.gear[i];
                var id = item.id;
                item.open = countNum >= id;
                if(!canGet && item.open && (item.fGet == 0 || (lionOpen && item.sGet == 0))) {
                    canGet = true;
                    break;
                }
            }

            if(canGet) {
                l.default.change("zhouNian_mubiao", true);
            }else {
                l.default.change("zhouNian_mubiao",false);
            }
            facade.send(this.HUODONGYUE_MUBIAO_UPDATE);
        };

        t.prototype.onRwdLog = function(t) {
            this.records = t;
            facade.send(this.HUODONGYUE_DATA_RECORDS);
        };
        

        //查询
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6802Info());
        };



        //一键获取
        t.prototype.sendRwd = function() {
            var e = new proto_cs.huodong.hd6802rwd();
            JsonHttp.send(e, function(info) {
                if(info.a.system.errror == null) {
                    //n.alertUtil.alert18n("USER_CLOTHE_UNLOCK_SUC");
                    i.timeProxy.floatReward();
                }else {
                    n.alertUtil.alert(info.a.system.errror);
                }
            });
        };

        t.prototype.sendExchange = function(type) {
            var o = new proto_cs.huodong.hd6802exchange();
            o.id = type;
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    //n.alertUtil.alert18n("USER_CLOTHE_UNLOCK_SUC");
                    i.timeProxy.floatReward();
                }
            });
            
        };
        return t;
    })();
o.HuoDongYueProxy = r;
