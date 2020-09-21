var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.info = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.shop = null;
            this.dhShop = {};
            this.HONGBAO_PRO_INFO_UPDATE = "HONGBAO_PRO_INFO_UPDATE";
            this.HONGBAO_PRO_BASE_UPDATE = "HONGBAO_PRO_BASE_UPDATE";
            this.HONGBAO_PRO_MY_RANK = "HONGBAO_PRO_MY_RANK";
            this.HONGBAO_PRO_OPEN_PAIHANG = 'HONGBAO_PRO_OPEN_PAIHANG';
            this.need = 0;
            this.startCount = 15; //密度
            this.speed = [3, 5]; //掉落速度
            this.delay = [1, 2]; //开始掉落的时间点
            this.HONGBAO_PRO_ITEM_CLICK = "HONGBAO_PRO_ITEM_CLICK";
            this.timeRemain = 20; //本次掉落秒数
            this.getTenCost = 40; //10倍获取所需要的元宝数
            this.minimum = 10; //该时段红包获取最小值
            this.maxmum = 40; //该时段红包获取最大值
            this.limitBuyBum = 40; //每日玩抢红包限购次数
            this.limitTenCost = 15; //每日花元宝10倍获取限购次数

            this.totalNum = 40;
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.red.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.red.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.red.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.red.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.red.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.red.exchange, this.onDhShop, this);
        };
        t.prototype.clearData = function () {
            this.info = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.shop = null;
            this.need = 0;
            this.dhShop = {};
        };
        t.prototype.onInfo = function (t) {
            this.info = t;
            if (this.info) {

                l.default.change("hongbao_pro_leiji", this.hasRed());

                this.SetCurLimit();
                this.getCostTen();
                this.onSettings(this.info.settings);
            }
            facade.send(this.HONGBAO_PRO_INFO_UPDATE);
        };

        t.prototype.onShop = function (t) {
            this.shop = t;
        };
        t.prototype.onSettings = function (t) {
            if (t) {
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

        t.prototype.onRank = function (t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
        };
        t.prototype.onMyRank = function (t) {
            this.myRank = t;
            facade.send(this.HONGBAO_PRO_MY_RANK);
        };
        t.prototype.onBase = function (t) {
            this.base = t;
            facade.send(this.HONGBAO_PRO_BASE_UPDATE);
        };
        t.prototype.onDhShop = function (t) {
            this.dhShop.hid =
                this.info && this.info.info ? this.info.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
                this.info && this.info.info ? this.info.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.sendOpenActivity = function () {
            JsonHttp.send(new proto_cs.huodong.hd6800Info(), function () {
                i.timeProxy.floatReward();
            });
        };

        t.prototype.sendLookRank = function () {
            JsonHttp.send(new proto_cs.huodong.hd6800Rank());
        };
        t.prototype.sendQiang = function (o) {
            cc.log("send qiang id is " + t + ", num is " + o);
            var e = new proto_cs.huodong.hd6800Rwd();
            e.id_1 = o[0];
            e.id_2 = o[1];
            e.id_3 = o[2];
            e.id_4 = o[3];
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendBuy = function (t, e) {
            var o = new proto_cs.huodong.hd6800buy();
            o.id = t;
            o.num = e;
            JsonHttp.send(o);
        };

        //这个准备废弃
        t.prototype.getCurHongbaoTime = function (t) {
            void 0 === t && (t = !1);
            if (this.info)
                for (
                    var e = n.timeUtil.second,
                        o = n.timeUtil.getTodaySecond(0),
                        i = this.info.times.length,
                        l = i - 1; l >= 0; l--
                )
                    if (o + 3600 * this.info.times[l].need <= e) {
                        //如果当前档次不到现在时间
                        //如果传入false，直接返回当前档

                        return t ? (i > l + 1 ? this.info.times[l + 1] : null) : this.info.times[l];
                    }


            return t ? this.info.times[0] : null;
        };

        //新的计算收费的函数
        t.prototype.getCurPay = function () {
            //如果rwd没有，直接返回0
            /*if (this.base.rwd < 0) {
                return -1;
            }

            if (this.base.rwd == 24) {
                //为了0-10点的那部分玩了抢红包的玩家做的特殊处理
                return -1;
            }

            for (var idx = this.info.times.length - 1; idx >= 0; idx--) {
                //从高开始找
                var zero = n.timeUtil.getTodaySecond(0);
                var needTime = this.info.times[idx].need;
                if (zero + 3600 * needTime <= n.timeUtil.second) {
                    if (this.base.rwd < needTime) {
                        //如果当前时间超过这个点，并且rwd不到这个点
                        return -1;
                    } else {
                        //如果这个时间段用过，先判断上一次时间是否跨0点,如果上一次时间是昨天的，就把count清零
                        if (this.base.last_rwd_time < zero) {
                            this.base.extra_rwd_count = 0;
                        }

                        //如果这个时间段用过，就返回当前档次需要多少钱
                        return this.needPay(this.base.extra_rwd_count);
                    }
                }
            }*/

            return 1; //默认返回第一个
        };

        t.prototype.getRandomColors = function () {

            var total = this.totalNum;
            var array = new Array(total);
            var num = new Array(4);

            for (var i = 0; i < 4; i++) {
                num[i] = Math.round(cc.random0To1() * total * this.info.hongbao[i].per / 100);
            }

            num[0] = total - num[1] - num[2] - num[3];

            var len = 0;
            for (var j = 0, i = 0; j < total; j++) {
                if (len >= num[i]) {
                    i++;
                    if (i >= num.length) {
                        i = num.length - 1;
                    }
                    len = 0;
                }
                len++;
                array[j] = i;
            }

            array.sort(function (t, e) {
                var k = cc.random0To1();
                if (k > 0.6) {
                    return 0;
                }
                if (k < 0.4) {
                    return 1;
                }

                return -1;
            });

            return array;
        };

        t.prototype.SetCurLimit = function () {

            if (this.info.getLimit) this.limitBuyBum = this.info.getLimit.buy_limit;
            if (this.info.getLimit) this.limitTenCost = this.info.getLimit.ten_limit;

            if (!this.info.times) {
                return;
            }
            for (var idx = this.info.times.length - 1; idx >= 0; idx--) {
                //从高开始找
                var zero = n.timeUtil.getTodaySecond(0);
                var needTime = this.info.times[idx].need;
                if (zero + 3600 * needTime <= n.timeUtil.second) {
                    this.minimum = this.info.times[idx].items[0].min;
                    this.maxmum = this.info.times[idx].items[0].max;
                    break;
                }
            }
        };

        t.prototype.getCostTen = function () {
            if (!this.info.extra_play) {
                return;
            }
            var extra_play = this.info.extra_play;
            if (this.limitTenCost > extra_play.length) return;
            if (this.limitTenCost <= 0) return;
            this.getTenCost = extra_play[extra_play.length - this.limitTenCost].ten_cons;
        };
        t.prototype.needPay = function (times) {
            for (var idx = 0; idx < this.info.extra_play.length; idx++) {
                if (this.info.extra_play[idx].id == (times + 1)) //+1表示下一次需要多少
                {
                    return this.info.extra_play[idx].cons;
                }
            }

            return this.info.extra_play[this.info.extra_play.length - 1].cons; //高于这些次数就回复最后的那个
        };
        t.prototype.getCurRemain = function (t) {
            if (this.base)
                for (var e = 0; e < this.base.damage.length; e++)
                    if (t == this.base.damage[e].id) return this.base.damage[e];
            return null;
        };
        /*
        t.prototype.hasRed = function () {
            var t = this.getCurHongbaoTime();
            if (t) {
                var e = i.gaodianProxy.getCurRemain(t.need);
                if (this.base.rwd != t.need && t.all - (e ? e.count : 0) > 0)
                    return !0;
            }
            return !1;
        };*/

        t.prototype.hasRed = function () {
            for (var t = !1, e = 0; e < this.info.total.length; e++)
                if (
                    this.base.cons >= this.info.total[e].need &&
                    0 == this.info.total[e].get
                ) {
                    t = !0;
                    break;
                }
            return t;
        };

        t.prototype.sendPaiHang = function () {
            JsonHttp.send(
                new proto_cs.huodong.hd6800Rank(),
                function () {
                    n.utils.openPrefabView("hongbaoPro/HongBaoProLeiJi");
                }
            );
        };

        t.prototype.sendLucky = function () {
            JsonHttp.send(
                new proto_cs.huodong.hd6800Play(),
                function () {
                    n.utils.closeNameView('ConfirmItem'); //手机上有几率该界面没有关闭，这里强关
                    i.timeProxy.floatReward();
                }
            );
        };



        t.prototype.sendLingQu = function (t) {
            var e = this,
                o = new proto_cs.huodong.hd6800Total();
            o.lv = t;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
                facade.send(e.HONGBAO_PRO_OPEN_PAIHANG);
            });
        };
        return t;
    })();
o.HongBaoProProxy = r;