var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = require("./TimeProxy"),
    a = (function() {
        function t() {
            this.CROSS_SHI_LI_CFG = "CROSS_SHI_LI_CFG";
            this.CROSS_USER_LIST = "CROSS_USER_LIST";
            this.CROSS_MY_KUA_SHI_LI = "CROSS_MY_KUA_SHI_LI";
            this.CROSS_QU_FU_LIST = "CROSS_QU_FU_LIST";
            this.CROSS_MY_KUA_QU_FU = "CROSS_MY_KUA_QU_FU";
            this.CROSS_CHAT = "CROSS_CHAT";

            this.CROSS_LOVE_CFG = "CROSS_LOVE_CFG";
            this.CROSS_USER_LOVE_LIST = "CROSS_USER_LOVE_LIST";
            this.CROSS_MY_KUA_LOVE = "CROSS_MY_KUA_LOVE";
            this.CROSS_QU_FU_LOVE_LIST = "CROSS_QU_FU_LOVE_LIST";
            this.CROSS_MY_KUA_QU_FU_LOVE = "CROSS_MY_KUA_QU_FU_LOVE";
            this.CROSS_LOVE_CHAT = "CROSS_LOVE_CHAT";

            this.CROSS_GONGDOU_CFG = "CROSS_GONGDOU_CFG";
            this.CROSS_USER_GONGDOU_LIST = "CROSS_USER_GONGDOU_LIST";
            this.CROSS_MY_KUA_GONGDOU = "CROSS_MY_KUA_GONGDOU";
            this.CROSS_QU_FU_GONGDOU_LIST = "CROSS_QU_FU_GONGDOU_LIST";
            this.CROSS_MY_KUA_QU_FU_GONGDOU = "CROSS_MY_KUA_QU_FU_GONGDOU";
            this.CROSS_GONGDOU_CHAT = "CROSS_GONGDOU_CHAT";

            this.FENGXIANDIAN_RANK_INFO = "FENGXIANDIAN_RANK_INFO";
            this.FENGXIANDIAN_INFO = "FENGXIANDIAN_INFO";
            this.FENGXIANDIAN_QINAN = "FENGXIANDIAN_QINAN";

            this.KUA_USER_TYPE = 131;
            this.KUA_QU_TYPE = 132;
            this.KUA_LOVE_USER_TYPE = 137;
            this.KUA_LOVE_QU_TYPE = 138;
            this.KUA_GONGDOU_USER_TYPE = 141;
            this.KUA_GONGDOU_QU_TYPE = 142;

            this.kuashili = null;
            this.userlist = null;
            this.mykuashiliRid = null;
            this.qufulist = null;
            this.mykuaquRid = null;
            this.chat = null;

            this.kualove = null;
            this.userlovelist = null;
            this.mykualoveRid = null;
            this.qufulovelist = null;
            this.mykuaquloveRid = null;
            this.lovechat = null;

            this.kuagongdou = null;
            this.usergongdoulist = null;
            this.mykuagongdouRid = null;
            this.qufugongdoulist = null;
            this.mykuaqugongdouRid = null;
            this.gongdouchat = null;

            this.dhShop = null;
            this.fengxiandian = null;
            this.fengxiandianRankInfo = null;
            this.isShow = !0;
            this.qingAn = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.kuacbhuodong.kuashili, this.onKuaShili, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.userlist, this.onUserList, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.mykuashiliRid, this.onMyKuaShiliRid, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.qufulist, this.onQuFuList, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.mykuaquRid, this.onMyKuaquRid, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.chat, this.onChat, this);
            
            JsonHttp.subscribe(proto_sc.kuacbhuodong.kualove, this.onKuaLove, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.userlovelist, this.onUserLoveList, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.mykualoveRid, this.onMyKuaLoveRid, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.qufulovelist, this.onQuFuLoveList, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.mykuaquloveRid, this.onMyKuaquLoveRid,this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.lovechat, this.onLoveChat, this);

            JsonHttp.subscribe(proto_sc.kuacbhuodong.kuagongdou, this.onKuaGongDou, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.usergongdoulist, this.onUserGongDouList, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.mykuagongdouRid, this.onMyKuaGongDouRid, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.qufugongdoulist, this.onQuFuGongDouList, this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.mykuaqugongdouRid, this.onMyKuaquGongDouRid,this);
            JsonHttp.subscribe(proto_sc.kuacbhuodong.gongdouchat, this.onGongDouChat, this);

            JsonHttp.subscribe(proto_sc.kuacbhuodong.fengxiandian, this.onFengXianDianInfo,this);
            JsonHttp.subscribe(proto_sc.fengxiandian.info, this.onFengXianDianRankInfo, this);
            JsonHttp.subscribe(proto_sc.fengxiandian.qingAn, this.onQingAn, this);
        };
        t.prototype.clearData = function() {
            this.kuashili = null;
            this.userlist = null;
            this.mykuashiliRid = null;
            this.qufulist = null;
            this.mykuaquRid = null;
            this.chat = null;

            this.kualove = null;
            this.userlovelist = null;
            this.mykualoveRid = null;
            this.qufulovelist = null;
            this.mykuaquloveRid = null;
            this.lovechat = null;

            this.dhShop = null;
            this.fengxiandian = null;
            this.fengxiandianRankInfo = null;
            this.qingAn = null;
        };

        t.prototype.onKuaShili = function(t) {
            if (null == this.kuashili) this.kuashili = t;
            else {
                t.comein && (this.kuashili.comein = t.comein);
                t.get && (this.kuashili.get = t.get);
                t.rnum && (this.kuashili.rnum = t.rnum);
                t.cd && (this.kuashili.cd = t.cd);
                t.type && (this.kuashili.type = t.type);
            }
            l.default.change("cross_qufu", 1 == t.get);
            facade.send(this.CROSS_SHI_LI_CFG);
        };
        t.prototype.onUserList = function(t) {
            this.userlist = t;
            if (t)
                for (var e = 0; e < this.userlist.length; e++)
                    this.userlist[e].type = 1;
            facade.send(this.CROSS_USER_LIST);
        };
        t.prototype.onMyKuaShiliRid = function(t) {
            this.mykuashiliRid = t;
            this.mykuashiliRid.type = 1;
            facade.send(this.CROSS_MY_KUA_SHI_LI);
        };
        t.prototype.onQuFuList = function(t) {
            this.qufulist = t;
            if (t)
                for (var e = 0; e < this.qufulist.length; e++) {
                    this.qufulist[e].type = 2;
                    this.qufulist[e].uid = null;
                }
            facade.send(this.CROSS_QU_FU_LIST);
        };
        t.prototype.onMyKuaquRid = function(t) {
            this.mykuaquRid = t;
            this.mykuaquRid.type = 2;
            this.mykuaquRid.uid = null;
            facade.send(this.CROSS_MY_KUA_QU_FU);
        };
        t.prototype.onChat = function(t) {
            this.chat = t;
            facade.send(this.CROSS_CHAT);
        };

        t.prototype.onKuaLove = function(t) {
            if (null == this.kualove) this.kualove = t;
            else {
                t.comein && (this.kualove.comein = t.comein);
                t.get && (this.kualove.get = t.get);
                t.rnum && (this.kualove.rnum = t.rnum);
                t.cd && (this.kualove.cd = t.cd);
                t.type && (this.kualove.type = t.type);
            }
            l.default.change("cross_qufu", 1 == t.get);
            facade.send(this.CROSS_LOVE_CFG);
        };
        t.prototype.onUserLoveList = function(t) {
            this.userlovelist = t;
            if (t)
                for (var e = 0; e < this.userlovelist.length; e++)
                    this.userlovelist[e].type = 1;
            facade.send(this.CROSS_USER_LOVE_LIST);
        };
        t.prototype.onMyKuaLoveRid = function(t) {
            this.mykualoveRid = t;
            this.mykualoveRid.type = 1;
            facade.send(this.CROSS_MY_KUA_LOVE);
        };
        t.prototype.onQuFuLoveList = function(t) {
            this.qufulovelist = t;
            if (t)
                for (var e = 0; e < this.qufulovelist.length; e++) {
                    this.qufulovelist[e].type = 2;
                    this.qufulovelist[e].uid = null;
                }
            facade.send(this.CROSS_QU_FU_LOVE_LIST);
        };
        t.prototype.onMyKuaquLoveRid = function(t) {
            this.mykuaquloveRid = t;
            this.mykuaquloveRid.type = 2;
            this.mykuaquloveRid.uid = null;
            facade.send(this.CROSS_MY_KUA_QU_FU_LOVE);
        };
        t.prototype.onLoveChat = function(t) {
            this.lovechat = t;
            facade.send(this.CROSS_LOVE_CHAT);
        };

        t.prototype.onKuaGongDou = function(t) {
            if (null == this.kuagongdou) this.kuagongdou = t;
            else {
                t.comein && (this.kuagongdou.comein = t.comein);
                t.get && (this.kuagongdou.get = t.get);
                t.rnum && (this.kuagongdou.rnum = t.rnum);
                t.cd && (this.kuagongdou.cd = t.cd);
                t.type && (this.kuagongdou.type = t.type);
            }
            l.default.change("cross_qufu", 1 == t.get);
            facade.send(this.CROSS_GONGDOU_CFG);
        };
        t.prototype.onUserGongDouList = function(t) {
            this.usergongdoulist = t;
            if (t)
                for (var e = 0; e < this.usergongdoulist.length; e++)
                    this.usergongdoulist[e].type = 1;
            facade.send(this.CROSS_USER_GONGDOU_LIST);
        };
        t.prototype.onMyKuaGongDouRid = function(t) {
            this.mykuagongdouRid = t;
            this.mykuagongdouRid.type = 1;
            facade.send(this.CROSS_MY_KUA_GONGDOU);
        };
        t.prototype.onQuFuGongDouList = function(t) {
            this.qufugongdoulist = t;
            if (t)
                for (var e = 0; e < this.qufugongdoulist.length; e++) {
                    this.qufugongdoulist[e].type = 2;
                    this.qufugongdoulist[e].uid = null;
                }
            facade.send(this.CROSS_QU_FU_GONGDOU_LIST);
        };
        t.prototype.onMyKuaquGongDouRid = function(t) {
            this.mykuaqugongdouRid = t;
            this.mykuaqugongdouRid.type = 2;
            this.mykuaqugongdouRid.uid = null;
            facade.send(this.CROSS_MY_KUA_QU_FU_GONGDOU);
        };
        t.prototype.onGongDouChat = function(t) {
            this.gongdouchat = t;
            facade.send(this.CROSS_GONGDOU_CHAT);
        };

        t.prototype.onFengXianDianRankInfo = function(t) {
            for(var idx = 0; idx < t.length; idx++)
            {
                /*
                for(var py = 0; py < t[idx].topPlayer.length; py++)
                {
                    cc.log(idx + " 前：" + t[idx].topPlayer[py].getT);
                }
                */
                t[idx].topPlayer.sort(function(t, e){
                    return e.getT - t.getT;
                });
                /*
                for(var py = 0; py < t[idx].topPlayer.length; py++)
                {
                    cc.log(idx + " 后：" + t[idx].topPlayer[py].getT);
                }
                */
            }
            this.fengxiandianRankInfo = t;
            facade.send(this.FENGXIANDIAN_RANK_INFO);
        };
        t.prototype.onFengXianDianInfo = function(t) {
            this.fengxiandian = t;
            if (
                !(
                    null == t ||
                    null == t.exchange ||
                    (t.exchange && 0 == t.exchange.length)
                )
            ) {
                null == this.dhShop && (this.dhShop = {});
                this.dhShop.hid = this.fengxiandian.info
                    ? this.fengxiandian.info.id
                    : 1;
                this.dhShop.rwd = t.exchange;
                this.dhShop.stime = this.fengxiandian.info
                    ? this.fengxiandian.info.showTime
                    : 0;
                facade.send(
                    i.limitActivityProxy.ACTIVITY_SHOP_UPDATE,
                    this.dhShop
                );
                facade.send(this.FENGXIANDIAN_INFO);
            }
        };
        Object.defineProperty(t.prototype, "isDiamond", {
            get: function() {
                var t = this.getQingAn(5);
                if (null == t) return !0;
                if (1 == t.type) return !1;
                if (2 == t.type) {
                    return 100 * Math.random() > 50;
                }
                return !0;
            },
            enumerable: !0,
            configurable: !0
        });
        t.prototype.onQingAn = function(t) {
            this.qingAn = t;
            this.updateRed();
            facade.send(this.FENGXIANDIAN_QINAN);
        };
        t.prototype.updateRed = function() {
            var t = !1;
            if (this.qingAn)
                for (var e = 0; e < this.qingAn.length; e++) {
                    var o = this.qingAn[e];
                    if (null != o && (5 != o.id && 0 == o.type)) {
                        t = !0;
                        break;
                    }
                }
            r.funUtils.isOpenFun(r.funUtils.fengxiandian) || (t = !1);
            l.default.change("huanggong", t);
        };
        t.prototype.sendHd313Info = function() {
            JsonHttp.send(new proto_cs.huodong.hd313Info());
        };
        t.prototype.sendHd313Get = function() {
            var t = new proto_cs.huodong.hd313Get();
            JsonHttp.send(t, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendHd313YXRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd313YXRank());
        };
        t.prototype.sendHd313UserRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd313UserRank());
        };
        t.prototype.sendHd313QuRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd313QuRank());
        };
        t.prototype.sendHd313Chat = function(t, e) {
            var o = new proto_cs.huodong.hd313Chat();
            o.msg = t;
            o.type = e;
            JsonHttp.send(o);
        };

        t.prototype.sendHd314Info = function() {
            JsonHttp.send(new proto_cs.huodong.hd314Info());
        };
        t.prototype.sendHd314Get = function() {
            var t = new proto_cs.huodong.hd314Get();
            JsonHttp.send(t, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendHd314YXRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd314YXRank());
        };
        t.prototype.sendHd314UserRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd314UserRank());
        };
        t.prototype.sendHd314QuRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd314QuRank());
        };
        t.prototype.sendHd314Chat = function(t, e) {
            var o = new proto_cs.huodong.hd314Chat();
            o.msg = t;
            o.type = e;
            JsonHttp.send(o);
        };

        t.prototype.sendHd316Info = function() {
            JsonHttp.send(new proto_cs.huodong.hd316Info());
        };
        t.prototype.sendHd316Get = function() {
            var t = new proto_cs.huodong.hd316Get();
            JsonHttp.send(t, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendHd316YXRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd316YXRank());
        };
        t.prototype.sendHd316UserRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd316UserRank());
        };
        t.prototype.sendHd316QuRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd316QuRank());
        };
        t.prototype.sendHd314Chat = function(t, e) {
            var o = new proto_cs.huodong.hd316Chat();
            o.msg = t;
            o.type = e;
            JsonHttp.send(o);
        };

        t.prototype.sendInfo = function(t) {
            if(t == i.limitActivityProxy.KUA_SHILI_ID){
                this.sendHd313Info();
            }
            else if(t == i.limitActivityProxy.KUA_LOV_ID){
                this.sendHd314Info();
            }
            else  if(t == i.limitActivityProxy.KUA_GONGDOU_ID){
                this.sendHd316Info();
            }
        };
        t.prototype.sendGet = function(t) {
            if(t == i.limitActivityProxy.KUA_SHILI_ID){
                this.sendHd313Get();
            }
            else if(t == i.limitActivityProxy.KUA_LOV_ID){
                this.sendHd314Get();
            }
            else  if(t == i.limitActivityProxy.KUA_GONGDOU_ID){
                this.sendHd316Get();
            }
        };
        t.prototype.sendYXRank = function(t) {
            if(t == i.limitActivityProxy.KUA_SHILI_ID){
                this.sendHd313YXRank();
            }
            else if(t == i.limitActivityProxy.KUA_LOV_ID){
                this.sendHd314YXRank();
            }
            else  if(t == i.limitActivityProxy.KUA_GONGDOU_ID){
                this.sendHd316YXRank();
            }
        };
        t.prototype.sendUserRank = function(t) {
            if(t == i.limitActivityProxy.KUA_SHILI_ID){
                this.sendHd313UserRank();
            }
            else if(t == i.limitActivityProxy.KUA_LOV_ID){
                this.sendHd314UserRank();
            }
            else  if(t == i.limitActivityProxy.KUA_GONGDOU_ID){
                this.sendHd316UserRank();
            }
        };
        t.prototype.sendQuRank = function(t) {
            if(t == i.limitActivityProxy.KUA_SHILI_ID){
                this.sendHd313QuRank();
            }
            else if(t == i.limitActivityProxy.KUA_LOV_ID){
                this.sendHd314QuRank();
            }
            else  if(t == i.limitActivityProxy.KUA_GONGDOU_ID){
                this.sendHd316QuRank();
            }
        };
        Object.defineProperty(t.prototype, "isShowFengXianDian", {
            get: function() {
                var t = i.limitActivityProxy.getHuodongList(
                    i.limitActivityProxy.KUA_CHONG_BANG_TYPE
                );
                if (null == t) return !1;
                for (var e = 0; e < t.length; e++)
                    if (n.timeUtil.second < t[e].showTime) return !0;
                return !1;
            },
            enumerable: !0,
            configurable: !0
        });
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6240Info());
        };
        t.prototype.sendGetInfo = function() {
            var t = new proto_cs.fengxiandian.getInfo();
            JsonHttp.send(t);
        };
        t.prototype.sendMoBai = function(t) {
            var e = new proto_cs.fengxiandian.qingAn();
            e.type = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.getCurCfg = function(t) {
            // return t == i.limitActivityProxy.KUA_SHILI_ID
            //     ? this.kuashili
            //     : t == i.limitActivityProxy.KUA_LOV_ID
            //     ? this.kualove
            //     : null;
            if(t == i.limitActivityProxy.KUA_SHILI_ID){
               return this.kuashili;
            }
            else if(t == i.limitActivityProxy.KUA_LOV_ID){
                return this.kualove;
            }
            else  if(t == i.limitActivityProxy.KUA_GONGDOU_ID){
                return this.kuagongdou;
            }

            return null;
        };
        t.prototype.isGet = function(t) {
            var e = this.getCurCfg(t);
            return null == e ? 0 : e.get;
        };
        t.prototype.getCurHuoDong = function() {
            var t = i.limitActivityProxy.getHuodongList(
                i.limitActivityProxy.KUA_CHONG_BANG_TYPE
            );
            if (null == t) return null;
            for (var e = 0; e < t.length; e++)
                if (
                    !(
                        n.timeUtil.second > t[e].showTime ||
                        n.timeUtil.second < t[e].sTime
                    )
                )
                    return t[e];
            return null;
        };
        t.prototype.getYuXuanCd = function(t) {
            var e = t - 7200;
            return Math.max(0, e - n.timeUtil.second);
        };
        t.prototype.getQingAn = function(t) {
            if (null == this.qingAn) return null;
            for (var e = 0; e < this.qingAn.length; e++) {
                var o = this.qingAn[e];
                if (null != o && t == o.id) return o;
            }
            return null;
        };
        t.prototype.getCurTop = function(t) {
            if (null == this.fengxiandianRankInfo) return null;
            for (var e = 0; e < this.fengxiandianRankInfo.length; e++) {
                var o = this.fengxiandianRankInfo[e];
                if (null != o && t == o.topKey) return o;
            }
            return null;
        };
        t.prototype.isShowMobai = function() {
            return (
                null != this.fengxiandianRankInfo &&
                this.fengxiandianRankInfo.length > 0
            );
        };
        return t;
    })();
o.CrossProxy = a;
