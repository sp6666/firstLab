var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});

var i = require("../Initializer"),
    // tp = require("../../models/TimeProxy"),
    ut = require("../utils/Utils"),
    l = (function() {
        function t() {
            this.data = null;
            this.max = 0;       //每日看广告次数上限
            this.currTime = 0;  //每日最后一次看广告的时间戳
            this.cd = 0;        //每日看广告冷却时间
            this.count = 0;     //每日已看广告次数
            this.reward = {};
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.user.advert,
                this.onAdvert,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
        };
        t.prototype.onAdvert = function(t) {
            this.clearData();
            this.data = t;
            this.max = t.max;
            this.curTime = t.currTime;
            this.cd = t.cd;
            this.count = t.count;
            this.reward = t.reward;

            //过滤一遍广告记录，只使用今天的记录
            var curDay = ut.timeUtil.format(ut.timeUtil.second, "yyyy-MM-dd");
            var timer = ut.timeUtil.format(t.currTime, "yyyy-MM-dd");
            this.isSameDay = (curDay == timer);

            i.timeProxy.floatReward();
            //更新广告状态
            facade.send("ADVERTISE_UPDATE");
        };

        t.prototype.advertSuccess = function(){
            var e = new proto_sc.user.advert();
            JsonHttp.send(e, function(t){});
        };
        return t;
    })();
o.AdvertProxy = l;
