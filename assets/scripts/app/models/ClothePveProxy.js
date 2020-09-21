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
            this.UPDATE_CLOTHE_BASE = "UPDATE_CLOTHE_BASE";
            this.UPDATE_CLOTHE_INFO = "UPDATE_CLOTHE_INFO";
            this.UPDATE_CLOTHE_LOGS = "UPDATE_CLOTHE_LOGS";
            this.UPDATE_CLOTHE_MYSCORE = "UPDATE_CLOTHE_MYSCORE";
            this.UPDATE_CLOTHE_RANKLIST = "UPDATE_CLOTHE_RANKLIST";
            this.UPDATE_CLOTHE_WIN = "UPDATE_CLOTHE_WIN";
            this.UPDATE_CLOTHE_SCORE = "UPDATE_CLOTHE_SCORE";
            this.UPDATE_CLOTHE_PVP_INFO = "UPDATE_CLOTHE_PVP_INFO";
            this.UPDATE_CLOTHE_PVP_BASE = "UPDATE_CLOTHE_PVP_BASE";
            this.UPDATE_CLOTHE_PVP_MYRANK = "UPDATE_CLOTHE_PVP_MYRANK";
            this.UPDATE_CLOTHE_PVP_RANK = "UPDATE_CLOTHE_PVP_RANK";
            this.UPDATE_CLOTHE_PVP_MATH = "UPDATE_CLOTHE_PVP_MATH";
            this.UPDATE_CLOTHE_PVP_CLOTHE = "UPDATE_CLOTHE_PVP_CLOTHE";
            this.base = null;
            this.info = null;
            this.logs = null;
            this.myscore = null;
            this.ranklist = null;
            this.win = null;
            this.scores = null;
            this.referr = null;
            this.pvpbase = null;
            this.pvpinfo = null;
            this.pvpRankList = null;
            this.pvpMyscore = null;
            this.pvpClothe = null;
            this.pvpMath = null;
            this.pvpGrade = null;

            //目标领奖
            this.CLOTHE_PVE_GET_RWD_BACK = "CLOTHE_PVE_GET_RWD_BACK";
            this.canUseCount = 0;   //当前可领取的数量
            this.usedCount = 0;  
            this.curTheme = 0;      //    
            //end 目标领奖

            this.iconRed = false;   //保留盛装出行主界面icon的红点状态
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.clothepve.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.clothepve.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.clothepve.logs, this.onlogs, this);
            JsonHttp.subscribe(
                proto_sc.clothepve.myScore,
                this.onMyScore,
                this
            );
            JsonHttp.subscribe(
                proto_sc.clothepve.ranklist,
                this.onRankList,
                this
            );
            JsonHttp.subscribe(proto_sc.clothepve.win, this.onWin, this);
            JsonHttp.subscribe(proto_sc.clothepve.scores, this.onScores, this);
            JsonHttp.subscribe(proto_sc.clothepve.referr, this.onReferr, this);
            JsonHttp.subscribe(proto_sc.clothepvp.info, this.onPvpInfo, this);
            JsonHttp.subscribe(
                proto_sc.clothepvp.ranklist,
                this.onPvpRankList,
                this
            );
            JsonHttp.subscribe(
                proto_sc.clothepvp.myScore,
                this.onPvpMyScore,
                this
            );
            JsonHttp.subscribe(proto_sc.clothepvp.base, this.onPvpBase, this);
            JsonHttp.subscribe(
                proto_sc.clothepvp.clothe,
                this.onPvpClothe,
                this
            );
            JsonHttp.subscribe(proto_sc.clothepvp.math, this.onPvpMath, this);
            this.base = {};
            this.base.buy = 0;
            this.base.gate = 1;
            this.base.lastTime = 0;
            this.base.score = 0;
            this.base.use = 0;

            this.iconRed = false;
        };
        t.prototype.clearData = function() {
            this.base = null;
            this.info = null;
            this.logs = null;
            this.myscore = null;
            this.ranklist = null;
            this.win = null;
            this.referr = null;
            this.scores = null;
            this.pvpClothe = null;
            this.pvpbase = null;
            this.pvpinfo = null;
            this.pvpRankList = null;
            this.pvpMath = null;
            this.pvpMyscore = null;
            this.pvpGrade = null;

            this.iconRed = false;
        };
        t.prototype.onPvpInfo = function(t) {
            this.pvpinfo = t;
            this.pvpGrade = t.grade;
            facade.send(this.UPDATE_CLOTHE_PVP_INFO);
        };
        t.prototype.onPvpBase = function(t) {
            this.pvpbase = t;
            facade.send(this.UPDATE_CLOTHE_PVP_BASE);
        };
        t.prototype.onPvpRankList = function(t) {
            this.pvpRankList = t;
            facade.send(this.UPDATE_CLOTHE_PVP_RANK);
        };
        t.prototype.onPvpMyScore = function(t) {
            this.pvpMyscore = t;
            facade.send(this.UPDATE_CLOTHE_PVP_MYRANK);
        };
        t.prototype.onPvpClothe = function(t) {
            this.pvpClothe = t;
            facade.send(this.UPDATE_CLOTHE_PVP_CLOTHE);
        };
        t.prototype.onPvpMath = function(t) {
            this.pvpMath = t;
            facade.send(this.UPDATE_CLOTHE_PVP_MATH);
        };
        t.prototype.onReferr = function(t) {
            this.referr = t;
            this.referr && this.referr.fuser
                ? i.utils.openPrefabView(
                      "clothe/ClothePveInfo",
                      !1,
                      this.referr
                  )
                : i.alertUtil.alert18n("CLOTHE_PVE_INFO_NOT_FIND");
        };
        t.prototype.onBase = function(t) {
            this.base = t;
            this.updateRedDot();
            facade.send(this.UPDATE_CLOTHE_BASE);
        };
        t.prototype.updateRedDot = function(icon) {
            if(icon != null && icon != undefined)
            {
                this.iconRed = icon;
            }
            
            if(this.info == null || this.base == null)
            {
                return;
            }
            l.default.change( "clothepve", this.info.count - this.base.use > 0 );

            //目标领奖
            var showRed = false;
            for(var key in this.info.grade)
            {
                if(this.checkRwd(key) == 2)
                {
                    showRed = true;
                    break;
                }
            }
            l.default.change("mubiao",showRed);

            //外部红点
            l.default.change("clothepve", showRed || this.iconRed);
        };
        t.prototype.onInfo = function(t) {
            null == this.info
                ? (this.info = t)
                : i.utils.copyData(this.info, t);
            this.updateRedDot();
            this.curTheme = t.type;
            facade.send(this.UPDATE_CLOTHE_INFO);
        };
        t.prototype.onlogs = function(t) {
            if (null == this.logs) this.logs = t;
            else for (var e = 0; e < t.length; e++) this.logs.push(t[e]);
            this.logs.sort(function(t, e) {
                return e.time - t.time;
            });
            this.logs.length > 100 &&
                (this.logs = this.logs.slice(
                    this.logs.length - 100,
                    this.logs.length - 1
                ));
            facade.send(this.UPDATE_CLOTHE_LOGS);
        };
        t.prototype.onMyScore = function(t) {
            this.myscore = t;
            facade.send(this.UPDATE_CLOTHE_MYSCORE);
        };
        t.prototype.onRankList = function(t) {
            this.ranklist = t;
            facade.send(this.UPDATE_CLOTHE_RANKLIST);
        };
        t.prototype.onScores = function(t) {
            null == this.scores
                ? (this.scores = t)
                : i.utils.copyList(this.scores, t, "gate");
            facade.send(this.UPDATE_CLOTHE_SCORE);
        };
        t.prototype.onWin = function(t) {
            this.win = t;
            i.utils.openPrefabView("clothe/ClotheWin");
            facade.send(this.UPDATE_CLOTHE_WIN);
        };
        t.prototype.sendFight = function(t, e, o, i, n, l, r) {
            var a = new proto_cs.huodong.hd6123Fight();
            a.id = t;
            a.head = e;
            a.background = n;
            a.body = o;
            a.ear = i;
            a.effect = l;
            a.animal = r;
            JsonHttp.send(a);
        };
        t.prototype.sendClear = function(t, e) {
            var o = new proto_cs.huodong.hd6123Clear();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendAdd = function(count) {
            count = count ? count : 1;
            var req = new proto_cs.huodong.hd6123Add();
            req.num = count;
            JsonHttp.send(req);
        };
        t.prototype.sendInfo = function() {
            JsonHttp.send(new proto_cs.huodong.hd6123Info());
        };
        t.prototype.sendRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6123Rank(), function() {
                i.utils.openPrefabView("clothe/ClotheRank");
            });
        };
        t.prototype.sendReferr = function(t) {
            var e = new proto_cs.huodong.hd6123Referr();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendRwd = function(t) {
            var e = new proto_cs.huodong.hd6123Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendPvpInfo = function() {
            JsonHttp.send(new proto_cs.huodong.hd6142Info());
        };
        t.prototype.sendPvpRwd = function() {
            JsonHttp.send(new proto_cs.huodong.hd6142Rwd(), function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendPvpEnter = function(t, e, o, i, n, l) {
            var r = new proto_cs.huodong.hd6142Fight();
            r.head = t;
            r.background = i;
            r.body = e;
            r.ear = o;
            r.effect = n;
            r.animal = l;
            JsonHttp.send(r);
        };
        t.prototype.sendPvpRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6142Rank(), function() {
                i.utils.openPrefabView("clothe/ClothePvpRank");
            });
        };
        t.prototype.sendPvpZan = function(t) {
            var e = new proto_cs.huodong.hd6142Zan();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendPvpMath = function() {
            JsonHttp.send(new proto_cs.huodong.hd6142Math());
        };
        t.prototype.getScore = function(t) {
            if (null == this.scores) return null;
            for (var e = 0; e < this.scores.length; e++)
                if (this.scores[e].gate == t) return this.scores[e];
            return null;
        };
        t.prototype.getIdScore = function(t) {
            var e = this.getScore(t);
            return e ? e.score : 0;
        };

        //目标领奖
        t.prototype.checkRwd = function(target) {
            //检查是否可领取，已领取，或者不可领取
            if(target <= 0)
            {
                return 0;   //不可领取
            }

            for(var key in this.base.score_rwd_got)
            {
                if(this.base.score_rwd_got[key] == target)
                {
                    this.usedCount++;
                    return 1;   //已领取
                }
            }

            //2:可以领取, 0:不可领取
            if(this.base.clear_count >= target)
            {
                this.canUseCount++;
                return 2;
            }
            else
            {
                return 0;
            }
        };
        t.prototype.sendGetRwd = function(target) {
            var req = new proto_cs.huodong.hd6123GradeRwd();
            req.id = 0;

            var idx = 1;
            for(var key in this.info.grade)
            {
                if(target == parseInt(key))
                {
                    req.id = idx;
                    break;
                }

                idx++;
            }

            if(req.id > 0)
            {
                var self = this;
                JsonHttp.send(req, function(t){
                    if(!t.a.system.errror)
                    {
                        //拿奖品
                        n.timeProxy.floatReward();
                        //改数据
                        self.base.score_rwd_got[req.id] = target;

                        //红点
                        self.updateRedDot();
                        
                        //更新界面
                        facade.send(self.CLOTHE_PVE_GET_RWD_BACK);
                    }
                });
            }
        };
        //end目标领奖
        return t;
    })();
o.ClothePveProxy = r;
