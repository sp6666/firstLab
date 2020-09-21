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
            this.rechargeRecords = null;
            this.kaiJiangRecords = null;
            this.rank = null;
            this.records = [];
            this.LINGLANG_DATA_UPDATE = "LINGLANG_DATA_UPDATE";
            this.LINGLANG_RECORD_UPDATE = "LINGLANG_RECORD_UPDATE";
            this.LINGLANG_RECHARGE_RECORDS_UPDATE = "LINGLANG_RECHARGE_RECORDS_UPDATE";
            this.LINGLANG_KAIJIANG_RECORDS_UPDATE = "LINGLANG_KAIJIANG_RECORDS_UPDATE";
            this.LINGLANG_MY_RANK = "LINGLANG_MY_RANK";
            this.LINGLANG_GUOQIGOUMAI = "LINGLANG_GUOQIGOUMAI";
            this.LINGLANG_ONHTINFO = "LINGLANG_ONHTINFO";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.linlang.info, this.onBase, this);
            JsonHttp.subscribe(proto_sc.linlang.lists, this.onData, this);
            JsonHttp.subscribe(proto_sc.linlang.prize_records, this.onRwdRecord, this);
            JsonHttp.subscribe(proto_sc.linlang.buy_records, this.onRechargeRecord, this);
            JsonHttp.subscribe(proto_sc.linlang.records, this.onKaiJiangRecord, this);
            JsonHttp.subscribe(proto_sc.linlang.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.linlang.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.linlang.htInfo, this.onHtInfo, this);
        };

        t.prototype.clearData = function() {
            this.base = null;
            this.data = null;
            this.rechargeRecords = null;
            this.kaiJiangRecords = null;
            this.records = [];
            this.rank = null;
        };


        t.prototype.onBase = function(t) {
            this.base = t;
            this.initData();
        };

        t.prototype.onData = function(t) {
            this.data = t;
            this.initData();
        };

        t.prototype.onRwdRecord = function(t) {
            this.records = t;
            facade.send(this.LINGLANG_RECORD_UPDATE);
        };

        t.prototype.onRechargeRecord = function(t) {
            this.rechargeRecords = t;
            facade.send(this.LINGLANG_RECHARGE_RECORDS_UPDATE);
        };

        t.prototype.onKaiJiangRecord = function(t) {
            this.kaiJiangRecords = t;
            facade.send(this.LINGLANG_KAIJIANG_RECORDS_UPDATE);
        };

        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
        };

        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.LINGLANG_MY_RANK);
        };

        t.prototype.onHtInfo = function(t) {
            if(this.data == null) return;
            if(this.data.periods_num != t.periods_num) {
                this.sendOpenActivity();
                return;
            }

            this.data.buy = t.buy;
            if(this.data.end_time != t.end_time) {
                //发生变化
                this.data.end_time = t.end_time;
                facade.send(this.LINGLANG_DATA_UPDATE);
            }else {
                facade.send(this.LINGLANG_ONHTINFO);
            }
            
            
        };

        t.prototype.initData = function() {
            if(this.base == null || this.data == null) return;
            facade.send(this.LINGLANG_DATA_UPDATE);
        };

        
        //查询
        t.prototype.sendOpenActivity = function(cb) {
            JsonHttp.send(new proto_cs.huodong.hd6506Info(), function(info) {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
            });
        };

        //购买
        t.prototype.sendBuy = function(num) {
            var o = new proto_cs.huodong.hd6506Bets();
            o.num = num;
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    //n.alertUtil.alert18n("USER_CLOTHE_UNLOCK_SUC");
                    //i.timeProxy.floatReward();
                }else {
                    //n.alertUtil.alert(info.a.system.errror);
                    if(info.a.system.errror.msg == "LUCKY_NOT_PERIODS") {
                        n.alertUtil.alert18n("LINGLANG_BUSHIDANGQIANQI");
                        facade.send(this.LINGLANG_GUOQIGOUMAI);
                    }else if(info.a.system.errror.msg == "LUCKY_LOTTERYING") {
                        //当期已进入开奖阶段
                        n.alertUtil.alert18n("LINGLANG_YIJINRUKAIJIANG");
                        facade.send(this.LINGLANG_GUOQIGOUMAI);
                    }
                }
            });
        };


        //一键获取
        t.prototype.sendRechargeRecordRwd = function() {
            var e = new proto_cs.huodong.hd6506Prize();
            JsonHttp.send(e, function(info) {
                if(info.a.system.errror == null) {
                    i.timeProxy.floatReward();
                }else {
                    n.alertUtil.alert(info.a.system.errror);
                }
            });
        };

        t.prototype.sendRechargeRecord = function(cb) {
            var o = new proto_cs.huodong.hd6506BuyRecords();
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    if(cb)cb(true);
                }else {
                    if(cb)cb(false);
                    n.alertUtil.alert(info.a.system.errror);
                }
            });
            
        };
        t.prototype.sendProgressRwd = function(id) {
            var o = new proto_cs.huodong.hd6506Rwd();
            o.id = id;
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    i.timeProxy.floatReward();
                }
            });
        };

        t.prototype.sendWinPrize = function(cb) {
            var o = new proto_cs.huodong.hd6506WinPrize();
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    if(cb)cb(true);
                }else {
                    if(cb)cb(false);
                    n.alertUtil.alert(info.a.system.errror);
                }
            });
        };

        t.prototype.sendRank = function(cb) {
            var o = new proto_cs.huodong.hd6506Rank();
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    if(cb)cb(true);
                }else {
                    if(cb)cb(false);
                    n.alertUtil.alert(info.a.system.errror);
                }
            });
            
        };

        return t;
    })();
o.LingLangProxy = r;
