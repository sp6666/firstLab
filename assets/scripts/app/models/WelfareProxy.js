var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.UPDATE_WELFARE_WXQQ = "UPDATE_WELFARE_WXQQ";
            this.UPDATE_WELFARE_WIN = "UPDATE_WELFARE_WIN";
            this.UPDATE_WELFARE_VIP_FULI = "UPDATE_WELFARE_VIP_FULI";
            this.UPDATE_WELFARE_SHENJI = "UPDATE_WELFARE_SHENJI";
            this.UPDATE_WELFARE_QIANDAO = "UPDATE_WELFARE_QIANDAO";
            this.UPDATE_WELFARE_MOONCARD = "UPDATE_WELFARE_MOONCARD";
            this.UPDATE_WELFARE_GUANQUN = "UPDATE_WELFARE_GUANQUN";
            this.UPDATE_WELFARE_FCHOFULI = "UPDATE_WELFARE_FCHOFULI";
            this.UPDATE_WELFARE_ZHOUQIAN = "UPDATE_WELFARE_ZHOUQIAN";
            this.UPDATE_CHARGE_ORDER = "UPDATE_CHARGE_ORDER";
            this.UPDATE_CHANGE_WEEKS="UPDATE_CHANGE_WEEKS";
            this.UPDATE_WELFARE_ONLINE = "UPDATE_WELFARE_ONLINE";
            this.RECHARGE_SUCCESS="RECHARGE_SUCCESS";
            this.rshop = null;
            this.vipexp = null;
            this.rorder = null;
            this.qiandao = null;
            this.shenji = null;
            this.vipFuli = null;
            this.zhouqian = null;
            this.actqd = null;
            this.onlineData = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.fuli.wxqq, this.onWxqq, this);
            JsonHttp.subscribe(proto_sc.fuli.win, this.onWin, this);
            JsonHttp.subscribe(proto_sc.fuli.vipfuli, this.onVipFuli, this);
            JsonHttp.subscribe(proto_sc.fuli.shenji, this.onShenJi, this);
            JsonHttp.subscribe(proto_sc.fuli.qiandao, this.onQiandao, this);
            JsonHttp.subscribe(proto_sc.fuli.mooncard, this.onMoonCard, this);
            JsonHttp.subscribe(proto_sc.fuli.guanqun, this.onGuanQun, this);
            JsonHttp.subscribe(proto_sc.fuli.fchofuli, this.onFchoFuli, this);
            JsonHttp.subscribe(proto_sc.fuli.mGift, this.onZhouqian, this);
            JsonHttp.subscribe(proto_sc.fuli.actqd, this.onActQd, this);
            JsonHttp.subscribe(proto_sc.fuli.jxh, this.onJxh, this);
            JsonHttp.subscribe(proto_sc.order.rshop, this.onRshop, this);
            JsonHttp.subscribe(proto_sc.order.vipexp, this.onVipExp, this);
            JsonHttp.subscribe(proto_sc.order.back, this.onBack, this);
            JsonHttp.subscribe(proto_sc.order.rorder, this.onRoroder, this);
            JsonHttp.subscribe(proto_sc.fuli.online, this.onOnLine, this);
        };
        t.prototype.clearData = function() {
            this.qiandao = null;
            this.shenji = null;
            this.rshop = null;
            this.vipexp = null;
            this.rorder = null;
            this.zhouqian = null;
            this.actqd = null;
            this.onlineData = null;
        };
        t.prototype.onJxh = function(t) {
            n.timeProxy.floatReward();
        };
        t.prototype.onActQd = function(t) {
            this.actqd = t;
            i.utils.openPrefabView("welfare/ActQiandao");
        };
        t.prototype.onWxqq = function(t) {
            facade.send(this.UPDATE_WELFARE_WXQQ);
        };
        t.prototype.onWin = function(t) {
            facade.send(this.UPDATE_WELFARE_WIN);
        };
        t.prototype.onVipFuli = function(t) {
            this.vipFuli = t;
            for (var e = !1, o = 0; o < this.vipFuli.length; o++)
                if (1 == this.vipFuli[o].type) {
                    e = !0;
                    break;
                }
            l.default.change("vipreward", e);
            facade.send(this.UPDATE_WELFARE_VIP_FULI);
        };
        t.prototype.onShenJi = function(t) {
            this.shenji = t;
            facade.send(this.UPDATE_WELFARE_SHENJI);
        };
        t.prototype.onQiandao = function(t) {
            this.qiandao = t;
            l.default.change("qiandao", 0 == this.qiandao.qiandao);
            facade.send(this.UPDATE_WELFARE_QIANDAO);
        };
        t.prototype.onMoonCard = function(t) {
            facade.send(this.UPDATE_WELFARE_MOONCARD);
        };
        t.prototype.onGuanQun = function(t) {
            facade.send(this.UPDATE_WELFARE_GUANQUN);
        };
        t.prototype.onFchoFuli = function(t) {
            facade.send(this.UPDATE_WELFARE_FCHOFULI);
        };
        t.prototype.onRshop = function(t) {
            this.rshop = t;
            facade.send(this.UPDATE_CHARGE_ORDER);
        };
        t.prototype.onVipExp = function(t) {
            this.vipexp = t;
        };
        t.prototype.onBack = function(t) {
            i.alertUtil.alert18n(
                1 == t.cs ? "RECHARGE_SUCCESS" : "RECHARGE_LOST"
            );
            if(1 == t.cs){
                facade.send(this.RECHARGE_SUCCESS);
            }
        };
        t.prototype.onRoroder = function(t) {
            this.rorder = t;
        };
        t.prototype.onZhouqian = function(t) {
            this.zhouqian = t;
            l.default.change("zhouqian", 1 == this.zhouqian.isrwd);
            facade.send(this.UPDATE_WELFARE_ZHOUQIAN);
        };
        t.prototype.sendOrderBack = function() {
            JsonHttp.send(new proto_cs.order.orderBack());
            n.purchaseProxy.sendBuy();
        };
        t.prototype.onOnLine = function(t) {
            this.onlineData = t;
            l.default.change("welfare_online", this.getOnlineRed());
            facade.send(this.UPDATE_WELFARE_ONLINE);
        };
        t.prototype.getDailyList = function() {
            for (
                var t = 5 * Math.floor((this.qiandao.days - 1) / 5),
                    e = localcache.getList(localdb.table_qiandaoReward).length,
                    o = [],
                    i = 0;
                i < 15;
                i++
            ) {
                var n = new a();
                n.day = t + i + 1;
                var l =
                    n.day < this.qiandao.days ||
                    (n.day == this.qiandao.days && 1 == this.qiandao.qiandao);
                n.isQiandao = l ? 1 : 0;
                n.rwdId = ((n.day - 1) % e) + 1;
                o.push(n);
            }
            return o;
        };
        t.prototype.sendFirst = function() {
            JsonHttp.send(new proto_cs.fuli.fcho());
        };
        t.prototype.sendQiandao = function() {
            JsonHttp.send(new proto_cs.fuli.qiandao(), function() {
                n.limitActivityProxy.isHaveTypeActive(6012) ||
                    n.timeProxy.floatReward();
            });
        };
        t.prototype.sendMonth = function(t) {
            var e = new proto_cs.fuli.mooncard();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendVip = function(t) {
            var e = new proto_cs.fuli.vip();
            e.id = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendBuy = function(t) {
            var e = new proto_cs.fuli.buy();
            e.id = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendWeekItems =function(t){
            var e =new proto_cs.fuli.weekitem();
            e.idx =t;
            JsonHttp.send(e,function(){
                n.timeProxy.floatReward();
                facade.send(n.welfareProxy.UPDATE_CHANGE_WEEKS);
            })
        }
        t.prototype.senMonday = function() {
            JsonHttp.send(new proto_cs.fuli.monday(), function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.getShenjiCount = function(t) {
            if (null == this.shenji) return 0;
            for (var e = 0; e < this.shenji.length; e++)
                if (this.shenji[e].id == t) return this.shenji[e].times;
            return 0;
        };
        t.prototype.getVipState = function(t) {
            if (null == this.vipFuli) return 0;
            for (var e = 0; e < this.vipFuli.length; e++)
                if (this.vipFuli[e].id == t) return this.vipFuli[e].type;
            return 0;
        };
        t.prototype.getPriceState = function(t) {
            if (null == this.vipFuli) return 0;
            for (var e = 0; e < this.vipFuli.length; e++)
                if (this.vipFuli[e].id == t) return this.vipFuli[e].tehui;
            return 0;
        };
        t.prototype.getVipExp = function(t) {
            if (null == this.vipexp) return 0;
            for (var e = 0; e < this.vipexp.length; e++)
                if (this.vipexp[e].level == t) return this.vipexp[e].recharge;
            return 0;
        };
        t.prototype.getOnLineInfo = function() {
            var o = new proto_cs.fuli.getOnlineInfo();
            JsonHttp.send(o);
        };

        t.prototype.getOnLineRwd = function(id) {
            var o = new proto_cs.fuli.getOnlineRwd();
            o.id = id;
            JsonHttp.send(o, function(info) {
                if(info.a.system.errror == null) {
                    n.timeProxy.floatReward();
                }
            });
        };

        t.prototype.getOnlineRed = function() {
            if(this.onlineData == null) return false;
            var line_rwd = this.onlineData.line_rwd;
            for(var index = 0; index < line_rwd.length; index++) {
                if(line_rwd[index].need_time < this.onlineData.line_time && line_rwd[index].get == 0) {
                    return true;
                }
            }

            return false;
        };

        t.prototype.overEnd = function(t) {
            if(this.onlineData == null) return false;
            var onlineDataItem = this.onlineData.line_rwd[this.onlineData.line_rwd.length - 1];
            if(onlineDataItem == null) return false;
            return this.onlineData.line_time >= onlineDataItem.need_time;
        };

        t.prototype.getCountDownLevel = function() {
            var line_rwd = this.onlineData.line_rwd;
            for(var index = 0; index < line_rwd.length; index++) {
                if(line_rwd[index].need_time > this.onlineData.line_time) {
                    return index;
                }
            }

            return 0;
        }

        return t;
    })();
o.WelfareProxy = r;
var a = function() {
    this.day = 0;
    this.rwdId = 0;
    this.isQiandao = 0;
};
o.WelfareDailyData = a;
