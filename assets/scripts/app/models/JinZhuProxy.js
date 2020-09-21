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
            /**
             * cons:是玩家累积活跃度
                rwd:是玩家当前可领取的元宝数
                get:是玩家已领取的元宝数
                qualification:是玩家是否有开罐资格
             */
            this.cons = 0;
            this.get = 0;
            this.rwd = 0;
            this.qualification = 0;
            this.JINZHU_UPDATE_INFO = "JINZHU_UPDATE_INFO";
        };
        t.prototype.ctor = function () {
            // JsonHttp.subscribe(proto_sc.goldenpig.jars, this.onCfg, this);
            // JsonHttp.subscribe(proto_sc.daily.score, this.sendOpen, this);
            // JsonHttp.subscribe(proto_sc.order.back, this.sendOpen, this);
            // facade.subscribe(i.achievementProxy.UPDATE_SCORE, this.sendOpen, this);
            // facade.subscribe(i.welfareProxy.RECHARGE_SUCCESS, this.sendOpen, this);
        };

        t.prototype.onCfg = function (t) {
            this.cfg = t;
        };

        t.prototype.sendOpenActivity = function () {
            var info = new proto_cs.huodong.hd6300Info();
            JsonHttp.send(info, function (a) {
                if (a.a.system.errror == null) {
                    var jars = a.a.goldenpig.jars;
                    var proxy = i.jinZhuProxy;
                    proxy.cons = jars.cons;
                    proxy.get = jars.get;
                    proxy.rwd = jars.rwd;
                    proxy.qualification = jars.qualification;
                    proxy.cfg = jars.cfg;
                    l.default.change("jinzhu", jars.qualification && jars.rwd > jars.get);
                    facade.send(i.jinZhuProxy.JINZHU_UPDATE_INFO);
                }
            });

        };

        t.prototype.sendRwd = function () {
            var r = new proto_cs.huodong.hd6300Rwd();
            JsonHttp.send(r, function (info) {
                if (info.a.system.errror == null) {
                    i.timeProxy.floatReward();
                    i.jinZhuProxy.sendOpenActivity();
                }
            });
        }
        return t;
    })();

o.JinZhuProxy = r;
