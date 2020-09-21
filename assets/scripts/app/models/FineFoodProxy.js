var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../component/RedDot"),
    l = require("../utils/Utils"),
    r = (function () {
        function t() {
            this.ON_FINE_FOOD_CLICK_POINT = "ON_FINE_FOOD_CLICK_POINT"; //点击城市
            this.ON_FINE_FOOD_ACT_BACK = "ON_FINE_FOOD_ACT_BACK"; //申请移动返回
            this.ON_FINE_FOOD_EX_CLOTHE_CLICK = "ON_FINE_FOOD_EX_CLOTHE_CLICK"; //选中兑换衣服界面的衣服

            this.FINE_FOOD_DATA_UPDATE = "FINE_FOOD_DATA_UPDATE"; //获得垂钓数据
            this.FINE_FOOD_ACT_UPDATE = "FINE_FOOD_ACT_UPDATE"; //获得体力数据
            this.FINE_FOOD_MY_RID = "FINE_FOOD_MY_RID"; //获得排名奖励自己的数据

            this.FINE_FOOD_FISHING_BACK = "FINE_FOOD_FISHING_BACK"; //垂钓回调
            this.FINE_FOOD_SPECIAL_EXCHANGE_BACK = "FINE_FOOD_SPECIAL_EXCHANGE_BACK"; //特殊兑换回调

            this.data = null;
            this.cities = [];
            this.act = null; //act每次使用时都要检查
            this.shop = null; //shop每次使用时都要检查
            this.exchange = {}; //exchange每次使用时都要检查
            this.myRid = {
                score: 0,
                rid: 0
            };
            this.specialExchange = {}; //specialExchange每次使用时都要检查

            //钓鱼配置
            this.fishingSpeed = 1.0; //移动速度
            this.startPoint = [-1, -0.1]; //起始点， -1 和 1 之间， 0为正中

            //临时保存数据
            //兑换商城选中物品
            this.curExchangeId = 0;
        }

        t.prototype.ctor = function () {
            //协议
            JsonHttp.subscribe(proto_sc.food.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.food.act, this.onActUpdate, this);
            JsonHttp.subscribe(proto_sc.food.shop, this.onShopUpdate, this); // 
            JsonHttp.subscribe(proto_sc.food.exchange, this.onExchangeUpdate, this);
            JsonHttp.subscribe(proto_sc.food.special_exchange, this.onSpecialExchange, this);

            JsonHttp.subscribe(proto_sc.food.myFoodRid, this.onMyRid, this);
            JsonHttp.subscribe(proto_sc.food.XfRank, this.onRank, this); //
        };
        t.prototype.clearData = function () {
            this.data = null;
            this.cities = null;
            this.act = null; //act每次使用时都要检查
            this.shop = null; //shop每次使用时都要检查
            this.exchange = {}; //exchange每次使用时都要检查
            this.myRid = {
                score: 0,
                rid: 0
            };
            this.specialExchange = {}; //specialExchange每次使用时都要检查
            this.rank = {};

            //钓鱼配置
            this.fishingSpeed = 1.0; //移动速度
            this.startPoint = [-1, -0.1]; //起始点， -1 和 1 之间， 0为正中

            //临时保存数据
            //兑换商城选中物品
            this.curExchangeId = 0;
        };

        //接收数据
        t.prototype.onDataUpdate = function (t) {
            this.data = t;

            this.cities = t.available_cities;

            //移动速度
            if (this.data.settings.cursor_speed) {
                this.fishingSpeed = this.data.settings.cursor_speed;
            }

            facade.send(this.FINE_FOOD_DATA_UPDATE);
        };
        t.prototype.onActUpdate = function (t) {
            if (t.length > 0) {
                this.act = t[0];
            } else {
                this.act = t;
            }
            facade.send(this.FINE_FOOD_ACT_UPDATE);
        };
        t.prototype.onShopUpdate = function (t) {
            this.shop = t;
        };
        t.prototype.onRank = function (t) {
            this.rank = t;
        };
        t.prototype.onExchangeUpdate = function (t) {
            this.exchange.hid = this.data && this.data.info ? this.data.info.type : 1;

            this.exchange.rwd = [];
            this.sjShop = [];
            for (var index = 0; index < t.length; ++index) {
                var item = t[index];
                if (item.id < 1000) {
                    this.exchange.rwd.push(item);
                } else {
                    this.sjShop.push(item);
                }
            }

            this.exchange.stime = this.data && this.data.info ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.exchange);
        };
        t.prototype.onSpecialExchange = function (t) {
            this.specialExchange = t;
        };
        t.prototype.onMyRid = function (t) {
            this.myRid = t;
            facade.send(this.FINE_FOOD_MY_RID);
        };

        //发送
        t.prototype.sendOpenFineFood = function () {
            //拉数据
            JsonHttp.send(new proto_cs.huodong.hd6284Info(), function () {
                i.timeProxy.floatReward(); //弹奖励
            });
        };

        t.prototype.sendMove = function (id) {
            //移动，如果没有id就是随机移动
            var req = new proto_cs.huodong.hd6284Walk();
            if (id > 0) {
                req.city = id;
            }

            JsonHttp.send(req);
        };
        t.prototype.sendBuyStamina = function (count) {
            //购买体力
            var req = new proto_cs.huodong.hd6284stamina();
            req.count = count ? count : 1;

            JsonHttp.send(req);
        };
        t.prototype.sendLookRank = function () {
            //拉排行榜
            JsonHttp.send(new proto_cs.huodong.hd6284paihang());
        };
        t.prototype.sendExchange = function () {
            //兑换商城
            var e = new proto_cs.huodong.hd6284exchange();
            e.id = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendSpecialExchange = function (idx, num) {
            //特殊兑换
            var req = new proto_cs.huodong.hd6284specialExchange();
            req.idx = idx;
            req.num = num;

            var self = this;
            JsonHttp.send(req, function () {
                i.timeProxy.floatReward();
                facade.send(self.FINE_FOOD_SPECIAL_EXCHANGE_BACK);
            });
        };
        t.prototype.sendFineFood = function (num, timing) {
            //垂钓
            var req = new proto_cs.huodong.hd6284fishing();
            req.num = num;
            req.timing = timing;
            JsonHttp.send(req, function (data) {
                i.timeProxy.floatReward(); //弹奖励
            });

            facade.send(this.FINE_FOOD_FISHING_BACK); //马车返回
        };

        return t;
    })();
o.FineFoodProxy = r;