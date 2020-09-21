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
            this.data = null;
            this.mainRoleData = null;
            this.roleRankData = null;
            this.fengyiRankData = null;
            this.myRankData = null;
            this.giftData = null;
            this.kneelData = null;
            this.LIUGONG_DATA_UPDATE = "LIUGONG_DATA_UPDATE";
            this.LIUGONG_MAIN_RANK_UPDATE = "LIUGONG_MAIN_RANK_UPDATE";
            this.LIUGONG_FENGYI_RENGYIRANK = "LIUGONG_FENGYI_RENGYIRANK";
            this.LIUGONG_FENGYI_MYRANK = "LIUGONG_FENGYI_MYRANK";
            this.LIUGONG_QA_SUCCESS = "LIUGONG_QA_SUCCESS";
            this.isDebug = false;
            this.huangHouData = null;

        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.liuGong.info, this.onBase, this);
            JsonHttp.subscribe(proto_sc.liuGong.rank, this.onMainRole, this);
            JsonHttp.subscribe(proto_sc.liuGong.fengyi_rank, this.onFengyiRankUpdate, this);
            JsonHttp.subscribe(proto_sc.liuGong.myRank, this.onMyRankUpdate, this);
            JsonHttp.subscribe(proto_sc.liuGong.qingan, this.onQinganUpdate, this);
        };

        t.prototype.clearData = function() {
            this.data = null;
            this.mainRoleData = null;
            this.roleRankData = null;
            this.fengyiRankData = null;
            this.myRankData = null;
            this.giftData = null;
            this.kneelData = null;
            this.huangHouData = null;
        };

        t.prototype.onBase = function(t) {
            if(this.isDebug) return;
            this.data = t;
            this.huangHouData = t.queen;
            if(this.huangHouData) {
                this.huangHouData.queenInfo.userInfo.clothe.body = 95;
                this.huangHouData.queenInfo.userInfo.clothe.head = 295;
                this.huangHouData.queenInfo.userInfo.clothe.ear = 395;
            }
            if(this.mainRoleData != null) {
                this.createRoleInfo();
            }
            facade.send(this.LIUGONG_DATA_UPDATE);
        };

        t.prototype.onMainRole = function(t) {
            if(this.isDebug) return;
            this.roleRankData = t;
            if(this.data != null) {
                this.createRoleInfo();
            }
            facade.send(this.LIUGONG_MAIN_RANK_UPDATE);
        };

        t.prototype.getInfo = function() {
            if(this.isDebug) return;
            JsonHttp.send(new proto_cs.liuGong.getInfo());
        };

        t.prototype.kneel = function(type, uid, callback) {
            if(this.isDebug) return;
            var proto = new proto_cs.liuGong.kneel();
            proto.id = type;
            proto.uid = uid;

            JsonHttp.send(proto, function(ret) {
                i.timeProxy.floatReward();
                if(callback) callback(ret);
            });
        };

        t.prototype.createRoleInfo = function() {
            this.mainRoleData = [];

            var tempData = this.roleRankData.concat();
            var need = this.data.need;
            for(var i = 0; i < need.length; i ++) {
                var item = {};
                for(var j = 0; j < tempData.length; j ++) {
                    if(tempData[j].new_score >= need[i].score) {
                        item.roleData = tempData[j];
                        if(i == 0) {
                            item.roleData.userInfo.clothe.body = 95;
                            item.roleData.userInfo.clothe.head = 295;
                            item.roleData.userInfo.clothe.ear = 395;
                        }
                        tempData.splice(j, 1);
                        break;
                    }
                }
                //item.empty = item.roleData == null;
                this.mainRoleData.push(item);
            }
        };
        
        t.prototype.onFengyiRankUpdate = function(t) {
            if(this.isDebug) return;
            this.fengyiRankData = t;
            facade.send(this.LIUGONG_FENGYI_RENGYIRANK);
        };

        t.prototype.onMyRankUpdate = function(t) {
            if(this.isDebug) return;
            this.myRankData = t;
            facade.send(this.LIUGONG_FENGYI_MYRANK);
        };
        t.prototype.onQinganUpdate = function(t) {
            if(this.isDebug) return;
            this.giftData = t.gift;
            this.kneelData = t.kneel;
            facade.send(this.LIUGONG_QA_SUCCESS);
            l.default.change("fenghou", this.giftData.limit > 0);
        };
        t.prototype.getFeiIndex = function(uid) {
            for(var i = 0; i < this.mainRoleData.length; i ++) {
                var item = this.mainRoleData[i];
                if(item.roleData != null && item.roleData.uid == uid) {
                    return i;
                }
            }

            return -1;
        }
        t.prototype.getFengHouOpen = function() {
            var t = i.limitActivityProxy.huodongList;
            if (t != null) {
                for (var idx = 0; idx < t.length; idx++) {
                    if (t[idx].id == i.limitActivityProxy.FENGHOU_ID) {
                        return true;
                    }
                }
            }
            return false;
        }
        return t;
    })();
o.LiuGongProxy = r;
