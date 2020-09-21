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
            this.ON_CHUIDIAO_CLICK_POINT = "ON_CHUIDIAO_CLICK_POINT"; //点击城市
            this.ON_CHUIDIAO_ACT_BACK = "ON_CHUIDIAO_ACT_BACK"; //申请移动返回
            this.ON_CHUIDIAO_EX_CLOTHE_CLICK = "ON_CHUIDIAO_EX_CLOTHE_CLICK"; //选中兑换衣服界面的衣服

            this.CHUIDIAO_DATA_UPDATE = "CHUIDIAO_DATA_UPDATE"; //获得垂钓数据
            this.CHUIDIAO_ACT_UPDATE = "CHUIDIAO_ACT_UPDATE"; //获得体力数据
            this.CHUIDIAO_MY_RID = "CHUIDIAO_MY_RID"; //获得排名奖励自己的数据

            this.CHUIDIAO_FISHING_BACK = "CHUIDIAO_FISHING_BACK"; //垂钓回调
            this.CHUIDIAO_SPECIAL_EXCHANGE_BACK = "CHUIDIAO_SPECIAL_EXCHANGE_BACK"; //特殊兑换回调

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
            JsonHttp.subscribe(proto_sc.Fishing.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.Fishing.act, this.onActUpdate, this);
            JsonHttp.subscribe(proto_sc.Fishing.shop, this.onShopUpdate, this); // 
            JsonHttp.subscribe(proto_sc.Fishing.exchange, this.onExchangeUpdate, this);
            JsonHttp.subscribe(proto_sc.Fishing.special_exchange, this.onSpecialExchange, this);

            JsonHttp.subscribe(proto_sc.Fishing.myFishRid, this.onMyRid, this);
            JsonHttp.subscribe(proto_sc.Fishing.CdRank, this.onRank, this); //
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

            facade.send(this.CHUIDIAO_DATA_UPDATE);
        };
        t.prototype.onActUpdate = function (t) {
            if (t.length > 0) {
                this.act = t[0];
            } else {
                this.act = t;
            }
            facade.send(this.CHUIDIAO_ACT_UPDATE);
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
            facade.send(this.CHUIDIAO_MY_RID);
        };

        //发送
        t.prototype.sendOpenChuiDiao = function () {
            //拉数据
            JsonHttp.send(new proto_cs.huodong.hd6254Info());
        };

        t.prototype.sendMove = function (id) {
            //移动，如果没有id就是随机移动
            var req = new proto_cs.huodong.hd6254Walk();
            if (id > 0) {
                req.city = id;
            }

            JsonHttp.send(req);
        };
        t.prototype.sendBuyStamina = function (count) {
            //购买体力
            var req = new proto_cs.huodong.hd6254stamina();
            req.count = count ? count : 1;

            JsonHttp.send(req);
        };
        t.prototype.sendLookRank = function () {
            //拉排行榜
            JsonHttp.send(new proto_cs.huodong.hd6254paihang());
        };
        t.prototype.sendExchange = function () {
            //兑换商城
            var e = new proto_cs.huodong.hd6254exchange();
            e.id = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendSpecialExchange = function (idx, num) {
            //特殊兑换
            var req = new proto_cs.huodong.hd6254specialExchange();
            req.idx = idx;
            req.num = num;

            var self = this;
            JsonHttp.send(req, function () {
                i.timeProxy.floatReward();
                facade.send(self.CHUIDIAO_SPECIAL_EXCHANGE_BACK);
            });
        };
        t.prototype.sendFishing = function (num, timing) {
            //垂钓
            var req = new proto_cs.huodong.hd6254fishing();
            req.num = num;
            req.timing = timing;
            JsonHttp.send(req, function (data) {
                i.timeProxy.floatReward(); //弹奖励
            });

            facade.send(this.CHUIDIAO_FISHING_BACK); //马车返回
        };

        return t;
    })();
o.ChuiDiaoProxy = r;