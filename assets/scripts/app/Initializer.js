var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./models/LoginProxy"),
    n = require("./models/PlayerProxy"),
    l = require("./models/TimeProxy"),
    r = require("./models/CreateProxy"),
    a = require("./utils/Utils"),
    s = require("./models/AchievementProxy"),
    c = require("./models/ChatProxy"),
    _ = require("./models/UnionProxy"),
    d = require("./models/TaskProxy"),
    u = require("./models/ServantProxy"),
    p = require("./models/FightProxy"),
    h = require("./models/JingYingProxy"),
    y = require("./models/BagProxy"),
    f = require("./models/SonProxy"),
    I = require("./models/WifeProxy"),
    m = require("./models/GuideProxy"),
    b = require("./models/RankProxy"),
    g = require("./models/BookProxy"),
    v = require("./models/JiulouProxy"),
    L = require("./models/LookProxy"),
    N = require("./models/WelfareProxy"),
    E = require("./models/CellProxy"),
    T = require("./models/PalaceProxy"),
    R = require("./models/JibanProxy"),
    U = require("./models/FeigeProxy"),
    A = require("./models/DalishiProxy"),
    S = require("./models/BossProxy"),
    O = require("./Config"),
    P = require("./models/MailProxy"),
    C = require("./models/AcademyProxy"),
    D = require("./models/TaofaProxy"),
    x = require("./models/ShopProxy"),
    w = require("./models/KitchenProxy"),
    M = require("./models/MonthCardProxy"),
    H = require("./models/TreasureProxy"),
    k = require("./models/LimitActivityProxy"),
    G = require("./models/FirstRechargeProxy"),
    F = require("./models/SupportProxy"),
    B = require("./models/VoiceProxy"),
    V = require("./models/TrunTableProxy"),
    Y = require("./models/DailyRechargeProxy"),
    J = require("./models/PrinceRecruitProxy"),
    K = require("./models/ClothePveProxy"),
    W = require("./models/PurchaseProxy"),
    z = require("./models/LevelGiftProxy"),
    j = require("./models/SnowManProxy"),
    X = require("./models/HeDengProxy"),
    newYear = require("./models/NewYearProxy"),
    Z = require("./models/ContinuityRechargeProxy"),
    Q = require("./models/FlowerProxy"),
    ff = require("./models/FlowerFriendProxy"),
    q = require("./models/LuckyBrandProxy"),
    $ = require("./models/GuoliProxy"),
    tt = require("./models/LanternProxy"),
    et = require("./models/JieqiProxy"),
    ot = require("./models/LuckyCarpProxy"),
    it = require("./models/TangyuanProxy"),
    nt = require("./models/GirlsDayProxy"),
    lt = require("./models/ArborDayProxy"),
    rt = require("./models/QingMingProxy"),
    at = require("./models/SpellProxy"),
    st = require("./models/LionProxy"),
    ct = require("./models/ReadingDayProxy"),
    _t = require("./models/SingleRechargeProxy"),
    dt = require("./models/LaborDayProxy"),
    ut = require("./models/LuckyTableProxy"),
    pt = require("./models/DragonBoatProxy"),
    ht = require("./models/XianYunProxy"),
    yt = require("./models/ChengHaoProxy"),
    ft = require("./models/BalloonProxy"),
    It = require("./models/FourKingProxy"),
    mt = require("./models/GaodianProxy"),
    bt = require("./models/CrossProxy"),
    gt = require("./models/ThirtyDaysProxy"),
    vt = require("./models/QiXiProxy"),
    vtp = require("./models/QiXiProProxy"),
    Lt = require("./models/ZhongYuanProxy"),
    bs = require("./models/BishuProxy"),
    kx = require("./models/KaiXueProxy"),
    lx = require("./models/LiangXiaoProxy"),
    my = require("./models/MingYueProxy"),
    qy = require("./models/QiuYinProxy"),
    cd = require("./models/ChuiDiaoProxy"),
    qh = require("./models/QiHuanProxy"),
    qs = require("./models/QiuShouProxy"),
    hy = require("./models/HaoyouProxy"),
    hb = require("./models/HongBaoProxy"),
    hbp = require("./models/HongBaoProProxy"),
    ss = require("./models/ShoppingStreetProxy"),
    jy = require("./models/JingYiHuaShangProxy"),
    cooperate = require("./models/CooperateProxy"),
    mdg = require("./models/MergeDailyGiftProxy"),
    mG = require("./models/MergeFirstRechargeProxy"),
    mW = require("./models/MergePurchaseProxy"),
    fineFood = require("./models/FineFoodProxy"),
    m_t = require("./models/MergeSingleRechargeProxy"),
    gx = require("./models/GuanxiProxy"),
    oldUsers = require("./models/OldUsersProxy"),
    oldUsersPro = require("./models/OldUsersProProxy"),
    zncj = require("./models/ZhouNianChouJiangProxy"),
    zn = require("./models/ZhouNianProxy"),
    cf = require("./models/ConfidanteProxy"),
    tgd = require("./models/ThanksGivingProxy"),
    lover = require("./models/LoverProxy"),
    lg = require("./models/LiuGongProxy"),
    xy = require("./models/XiuYunProxy"),
    sd = require("./models/ShengDanProxy"),
    ll = require("./models/LingLangProxy"),
    ad = require("./models/AdvertProxy"),
    fxgz = require("./models/FuXingProxy"),
    hdy = require("./models/HuoDongYueProxy"),
    hdycj = require("./models/HuoDongYueChouJiangProxy"),
    xydl = require("./models/XingYuDengLuoProxy"),
    kite = require("./models/KiteProxy"),
    queen = require("./models/QueenProxy"),
    jz = require("./models/JinZhuProxy"),
    jjcz =require("./models/JiJinChengZhangProxy"),
    sakura = require("./models/SakuraProxy"),
    xixiang = require("./models/XiXiangProxy");

window.i18n = require("i18n");
o.loginProxy = new i.LoginProxy();
o.playerProxy = new n.PlayerProxy();
o.timeProxy = new l.TimeProxy();
o.createProxy = new r.CreateProxy();
o.achievementProxy = new s.AchievementProxy();
o.chatProxy = new c.ChatProxy();
o.unionProxy = new _.UnionProxy();
o.taskProxy = new d.TaskProxy();
o.servantProxy = new u.ServantProxy();
o.fightProxy = new p.FightProxy();
o.jingyingProxy = new h.JingYingProxy();
o.bagProxy = new y.BagProxy();
o.sonProxy = new f.SonProxy();
o.wifeProxy = new I.WifeProxy();
o.guideProxy = new m.GuideProxy();
o.rankProxy = new b.RankProxy();
o.bookProxy = new g.BookProxy();
o.jiulouProxy = new v.JiulouProxy();
o.lookProxy = new L.LookProxy();
o.welfareProxy = new N.WelfareProxy();
o.cellProxy = new E.CellProxy();
o.palaceProxy = new T.PalaceProxy();
o.jibanProxy = new R.JibanProxy();
o.feigeProxy = new U.FeigeProxy();
o.dalishiProxy = new A.DalishiProxy();
o.bossPorxy = new S.BossProxy();
o.mailProxy = new P.MailProxy();
o.academyProxy = new C.AcademyProxy();
o.taofaProxy = new D.TaofaProxy();
o.shopProxy = new x.ShopProxy();
o.kitchenProxy = new w.KitchenProxy();
o.monthCardProxy = new M.MonthCardProxy();
o.treasureProxy = new H.TreasureProxy();
o.limitActivityProxy = new k.LimitActivityProxy();
o.firstRechargeProxy = new G.FirstRechargeProxy();

o.supportProxy = new F.SupportProxy();
o.voiceProxy = new B.VoiceProxy();
o.trunTableProxy = new V.TrunTableProxy();
o.dailyRechargeProxy = new Y.DailyRechargeProxy();
o.princeRecruitProxy = new J.PrinceRecruitProxy();
o.clothePveProxy = new K.ClothePveProxy();
o.purchaseProxy = new W.PurchaseProxy();

o.levelGiftProxy = new z.LevelGiftProxy();
o.snowmanProxy = new j.SnowManProxy();
o.hedengProxy = new X.HeDengProxy();
o.newYearProxy = new newYear.NewYearProxy();
o.continuityRechargeProxy = new Z.ContinuityRechargeProxy();
o.flowerProxy = new Q.FlowerProxy();
o.flowerFriendProxy = new ff.FlowerFriendProxy();
o.luckyBrandProxy = new q.LuckyBrandProxy();
o.guoliPorxy = new $.GuoliProxy();
o.lanternProxy = new tt.LanternProxy();
o.jieqiProxy = new et.JieqiProxy();
o.luckyCarpProxy = new ot.LuckyCarpProxy();
o.tangyuanProxy = new it.TangyuanProxy();
o.girlsDayProxy = new nt.GirlsDayProxy();
o.arborDayProxy = new lt.ArborDayProxy();
o.qingMingProxy = new rt.QingMingProxy();
o.spellProxy = new at.SpellProxy();
o.lionProxy = new st.LionProxy();
o.readingDayProxy = new ct.ReadingDayProxy();
o.singleRechargeProxy = new _t.SingleRechargeProxy();

o.laborDayProxy = new dt.LaborDayProxy();
o.luckyTableProxy = new ut.LuckyTableProxy();
o.dragonBoatProxy = new pt.DragonBoatProxy();
o.xianyunProxy = new ht.XianYunProxy();
o.chengHaoProxy = new yt.ChengHaoProxy();
o.balloonProxy = new ft.BalloonProxy();
o.fourKingProxy = new It.FourKingProxy();
o.gaodianProxy = new mt.GaodianProxy();
o.crossProxy = new bt.CrossProxy();
o.thirtyDaysProxy = new gt.ThirtyDaysProxy();
o.qixiProxy = new vt.QiXiProxy();
o.qixiProProxy = new vtp.QiXiProProxy();
o.zhongyuanProxy = new Lt.ZhongYuanProxy();
o.bishuProxy = new bs.BishuProxy();
o.kaixueProxy = new kx.KaiXueProxy();
o.liangxiaoProxy = new lx.LiangxiaoProxy();
o.mingyueProxy = new my.MingYueProxy();
o.qiuyinProxy = new qy.QiuYinProxy();
o.chuidiaoProxy = new cd.ChuiDiaoProxy();
o.qiushouProxy = new qs.QiuShouProxy();
o.qihuanProxy = new qh.QiHuanProxy();
o.hongbaoProxy = new hb.HongBaoProxy();
o.hongbaoProProxy = new hbp.HongBaoProProxy();
o.shoppingStreetProxy = new ss.ShoppingStreetProxy();
o.jingYiHuaShangProxy = new jy.JingYiHuaShangProxy();
o.cooperateProxy = new cooperate.CooperateProxy();
o.haoyouProxy = new hy.HaoyouProxy();
o.guanxiProxy = new gx.GuanxiProxy();
o.oldUsersProxy = new oldUsers.OldUsersProxy();
o.oldUsersProProxy = new oldUsersPro.OldUsersProProxy();
o.thanksGivingProxy = new tgd.ThanksGivingProxy();
o.loverProxy = new lover.LoverProxy();

o.mergeFirstRechargeProxy = new mG.MergeFirstRechargeProxy();
o.mergeDailyGiftProxy = new mdg.MergeDailyGiftProxy();
o.mergePurchaseProxy = new mW.MergePurchaseProxy();
o.fineFoodProxy = new fineFood.FineFoodProxy();

o.mergeSingleRechargeProxy = new m_t.MergeSingleRechargeProxy();
o.zhouNianChouJiangProxy = new zncj.ZhouNianChouJiangProxy();
o.zhouNianProxy = new zn.ZhouNianProxy();
o.confidanteProxy = new cf.ConfidanteProxy();

o.liuGongProxy = new lg.LiuGongProxy();
o.xiuYunProxy = new xy.XiuYunProxy();
o.shengDanProxy = new sd.ShengDanProxy();
o.lingLangProxy = new ll.LingLangProxy();
o.advertProxy = new ad.AdvertProxy();
o.fuXingProxy = new fxgz.FuXingProxy();
o.huoDongYueProxy = new hdy.HuoDongYueProxy();
o.huoDongYueChouJiangProxy = new hdycj.HuoDongYueChouJiangProxy();
o.xingYuDengLuoProxy = new xydl.XingYuDengLuoProxy();
o.kiteProxy = new kite.KiteProxy();
o.queenProxy = new queen.QueenProxy();
o.jinZhuProxy = new jz.JinZhuProxy();
o.jiJinChengZhangProxy = new jjcz.JiJinChengZhangProxy();
o.sakuraProxy = new sakura.SakuraProxy();
o.xiXiangProxy = new xixiang.XiXiangProxy();

var Nt = (function () {
    function t() {
        this.initialized = !1;
    }
    t.prototype.getUrl = function () {
        return (
            O.Config.url +
            "?sevid=" +
            O.Config.serId +
            "&ver=" +
            O.Config.version +
            "&uid=" +
            O.Config.uid +
            "&token=" +
            O.Config.token +
            "&platform=" +
            O.Config.pf +
            "&lang=" +
            O.Config.lang
        );
    };
    t.prototype.init = function () {
        O.Config.DEBUG = !cc.sys.isMobile && O.Config.DEBUG;
        JsonHttp.setDebug(O.Config.DEBUG);
        JsonHttp.setRSN(O.Config.isRSN);
        JsonHttp.setGetUrl(this.getUrl);
        JsonHttp.setSecondHandler(a.timeUtil.getCurSceond.bind(a.timeUtil));
        a.timeUtil.init(8, Math.floor(cc.sys.now() / 1e3));
        facade.setDebug(O.Config.DEBUG);
        if (!this.initialized) {
            this.initialized = !0;
            facade.addBean(o.loginProxy);
            facade.addBean(o.playerProxy);
            facade.addBean(o.timeProxy);
            facade.addBean(o.createProxy);
            facade.addBean(o.chatProxy);
            facade.addBean(o.achievementProxy);
            facade.addBean(o.unionProxy);
            facade.addBean(o.taskProxy);
            facade.addBean(o.servantProxy);
            facade.addBean(o.fightProxy);
            facade.addBean(o.jingyingProxy);
            facade.addBean(o.bagProxy);
            facade.addBean(o.sonProxy);
            facade.addBean(o.wifeProxy);
            facade.addBean(o.guideProxy);
            facade.addBean(o.rankProxy);
            facade.addBean(o.bookProxy);
            facade.addBean(o.jiulouProxy);
            facade.addBean(o.lookProxy);
            facade.addBean(o.welfareProxy);
            facade.addBean(o.cellProxy);
            facade.addBean(o.palaceProxy);
            facade.addBean(o.jibanProxy);
            facade.addBean(o.feigeProxy);
            facade.addBean(o.dalishiProxy);
            facade.addBean(o.bossPorxy);
            facade.addBean(o.mailProxy);
            facade.addBean(o.academyProxy);
            facade.addBean(o.taofaProxy);
            facade.addBean(o.shopProxy);
            facade.addBean(o.kitchenProxy);
            facade.addBean(o.monthCardProxy);
            facade.addBean(o.treasureProxy);
            facade.addBean(o.limitActivityProxy);
            facade.addBean(o.firstRechargeProxy);
            facade.addBean(o.supportProxy);
            facade.addBean(o.voiceProxy);
            facade.addBean(o.trunTableProxy);
            facade.addBean(o.dailyRechargeProxy);
            facade.addBean(o.princeRecruitProxy);
            facade.addBean(o.clothePveProxy);
            facade.addBean(o.purchaseProxy);
            facade.addBean(o.levelGiftProxy);
            facade.addBean(o.snowmanProxy);
            facade.addBean(o.hedengProxy);
            facade.addBean(o.newYearProxy);
            facade.addBean(o.continuityRechargeProxy);
            facade.addBean(o.flowerProxy);
            facade.addBean(o.flowerFriendProxy);
            facade.addBean(o.luckyBrandProxy);
            facade.addBean(o.guoliPorxy);
            facade.addBean(o.lanternProxy);
            facade.addBean(o.jieqiProxy);
            facade.addBean(o.luckyCarpProxy);
            facade.addBean(o.tangyuanProxy);
            facade.addBean(o.girlsDayProxy);
            facade.addBean(o.arborDayProxy);
            facade.addBean(o.qingMingProxy);
            facade.addBean(o.spellProxy);
            facade.addBean(o.lionProxy);
            facade.addBean(o.readingDayProxy);
            facade.addBean(o.singleRechargeProxy);
            facade.addBean(o.laborDayProxy);
            facade.addBean(o.luckyTableProxy);
            facade.addBean(o.dragonBoatProxy);
            facade.addBean(o.xianyunProxy);
            facade.addBean(o.chengHaoProxy);
            facade.addBean(o.balloonProxy);
            facade.addBean(o.fourKingProxy);
            facade.addBean(o.gaodianProxy);
            facade.addBean(o.crossProxy);
            facade.addBean(o.thirtyDaysProxy);
            facade.addBean(o.qixiProxy);
            facade.addBean(o.qixiProProxy);
            facade.addBean(o.zhongyuanProxy);
            facade.addBean(o.bishuProxy);
            facade.addBean(o.kaixueProxy);
            facade.addBean(o.liangxiaoProxy);
            facade.addBean(o.mingyueProxy);
            facade.addBean(o.qiuyinProxy);
            facade.addBean(o.chuidiaoProxy);
            facade.addBean(o.qiushouProxy);
            facade.addBean(o.qihuanProxy);
            facade.addBean(o.hongbaoProxy);
            facade.addBean(o.hongbaoProProxy);
            facade.addBean(o.shoppingStreetProxy);
            facade.addBean(o.jingYiHuaShangProxy);
            facade.addBean(o.cooperateProxy);
            facade.addBean(o.haoyouProxy);
            facade.addBean(o.guanxiProxy);
            facade.addBean(o.mergeDailyGiftProxy);
            facade.addBean(o.mergeFirstRechargeProxy);
            facade.addBean(o.mergePurchaseProxy);
            facade.addBean(o.fineFoodProxy);
            facade.addBean(o.mergeSingleRechargeProxy);
            facade.addBean(o.thanksGivingProxy);
            facade.addBean(o.loverProxy);
            facade.addBean(o.liuGongProxy);
            facade.addBean(o.oldUsersProxy);
            facade.addBean(o.oldUsersProProxy);
            facade.addBean(o.zhouNianChouJiangProxy);
            facade.addBean(o.zhouNianProxy);
            facade.addBean(o.confidanteProxy);
            facade.addBean(o.xiuYunProxy);
            facade.addBean(o.shengDanProxy);
            facade.addBean(o.lingLangProxy);
            facade.addBean(o.advertProxy);
            facade.addBean(o.fuXingProxy);
            facade.addBean(o.huoDongYueProxy);
            facade.addBean(o.huoDongYueChouJiangProxy);
            facade.addBean(o.xingYuDengLuoProxy);
            facade.addBean(o.jinZhuProxy);
            facade.addBean(o.kiteProxy);
            facade.addBean(o.queenProxy);
            facade.addBean(o.jiJinChengZhangProxy);
            facade.addBean(o.sakuraProxy);
            facade.addBean(o.xiXiangProxy);
            facade.eachBean("ctor");
        }
    };
    return t;
})();
o.Initializer = Nt;