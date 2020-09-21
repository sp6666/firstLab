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
            this.info = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.dhShop = {};
            this.LIANGXIAO_INFO_UPDATE = "LIANGXIAO_INFO_UPDATE";
            this.LIANGXIAO_BASE_UPDATE = "LIANGXIAO_BASE_UPDATE";
            this.LIANGXIAO_MY_RANK = "LIANGXIAO_MY_RANK";
            this.need = 0;
            this.startCount = 15;   //密度
            this.speed = [3, 5];    //掉落速度
            this.delay = [1, 3];    //开始掉落的时间点
            this.LIANGXIAO_ITEM_CLICK = "LIANGXIAO_ITEM_CLICK";
            this.timeRemain = 20;   //本次掉落秒数
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.mooncake.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.mooncake.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.mooncake.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.mooncake.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.mooncake.exchange, this.onDhShop, this);
        };
        t.prototype.clearData = function() {
            this.info = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.need = 0;
            this.dhShop = {};
        };
        t.prototype.onInfo = function(t) {
            this.info = t;
            if(this.info)
            {
                this.onSettings(this.info.settings);
            }
            facade.send(this.LIANGXIAO_INFO_UPDATE);
        };
        t.prototype.onSettings = function(t){
            if(t)
            {
                //密度
                this.startCount = t.startCount;   

                //掉落速度
                this.speed[0] = t.speed[0];    
                this.speed[1] = t.speed[1];    

                //开始掉落的时间点
                this.delay[0] = t.delay[0];    
                this.delay[1] = t.delay[1];   

                //本次掉落秒数
                this.timeRemain = t.timeRemain;   
            }
        };
        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
        };
        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.LIANGXIAO_MY_RANK);
        };
        t.prototype.onBase = function(t) {
            this.base = t;
            facade.send(this.LIANGXIAO_BASE_UPDATE);
        };
        t.prototype.onDhShop = function(t) {
            this.dhShop.hid =
                this.info && this.info.info ? this.info.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
                this.info && this.info.info ? this.info.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6251Info());
        };
        t.prototype.sendLookRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6251Rank());
        };
        t.prototype.sendQiang = function(t) {
            var e = new proto_cs.huodong.hd6251Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendBuy = function(t, e) {
            var o = new proto_cs.huodong.hd6251buy();
            o.id = t;
            o.num = e;
            JsonHttp.send(o);
        };

        //这个准备废弃
        t.prototype.getCurLiangxiaoTime = function(t) {
            void 0 === t && (t = !1);
            if (this.info)
                for (
                    var e = n.timeUtil.second,
                        o = n.timeUtil.getTodaySecond(0),
                        i = this.info.times.length,
                        l = i - 1;
                    l >= 0;
                    l--
                )
                    if (o + 3600 * this.info.times[l].need <= e)
                    {
                        //如果当前档次不到现在时间
                        //如果传入false，直接返回当前档

                        return t ? (i > l + 1 ? this.info.times[l + 1] : null) : this.info.times[l];
                    }
                        
                            
            return t ? this.info.times[0] : null;
        };

        //新的计算收费的函数
        t.prototype.getCurPay = function(){
            //如果rwd没有，直接返回0
            if(this.base.rwd < 0)
            {
                return -1;
            }

            for(var idx = this.info.times.length - 1; idx >= 0; idx--)
            {
                //从高开始找
                var zero = n.timeUtil.getTodaySecond(0);
                var needTime = this.info.times[idx].need;
                if(zero + 3600 * needTime <= n.timeUtil.second)
                {
                    if(this.base.rwd < needTime)
                    {
                        //如果当前时间超过这个点，并且rwd不到这个点
                        return -1;
                    }
                    else
                    {
                        //如果这个时间段用过，先判断上一次时间是否跨0点,如果上一次时间是昨天的，就把count清零
                        if(this.base.last_rwd_time < zero)
                        {
                            this.base.extra_rwd_count = 0;
                        }

                        //如果这个时间段用过，就返回当前档次需要多少钱
                        return this.needPay(this.base.extra_rwd_count);
                    }
                }
            }
        };
        t.prototype.needPay = function(times){
            for(var idx = 0; idx < this.info.extra_play.length; idx++)
            {
                if(this.info.extra_play[idx].id == (times + 1)) //+1表示下一次需要多少
                {
                    return this.info.extra_play[idx].cons;
                }
            }
            
            return this.info.extra_play[this.info.extra_play.length - 1].cons;  //高于这些次数就回复最后的那个
        };
        t.prototype.getCurRemain = function(t) {
            if (this.base)
                for (var e = 0; e < this.base.damage.length; e++)
                    if (t == this.base.damage[e].id) return this.base.damage[e];
            return null;
        };
        t.prototype.hasRed = function() {
            var t = this.getCurLiangxiaoTime();
            if (t) {
                var e = i.gaodianProxy.getCurRemain(t.need);
                if (this.base.rwd != t.need && t.all - (e ? e.count : 0) > 0)
                    return !0;
            }
            return !1;
        };
        return t;
    })();
o.LiangxiaoProxy = r;
