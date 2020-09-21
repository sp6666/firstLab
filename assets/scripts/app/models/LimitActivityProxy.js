var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../component/RedDot"),
    l = require("../Initializer"),
    r = require("./TimeProxy"),
    a = (function () {
        function t() {
            this.UPDATE_LIMIT_ACTIVE_SEVEN = "UPDATE_LIMIT_ACTIVE_SEVEN";
            this.UPDATE_DUIHUAN_HUODONG = "UPDATE_DUIHUAN_HUODONG";
            this.UPDATE_DAYDAY_HUODONG = "UPDATE_DAYDAY_HUODONG";
            this.UPDATE_DUIHUAN_SHOP = "UPDATE_DUIHUAN_SHOP";
            this.LIMIT_ACTIVITY_HUO_DONG_LIST = "LIMIT_ACTIVITY_HUO_DONG_LIST";
            this.UPDATE_BOSS_LIST = "UPDATE_BOSS_LIST";
            this.UPDATE_BOSS_INFO = "UPDATE_BOSS_INFO";
            this.huodongList = null;
            this.curSelectData = null;
            this.sevenSign = null;
            this.cbRankList = null;
            this.cbMyRank = null;
            this.duihuan = null;
            this.dayday = null;
            this.duihuanShop = null;
            this.bossList = null;
            this.bossMyDmg = null;
            this.bossInfo = null;
            this.bossHit = null;
            this.bossRankList = null;
            this.superRecharge = null;
            //add by cjf 
            this.sevenDayHappy = null;
            this.isSendSevenDay = false;
            this.curExchangeId = 0;
            this.SEVEN_DAY_ID = 287;
            this.SUPPORT_ID = 6136;
            this.DUIHUAN_ID = 6152;
            this.DAYDAY_ID = 6121;
            this.DUIHUANSHOP_ID = 6122;
            this.CLOTHEPVE_ID = 6123;
            this.CLOTHEPVP_ID = 6142;
            this.VOICE_ID = 6137;
            this.TRUN_TABLE_ID = 6169;
            this.DAILY_RECHARGE = 6168;
            this.PRINCE_ID = 6181;
            this.LEVEL_GIFT_ID = 6182;
            this.CZLB_ID = 6180;
            this.SNOWMAN_ID = 6183;
            this.LXCZ_ID = 6184;
            this.GUO_LI_ID = 6187;
            this.LUCKY_BRAND_ID = 6188;
            this.LEI_TIAN_RECHARGE = 262;
            this.LANTERN_ID = 6189;
            this.ACT_BOSS_ID = 6010;
            this.JIE_QI_ID = 6211;
            this.LUCKY_CARP = 6214;
            this.TANG_YUAN_ID = 6015;
            this.GIRLS_DAY_ID = 6220;
            this.ARBOR_DAY_ID = 6221;
            this.QING_MING_ID = 6222;
            this.SPELL_ID = 6223;
            this.LION_ID = 6224;
            this.SUPER_RECHARGE_ID = 6225;
            this.SINGLE_RECHAGR_ID = 6226;
            this.LUCKY_TABLE_ID = 6227;
            this.READING_DAY_ID = 6228;
            this.LABOR_DAY_ID = 6229;
            this.DRAGON_BOAT_ID = 6230;
            this.GAO_DIAN_ID = 6231;
            this.BALLOON_ID = 6232;
            this.FOURKING_ID = 6233;
            this.HEDENG_ID = 6234;
            this.LIANGXIAO_ID = 6251;
            this.MINGYUE_ID = 6252;
            this.QIUYIN_ID = 6253;
            this.CHUIDIAO_ID = 6254;
            this.QIUSHOU_ID = 6255;
            this.QIHUAN_ID = 6260;
            this.COOPERATE_ID = 6270;

            this.MERGE_FIRST_CHARGE_ID = 6271;
            this.MERGE_DAILY_RECHARGE_ID = 6272;
            this.MERGE_DAILY_GIFT_ID = 6274;


            this.OLD_USERS_ID = 6280;
            this.OLD_USERS_PRO_ID = 6281;
            this.NEW_YEAR_ID = 6283;
            this.FINE_FOOD_ID = 6284;
            this.JINZHU_ID = 6300;
            this.JIJIN_ID = 6301;
            this.JINZHU_TYPE = 1029;
            this.FINE_FOOD_TYPE = 1014;
            this.NEW_YEAR_TYPE = 1013;
            this.SUPER_RECHARGE_PRO_ID = 6282;

            this.KUA_SHILI_ID = 313;
            this.KUA_LOV_ID = 314;
            this.KUA_GONGDOU_ID = 316;
            this.SHILI_ID = 252;
            this.LOV_ID = 253;
            this.GONGDOU_ID = 254;
            this.THIRTYDAYS_ID = 6500;
            this.QIXI_ID = 6241;
            this.ZHONGYUAN_ID = 6244;
            this.KAIXUE_ID = 6245;
            this.BISHU_ID = 6250;
            this.QIXI_PRO_ID = 6285;
            this.LIMIT_ACTIVITY_TYPE = 2;
            this.AT_LIST_TYPE = 3;
            this.RECHARGE_TYPE = 4;
            this.DAILY_LIST_TYPE = 5;
            this.SUPPORT_TYPE = 10;
            this.GIRLS_TYPE = 990;
            this.ARBOR_TYPE = 991;
            this.QING_MING_TYPE = 992;
            this.READING_TYPE = 993;
            this.SPRING_TYPE = 995;
            this.SNOWMAN_TYPE = 996;
            this.LABOR_TYPE = 997;
            this.DRAGON_BOAT_TYPE = 998;
            this.LUCKY_TABLE_TYPE = 999;
            this.BALLOON_TYPE = 1e3;
            this.HEDENG_TYPE = 1001;
            this.QIXI_TYPE = 1002;
            this.BISHU_TYPE = 1005;
            this.KUA_CHONG_BANG_TYPE = 22;
            this.ZHONGYUAN_TYPE = 1003;
            this.KAIXUE_TYPE = 1006;
            this.MINGYUE_TYPE = 1007;
            this.QIUYIN_TYPE = 1008;
            this.CHUIDIAO_TYPE = 1009;
            this.QIUSHOU_TYPE = 1010;
            this.QIHUAN_TYPE = 1011;
            this.COOPERATE_TYPE = 1012;
            this.HONGBAO_ID = 6261;
            this.SHOPPINGSTREET_ID = 6262;
            this.SHOPPINGSTREET_TYPE = 1020;
            this.JINGYI_ID = 6263;
            this.THANKSGIVING_ID = 6264;
            this.THANKSGIVING_TYPE = 1021;

            this.ZHOUNIANCHOUJIANG_ID = 6265;
            this.ZHOUNIANCHOUJIANG_TYPE = 1022;
            this.ZHOUNIAN_ID = 6266;
            this.ZHOUNIAN_TYPE = 1023;
            this.XIUYUN_ID = 6268;

            this.HONGBAO_PRO_ID = 6800;
            this.HONGBAO_PRO_TYPE = 1015;

            this.QIXI_PRO_TYPE = 1016;

            this.XIUYUN_TYPE = 1024;
            this.SHENGDAN_TYPE = 1025;
            this.OLD_USERS_PRO_TYPE = 1026;

            this.SHENGDAN_ID = 6505;
            this.FENGHOU_ID = 6269;
            this.TANG_YUAN_TYPE = 7000;
            this.LINGLANG_ID = 6506;

            this.FUXING_ID = 6507;

            this.HUODONGYUECHOUJIANG_ID = 6801;
            this.HUODONGYUECHOUJIANG_TYPE = 1027;
            this.HUODONGYUE_ID = 6802;
            this.HUODONGYUE_TYPE = 1028;


            this.XINGYUDENGLUO_ID = 6803;
            this.XINGYUDENGLUO_TYPE = 1029;

            this.LOVER_ID = 6509;
            this.LOVER_TYPE = 1030;

            this.QUEEN_ID = 6806;
            this.QUEEN_TYPE = 1033;

            this.KITE_ID = 6805;
            this.KITE_TYPE = 1032;
            this.SAKURA_ID = 6510;
            this.SAKURA_TYPE = 1031;

            this.XIXIANG_ID = 6807;
            this.XIXIANG_TYPE = 1034;

            this.SUPER_RECHARGE_UPDATE = "SUPER_RECHARGE_UPDATE";
            this.SUPER_RECHARGE_PRO_UPDATE = "SUPER_RECHARGE_PRO_UPDATE";
            this.ACTIVITY_SHOP_UPDATE = "ACTIVITY_SHOP_UPDATE";
            this.AT_LIST_RANK_UPDATE = "AT_LIST_RANK_UPDATE";
            this.AT_LIST_MY_RANK_UPDATE = "AT_LIST_MY_RANK_UPDATE";
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.xshuodong.cash, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.amy, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.coin, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.juanzhou, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.qinmi, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.shili, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.zhengwu, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.login, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.yamen, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.lianyin, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.school, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.jingshang, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.nongchan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.zhaomu, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.jishag2d, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.cjfanren, this.onCash, this);
            JsonHttp.subscribe(
                proto_sc.xshuodong.tiaozhanshu,
                this.onCash,
                this
            );
            JsonHttp.subscribe(proto_sc.xshuodong.zhenzai, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.tilidan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.huolidan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.meilizhi, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.fuyanhui, this.onCash, this);
            JsonHttp.subscribe(
                proto_sc.xshuodong.clubbosshit,
                this.onCash,
                this
            );
            JsonHttp.subscribe(
                proto_sc.xshuodong.clubbossjs,
                this.onCash,
                this
            );

            JsonHttp.subscribe(proto_sc.xshuodong.newqifu, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newchuyou, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newxufang, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newpengren, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newtreasure, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newjinglidan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newwenhou, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newjiaoji, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newlilian, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newstealdew, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newplant, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.newlingyou, this.onCash, this);

            JsonHttp.subscribe(proto_sc.xshuodong.jiulouzf, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.xsRank, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.food, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.huolidan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.treasure, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.qifu, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.jinglidan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.chuyou, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.wenhou, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.jiaoji, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.yingyuan, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.xufang, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.lilian, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.pengren, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.dzlogin, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.stealdew, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.wishing, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.plant, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.lingyou, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.hefutreasure, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.hefuplant, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.hefuqifu, this.onCash, this);
            JsonHttp.subscribe(proto_sc.xshuodong.hefuwenhou, this.onCash, this);
            JsonHttp.subscribe(
                proto_sc.czhuodong.onceRecharge,
                this.onCash,
                this
            );
            JsonHttp.subscribe(proto_sc.czhuodong.day, this.onCash, this);
            JsonHttp.subscribe(proto_sc.czhuodong.total, this.onCash, this);
            JsonHttp.subscribe(proto_sc.czhuodong.leitian, this.onCash, this);

            JsonHttp.subscribe(
                proto_sc.huodonglist.all,
                this.onHuodongList,
                this
            );
            JsonHttp.subscribe(proto_sc.sevenSign.cfg, this.onSevenSign, this);
            JsonHttp.subscribe(proto_sc.cbhuodong.shili, this.onClub, this);
            JsonHttp.subscribe(proto_sc.cbhuodong.love, this.onClub, this);
            JsonHttp.subscribe(proto_sc.cbhuodong.treasure, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.shililist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.lovelist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.treasurelist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myshiliRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myloveRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myTreaRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.duihuodong.duihuan,
                this.onDuihuan,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.guanqia, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.guanqialist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myguanqiaRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.yinliang, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.yinlianglist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myYinLiangRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.liangshi, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.liangshilist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myLiangShiRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.jiulou, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.jiuloulist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myJiuLouRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.shibing, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.shibinglist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myShiBingRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.shibing, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.shibinglist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myShiBingRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.herojb, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.herojblist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myHerojbRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.herozz, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.herozzlist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myHerozzRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.meili, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.meililist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myMeiLiRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.yamen, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.yamenlist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myyamenRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.clubyamen, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.clubyamenlist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myclubyamen,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.stealcl, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.stealcllist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myStealclRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.plants, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.plantslist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myPlantsRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.wifeskillexp,
                this.onClub,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.wifeskillexplist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.myWifeskillexpRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.cbhuodong.sonshili, this.onClub, this);
            JsonHttp.subscribe(
                proto_sc.cbhuodong.sonshililist,
                this.onCbRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cbhuodong.mySonshiliRid,
                this.onMyCbRank,
                this
            );
            JsonHttp.subscribe(proto_sc.daydaybuy.dayday, this.onDayDay, this);
            JsonHttp.subscribe(
                proto_sc.duihuanshop.shop,
                this.onDuihuanShop,
                this
            );
            JsonHttp.subscribe(proto_sc.actboss.flist, this.onBossList, this);
            JsonHttp.subscribe(proto_sc.actboss.hit, this.onBossHit, this);
            JsonHttp.subscribe(proto_sc.actboss.info, this.onBossInfo, this);
            JsonHttp.subscribe(proto_sc.actboss.myDmg, this.onBossMyDmg, this);
            JsonHttp.subscribe(
                proto_sc.actboss.rankList,
                this.onBossRankList,
                this
            );
            JsonHttp.subscribe(
                proto_sc.cjttczhuodong.cjttcz,
                this.onSuperRecharge,
                this
            );

            JsonHttp.subscribe(
                proto_sc.ltrecharge.leitian,
                this.onSuperRechargePro,
                this
            );
            //add by cjf 
            JsonHttp.subscribe(
                proto_sc.sevenday.data,
                this.onSevenHappyData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.sevenday.buy,
                this.onSevenHappyBuy,
                this
            );
            JsonHttp.subscribe(
                proto_sc.sevenday.point,
                this.onSevenHappyPoint,
                this
            );
            JsonHttp.subscribe(
                proto_sc.sevenday.taskdata,
                this.onSevenHappyTask,
                this
            );
            facade.subscribe(
                l.playerProxy.PLAYER_USER_UPDATE,
                this.updateSevenHappyRed,
                this
            );
        };
        t.prototype.clearData = function () {
            this.huodongList = null;
            this.curSelectData = null;
            this.sevenSign = null;
            this.cbRankList = null;
            this.cbMyRank = null;
            this.duihuan = null;
            this.dayday = null;
            this.duihuanShop = null;
            this.bossList = null;
            this.bossInfo = null;
            this.bossHit = null;
            this.bossMyDmg = null;
            this.bossRankList = null;
            this.superRecharge = null;
            this.superRechargePro = null;
            this.curExchangeId = null;
            this.sevenDayHappy = null;
        };
        t.prototype.onDuihuanShop = function (t) {
            this.duihuanShop = t;
            n.default.change(
                "duihuanshop",
                null != t && t.info && 1 == t.info.news
            );
            facade.send(this.UPDATE_DUIHUAN_SHOP);
        };
        t.prototype.onDayDay = function (t) {
            this.dayday = t;
            n.default.change("dayday", null != t && t.info && 1 == t.info.news);
            facade.send(this.UPDATE_DAYDAY_HUODONG);
        };
        t.prototype.onDuihuan = function (t) {
            this.duihuan = t;
            n.default.change(
                "duihuan",
                null != t && t.info && 1 == t.info.news
            );
            facade.send(this.UPDATE_DUIHUAN_HUODONG);
        };
        t.prototype.onCash = function (t) {
            facade.send("LIMIT_ACTIVITY_UPDATE", t);
        };
        t.prototype.onClub = function (t) {
            facade.send("AT_LIST_UPDATE", t);
        };
        t.prototype.onHuodongList = function (t) {
            null == this.huodongList ?
                (this.huodongList = t) :
                i.utils.copyList(this.huodongList, t);
            for (var e = {}, o = 0; o < this.huodongList.length; o++)
                this.huodongList[o] &&
                1 == this.huodongList[o].news &&
                (e[this.huodongList[o].type] = 1);

            //this.huodongList[0].id = this.LIANGXIAO_ID;
            //this.huodongList[0].type = this.LIANGXIAO_ID;
            n.default.change("limitactivity", 1 == e[this.LIMIT_ACTIVITY_TYPE]);
            n.default.change("atlist", 1 == e[this.AT_LIST_TYPE]);
            n.default.change("dailylist", 1 == e[this.DAILY_LIST_TYPE]);

            null == this.duihuan &&
                n.default.change("duihuan", 1 == e[this.DUIHUAN_ID]);
            null == this.dayday &&
                n.default.change("dayday", 1 == e[this.DAYDAY_ID]);
            n.default.change("support", 1 == e[this.SUPPORT_ID]);
            n.default.change("rechage_activity", 1 == e[this.RECHARGE_TYPE]);
            n.default.change("daily_recharge", 1 == e[this.DAILY_RECHARGE]);
            n.default.change("prince", 1 == e[this.PRINCE_ID]);
            n.default.change("clothepve", 1 == e[this.CLOTHEPVE_ID]);
            l.clothePveProxy.updateRedDot(1 == e[this.CLOTHEPVE_ID]);

            n.default.change("levelgift", 1 == e[this.LEVEL_GIFT_ID]);
            n.default.change("snowman_activity", 1 == e[this.SNOWMAN_TYPE]);
            n.default.change("snowman", 1 == e[this.SNOWMAN_ID]);
            n.default.change("hedeng_activity", 1 == e[this.HEDENG_TYPE]);
            n.default.change("hedeng", 1 == e[this.HEDENG_ID]);
            n.default.change("clothepvp", 1 == e[this.CLOTHEPVP_ID]);
            n.default.change("continuity_recharge", 1 == e[this.LXCZ_ID]);
            n.default.change("purchase", 1 == e[this.CZLB_ID]);
            n.default.change("lucky_brand", 1 == e[this.LUCKY_BRAND_ID]);
            n.default.change("lantern", 1 == e[this.LANTERN_ID]);
            n.default.change("jieqi", 1 == e[this.JIE_QI_ID]);
            n.default.change("girlsday", 1 == e[this.GIRLS_DAY_ID]);
            n.default.change("girlsday_activity", 1 == e[this.GIRLS_TYPE]);
            n.default.change("arborday", 1 == e[this.ARBOR_DAY_ID]);
            n.default.change("arbor_activity", 1 == e[this.ARBOR_TYPE]);
            n.default.change("spell", 1 == e[this.SPELL_ID]);
            n.default.change("qingming_activity", 1 == e[this.QING_MING_TYPE]);
            n.default.change("qingming", 1 == e[this.QING_MING_ID]);
            n.default.change("super_recharge", 1 == e[this.SUPER_RECHARGE_ID]);
            n.default.change("super_recharge_pro", 1 == e[this.SUPER_RECHARGE_PRO_ID]);

            n.default.change("readingday", 1 == e[this.READING_DAY_ID]);
            n.default.change("readingday_activity", 1 == e[this.READING_TYPE]);
            n.default.change("single_recharge", 1 == e[this.SINGLE_RECHAGR_ID]);
            n.default.change("laborday", 1 == e[this.LABOR_DAY_ID]);
            n.default.change("laborday_activity", 1 == e[this.LABOR_TYPE]);
            n.default.change("lion", 1 == e[this.LION_ID]);
            n.default.change("luckytable", 1 == e[this.LUCKY_TABLE_ID]);
            n.default.change(
                "dragonboat_activity",
                1 == e[this.DRAGON_BOAT_TYPE]
            );
            n.default.change("dragonboat", 1 == e[this.DRAGON_BOAT_ID]);
            n.default.change(
                "luckytable_activity",
                1 == e[this.LUCKY_TABLE_TYPE]
            );
            n.default.change("balloon_activity", 1 == e[this.BALLOON_TYPE]);
            n.default.change("balloon", 1 == e[this.BALLOON_ID]);
            n.default.change("bishu_activity", 1 == e[this.BISHU_TYPE]);
            n.default.change("bishu", 1 == e[this.BISHU_ID]);
            n.default.change("fourking", 1 == e[this.FOURKING_ID]);
            n.default.change("gaodian", 1 == e[this.GAO_DIAN_ID]);
            n.default.change("thirtydays", 1 == e[this.THIRTYDAYS_ID]);
            n.default.change("cross", 1 == e[this.KUA_CHONG_BANG_TYPE]);
            n.default.change("qixi", 1 == e[this.QIXI_ID]);
            n.default.change("qixi_activity", 1 == e[this.QIXI_TYPE]);
            n.default.change("qixi_pro", 1 == e[this.QIXI_PRO_ID]);
            n.default.change("qixi_pro_activity", 1 == e[this.QIXI_PRO_TYPE]);
            n.default.change("zhongyuan", 1 == e[this.ZHONGYUAN_ID]);
            n.default.change("zhongyuan_activity", 1 == e[this.ZHONGYUAN_TYPE]);
            n.default.change("kaixue", 1 == e[this.KAIXUE_ID]);
            n.default.change("kaixue_activity", 1 == e[this.KAIXUE_TYPE]);
            n.default.change("liangxiao", 1 == e[this.LIANGXIAO_ID]);
            n.default.change("mingyue", 1 == e[this.MINGYUE_ID]);
            n.default.change("mingyue_activity", 1 == e[this.MINGYUE_TYPE]);
            n.default.change("qiuyin", 1 == e[this.QIUYIN_ID]);
            n.default.change("qiuyin_activity", 1 == e[this.QIUYIN_TYPE]);
            n.default.change("chuidiao", 1 == e[this.CHUIDIAO_ID]);
            n.default.change("chuidiao_activity", 1 == e[this.CHUIDIAO_TYPE]);
            n.default.change("qiushou", 1 == e[this.QIUSHOU_ID]);
            n.default.change("qiushou_activity", 1 == e[this.QIUSHOU_TYPE]);
            n.default.change("qihuan", 1 == e[this.QIHUAN_ID]);
            n.default.change("qihuan_activity", 1 == e[this.QIHUAN_TYPE]);
            n.default.change("cooperate", 1 == e[this.COOPERATE_ID]);
            n.default.change("cooperate_activity", 1 == e[this.COOPERATE_TYPE]);
            n.default.change("hongbao", 1 == e[this.HONGBAO_ID]);
            n.default.change("shoppingStreet", 1 == e[this.SHOPPINGSTREET_ID]);
            n.default.change("jingYiHuaShang", 1 == e[this.JINGYI_ID]);
            n.default.change("shoppingStreet_activity", 1 == e[this.SHOPPINGSTREET_TYPE]);

            n.default.change("hongbao_pro", 1 == e[this.HONGBAO_PRO_ID]);
            n.default.change("hongbao_pro_activity", 1 == e[this.HONGBAO_PRO_TYPE]);

            n.default.change("mergeDailyGift", 1 == e[this.MERGE_DAILY_GIFT_ID]);
            n.default.change("mergedaily_recharge", 1 == e[this.MERGE_DAILY_RECHARGE_ID]);

            n.default.change("thanksGiving", 1 == e[this.THANKSGIVING_ID]);
            n.default.change("thanksGiving_activity", 1 == e[this.THANKSGIVING_TYPE]);

            n.default.change("oldUsers", 1 == e[this.OLD_USERS_ID]);
            n.default.change("normalUsers", 1 == e[this.OLD_USERS_PRO_ID]);
            n.default.change("normalUsers_activity", 1 == e[this.OLD_USERS_PRO_TYPE]);

            n.default.change("new_year", 1 == e[this.NEW_YEAR_ID]);
            n.default.change("new_year_activity", 1 == e[this.NEW_YEAR_TYPE]);

            n.default.change("fine_food", 1 == e[this.FINE_FOOD_ID]);
            n.default.change("fine_food_activity", 1 == e[this.FINE_FOOD_TYPE]);

            n.default.change("zhouNianChouJiang", 1 == e[this.ZHOUNIANCHOUJIANG_ID]);
            n.default.change("zhouNianChouJiang_activity", 1 == e[this.ZHOUNIANCHOUJIANG_TYPE]);

            n.default.change("zhouNian", 1 == e[this.ZHOUNIAN_ID]);
            n.default.change("zhouNian_activity", 1 == e[this.ZHOUNIAN_TYPE]);

            n.default.change("xiuYun", 1 == e[this.XIUYUN_ID]);
            n.default.change("xiuYun_activity", 1 == e[this.XIUYUN_TYPE]);

            n.default.change("xiXiang", 1 == e[this.XIXIANG_ID]);
            n.default.change("xiXiang_activity", 1 == e[this.XIXIANG_TYPE]);

            n.default.change("christmas", 1 == e[this.SHENGDAN_ID]);
            n.default.change("christmas_activity", 1 == e[this.SHENGDAN_TYPE]);

            n.default.change("fengHou", 1 == e[this.FENGHOU_ID]);
            n.default.change("tangyuan", 1 == e[this.TANG_YUAN_ID]);
            n.default.change("tangyuan_activity", 1 == e[this.TANG_YUAN_TYPE]);
            n.default.change("linglang", 1 == e[this.LINGLANG_ID]);

            n.default.change("fuxing", 1 == e[this.FUXING_ID]);


            n.default.change("huoDongYueChouJiang", 1 == e[this.HUODONGYUECHOUJIANG_ID]);
            n.default.change("huoDongYueChouJiang_activity", 1 == e[this.HUODONGYUECHOUJIANG_TYPE]);

            n.default.change("huoDongYue", 1 == e[this.HUODONGYUE_ID]);
            n.default.change("huoDongYue_activity", 1 == e[this.HUODONGYUE_TYPE]);

            n.default.change("queen", 1 == e[this.QUEEN_ID]);
            n.default.change("queen_activity", 1 == e[this.QUEEN_TYPE]);

            n.default.change("lover", 1 == e[this.LOVER_ID]);
            n.default.change("lover_activity", 1 == e[this.LOVER_TYPE]);


            n.default.change("kite", 1 == e[this.KITE_ID]);
            n.default.change("kite_activity", 1 == e[this.KITE_TYPE]);

            n.default.change("xingYuDengLuo_activity", 1 == e[this.XINGYUDENGLUO_TYPE]);

            n.default.change("jinzhu", 1 == e[this.JINZHU_ID]);
            n.default.change("jinzhu_type", 1 == e[this.JINZHU_TYPE]);
            n.default.change("jiJinChengZhang", 1 == e[this.JIJIN_ID]);

            n.default.change("sakura", 1 == e[this.SAKURA_ID]);
            n.default.change("sakura_activity", 1 == e[this.SAKURA_TYPE]);
            facade.send(this.LIMIT_ACTIVITY_HUO_DONG_LIST);
            //检查衣服配置
            //this.checkUserActive();
        };
        t.prototype.checkUserActive = function () {
            var tabClothe = localcache.getList(localdb.table_userClothe);
            var tabSuit = localcache.getList(localdb.table_usersuit);
            for (var idx = 0; idx < tabClothe.length; idx++) {
                this.checkItem(tabClothe[idx]);
            }
            for (var idx = 0; idx < tabSuit.length; idx++) {
                this.checkItem(tabSuit[idx]);
            }
        };
        t.prototype.checkItem = function (item) {
            var sec = i.timeUtil.str2Second(item.show_time);
            var timeok = i.timeUtil.second >= sec;
            var activeok = this.isHaveTypeActive(item.show_avid);

            if (!timeok) {
                //
                cc.log("-----huodong id:" + item.id + " time:" + item.show_time);
            }
            if (!activeok) {
                cc.log("+++++huodong id:" + item.id + " advid:" + item.show_avid + " not open");
            }
        };
        t.prototype.isHaveTypeActive = function (t) {
            if (null == this.huodongList) return !1;
            for (var e = 0; e < this.huodongList.length; e++) {
                if (this.huodongList[e].type == t && i.timeUtil.second < this.huodongList[e].showTime) {
                    return !0;
                }
                if (this.huodongList[e].groupId && this.huodongList[e].groupId == t && i.timeUtil.second < this.huodongList[e].showTime) {
                    return !0;
                }
            }


            return !1;
        };
        t.prototype.onCbRank = function (t) {
            this.cbRankList = t;
            facade.send(this.AT_LIST_RANK_UPDATE);
        };
        t.prototype.onMyCbRank = function (t) {
            this.cbMyRank = t;
            facade.send("AT_LIST_MY_RANK_UPDATE");
        };
        t.prototype.getHuodongList = function (t) {
            var e = [];
            if (null == this.huodongList) return e;
            for (var o = 0; o < this.huodongList.length; o++)
                this.huodongList[o].type == t ?
                e.push(this.huodongList[o]) :
                this.huodongList[o].type == t &&
                e.push(this.huodongList[o]);
            e.sort(this.sortHuodong);
            return e;
        };

        t.prototype.getHuodongListByGID = function (t) {
            var e = [];
            if (null == this.huodongList) return e;
            for (var o = 0; o < this.huodongList.length; o++)
                this.huodongList[o].groupId == t ?
                e.push(this.huodongList[o]) :
                this.huodongList[o].groupId == t &&
                e.push(this.huodongList[o]);
            e.sort(this.sortHuodong);
            return e;
        };

        t.prototype.sortHuodong = function (t, e) {
            return t.news > e.news ? -1 : t.news == e.news ? t.id - e.id : 1;
        };
        t.prototype.sendLookActivityData = function (t, e) {
            void 0 === e && (e = null);
            JsonHttp.send(
                new proto_cs.huodong["hd" + t + "Info"](),
                function () {
                    e && e();
                }
            );
        };
        t.prototype.sendGetActivityReward = function (t, e) {
            void 0 === e && (e = 0);
            var o = new proto_cs.huodong["hd" + t + "Rwd"]();
            0 != e && (o.id = e);
            JsonHttp.send(o, function () {
                l.timeProxy.floatReward();
            });
        };
        t.prototype.sendActivityShopExchange = function (t, e) {
            void 0 === e && (e = 0);
            var o = new proto_cs.huodong["hd" + t + "exchange"]();
            0 != e && (o.id = e);
            var self = this;
            JsonHttp.send(o, function () {
                l.timeProxy.floatReward();
                if (t == self.KAIXUE_ID) {
                    l.kaixueProxy.getExchange();
                }
            });
        };
        t.prototype.onSevenSign = function (t) {
            this.sevenSign = t;
            for (var e = !1, o = 0; o < this.sevenSign.level.length; o++)
                if (1 == this.sevenSign.level[o].type) {
                    e = !0;
                    break;
                }
            n.default.change("sevenday", e);
            facade.send(this.UPDATE_LIMIT_ACTIVE_SEVEN);
        };
        t.prototype.sendSevenRwd = function (t) {
            var e = new proto_cs.huodong.hd287Get();
            e.id = t;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };
        t.prototype.sendHdList = function () {
            JsonHttp.send(new proto_cs.huodong.hdList());
        };
        t.prototype.getActivityData = function (t) {
            var e = null;
            if (this.huodongList)
                for (var o = 0; o < this.huodongList.length; o++)
                    if (t == this.huodongList[o].id) {
                        e = this.huodongList[o];
                        break;
                    }
            return e;
        };
        t.prototype.onBossList = function (t) {
            this.bossList = t;
            facade.send(this.UPDATE_BOSS_LIST);
        };
        t.prototype.onBossHit = function (t) {
            this.bossHit = t;
        };
        t.prototype.onBossInfo = function (t) {
            this.bossInfo = t;
            facade.send(this.UPDATE_BOSS_INFO);
        };
        t.prototype.onBossMyDmg = function (t) {
            this.bossMyDmg = t;
        };
        t.prototype.onBossRankList = function (t) {
            this.bossRankList = t;
        };
        t.prototype.onSuperRecharge = function (t) {
            this.superRecharge = t;
            facade.send("SUPER_RECHARGE_UPDATE");
        };
        t.prototype.onSuperRechargePro = function (t) {
            this.superRechargePro = t;


            this.onSuperRechargeProRed(t);
            this.onSuperRechargeProDayRed(t);

            facade.send("SUPER_RECHARGE_PRO_UPDATE");
        };
        t.prototype.onSuperRechargeProDayRed = function (t) {
            if (!t) {
                return;
            }

            var indexA = [600, 1980, 3280];

            for (var day = 0; day < 7; day++) {
                var arr = t.rwd[day];

                var str = 'superRechargeProDay' + (day + 1);

                n.default.change(str, false);

                for (var i = 0; i < 3; i++) {
                    var num = t.cons[arr.id] ? t.cons[arr.id] : 0;
                    if (0 === arr[indexA[i]].get && num >= indexA[i]) {
                        n.default.change(str, true);
                        break;
                    }
                }
            }
        };

        t.prototype.onSuperRechargeProRed = function (t) {

            if (!t) {
                return;
            }

            var continuity = t.continuity;
            var daySet = t.day;

            var e = 600;

            for (var cashIndex = 0; cashIndex < 3; cashIndex++) {
                switch (cashIndex + 1) {
                    case 1:
                        e = 600;
                        break;
                    case 2:
                        e = 1980;
                        break;
                    case 3:
                        e = 3280;
                        break;
                }

                var day = [3, 5, 7];
                if (cashIndex === 2) {
                    day = [1, 3, 5];
                }

                var str = 'super_recharge_pro' + cashIndex;
                n.default.change(str, false);

                for (var j = 0; j < 3; j++) {
                    if (daySet[e] >= day[j] && continuity[j][e].get === 0) {
                        n.default.change(str, true);
                        break;
                    }
                }
            }

        };

        t.prototype.onSevenHappyData = function (t) {
            this.sevenDayHappy = t;
            //l.timeProxy.floatReward();
            this.updateSevenHappyRed();
            facade.send("SEVENDAY_HAPPY_DATA", t);
        }
        t.prototype.onSevenHappyBuy = function (t) {
            if (!this.sevenDayHappy.sale || !this.sevenDayHappy.length)
                this.sevenDayHappy.sale = [t];
            else {
                let isHasBuy = false;
                for (let index = 0; index < this.sevenDayHappy.sale.length; index++) {
                    let id = this.sevenDayHappy.sale[index].id;
                    if (id == t.id) {
                        isHasBuy = true;
                        this.sevenDayHappy.sale[index].count = t.count;
                        break;
                    }
                }
                if (!isHasBuy)
                    this.sevenDayHappy.sale.push(t);
            }
            facade.send("SEVENDAY_HAPPY_BUY", t);
        }

        t.prototype.onSevenHappyPoint = function (t) {
            this.sevenDayHappy.point = t.point;
            this.updateSevenHappyTask();
        }

        t.prototype.onSevenHappyTask = function (t) {
            for (let ti = 0; ti < t.length; ti++) {
                const element = t[ti];
                if (this.sevenDayHappy.taskid && this.sevenDayHappy.taskid.length) {
                    let taskIndex = this.sevenDayHappy.taskid.indexOf(element[0]);
                    if (taskIndex > -1) {
                        this.sevenDayHappy.taskcount[taskIndex] = element[1];
                    } else {
                        this.sevenDayHappy.taskid.push(element[0]);
                        let leng = this.sevenDayHappy.taskid.length;
                        this.sevenDayHappy.taskcount[leng - 1] = element[1];
                    }
                } else {
                    this.sevenDayHappy.taskid = []
                    this.sevenDayHappy.taskcount = []
                    this.sevenDayHappy.taskid.push(element[0]);
                    this.sevenDayHappy.taskcount.push(element[1]);
                }
            }
            this.updateSevenHappyTask();
            l.timeProxy.floatReward();
            facade.send("SEVENDAY_HAPPY_DATA", t);
        }

        t.prototype.updateSevenHappyRed = function () {
            if (!this.sevenDayHappy) {
                return;
            }
            this.updateSevenHappyTask(null);
            this.updateSevenHappyPoint();
        }

        t.prototype.updateSevenHappyPoint = function () {
            if (!this.sevenDayHappy || !this.sevenDayHappy == [])
                return;
            var table = localcache.getList(localdb.table_sevenday_rwdlist);
            var isRed;
            //根据积分更新奖品
            var rwd = this.sevenDayHappy.rwd;
            var rwdCount = (rwd && rwd.length) ? rwd[rwd.length - 1] : 0;
            var itemData = table[rwdCount];
            if (!itemData)
                isRed = false;
            else
                isRed = t >= itemData.points;
            n.default.change("SevenHappyDayAward", isRed);
        }

        t.prototype.updateSevenHappyTask = function (d) {
            var day = this.sevenDayHappy.day;
            var table = localcache.getList(localdb.table_sevenday_task);
            var openDayRed = [false, false, false, false, false, false, false, false];
            var taskRed = [];
            if (!this.sevenDayHappy || this.sevenDayHappy == [])
                return;
            for (let ti = 0; ti < table.length; ti++) {
                const taskData = table[ti];
                if (!taskData)
                    continue;
                if (~~taskData.openday > day)
                    continue;
                if (this.sevenDayHappy.done && this.sevenDayHappy.done.length && this.sevenDayHappy.done.indexOf(taskData.id) > -1)
                    continue;
                var list;
                var count = 0;
                switch (taskData.type) {
                    case 65: //任意知己技能等级达到10级
                        list = l.wifeProxy.wifeList;
                        if (list) {
                            for (let index = 0; index < list.length; index++) {
                                const wife = list[index];
                                for (const wifeSkill of wife.skill) {
                                    if (wifeSkill.level > count)
                                        count = wifeSkill.level;
                                }
                            }
                        }
                        break;
                    case 7: //"通关剧情第1章\"凤栖于梧\""
                        count = l.playerProxy.userData.bmap;
                        break;
                    case 14: //"身份晋升为“慎容”"
                        count = l.playerProxy.userData.level;
                        break;
                    case 60: //"收集5件不重复的服装"
                        count = l.playerProxy.clothes ? l.playerProxy.clothes.length : 0;
                        break;
                    case 5: //"1个伙伴等级达到10"
                        list = l.servantProxy.servantList;
                        for (let index = 0; index < list.length; index++) {
                            const servant = list[index];
                            if (servant.level >= taskData.set[1])
                                count++;
                        }
                        break;
                    case 62: //"伙伴总资质达到60"
                        list = l.servantProxy.servantList;
                        for (let index = 0; index < list.length; index++) {
                            const servant = list[index];
                            for (const zz in servant.zz) {
                                if (servant.zz.hasOwnProperty(zz)) {
                                    count += servant.zz[zz];
                                }
                            }
                        }
                        break;
                    default:
                        if (this.sevenDayHappy.taskid && this.sevenDayHappy.taskid.length) {
                            let taskIndex = this.sevenDayHappy.taskid.indexOf(taskData.id);
                            if (taskIndex > -1) {
                                count = this.sevenDayHappy.taskcount[taskIndex];
                            }
                        }
                        break;
                }
                var isRed = count >= taskData.set[0];
                if (openDayRed[taskData.openday] != true)
                    openDayRed[taskData.openday] = isRed;
                if (d && ~~taskData.openday == d) {
                    if (taskRed[taskData.type] != true)
                        taskRed[taskData.type] = isRed;
                    n.default.change("SevenHappyTask" + taskData.type, taskRed[taskData.type]);
                }
            }
            for (let di = 0; di < openDayRed.length; di++) {
                const dayRed = openDayRed[di];
                n.default.change("SevenHappyDay" + di, dayRed);
            }
        }

        t.prototype.sendBossRank = function (t) {
            var e = this;
            JsonHttp.send(new proto_cs.huodong.hd6010Rank(), function () {
                var t = {};
                t.rank = e.bossMyDmg.g2dmyrank;
                t.value = e.bossMyDmg.g2dmydamage;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: "ACTBOSS_RANK",
                    list: e.bossRankList,
                    mine: t
                });
            });
        };
        t.prototype.sendBossBack = function (t) {
            var e = new proto_cs.huodong.hd6010Add();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendBossHit = function (t, e) {
            var o = new proto_cs.huodong.hd6010Fight();
            o.id = t;
            o.type = e;
            JsonHttp.send(o, function () {
                l.timeProxy.floatReward();
            });
        };
        t.prototype.sendSpecialBuy = function (t, e, o) {
            var n = this.getActivityData(t);
            if (n && i.timeUtil.second > n.eTime)
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                var r = new proto_cs.huodong["hd" + t + "buy"]();
                r.id = e;
                r.num = parseInt(o);
                JsonHttp.send(r, function () {
                    l.timeProxy.floatReward();
                });
            }
        };
        t.prototype.sendOpenSuperRecharge = function () {
            JsonHttp.send(new proto_cs.huodong.hd6225Info());
        };
        t.prototype.sendGetSuperRechargeRwd = function (t) {
            var e = new proto_cs.huodong.hd6225Rwd();
            e.id = t;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetSuperRechargeTotal = function (t) {
            var e = new proto_cs.huodong.hd6225TotalRwd();
            e.id = t;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };


        t.prototype.sendOpenSuperRechargePro = function () {
            JsonHttp.send(new proto_cs.huodong.hd6282Info());
        };
        t.prototype.sendGetSuperRechargeProRwd = function (t, level) {
            var e = new proto_cs.huodong.hd6282Rwd();
            e.id = t;
            e.level = level;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetSuperRechargeProTotal = function (t, level) {
            var e = new proto_cs.huodong.hd6282TotalRwd();
            e.id = t;
            e.level = level;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };

        t.prototype.sendScoreChange = function (t, e) {
            var o = new proto_cs.huodong["hd" + t + "duihuan"]();
            o.id = e;
            JsonHttp.send(o, function () {
                l.timeProxy.floatReward();
            });
        };
        return t;
    })();
o.LimitActivityProxy = a;
var s = (function () {
    function t() {
        this._list = null;
    }
    t.prototype.initLeftList = function () {
        if (!this._list) {
            this._list = [];
            this._list.push({
                funitem: r.funUtils.fengHou,
                url: "btn_fenghou",
                binding: ["fenghou"],
                type: 1,
                id: l.limitActivityProxy.FENGHOU_ID
            });
            this._list.push({
                funitem: r.funUtils.queen,
                url: "btn_queen",
                binding: ["queen", "queen_activity", "queen_reward"],
                type: 1,
                id: l.limitActivityProxy.QUEEN_ID
            });
            this._list.push({
                funitem: r.funUtils.kite,
                url: "btn_kite",
                binding: ["kite", "kite_activity", "kite_reward"],
                type: 1,
                id: l.limitActivityProxy.KITE_ID
            });
            this._list.push({
                funitem: r.funUtils.lover,
                url: "btn_lover",
                binding: ["lover", "lover_activity", "lover_reward"],
                type: 1,
                id: l.limitActivityProxy.LOVER_ID
            });
            this._list.push({
                funitem: r.funUtils.xingYuDengLuo,
                url: "btn_xydl",
                binding: ["xingYuDengLuo_activity", "xingYuDengLuoLeiji"],
                type: 1,
                id: l.limitActivityProxy.XINGYUDENGLUO_ID
            });
            this._list.push({
                funitem: r.funUtils.qixiPro,
                url: "btn_qixi_pro",
                binding: ["qixi_pro", "qixi_pro_activity"],
                type: 1,
                id: l.limitActivityProxy.QIXI_PRO_ID
            });
            this._list.push({
                funitem: r.funUtils.tangyuan,
                url: "btn_qty",
                binding: ["tangyuan", "tangyuan_activity", "tangyuanleiji"],
                type: 1,
                id: l.limitActivityProxy.TANG_YUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.jinzhu,
                url: "btn_jinzhu",
                binding: ["jinzhu", "jinzhu_type"],
                type: -1,
                id: l.limitActivityProxy.JINZHU_ID
            });
            this._list.push({
                funitem: r.funUtils.fuXing,
                url: "btn_fuxing",
                binding: ["fuxing", "fuxing_effect"],
                type: 1,
                id: l.limitActivityProxy.FUXING_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.huoDongYue,
                url: "btn_hdy",
                binding: ["huoDongYue", "huoDongYue_activity"],
                type: 1,
                id: l.limitActivityProxy.HUODONGYUE_ID
            });
            this._list.push({
                funitem: r.funUtils.huoDongYueChouJiang,
                url: "btn_hdycj",
                binding: ["huoDongYueChouJiang", "huoDongYueChouJiang_activity"],
                type: 1,
                id: l.limitActivityProxy.HUODONGYUECHOUJIANG_ID
            });
            this._list.push({
                funitem: r.funUtils.xiXiang,
                url: "btn_dyxx",
                binding: ["xiXiang", "xiXiang_activity", "xiXiang_feed", "xiXiang_leiji"],
                type: 1,
                id: l.limitActivityProxy.XIXIANG_ID
            });
            this._list.push({
                funitem: r.funUtils.hongbaoPro,
                url: "btn_myhb",
                binding: ["hongbao_pro", "hongbao_pro_activity", "hongbao_pro_leiji"],
                type: 1,
                id: l.limitActivityProxy.HONGBAO_PRO_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.fineFood,
                url: "btn_ff",
                binding: ["fine_food_activity", "fine_food"],
                type: 1,
                id: l.limitActivityProxy.FINE_FOOD_ID
            });
            this._list.push({
                funitem: r.funUtils.zhouNian,
                url: "btn_znq",
                binding: ["zhouNian", "zhouNian_activity", "zhouNian_effect", "zhouNian_mubiao"],
                type: 1,
                id: l.limitActivityProxy.ZHOUNIAN_ID
            });
            this._list.push({
                funitem: r.funUtils.zhounNianChouJiang,
                url: "btn_zncj",
                binding: ["zhouNianChouJiang", "zhouNianChouJiang_activity"],
                type: 1,
                id: l.limitActivityProxy.ZHOUNIANCHOUJIANG_ID
            });


            this._list.push({
                funitem: r.funUtils.shengDan,
                url: "btn_shengdan",
                binding: ["christmas", "christmas_activity"],
                type: 1,
                id: l.limitActivityProxy.SHENGDAN_ID
            });
            this._list.push({
                funitem: r.funUtils.sakura,
                url: "btn_yhlm",
                binding: ["sakura", "sakura_activity", "sakura_leiji"],
                type: 1,
                id: l.limitActivityProxy.SAKURA_ID
            });
            // this._list.push({
            //     funitem: r.funUtils.lingLang,
            //     url: "btn_linglang",
            //     binding: ["linglang"],
            //     type: 1,
            //     id: l.limitActivityProxy.LINGLANG_ID
            // });
            this._list.push({
                funitem: r.funUtils.oldUsers,
                url: "btn_hyzh",
                binding: ["oldUsers", "oldUsers_recharge_rwd", "oldUsers_seven_activity", "oldUsers_seven_gift", "oldUsers_recharge_gift"],
                type: 1,
                id: l.limitActivityProxy.OLD_USERS_ID
            });
            this._list.push({
                funitem: r.funUtils.normalUsers,
                url: "btn_pthy",
                binding: ["normalUsers", 'normalUsers_activity', "normalUsers_seven_gift"],
                type: 1,
                id: l.limitActivityProxy.OLD_USERS_PRO_ID
            });
            this._list.push({
                funitem: r.funUtils.newYear,
                url: "btn_ydj",
                binding: ["new_year_activity", "new_year"],
                type: 1,
                id: l.limitActivityProxy.NEW_YEAR_ID
            });

            this._list.push({
                funitem: r.funUtils.xiuYun,
                url: "btn_yxg",
                binding: ["xiuYun", "xiuYun_activity", "xiuYun_feed", "xiuYun_leiji"],
                type: 1,
                id: l.limitActivityProxy.XIUYUN_ID
            });
            this._list.push({
                funitem: r.funUtils.snowman,
                url: "btn_xr",
                binding: ["snowman_activity", "snowman", "snowmanLeiji"],
                type: 1,
                id: l.limitActivityProxy.SNOWMAN_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.qixi,
                url: "btn_qixi",
                binding: ["qixi", "qixi_activity"],
                type: 1,
                id: l.limitActivityProxy.QIXI_ID
            });
            this._list.push({
                funitem: r.funUtils.thanksGiving,
                url: "btn_thanks",
                binding: ["thanksGiving", "thanksGiving_activity"],
                type: 1,
                id: l.limitActivityProxy.THANKSGIVING_ID
            });
            this._list.push({
                funitem: r.funUtils.shoppingStreet,
                url: "btn_street",
                binding: ["shoppingStreet", "shoppingStreet_activity"],
                type: 1,
                id: l.limitActivityProxy.SHOPPINGSTREET_ID
            });
            this._list.push({
                funitem: r.funUtils.qihuan,
                url: "btn_qihuan",
                binding: ["qihuan", "qihuan_activity", "qihuan_feed"],
                type: 1,
                id: l.limitActivityProxy.QIHUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.cooperate,
                url: "btn_cooperate",
                binding: ["cooperate", "cooperate_activity", "cooperate_hfjl", "cooperate_txs"],
                type: 1,
                id: l.limitActivityProxy.COOPERATE_ID
            });
            this._list.push({
                funitem: r.funUtils.qiushou,
                url: "btn_qshd",
                binding: ["qiushou", "qiushou_activity"],
                type: 1,
                id: l.limitActivityProxy.QIUSHOU_ID
            });
            this._list.push({
                funitem: r.funUtils.qiuyin,
                url: "btn_qiuyin",
                binding: ["qiuyin", "qiuyin_activity"],
                type: 1,
                id: l.limitActivityProxy.QIUYIN_ID
            });
            this._list.push({
                funitem: r.funUtils.liangxiao,
                url: "btn_mylx",
                binding: ["liangxiao"],
                type: 2,
                id: l.limitActivityProxy.LIANGXIAO_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.jijin,
                url: "btn_jijin",
                type: 2,
                id: l.limitActivityProxy.JIJIN_ID,
            });
            this._list.push({
                funitem: r.funUtils.hongbao,
                url: "btn_myhb",
                binding: ["hongbao"],
                type: 2,
                id: l.limitActivityProxy.HONGBAO_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.chuidiao,
                url: "btn_cd",
                binding: ["chuidiao", "chuidiao_activity"],
                type: 1,
                id: l.limitActivityProxy.CHUIDIAO_ID
            });
            this._list.push({
                funitem: r.funUtils.mingyue,
                url: "btn_my",
                binding: ["mingyue", "mingyue_activity"],
                type: 1,
                id: l.limitActivityProxy.MINGYUE_ID
            });
            this._list.push({
                funitem: r.funUtils.zhongyuan,
                url: "btn_zy",
                binding: ["zhongyuan", "zhongyuan_activity"],
                type: 1,
                id: l.limitActivityProxy.ZHONGYUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.kaixue,
                url: "btn_bzmx",
                binding: ["kaixue", "kaixue_recharge"],
                type: 1,
                id: l.limitActivityProxy.KAIXUE_ID
            });
            this._list.push({
                funitem: r.funUtils.thirtydays,
                url: "btn_td",
                binding: ["thirtydays"],
                type: 1,
                id: l.limitActivityProxy.THIRTYDAYS_ID
            });
            this._list.push({
                funitem: r.funUtils.bishu,
                url: "btn_bsql",
                binding: ["bishu", "bishu_activity"],
                type: 1,
                id: l.limitActivityProxy.BISHU_ID
            });
            this._list.push({
                funitem: r.funUtils.kuachongbang,
                url: "btn_kfb",
                binding: ["cross", "huanggong"],
                type: 1,
                id: l.limitActivityProxy.KUA_CHONG_BANG_TYPE,
                isEff: 1
            });
            this._list.push({
                funitem: r.funUtils.hedeng,
                url: "btn_hdr",
                binding: ["hedeng_activity", "hedeng"],
                type: 1,
                id: l.limitActivityProxy.HEDENG_ID
            });
            this._list.push({
                funitem: r.funUtils.dragonBoat,
                url: "btn_slz",
                binding: ["dragonboat", "dragonboat_activity"],
                type: 1,
                id: l.limitActivityProxy.DRAGON_BOAT_ID
            });
            this._list.push({
                funitem: r.funUtils.lion,
                url: "btn_wsdh",
                binding: ["lion"],
                type: 2,
                id: l.limitActivityProxy.LION_ID
            });
            this._list.push({
                funitem: r.funUtils.laborday,
                url: "btn_cghd",
                binding: ["laborday", "laborday_activity"],
                type: 1,
                id: l.limitActivityProxy.LABOR_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.readingDay,
                url: "btn_csg",
                binding: ["readingday", "readingday_activity"],
                type: 1,
                id: l.limitActivityProxy.READING_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.qingming,
                url: "btn_qmj",
                binding: ["qingming", "qingming_activity"],
                type: 1,
                id: l.limitActivityProxy.QING_MING_ID
            });
            this._list.push({
                funitem: r.funUtils.spell,
                url: "btn_xbmh",
                binding: ["spell"],
                type: 1,
                id: l.limitActivityProxy.SPELL_ID
            });
            this._list.push({
                funitem: r.funUtils.arbodday,
                url: "btn_zsj",
                binding: ["arborday", "arbor_activity"],
                type: 1,
                id: l.limitActivityProxy.ARBOR_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.girlsDay,
                url: "btn_girls",
                binding: ["girlsday", "girlsday_activity", "girlsday_num"],
                type: 1,
                id: l.limitActivityProxy.GIRLS_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.luckyCarp,
                url: "btn_fxjl",
                binding: [""],
                type: 1,
                id: l.limitActivityProxy.LUCKY_CARP
            });
            this._list.push({
                funitem: r.funUtils.guoli,
                url: "btn_glsd",
                binding: ["guoli"],
                type: 1,
                id: l.limitActivityProxy.GUO_LI_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.clothepve,
                url: "btn_szcx",
                binding: ["clothepve"],
                type: -1,
                id: l.limitActivityProxy.CLOTHEPVE_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.clothepvp,
                url: "btn_zxdy",
                binding: ["clothepvp"],
                type: -1,
                id: l.limitActivityProxy.CLOTHEPVP_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.duihuanShop,
                url: "btn_dh",
                binding: ["duihuanshop"],
                type: 1,
                id: l.limitActivityProxy.DUIHUANSHOP_ID
            });
            this._list.push({
                funitem: r.funUtils.atList,
                url: "btn_cbhd",
                binding: [""],
                type: 1,
                id: l.limitActivityProxy.AT_LIST_TYPE,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.support,
                url: "btn_yy",
                binding: ["support"],
                type: -1,
                id: l.limitActivityProxy.SUPPORT_TYPE,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.duihuan,
                url: "btn_zm",
                binding: ["duihuan"],
                type: -1,
                id: l.limitActivityProxy.DUIHUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.limitActivity,
                url: "btn_xshd",
                binding: ["limitactivity"],
                type: 1,
                id: l.limitActivityProxy.LIMIT_ACTIVITY_TYPE
            });
            this._list.push({
                funitem: r.funUtils.dailyList,
                url: "btn_rchd",
                binding: ["dailylist", "clothepve", "clothepvp", "support", "duihuan", "prince"],
                type: 1,
                id: l.limitActivityProxy.DAILY_LIST_TYPE,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.voice,
                url: "btn_yyb",
                binding: [""],
                type: 1,
                id: l.limitActivityProxy.VOICE_ID
            });
            this._list.push({
                funitem: r.funUtils.balloon,
                url: "btn_rqq",
                binding: ["balloon", "balloon_activity"],
                type: 1,
                id: l.limitActivityProxy.BALLOON_ID
            });
            this._list.push({
                funitem: r.funUtils.fourking,
                url: "btn_sdfw",
                binding: ["fourking"],
                type: 2,
                id: l.limitActivityProxy.FOURKING_ID
            });
            this._list.push({
                funitem: r.funUtils.luckyTable,
                url: "btn_xymp",
                binding: ["luckytable_activity"],
                type: 2,
                id: l.limitActivityProxy.LUCKY_TABLE_ID
            });
            this._list.push({ ///
                funitem: r.funUtils.purchase,
                url: "btn_czlb",
                binding: ["purchase"],
                type: 2,
                id: l.limitActivityProxy.CZLB_ID
            });
            this._list.push({
                funitem: r.funUtils.singleRecharge,
                url: "btn_dblc",
                binding: ["single_recharge", "single_recharge1", "single_recharge2", "single_recharge3", "single_recharge4"],
                type: -1,
                id: l.limitActivityProxy.SINGLE_RECHAGR_ID
            });
            this._list.push({
                funitem: r.funUtils.superRecharge,
                url: "btn_ltcz",
                binding: ["super_recharge"],
                type: 2,
                id: l.limitActivityProxy.SUPER_RECHARGE_ID
            });
            this._list.push({
                funitem: r.funUtils.superRechargePro,
                url: "btn_ltczp",
                binding: ["super_recharge_pro", "super_recharge_pro0", "super_recharge_pro1", "super_recharge_pro2", 'superRechargeProDay1', 'superRechargeProDay2', 'superRechargeProDay3', 'superRechargeProDay4', 'superRechargeProDay5', 'superRechargeProDay6', 'superRechargeProDay7'],
                type: -1,
                id: l.limitActivityProxy.SUPER_RECHARGE_PRO_ID
            });
            this._list.push({
                funitem: r.funUtils.gaodian,
                url: "btn_qgd",
                binding: ["gaodian"],
                type: 2,
                id: l.limitActivityProxy.GAO_DIAN_ID
            });
            this._list.push({
                funitem: r.funUtils.jieqiview,
                url: "btn_lchl",
                binding: ["jieqi"],
                type: 2,
                id: l.limitActivityProxy.JIE_QI_ID
            });
            this._list.push({
                funitem: r.funUtils.lantern,
                url: "btn_ddl",
                binding: ["lantern"],
                type: 2,
                id: l.limitActivityProxy.LANTERN_ID
            });
            this._list.push({ ///
                funitem: r.funUtils.continuityrecharge,
                url: "btn_lxcz",
                binding: ["continuity_recharge"],
                type: 2,
                id: l.limitActivityProxy.LXCZ_ID
            });

            this._list.push({
                funitem: r.funUtils.luckybrand,
                url: "btn_czfp",
                binding: ["lucky_brand"],
                type: -1,
                id: l.limitActivityProxy.LUCKY_BRAND_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.prince,
                url: "btn_hzzm",
                binding: ["prince"],
                type: -1,
                id: l.limitActivityProxy.PRINCE_ID
            });
            this._list.push({
                funitem: r.funUtils.rechargActivity,
                url: "btn_cz",
                binding: ["jinzhu","jinzhu_type","rechage_activity", "daily_recharge", "mergedaily_recharge", "mergedaily_recharge1", "mergedaily_recharge2", "mergedaily_recharge3", "mergedaily_recharge4", "single_recharge", "single_recharge1", "single_recharge2", "single_recharge3", "single_recharge4", "super_recharge_pro", "super_recharge_pro0", "super_recharge_pro1", "super_recharge_pro2", 'superRechargeProDay1', 'superRechargeProDay2', 'superRechargeProDay3', 'superRechargeProDay4', 'superRechargeProDay5', 'superRechargeProDay6', 'superRechargeProDay7', "lucky_brand"],
                type: 2,
                id: l.limitActivityProxy.RECHARGE_TYPE
            });
            this._list.push({
                funitem: r.funUtils.trunTable,
                url: "btn_mp",
                binding: [""],
                type: -1,
                id: l.limitActivityProxy.TRUN_TABLE_ID
            });
            this._list.push({
                funitem: r.funUtils.dayday,
                url: "btn_ttms",
                binding: ["dayday"],
                type: 2,
                id: l.limitActivityProxy.DAYDAY_ID
            });
            this._list.push({
                funitem: r.funUtils.dailyRecharge,
                url: "btn_ttcz",
                binding: ["daily_recharge"],
                type: -1,
                id: l.limitActivityProxy.DAILY_RECHARGE
            });
            this._list.push({
                funitem: r.funUtils.levelgift,
                url: "btn_djlb",
                binding: ["levelgift"],
                type: 2,
                id: l.limitActivityProxy.LEVEL_GIFT_ID
            });

            this._list.push({
                funitem: r.funUtils.mergeFirstRecharge,
                url: "btn_mergeDG",
                binding: ["mergeFirstRecharge"],
                type: 2,
                id: l.limitActivityProxy.MERGE_FIRST_CHARGE_ID
            });

            this._list.push({
                funitem: r.funUtils.mergeTTCZ,
                url: "btn_dblc",
                binding: ["mergedaily_recharge", "mergedaily_recharge1", "mergedaily_recharge2", "mergedaily_recharge3", "mergedaily_recharge4"],
                type: -1,
                id: l.limitActivityProxy.MERGE_DAILY_RECHARGE_ID
            });

            this._list.push({
                funitem: r.funUtils.mergeDailyGiftview,
                url: "btn_hflxcz",
                binding: ["mergeDailyGift"],
                type: 2,
                id: l.limitActivityProxy.MERGE_DAILY_GIFT_ID
            });
        }
    };
    Object.defineProperty(t.prototype, "activityList", {
        get: function () {
            null == this._list && this.initLeftList();
            return this._list;
        },
        enumerable: !0,
        configurable: !0
    });
    return t;
})();
o.ActivityUtils = s;
var c = function () {
    this.funitem = null;
    this.url = "";
    this.binding = [];
    this.id = 0;
    this.type = 1;
    this.isEff = 1;
};
o.AcitityDataItem = c;
o.activityUtils = new s();