var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});

var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = (function() {
        function t() {
            this.KAIXUE_INFO_UPDATE = "KAIXUE_INFO_UPDATE";     //更新数据
            this.KAIXUE_PLAY_BACK = "KAIXUE_PLAY_BACK";         //转盘结果
            this.KAIXUE_PLAY_ERROR = "KAIXUE_PLAY_ERROR";       //如果转盘报错
            this.KAIXUE_EXCHANGE_BACK = "KAIXUE_EXCHANGE_BACK"; //�һ��ص�
            this.KAIXUE_RESET_BACK = "KAIXUE_RESET_BACK";       //重置数据
            this.KAIXUE_ITEM_LINQU = "KAIXUE_ITEM_LINQU";        //领取物品

            this.KAIXUE_RANK_UPDATE = "KAIXUE_RANK_UPDATE";     //排行榜数据

            this.isTrun = false;
            this.lastRwd = 0;
            this.exchange = {};
            this.data = {};
            this.myRid = {};
            this.ssRank = {};
        }
        t.prototype.ctor = function() {
            //JsonHttp.subscribe(proto_sc.starting_school.myZyRid, this.onMyRid, this);
        };
        t.prototype.clearData = function () {

        };
        t.prototype.onDataUpdate = function (t) {
            if (n.stringUtil.isBlank(t.a)) {
                cc.log("onDataUpdate is null");
                return;
            }
            this.data = t.a.starting_school.starting_school;
            this.onDhShop(t.a.starting_school.exchange);
            facade.send(this.KAIXUE_INFO_UPDATE);
        };
        t.prototype.onPlay = function (t) {
            if(!n.stringUtil.isBlank(t.a.system))
            {
                if(!n.stringUtil.isBlank(t.a.system.errror))
                {
                    facade.send(this.KAIXUE_PLAY_ERROR);
                }
            }
            if (n.stringUtil.isBlank(t.a)) {
                cc.log("onPlay is null");
                return;
            }
            if (n.stringUtil.isBlank(t.a.starting_school)) {
                cc.log("starting_school is null");
                return;
            }
            var info = t.a.starting_school.starting_school;
            this.data.win               = t.a.msgwin.items[0];
            this.data.score             = info.score;
            this.data.petals            = info.petals;
            this.data.daily_reset_count = info.daily_reset_count;
            this.data.last_reset_data   = info.last_reset_data;
            this.data.play_count        = info.play_count;
            this.data.acquired_rewards  = info.acquired_rewards;
            this.lastRwd                = info.reward_id;

            facade.send(this.KAIXUE_PLAY_BACK);
        };

        //刷新界面
        t.prototype.onRefresh = function(t){
            if(n.stringUtil.isBlank(t.a.starting_school))
            {
                cc.log("t.a.starting_school is null");
                return;
            }

            var info = t.a.starting_school.starting_school;
            this.data.score             = info.score;
            this.data.petals            = info.petals;
            this.data.daily_reset_count = info.daily_reset_count;
            this.data.last_reset_data   = info.last_reset_data;
            this.data.play_count        = info.play_count;
            this.data.acquired_rewards  = info.acquired_rewards;
            facade.send(this.KAIXUE_RESET_BACK);
        };

        //排行榜数据
        t.prototype.onRankData = function(t){
            this.myRid = t.a.starting_school.mySsRid;
            this.ssRank = t.a.starting_school.SsRank;
            facade.send(this.KAIXUE_RANK_UPDATE);
        };

        t.prototype.onDhShop = function(t) {
            this.exchange.hid = this.data ? this.data.info.type : 1;
            this.exchange.rwd = t;
            this.exchange.stime = this.data ? this.data.info.showTime : 0;
            //facade.send(this.KAIXUE_EXCHANGE_BACK);
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
        };
        //
        t.prototype.sendInfo = function () {
            var self = this;
            JsonHttp.send(new proto_cs.huodong.hd6245Info(), function (data) {
                //回调
                self.onDataUpdate(data);
            });
        };
        //转一圈
        t.prototype.sendPlay = function () {
            var self = this;
            JsonHttp.send(new proto_cs.huodong.hd6245play(), function (data) {
                //回调
                self.onPlay(data);
            });
        };
        //�һ�
        t.prototype.sendExchange = function (id) {
            var self = this;
            var o = new proto_cs.huodong.hd6245exchange();
            o.id = id;
            JsonHttp.send(o, function (data) {
                //回调
                self.onDhShop(data);
            });
        };
        //重置
        t.prototype.sendReset = function () {
            var self = this;
            JsonHttp.send(new proto_cs.huodong.hd6245reset(), function (data) {
                //回调
                self.onRefresh(data);
            });
        };
        t.prototype.sendPaiHang = function () {
            //打开排行奖励
            var self = this;
            JsonHttp.send(new proto_cs.huodong.hd6245paihang(), function(data) {
                self.onRankData(data);
            });
        };


        return t;
    })();
o.KaiXueProxy = l;
