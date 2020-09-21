var e = module,
    o = exports;

function i(t) {
    var e = function () {
        this.getJson = function () {
            var e = t.split(".");
            return (
                '{"' + e[1] + '":{"' + e[2] + '":' + JSON.stringify(this) + "}}"
            );
        };
    };
    e.key = t;
    e.class = t;
    return e;
}
window.proto_sc = {
    loginMod: {
        loginAccount: i("proto_sc.loginMod.loginAccount")
    },
    user: {
        user: i("proto_sc.user.user"),
        fuserStatus: i("proto_sc.user.fuserStatus"),
        guide: i("proto_sc.user.guide"),
        pvb: i("proto_sc.user.pvb"),
        pvb2: i("proto_sc.user.pvb2"),
        ep: i("proto_sc.user.ep"),
        addition: i("proto_sc.user.addition"),
        percentage: i("proto_sc.user.percentage"),
        fuser: i("proto_sc.user.fuser"),
        fuserhw: i("proto_sc.user.fuserhw"),
        win: i("proto_sc.user.win"),
        changjing: i("proto_sc.user.changjing"),
        banben: i("proto_sc.user.banben"),
        paomadeng: i("proto_sc.user.paomadeng"),
        heroShow: i("proto_sc.user.heroShow"),
        qifu: i("proto_sc.user.qifu"),
        wishTree: i("proto_sc.user.wishTree"),
        plotFragments: i("proto_sc.user.plotFragments"),
        advert: i("proto_sc.user.advert"),
        addicted: i("proto_sc.user.addicted"),
    },
    hero: {
        heroList: i("proto_sc.hero.heroList"),
        heroChat: i("proto_sc.hero.heroChat"),
        skin: i("proto_sc.hero.skin")
    },
    wife: {
        wifeList: i("proto_sc.wife.wifeList"),
        jingLi: i("proto_sc.wife.jingLi"),
        jiaQi: i("proto_sc.wife.jiaQi"),
        base: i("proto_sc.wife.base"),
        win: i("proto_sc.wife.win"),
        hello: i("proto_sc.wife.hello"),
        travel: i("proto_sc.wife.travel"),
        firstborn: i("proto_sc.wife.firstborn"),
        wifeChat: i("proto_sc.wife.wifeChat")
    },
    son: {
        sonList: i("proto_sc.son.sonList"),
        base: i("proto_sc.son.base"),
        qList: i("proto_sc.son.qList"),
        cList: i("proto_sc.son.cList"),
        win: i("proto_sc.son.win"),
        lilianSeatNum: i("proto_sc.son.lilianSeatNum"),
        lilianList: i("proto_sc.son.lilianList"),
        firstkeju: i("proto_sc.son.firstkeju")
    },
    item: {
        itemList: i("proto_sc.item.itemList"),
        hecheng: i("proto_sc.item.hecheng")
    },
    confidante: {
        info: i("proto_sc.confidante.info"),
        lists: i("proto_sc.confidante.lists")
    },
    jingYing: {
        coin: i("proto_sc.jingYing.coin"),
        food: i("proto_sc.jingYing.food"),
        army: i("proto_sc.jingYing.army"),
        exp: i("proto_sc.jingYing.exp"),
        qzam: i("proto_sc.jingYing.qzam"),
        win: i("proto_sc.jingYing.win"),
        weipai: i("proto_sc.jingYing.weipai")
    },
    bag: {
        bag_list: i("proto_sc.bag.bag_list"),
        bagList1: i("proto_sc.bag.bagList1"),
        bagList2: i("proto_sc.bag.bagList2")
    },
    school: {
        base: i("proto_sc.school.base"),
        list: i("proto_sc.school.list"),
        level: i("proto_sc.school.level")
    },
    system: {
        server_list: i("proto_sc.system.server_list"),
        errror: i("proto_sc.system.errror"),
        sys: i("proto_sc.system.sys"),
        randname: i("proto_sc.system.randname"),
        kefu: i("proto_sc.system.kefu"),
        unopen_notice: i("proto_sc.system.unopen_notice"),
        unconn_notice: i("proto_sc.system.unconn_notice"),
        server_info: i("proto_sc.system.server_info")
    },
    role: {
        rolelist: i("proto_sc.role.rolelist")
    },
    ranking: {
        shili: i("proto_sc.ranking.shili"),
        guanka: i("proto_sc.ranking.guanka"),
        love: i("proto_sc.ranking.love"),
        shiliKua: i("proto_sc.ranking.shiliKua"),
        clubKua: i("proto_sc.ranking.clubKua"),
        myclubkuaRid: i("proto_sc.ranking.myclubkuaRid"),
        mobai: i("proto_sc.ranking.mobai"),
        selfRid: i("proto_sc.ranking.selfRid"),
        win: i("proto_sc.ranking.win")
    },
    laofang: {
        laofang: i("proto_sc.laofang.laofang"),
        pets: i("proto_sc.laofang.pets"),
        mingwang: i("proto_sc.laofang.mingwang"),
        win: i("proto_sc.laofang.win")
    },
    wordboss: {
        menggu: i("proto_sc.wordboss.menggu"),
        ge2dan: i("proto_sc.wordboss.ge2dan"),
        ge2danMyDmg: i("proto_sc.wordboss.ge2danMyDmg"),
        shop: i("proto_sc.wordboss.shop"),
        scoreRank: i("proto_sc.wordboss.scoreRank"),
        myScore: i("proto_sc.wordboss.myScore"),
        hurtRank: i("proto_sc.wordboss.hurtRank"),
        rwdLog: i("proto_sc.wordboss.rwdLog"),
        g2dkill: i("proto_sc.wordboss.g2dkill"),
        mgft: i("proto_sc.wordboss.mgft"),
        g2dft: i("proto_sc.wordboss.g2dft"),
        win: i("proto_sc.wordboss.win")
    },
    fengxiandian: {
        info: i("proto_sc.fengxiandian.info"),
        qingAn: i("proto_sc.fengxiandian.qingAn")
    },
    chenghao: {
        chInfo: i("proto_sc.chenghao.chInfo"),
        wyrwd: i("proto_sc.chenghao.wyrwd")
    },
    xunfang: {
        xfInfo: i("proto_sc.xunfang.xfInfo"),
        recover: i("proto_sc.xunfang.recover"),
        zhenZai: i("proto_sc.xunfang.zhenZai"),
        win: i("proto_sc.xunfang.win")
    },
    msgwin: {
        items: i("proto_sc.msgwin.items"),
        newnpc: i("proto_sc.msgwin.newnpc"),
        fight: i("proto_sc.msgwin.fight")
    },
    mail: {
        mailList: i("proto_sc.mail.mailList")
    },
    club: {
        gifts: i("proto_sc.club.gifts"),
        envelopes: i("proto_sc.club.envelopes"),
        investLists: i("proto_sc.club.investLists"),
        invest: i("proto_sc.club.invest"),
        draw: i("proto_sc.club.draw"),
        dismiss: i("proto_sc.club.dismiss"),

        clubList: i("proto_sc.club.clubList"),
        myClubRid: i("proto_sc.club.myClubRid"),
        clubInfo: i("proto_sc.club.clubInfo"),
        memberInfo: i("proto_sc.club.memberInfo"),
        shopList: i("proto_sc.club.shopList"),
        applyList: i("proto_sc.club.applyList"),
        bossft: i("proto_sc.club.bossft"),
        bossInfo: i("proto_sc.club.bossInfo"),
        bossInfoList: i("proto_sc.club.bossInfoList"),
        heroLog: i("proto_sc.club.heroLog"),
        uidLog: i("proto_sc.club.uidLog"),
        clubLog: i("proto_sc.club.clubLog"),
        win: i("proto_sc.club.win"),
        transInfo: i("proto_sc.club.transInfo"),
        clubKuaInfo: i("proto_sc.club.clubKuaInfo"),
        clubKuaMsg: i("proto_sc.club.clubKuaMsg"),
        clubKuaCszr: i("proto_sc.club.clubKuaCszr"),
        clubKuapkzr: i("proto_sc.club.clubKuapkzr"),
        clubKuaWin: i("proto_sc.club.clubKuaWin"),
        clubKuahit: i("proto_sc.club.clubKuahit"),
        clubKuapklog: i("proto_sc.club.clubKuapklog"),
        clubKuapkrwd: i("proto_sc.club.clubKuapkrwd"),
        clubKualooklog: i("proto_sc.club.clubKualooklog"),
        kuaHeroList: i("proto_sc.club.kuaHeroList")
    },
    xianshi: {
        usecash: i("proto_sc.xianshi.usecash"),
        usebook: i("proto_sc.xianshi.usebook"),
        shiliup: i("proto_sc.xianshi.shiliup"),
        loginday: i("proto_sc.xianshi.loginday"),
        killg2d: i("proto_sc.xianshi.killg2d"),
        goeat: i("proto_sc.xianshi.goeat"),
        clubbossdmg: i("proto_sc.xianshi.clubbossdmg"),
        clubbosskill: i("proto_sc.xianshi.clubbosskill")
    },
    daily: {
        tasks: i("proto_sc.daily.tasks"),
        score: i("proto_sc.daily.score"),
        rwds: i("proto_sc.daily.rwds"),
        base: i("proto_sc.daily.base"),
        level: i("proto_sc.daily.level")
    },
    chengjiu: {
        cjlist: i("proto_sc.chengjiu.cjlist")
    },
    fuli: {
        fcho_merge: i("proto_sc.fuli.fcho_merge"),
        qiandao: i("proto_sc.fuli.qiandao"),
        mooncard: i("proto_sc.fuli.mooncard"),
        shenji: i("proto_sc.fuli.shenji"),
        guanqun: i("proto_sc.fuli.guanqun"),
        fchofuli: i("proto_sc.fuli.fchofuli"),
        vipfuli: i("proto_sc.fuli.vipfuli"),
        win: i("proto_sc.fuli.win"),
        wxqq: i("proto_sc.fuli.wxqq"),
        share: i("proto_sc.fuli.share"),
        mGift: i("proto_sc.fuli.mGift"),
        actqd: i("proto_sc.fuli.actqd"),
        jxh: i("proto_sc.fuli.jxh"),
        online: i("proto_sc.fuli.online")
    },

    mergefuli: {
        mergefchofuli: i("proto_sc.mergefuli.mergefchofuli"),
    },
    boite: {
        yhInfo: i("proto_sc.boite.yhInfo"),
        yhType: i("proto_sc.boite.yhType"),
        yhshow: i("proto_sc.boite.yhshow"),
        yhBaseInfo: i("proto_sc.boite.yhBaseInfo"),
        yhOld: i("proto_sc.boite.yhOld"),
        yhbad: i("proto_sc.boite.yhbad"),
        lbList: i("proto_sc.boite.lbList"),
        jlShop: i("proto_sc.boite.jlShop"),
        yhList: i("proto_sc.boite.yhList"),
        heroList: i("proto_sc.boite.heroList"),
        myYhRid: i("proto_sc.boite.myYhRid"),
        win: i("proto_sc.boite.win")
    },
    shop: {
        list: i("proto_sc.shop.list"),
        giftlist: i("proto_sc.shop.giftlist")
    },
    yamen: {
        info: i("proto_sc.yamen.info"),
        fight: i("proto_sc.yamen.fight"),
        cslist: i("proto_sc.yamen.cslist"),
        fclist: i("proto_sc.yamen.fclist"),
        rank: i("proto_sc.yamen.rank"),
        deflog: i("proto_sc.yamen.deflog"),
        enymsg: i("proto_sc.yamen.enymsg"),
        myrank: i("proto_sc.yamen.myrank"),
        kill20log: i("proto_sc.yamen.kill20log"),
        win: i("proto_sc.yamen.win"),
        zhuisha: i("proto_sc.yamen.zhuisha")
    },
    task: {
        tmain: i("proto_sc.task.tmain")
    },
    order: {
        back: i("proto_sc.order.back"),
        rorder: i("proto_sc.order.rorder"),
        rshop: i("proto_sc.order.rshop"),
        vipexp: i("proto_sc.order.vipexp")
    },
    huodonglist: {
        all: i("proto_sc.huodonglist.all")
    },
    xshuodong: {
        newqifu: i("proto_sc.xshuodong.newqifu"),
        newchuyou: i("proto_sc.xshuodong.newchuyou"),
        newxufang: i("proto_sc.xshuodong.newxufang"),
        newpengren: i("proto_sc.xshuodong.newpengren"),
        newtreasure: i("proto_sc.xshuodong.newtreasure"),
        newjinglidan: i("proto_sc.xshuodong.newjinglidan"),
        newwenhou: i("proto_sc.xshuodong.newwenhou"),
        newjiaoji: i("proto_sc.xshuodong.newjiaoji"),
        newlilian: i("proto_sc.xshuodong.newlilian"),
        newstealdew: i("proto_sc.xshuodong.newstealdew"),
        newplant: i("proto_sc.xshuodong.newplant"),
        newlingyou: i("proto_sc.xshuodong.newlingyou"),

        cash: i("proto_sc.xshuodong.cash"),
        amy: i("proto_sc.xshuodong.amy"),
        coin: i("proto_sc.xshuodong.coin"),
        food: i("proto_sc.xshuodong.food"),
        juanzhou: i("proto_sc.xshuodong.juanzhou"),
        qinmi: i("proto_sc.xshuodong.qinmi"),
        shili: i("proto_sc.xshuodong.shili"),
        zhengwu: i("proto_sc.xshuodong.zhengwu"),
        login: i("proto_sc.xshuodong.login"),
        yamen: i("proto_sc.xshuodong.yamen"),
        lianyin: i("proto_sc.xshuodong.lianyin"),
        school: i("proto_sc.xshuodong.school"),
        jingshang: i("proto_sc.xshuodong.jingshang"),
        nongchan: i("proto_sc.xshuodong.nongchan"),
        zhaomu: i("proto_sc.xshuodong.zhaomu"),
        jishag2d: i("proto_sc.xshuodong.jishag2d"),
        cjfanren: i("proto_sc.xshuodong.cjfanren"),
        tiaozhanshu: i("proto_sc.xshuodong.tiaozhanshu"),
        zhenzai: i("proto_sc.xshuodong.zhenzai"),
        tilidan: i("proto_sc.xshuodong.tilidan"),
        huolidan: i("proto_sc.xshuodong.huolidan"),
        meilizhi: i("proto_sc.xshuodong.meilizhi"),
        fuyanhui: i("proto_sc.xshuodong.fuyanhui"),
        clubbosshit: i("proto_sc.xshuodong.clubbosshit"),
        clubbossjs: i("proto_sc.xshuodong.clubbossjs"),
        jiulouzf: i("proto_sc.xshuodong.jiulouzf"),
        treasure: i("proto_sc.xshuodong.treasure"),
        qifu: i("proto_sc.xshuodong.qifu"),
        jinglidan: i("proto_sc.xshuodong.jinglidan"),
        chuyou: i("proto_sc.xshuodong.chuyou"),
        wenhou: i("proto_sc.xshuodong.wenhou"),
        jiaoji: i("proto_sc.xshuodong.jiaoji"),
        yingyuan: i("proto_sc.xshuodong.yingyuan"),
        xufang: i("proto_sc.xshuodong.xufang"),
        lilian: i("proto_sc.xshuodong.lilian"),
        pengren: i("proto_sc.xshuodong.pengren"),
        xsRank: i("proto_sc.xshuodong.xsRank"),
        dzlogin: i("proto_sc.xshuodong.dzlogin"),
        stealdew: i("proto_sc.xshuodong.stealdew"),
        wishing: i("proto_sc.xshuodong.wishing"),
        plant: i("proto_sc.xshuodong.plant"),
        lingyou: i("proto_sc.xshuodong.lingyou"),
        hefuqifu: i("proto_sc.xshuodong.hefuqifu"),
        hefuwenhou: i("proto_sc.xshuodong.hefuwenhou"),
        hefutreasure: i("proto_sc.xshuodong.hefutreasure"),
        hefuplant: i("proto_sc.xshuodong.hefuplant")
    },
    cbhuodong: {
        club: i("proto_sc.cbhuodong.club"),
        clublist: i("proto_sc.cbhuodong.clublist"),
        myclubRid: i("proto_sc.cbhuodong.myclubRid"),
        guanqia: i("proto_sc.cbhuodong.guanqia"),
        guanqialist: i("proto_sc.cbhuodong.guanqialist"),
        myguanqiaRid: i("proto_sc.cbhuodong.myguanqiaRid"),
        shili: i("proto_sc.cbhuodong.shili"),
        shililist: i("proto_sc.cbhuodong.shililist"),
        myshiliRid: i("proto_sc.cbhuodong.myshiliRid"),
        love: i("proto_sc.cbhuodong.love"),
        lovelist: i("proto_sc.cbhuodong.lovelist"),
        myloveRid: i("proto_sc.cbhuodong.myloveRid"),
        yamen: i("proto_sc.cbhuodong.yamen"),
        yamenlist: i("proto_sc.cbhuodong.yamenlist"),
        myyamenRid: i("proto_sc.cbhuodong.myyamenRid"),
        yinliang: i("proto_sc.cbhuodong.yinliang"),
        yinlianglist: i("proto_sc.cbhuodong.yinlianglist"),
        myYinLiangRid: i("proto_sc.cbhuodong.myYinLiangRid"),
        jiulou: i("proto_sc.cbhuodong.jiulou"),
        jiuloulist: i("proto_sc.cbhuodong.jiuloulist"),
        myJiuLouRid: i("proto_sc.cbhuodong.myJiuLouRid"),
        shibing: i("proto_sc.cbhuodong.shibing"),
        shibinglist: i("proto_sc.cbhuodong.shibinglist"),
        myShiBingRid: i("proto_sc.cbhuodong.myShiBingRid"),
        liangshi: i("proto_sc.cbhuodong.liangshi"),
        liangshilist: i("proto_sc.cbhuodong.liangshilist"),
        myLiangShiRid: i("proto_sc.cbhuodong.myLiangShiRid"),
        treasure: i("proto_sc.cbhuodong.treasure"),
        treasurelist: i("proto_sc.cbhuodong.treasurelist"),
        myTreaRid: i("proto_sc.cbhuodong.myTreaRid"),
        herojb: i("proto_sc.cbhuodong.herojb"),
        herojblist: i("proto_sc.cbhuodong.herojblist"),
        myHerojbRid: i("proto_sc.cbhuodong.myHerojbRid"),
        herozz: i("proto_sc.cbhuodong.herozz"),
        herozzlist: i("proto_sc.cbhuodong.herozzlist"),
        myHerozzRid: i("proto_sc.cbhuodong.myHerozzRid"),
        meili: i("proto_sc.cbhuodong.meili"),
        meililist: i("proto_sc.cbhuodong.meililist"),
        myMeiLiRid: i("proto_sc.cbhuodong.myMeiLiRid"),
        stealcl: i("proto_sc.cbhuodong.stealcl"),
        stealcllist: i("proto_sc.cbhuodong.stealcllist"),
        myStealclRid: i("proto_sc.cbhuodong.myStealclRid"),
        plants: i("proto_sc.cbhuodong.plants"),
        plantslist: i("proto_sc.cbhuodong.plantslist"),
        myPlantsRid: i("proto_sc.cbhuodong.myPlantsRid"),
        wifeskillexp: i("proto_sc.cbhuodong.wifeskillexp"),
        wifeskillexplist: i("proto_sc.cbhuodong.wifeskillexplist"),
        myWifeskillexpRid: i("proto_sc.cbhuodong.myWifeskillexpRid"),
        sonshili: i("proto_sc.cbhuodong.sonshili"),
        sonshililist: i("proto_sc.cbhuodong.sonshililist"),
        mySonshiliRid: i("proto_sc.cbhuodong.mySonshiliRid"),
        clubyamen: i("proto_sc.cbhuodong.clubyamen"),
        clubyamenlist: i("proto_sc.cbhuodong.clubyamenlist"),
        myclubyamen: i("proto_sc.cbhuodong.myclubyamen")
    },
    czhuodong: {
        day: i("proto_sc.czhuodong.day"),
        total: i("proto_sc.czhuodong.total"),
        leitian: i("proto_sc.czhuodong.leitian"),
        onceRecharge: i("proto_sc.czhuodong.onceRecharge")
    },
    edczhuodong: {
        everyday: i("proto_sc.edczhuodong.everyday")
    },
    zchuodong: {
        Gift: i("proto_sc.zchuodong.Gift")
    },
    mergezchuodong: {
        mergeGift: i("proto_sc.mergezchuodong.mergeGift")
    },
    jchuodong: {
        jianchen: i("proto_sc.jchuodong.jianchen")
    },
    jghuodong: {
        jinguo: i("proto_sc.jghuodong.jinguo")
    },
    njhuodong: {
        nvjiang: i("proto_sc.njhuodong.nvjiang")
    },
    xghuodong: {
        shop: i("proto_sc.xghuodong.shop"),
        boss: i("proto_sc.xghuodong.boss"),
        exchange: i("proto_sc.xghuodong.exchange"),
        bag: i("proto_sc.xghuodong.bag"),
        scoreRank: i("proto_sc.xghuodong.scoreRank"),
        clublist: i("proto_sc.xghuodong.clublist"),
        cfg: i("proto_sc.xghuodong.cfg"),
        win: i("proto_sc.xghuodong.win"),
        rwdLog: i("proto_sc.xghuodong.rwdLog"),
        myScore: i("proto_sc.xghuodong.myScore"),
        myclubRid: i("proto_sc.xghuodong.myclubRid"),
        score: i("proto_sc.xghuodong.score")
    },
    yyhuodong: {
        shop: i("proto_sc.yyhuodong.shop"),
        exchange: i("proto_sc.yyhuodong.exchange"),
        bag: i("proto_sc.yyhuodong.bag"),
        small_list: i("proto_sc.yyhuodong.small_list"),
        big_list: i("proto_sc.yyhuodong.big_list"),
        VictoryOrDefeat: i("proto_sc.yyhuodong.VictoryOrDefeat"),
        TotalRank_list: i("proto_sc.yyhuodong.TotalRank_list"),
        myYyRid: i("proto_sc.yyhuodong.myYyRid"),
        cfg: i("proto_sc.yyhuodong.cfg"),
        records: i("proto_sc.yyhuodong.records"),
        score: i("proto_sc.yyhuodong.score"),
        contribution: i("proto_sc.yyhuodong.contribution"),
        leiji: i("proto_sc.yyhuodong.leiji")
    },
    penalize: {
        shop: i("proto_sc.penalize.shop"),
        boss: i("proto_sc.penalize.boss"),
        exchange: i("proto_sc.penalize.exchange"),
        bag: i("proto_sc.penalize.bag"),
        scoreRank: i("proto_sc.penalize.scoreRank"),
        clublist: i("proto_sc.penalize.clublist"),
        cfg: i("proto_sc.penalize.cfg"),
        win: i("proto_sc.penalize.win"),
        rwdLog: i("proto_sc.penalize.rwdLog"),
        myScore: i("proto_sc.penalize.myScore"),
        myclubRid: i("proto_sc.penalize.myclubRid"),
        score: i("proto_sc.penalize.score")
    },
    nationalDay: {
        shop: i("proto_sc.nationalDay.shop"),
        boss: i("proto_sc.nationalDay.boss"),
        exchange: i("proto_sc.nationalDay.exchange"),
        bag: i("proto_sc.nationalDay.bag"),
        scoreRank: i("proto_sc.nationalDay.scoreRank"),
        clublist: i("proto_sc.nationalDay.clublist"),
        cfg: i("proto_sc.nationalDay.cfg"),
        win: i("proto_sc.nationalDay.win"),
        rwdLog: i("proto_sc.nationalDay.rwdLog"),
        myScore: i("proto_sc.nationalDay.myScore"),
        myclubRid: i("proto_sc.nationalDay.myclubRid"),
        score: i("proto_sc.nationalDay.score")
    },
    doubleNinth: {
        shop: i("proto_sc.doubleNinth.shop"),
        boss: i("proto_sc.doubleNinth.boss"),
        exchange: i("proto_sc.doubleNinth.exchange"),
        bag: i("proto_sc.doubleNinth.bag"),
        scoreRank: i("proto_sc.doubleNinth.scoreRank"),
        clublist: i("proto_sc.doubleNinth.clublist"),
        cfg: i("proto_sc.doubleNinth.cfg"),
        win: i("proto_sc.doubleNinth.win"),
        rwdLog: i("proto_sc.doubleNinth.rwdLog"),
        myScore: i("proto_sc.doubleNinth.myScore"),
        myclubRid: i("proto_sc.doubleNinth.myclubRid"),
        score: i("proto_sc.doubleNinth.score"),
        leiji: i("proto_sc.doubleNinth.leiji")
    },
    doubleEleven: {
        list: i("proto_sc.doubleEleven.list"),
        giftlist: i("proto_sc.doubleEleven.giftlist"),
        cfg: i("proto_sc.doubleEleven.cfg"),
        win: i("proto_sc.doubleEleven.win"),
        leiji: i("proto_sc.doubleEleven.leiji")
    },
    ThanksDay: {
        shop: i("proto_sc.ThanksDay.shop"),
        boss: i("proto_sc.ThanksDay.boss"),
        exchange: i("proto_sc.ThanksDay.exchange"),
        bag: i("proto_sc.ThanksDay.bag"),
        scoreRank: i("proto_sc.ThanksDay.scoreRank"),
        clublist: i("proto_sc.ThanksDay.clublist"),
        cfg: i("proto_sc.ThanksDay.cfg"),
        win: i("proto_sc.ThanksDay.win"),
        rwdLog: i("proto_sc.ThanksDay.rwdLog"),
        myScore: i("proto_sc.ThanksDay.myScore"),
        myclubRid: i("proto_sc.ThanksDay.myclubRid"),
        score: i("proto_sc.ThanksDay.score"),
        leiji: i("proto_sc.ThanksDay.leiji")
    },
    zphuodong: {
        zhuanpan: i("proto_sc.zphuodong.zhuanpan"),
        total: i("proto_sc.zphuodong.total"),
        zpzmd: i("proto_sc.zphuodong.zpzmd"),
        zplog: i("proto_sc.zphuodong.zplog"),
        win: i("proto_sc.zphuodong.win"),
        xsRank: i("proto_sc.zphuodong.xsRank")
    },
    sdhuodong: {
        zadan: i("proto_sc.sdhuodong.zadan"),
        sdzmd: i("proto_sc.sdhuodong.sdzmd"),
        win: i("proto_sc.sdhuodong.win"),
        souji: i("proto_sc.sdhuodong.souji")
    },
    dzphuodong: {
        cfg: i("proto_sc.dzphuodong.cfg")
    },
    luckydraw: {
        turntable: i("proto_sc.luckydraw.turntable"),
        rwdLog: i("proto_sc.luckydraw.rwdLog"),
        shop: i("proto_sc.luckydraw.shop"),
        scoreExchange: i("proto_sc.luckydraw.scoreExchange"),
        dayRank: i("proto_sc.luckydraw.dayRank"),
        mydayRank: i("proto_sc.luckydraw.mydayRank"),
        totalRank: i("proto_sc.luckydraw.totalRank"),
        myTotalRank: i("proto_sc.luckydraw.myTotalRank")
    },
    xbhuodong: {
        xunbao: i("proto_sc.xbhuodong.xunbao")
    },
    sevenSign: {
        cfg: i("proto_sc.sevenSign.cfg")
    },
    duihuodong: {
        duihuan: i("proto_sc.duihuodong.duihuan")
    },
    sidafanwanghd: {
        fanwang: i("proto_sc.sidafanwanghd.fanwang")
    },
    daydaybuy: {
        dayday: i("proto_sc.daydaybuy.dayday")
    },
    duihuanshop: {
        shop: i("proto_sc.duihuanshop.shop")
    },
    jshuodong: {
        unlock: i("proto_sc.jshuodong.unlock")
    },
    sfhuodong: {
        sfGift: i("proto_sc.sfhuodong.sfGift")
    },
    dxrhuodong: {
        snowman: i("proto_sc.dxrhuodong.snowman"),
        shop: i("proto_sc.dxrhuodong.shop"),
        exchange: i("proto_sc.dxrhuodong.exchange"),

        rank: i("proto_sc.dxrhuodong.dxrRank"),
        myRank: i("proto_sc.dxrhuodong.mydxrRid"),

        records: i("proto_sc.dxrhuodong.records")
    },

    duixueren: {
        rank: i("proto_sc.duixueren.dxrRank"),
        myRank: i("proto_sc.duixueren.mydxrRid"),
    },

    lxczhuodong: {
        continuity: i("proto_sc.lxczhuodong.continuity")
    },
    glqdhuodong: {
        celebration: i("proto_sc.glqdhuodong.celebration"),
        rule: i("proto_sc.glqdhuodong.rule"),
        cbrwd: i("proto_sc.glqdhuodong.cbrwd"),
        paihangZl: i("proto_sc.glqdhuodong.paihangZl"),
        exchange: i("proto_sc.glqdhuodong.exchange"),
        cashlist: i("proto_sc.glqdhuodong.cashlist"),
        myCashRid: i("proto_sc.glqdhuodong.myCashRid"),
        yuelilist: i("proto_sc.glqdhuodong.yuelilist"),
        myYueLiRid: i("proto_sc.glqdhuodong.myYueLiRid"),
        yinlianglist: i("proto_sc.glqdhuodong.yinlianglist"),
        myYinLiangRid: i("proto_sc.glqdhuodong.myYinLiangRid"),
        mingshenglist: i("proto_sc.glqdhuodong.mingshenglist"),
        myMingShengRid: i("proto_sc.glqdhuodong.myMingShengRid"),
        treasurelist: i("proto_sc.glqdhuodong.treasurelist"),
        myTreaRid: i("proto_sc.glqdhuodong.myTreaRid"),
        banchailist: i("proto_sc.glqdhuodong.banchailist"),
        myBanChaiRid: i("proto_sc.glqdhuodong.myBanChaiRid"),
        xunfanglist: i("proto_sc.glqdhuodong.xunfanglist"),
        myXunFangRid: i("proto_sc.glqdhuodong.myXunFangRid"),
        lianyinlist: i("proto_sc.glqdhuodong.lianyinlist"),
        myLianYinRid: i("proto_sc.glqdhuodong.myLianYinRid"),
        dayRankList: i("proto_sc.glqdhuodong.dayRankList"),
        mydayRankRid: i("proto_sc.glqdhuodong.mydayRankRid"),
        totalRankList: i("proto_sc.glqdhuodong.totalRankList"),
        mytotalRankRid: i("proto_sc.glqdhuodong.mytotalRankRid")
    },
    fphuodong: {
        flop: i("proto_sc.fphuodong.flop"),
        records: i("proto_sc.fphuodong.records"),
        showeff: i("proto_sc.fphuodong.showeff")
    },
    ddhuodong: {
        lantern: i("proto_sc.ddhuodong.lantern"),
        records: i("proto_sc.ddhuodong.records")
    },
    solarterms: {
        purchase: i("proto_sc.solarterms.purchase"),
        cfg: i("proto_sc.solarterms.cfg")
    },

    mergesolarterms: {
        mergepurchase: i("proto_sc.mergesolarterms.mergepurchase"),
        cfg: i("proto_sc.mergesolarterms.cfg")
    },

    luckyCharm: {
        share: i("proto_sc.luckyCharm.share")
    },
    girlsday: {
        mirror: i("proto_sc.girlsday.mirror"),
        res: i("proto_sc.girlsday.res"),
        rwd: i("proto_sc.girlsday.rwd"),
        allrwd: i("proto_sc.girlsday.allrwd"),
        records: i("proto_sc.girlsday.records")
    },
    arborday: {
        cfg: i("proto_sc.arborday.cfg"),
        rwdLog: i("proto_sc.arborday.rwdLog"),
        finalRank: i("proto_sc.arborday.finalRank"),
        myYyRid: i("proto_sc.arborday.myYyRid")
    },
    qingming: {
        cfg: i("proto_sc.qingming.cfg"),
        act: i("proto_sc.qingming.act"),
        shop: i("proto_sc.qingming.shop"),
        exchange: i("proto_sc.qingming.exchange"),
        rwdLog: i("proto_sc.qingming.rwdLog"),
        qmRank: i("proto_sc.qingming.qmRank"),
        myQmRid: i("proto_sc.qingming.myQmRid")
    },
    studyday: {
        mirror: i("proto_sc.studyday.mirror"),
        shop: i("proto_sc.studyday.shop"),
        res: i("proto_sc.studyday.res"),
        records: i("proto_sc.studyday.records")
    },
    laborDay: {
        cfg: i("proto_sc.laborDay.cfg"),
        exchange: i("proto_sc.laborDay.exchange"),
        shop: i("proto_sc.laborDay.shop"),
        rwdLog: i("proto_sc.laborDay.rwdLog"),
        finalRank: i("proto_sc.laborDay.finalRank"),
        myLdRid: i("proto_sc.laborDay.myLdRid")
    },
    qiushou: {
        cfg: i("proto_sc.qiushou.cfg"),
        exchange: i("proto_sc.qiushou.exchange"),
        shop: i("proto_sc.qiushou.shop"),
        rwdLog: i("proto_sc.qiushou.rwdLog"),
        finalRank: i("proto_sc.qiushou.finalRank"),
        myLdRid: i("proto_sc.qiushou.myLdRid")
    },
    qihuan: {
        cfg: i("proto_sc.FantasyNight.cfg"),
        exchange: i("proto_sc.FantasyNight.exchange"),
        shop: i("proto_sc.FantasyNight.shop"),
        rwdLog: i("proto_sc.FantasyNight.rwdLog"),
        finalRank: i("proto_sc.FantasyNight.finalRank"),
        give_gift: i("proto_sc.FantasyNight.give_gift"),
        myLdRid: i("proto_sc.FantasyNight.myLdRid")
    },

    mate: {
        cfg: i("proto_sc.mate.cfg"),
        regression: i("proto_sc.mate.regression")
    },

    dragonBoat: {
        cfg: i("proto_sc.dragonBoat.cfg"),
        act: i("proto_sc.dragonBoat.act"),
        shop: i("proto_sc.dragonBoat.shop"),
        exchange: i("proto_sc.dragonBoat.exchange"),
        rwdLog: i("proto_sc.dragonBoat.rwdLog"),
        dwRank: i("proto_sc.dragonBoat.dwRank"),
        myDwRid: i("proto_sc.dragonBoat.myDwRid")
    },
    Balloon: {
        cfg: i("proto_sc.Balloon.cfg"),
        act: i("proto_sc.Balloon.act"),
        shop: i("proto_sc.Balloon.shop"),
        exchange: i("proto_sc.Balloon.exchange"),
        rwdLog: i("proto_sc.Balloon.rwdLog"),
        QqRank: i("proto_sc.Balloon.QqRank"),
        myQqRid: i("proto_sc.Balloon.myQqRid")
    },
    BiShuQingLin: {
        cfg: i("proto_sc.BiShuQingLin.cfg"),
        act: i("proto_sc.BiShuQingLin.act"),
        shop: i("proto_sc.BiShuQingLin.shop"),
        exchange: i("proto_sc.BiShuQingLin.exchange"),
        rwdLog: i("proto_sc.BiShuQingLin.rwdLog"),
        QqRank: i("proto_sc.BiShuQingLin.QqRank"),
        myQqRid: i("proto_sc.BiShuQingLin.myQqRid")
    },
    jigsaw: {
        cfg: i("proto_sc.jigsaw.cfg"),
        rwdLog: i("proto_sc.jigsaw.rwdLog")
    },
    liondance: {
        cfg: i("proto_sc.liondance.cfg"),
        shop: i("proto_sc.liondance.shop"),
        exchange: i("proto_sc.liondance.exchange")
    },
    cjttczhuodong: {
        cjttcz: i("proto_sc.cjttczhuodong.cjttcz")
    },
    ltrecharge: {
        leitian: i("proto_sc.ltrecharge.leitian")
    },
    dblchuodong: {
        cfg: i("proto_sc.dblchuodong.cfg")
    },
    mergedblchuodong: {
        mergecfg: i("proto_sc.mergedblchuodong.mergecfg")
    },
    clothepve: {
        info: i("proto_sc.clothepve.info"),
        ranklist: i("proto_sc.clothepve.ranklist"),
        myScore: i("proto_sc.clothepve.myScore"),
        base: i("proto_sc.clothepve.base"),
        scores: i("proto_sc.clothepve.scores"),
        win: i("proto_sc.clothepve.win"),
        logs: i("proto_sc.clothepve.logs"),
        referr: i("proto_sc.clothepve.referr")
    },
    clothepvp: {
        info: i("proto_sc.clothepvp.info"),
        ranklist: i("proto_sc.clothepvp.ranklist"),
        myScore: i("proto_sc.clothepvp.myScore"),
        base: i("proto_sc.clothepvp.base"),
        clothe: i("proto_sc.clothepvp.clothe"),
        math: i("proto_sc.clothepvp.math")
    },
    chat: {
        report: i("proto_sc.chat.report"),
        forbidden: i("proto_sc.chat.forbidden"),
        sev: i("proto_sc.chat.sev"),
        sys: i("proto_sc.chat.sys"),
        club: i("proto_sc.chat.club"),
        kuafu: i("proto_sc.chat.kuafu"),
        pao: i("proto_sc.chat.pao"),
        blacklist: i("proto_sc.chat.blacklist"),
        laba: i("proto_sc.chat.laba")
    },
    Fishing: {
        cfg: i("proto_sc.Fishing.cfg"),
        act: i("proto_sc.Fishing.act"),
        shop: i("proto_sc.Fishing.shop"),
        exchange: i("proto_sc.Fishing.exchange"),
        special_exchange: i("proto_sc.Fishing.special_exchange"),
        CdRank: i("proto_sc.Fishing.CdRank"),
        myFishRid: i("proto_sc.Fishing.myFishRid")

    },
    food: {
        cfg: i("proto_sc.food.cfg"),
        act: i("proto_sc.food.act"),
        shop: i("proto_sc.food.shop"),
        exchange: i("proto_sc.food.exchange"),
        special_exchange: i("proto_sc.food.special_exchange"),
        XfRank: i("proto_sc.food.XfRank"),
        myFoodRid: i("proto_sc.food.myFoodRid")

    },
    recode: {
        exchange: i("proto_sc.recode.exchange")
    },
    notice: {
        list: i("proto_sc.notice.list"),
        listNew: i("proto_sc.notice.listNew"),
        activity: i("proto_sc.notice.activity")
    },
    derail: {
        list: i("proto_sc.derail.list")
    },
    hunt: {
        hdInfo: i("proto_sc.hunt.hdInfo"),
        hunt: i("proto_sc.hunt.hunt"),
        rwdLog: i("proto_sc.hunt.rwdLog"),
        firstScore: i("proto_sc.hunt.firstScore"),
        allScore: i("proto_sc.hunt.allScore"),
        scoreRank: i("proto_sc.hunt.scoreRank"),
        rwd: i("proto_sc.hunt.rwd"),
        fail: i("proto_sc.hunt.fail"),
        win: i("proto_sc.hunt.win"),
        myScore: i("proto_sc.hunt.myScore"),
        huntFinish: i("proto_sc.hunt.huntFinish")
    },
    taofa: {
        playInfo: i("proto_sc.taofa.playInfo"),
        scoreRank: i("proto_sc.taofa.scoreRank"),
        myRand: i("proto_sc.taofa.myRand"),
        rootInfo: i("proto_sc.taofa.rootInfo"),
        win: i("proto_sc.taofa.win"),
        fail: i("proto_sc.taofa.fail")
    },
    hanlin: {
        ting: i("proto_sc.hanlin.ting"),
        info: i("proto_sc.hanlin.info"),
        desk: i("proto_sc.hanlin.desk"),
        win: i("proto_sc.hanlin.win")
    },
    trade: {
        Info: i("proto_sc.trade.Info"),
        scoreRank: i("proto_sc.trade.scoreRank"),
        myRand: i("proto_sc.trade.myRand"),
        win: i("proto_sc.trade.win"),
        fail: i("proto_sc.trade.fail"),
        fight: i("proto_sc.trade.fight")
    },
    kuayamen: {
        hdinfo: i("proto_sc.kuayamen.hdinfo"),
        info: i("proto_sc.kuayamen.info"),
        fight: i("proto_sc.kuayamen.fight"),
        cslist: i("proto_sc.kuayamen.cslist"),
        fclist: i("proto_sc.kuayamen.fclist"),
        scoreRank: i("proto_sc.kuayamen.scoreRank"),
        severRank: i("proto_sc.kuayamen.severRank"),
        deflog: i("proto_sc.kuayamen.deflog"),
        enymsg: i("proto_sc.kuayamen.enymsg"),
        myScore: i("proto_sc.kuayamen.myScore"),
        severScore: i("proto_sc.kuayamen.severScore"),
        kill20log: i("proto_sc.kuayamen.kill20log"),
        win: i("proto_sc.kuayamen.win"),
        zhuisha: i("proto_sc.kuayamen.zhuisha"),
        yuxuan: i("proto_sc.kuayamen.yuxuan"),
        lingqu: i("proto_sc.kuayamen.lingqu"),
        chat: i("proto_sc.kuayamen.chat"),
        firstScoreRank: i("proto_sc.kuayamen.firstScoreRank")
    },
    kuaguo: {
        baseinfo: i("proto_sc.kuaguo.baseinfo")
    },
    kuacbhuodong: {
        kuashili: i("proto_sc.kuacbhuodong.kuashili"),
        userlist: i("proto_sc.kuacbhuodong.userlist"),
        mykuashiliRid: i("proto_sc.kuacbhuodong.mykuashiliRid"),
        qufulist: i("proto_sc.kuacbhuodong.qufulist"),
        mykuaquRid: i("proto_sc.kuacbhuodong.mykuaquRid"),
        chat: i("proto_sc.kuacbhuodong.chat"),
        kualove: i("proto_sc.kuacbhuodong.kualove"),
        userlovelist: i("proto_sc.kuacbhuodong.userlovelist"),
        mykualoveRid: i("proto_sc.kuacbhuodong.mykualoveRid"),
        qufulovelist: i("proto_sc.kuacbhuodong.qufulovelist"),
        mykuaquloveRid: i("proto_sc.kuacbhuodong.mykuaquloveRid"),
        lovechat: i("proto_sc.kuacbhuodong.lovechat"),

        kuagongdou: i("proto_sc.kuacbhuodong.kuagongdou"),
        usergongdoulist: i("proto_sc.kuacbhuodong.usergongdoulist"),
        mykuagongdouRid: i("proto_sc.kuacbhuodong.mykuagongdouRid"),
        qufugongdoulist: i("proto_sc.kuacbhuodong.qufugongdoulist"),
        mykuaqugongdouRid: i("proto_sc.kuacbhuodong.mykuaqugongdouRid"),
        gongdouchat: i("proto_sc.kuacbhuodong.gongdouchat"),

        fengxiandian: i("proto_sc.kuacbhuodong.fengxiandian")
    },
    gongdou: {
        baseInfo: i("proto_sc.gongdou.baseInfo"),
        totalInfo: i("proto_sc.gongdou.totalInfo"),
        winInfo: i("proto_sc.gongdou.winInfo"),
        batInfo: i("proto_sc.gongdou.batInfo"),
        cardInfo: i("proto_sc.gongdou.cardInfo"),
        showCard: i("proto_sc.gongdou.showCard"),
        result: i("proto_sc.gongdou.result"),
        scoreRank: i("proto_sc.gongdou.scoreRank"),
        myRand: i("proto_sc.gongdou.myRand"),
        rank: i("proto_sc.gongdou.rank"),
        shop: i("proto_sc.gongdou.shop"),
        batCard: i("proto_sc.gongdou.batCard"),
        spec: i("proto_sc.gongdou.spec")
    },
    naqie: {
        naqieList: i("proto_sc.naqie.naqieList")
    },
    friends: {
        flist: i("proto_sc.friends.flist"),
        news: i("proto_sc.friends.news"),
        tips: i("proto_sc.friends.tips"),
        fapplylist: i("proto_sc.friends.fapplylist"),
        fvow: i("proto_sc.friends.fvow"),
        affection: i("proto_sc.friends.affection"),
        recommend: i("proto_sc.friends.recommend"), //获得推荐列表
        fuser: i("proto_cs.friends.fuser"), //搜索结果
        fllist: i("proto_sc.friends.fllist"), //聊天列表，包括好友和内容 
        relationship: i("proto_sc.friends.relationship") //好友关系列表
    },
    gzj: {
        base: i("proto_sc.gzj.base"),
        list: i("proto_sc.gzj.list"),
        graduation: i("proto_sc.gzj.graduation"),
        dgift: i("proto_sc.gzj.dgift"),
        reward: i("proto_sc.gzj.reward"),
        gifts: i("proto_sc.gzj.gifts")
    },
    banish: {
        base: i("proto_sc.banish.base"),
        deskCashList: i("proto_sc.banish.deskCashList"),
        list: i("proto_sc.banish.list"),
        herolist: i("proto_sc.banish.herolist"),
        days: i("proto_sc.banish.days"),
        recall: i("proto_sc.banish.recall")
    },
    Activity: {
        present: i("proto_sc.Activity.present")
    },
    scpoint: {
        list: i("proto_sc.scpoint.list"),
        heroJB: i("proto_sc.scpoint.heroJB"),
        wifeJB: i("proto_sc.scpoint.wifeJB"),
        heroSW: i("proto_sc.scpoint.heroSW"),
        belief: i("proto_sc.scpoint.belief"),
        selectGroup: i("proto_sc.scpoint.selectGroup"),
        jbItem: i("proto_sc.scpoint.jbItem")
    },
    kitchen: {
        base: i("proto_sc.kitchen.base"),
        list: i("proto_sc.kitchen.list"),
        record: i("proto_sc.kitchen.record"),
        foods: i("proto_sc.kitchen.foods"),
        level: i("proto_sc.kitchen.level")
    },
    treasure: {
        base: i("proto_sc.treasure.base"),
        groups: i("proto_sc.treasure.groups"),
        treasure: i("proto_sc.treasure.treasure"),
        rankList: i("proto_sc.treasure.rankList"),
        myTreaRank: i("proto_sc.treasure.myTreaRank"),
        treatidy: i("proto_sc.treasure.treatidy"),
        tidyList: i("proto_sc.treasure.tidyList"),
        myTidyRank: i("proto_sc.treasure.myTidyRank")
    },
    feige: {
        feige: i("proto_sc.feige.feige"),
        sonFeige: i("proto_sc.feige.sonFeige"),
        friendFeige: i("proto_sc.feige.friendFeige")
    },
    clothe: {
        clothes: i("proto_sc.clothe.clothes"),
        userClothe: i("proto_sc.clothe.userClothe"),
        limittime: i("proto_sc.clothe.limittime"),
        rankList: i("proto_sc.clothe.rankList"),
        myClotheRank: i("proto_sc.clothe.myClotheRank"),
        suitlv: i("proto_sc.clothe.suitlv"),
        score: i("proto_sc.clothe.score")
    },
    userhead: {
        blanks: i("proto_sc.userhead.blanks"),
        blanktime: i("proto_sc.userhead.blanktime"),
        headavatar: i("proto_sc.userhead.headavatar"),
        heads: i("proto_sc.userhead.heads"),
        headtime: i("proto_sc.userhead.headtime")
    },
    voice: {
        voices: i("proto_sc.voice.voices")
    },
    flower: {
        base: i("proto_sc.flower.base"),
        chenlu: i("proto_sc.flower.chenlu"),
        level: i("proto_sc.flower.level"),
        feild: i("proto_sc.flower.feild"),
        rank: i("proto_sc.flower.rank"),
        myRank: i("proto_sc.flower.myRank"),
        steal: i("proto_sc.flower.steal"),
        logs: i("proto_sc.flower.logs"),
        cd: i("proto_sc.flower.cd"),
        autoshou: i("proto_sc.flower.autoshou"),
        worldtree: i("proto_sc.flower.worldtree"),
        treerank: i("proto_sc.flower.treerank"),
        myTreeRank: i("proto_sc.flower.myTreeRank"),
        protect: i("proto_sc.flower.protect")
    },
    flowerFriend: {
        field: i("proto_sc.flowerFriend.field"),
        level: i("proto_sc.flowerFriend.level"),
        friends: i("proto_sc.flowerFriend.friends"),
        notice: i("proto_sc.flowerFriend.notice"),
        receive: i("proto_sc.flowerFriend.receive"),
        rank: i("proto_sc.flowerFriend.rank"),
        myRank: i("proto_sc.flowerFriend.myRank"),
        give: i("proto_sc.flowerFriend.give") //送花 返回
    },
    keju: {},
    actboss: {
        info: i("proto_sc.actboss.info"),
        flist: i("proto_sc.actboss.flist"),
        myDmg: i("proto_sc.actboss.myDmg"),
        rankList: i("proto_sc.actboss.rankList"),
        hit: i("proto_sc.actboss.hit")
    },
    tangyuan: {
        info: i("proto_sc.tangyuan.info"),
        rank: i("proto_sc.tangyuan.rank"),
        myRank: i("proto_sc.tangyuan.myRank"),
        base: i("proto_sc.tangyuan.base"),
        exchange: i("proto_sc.tangyuan.exchange"),
        shop: i("proto_sc.tangyuan.shop")
    },
    gaodian: {
        info: i("proto_sc.gaodian.info"),
        rank: i("proto_sc.gaodian.rank"),
        myRank: i("proto_sc.gaodian.myRank"),
        base: i("proto_sc.gaodian.base"),
        exchange: i("proto_sc.gaodian.exchange")
    },
    mooncake: {
        info: i("proto_sc.mooncake.info"),
        rank: i("proto_sc.mooncake.rank"),
        myRank: i("proto_sc.mooncake.myRank"),
        base: i("proto_sc.mooncake.base"),
        exchange: i("proto_sc.mooncake.exchange")
    },
    mingyue: {
        info: i("proto_sc.ConfederateRose.info"),
        rank: i("proto_sc.ConfederateRose.rank"),
        myRank: i("proto_sc.ConfederateRose.myRank"),
        base: i("proto_sc.ConfederateRose.base"),
        exchange: i("proto_sc.ConfederateRose.exchange"),
        shop: i("proto_sc.ConfederateRose.shop"),
        merge: i("proto_sc.ConfederateRose.merge"),
        claim: i("proto_sc.ConfederateRose.claim"),
        shangjiao: i("proto_sc.ConfederateRose.shangjiao"),
        duihuan: i("proto_sc.ConfederateRose.duihuan"),
        gift: i("proto_sc.ConfederateRose.gift"),
        rwdLog: i("proto_sc.ConfederateRose.rwdLog")
    },

    cooperate: {
        cfg: i("proto_sc.Cooperate.cfg"),
        shop: i("proto_sc.Cooperate.shop"),
        tongxin: i("proto_sc.Cooperate.tongxin"),
        rank: i("proto_sc.Cooperate.TxRank"),
        myTxRid: i("proto_sc.Cooperate.myTxRid"),
        TxAllRank: i("proto_sc.Cooperate.TxAllRank"),
    },

    qiuyin: {
        cfg: i("proto_sc.qiuyin.cfg"),
        act: i("proto_sc.qiuyin.act"),
        shop: i("proto_sc.qiuyin.shop"),
        exchange: i("proto_sc.qiuyin.exchange"),
        qxRank: i("proto_sc.qiuyin.qiuyinRank"),
        myQxRid: i("proto_sc.qiuyin.myQiuyinRid")
    },
    fanghedeng: {
        hedenginfo: i("proto_sc.fanghedeng.hedenginfo"),
        fhdRank: i("proto_sc.fanghedeng.fhdRank"),
        myfhdRid: i("proto_sc.fanghedeng.myfhdRid"),
        shop: i("proto_sc.fanghedeng.shop"),
        exchange: i("proto_sc.fanghedeng.exchange")
    },
    newyear: {
        kongming: i("proto_sc.newyear.kongming"),
        kmdRank: i("proto_sc.newyear.kmdRank"),
        mykmdRid: i("proto_sc.newyear.mykmdRid"),
        shop: i("proto_sc.newyear.shop"),
        exchange: i("proto_sc.newyear.exchange")
    },
    thirtyCheck: {
        hdQianDaoConfig: i("proto_sc.thirtyCheck.hdQianDaoConfig")
    },
    sevenDays: {
        cfg: i("proto_sc.sevenDays.cfg"),
        act: i("proto_sc.sevenDays.act"),
        shop: i("proto_sc.sevenDays.shop"),
        exchange: i("proto_sc.sevenDays.exchange"),
        qxRank: i("proto_sc.sevenDays.qxRank"),
        myQxRid: i("proto_sc.sevenDays.myQxRid")
    },
    affection: {
        cfg: i("proto_sc.affection.cfg"),
        act: i("proto_sc.affection.act"),
        shop: i("proto_sc.affection.shop"),
        exchange: i("proto_sc.affection.exchange"),
        qxRank: i("proto_sc.affection.xsRank"),
        myQxRid: i("proto_sc.affection.myXsRid")
    },
    kite: {
        info: i("proto_sc.kite.info"),
        shop: i("proto_sc.kite.shop"),
        exchange: i("proto_sc.kite.exchange"),
        rank: i("proto_sc.kite.rank"),
        wind_type: i("proto_sc.kite.wind_type"),
        myRid: i("proto_sc.kite.mydxrRid")
    },
    queen: {
        info: i("proto_sc.queen.info"),
        shop: i("proto_sc.queen.shop"),
        exchange: i("proto_sc.queen.exchange"),
        rank: i("proto_sc.queen.rank"),
        myRid: i("proto_sc.queen.myRank")
    },
    advert: {
        cfg: i("proto_sc.advert.cfg")
    },
    zhongyuan: {
        cfg: i("proto_sc.zhongyuan.cfg"),
        win: i("proto_sc.zhongyuan.win"),
        rwdLog: i("proto_sc.zhongyuan.rwdLog"),
        shop: i("proto_sc.zhongyuan.shop"),
        exchange: i("proto_sc.zhongyuan.exchange"),
        zyRank: i("proto_sc.zhongyuan.zyRank"),
        myZyRid: i("proto_sc.zhongyuan.myZyRid")
    },
    RedBag: {
        info: i("proto_sc.RedBag.info"),
        rank: i("proto_sc.RedBag.rank"),
        myRank: i("proto_sc.RedBag.myRank"),
        base: i("proto_sc.RedBag.base"),
        exchange: i("proto_sc.RedBag.exchange")
    },
    red: {
        info: i("proto_sc.red.info"),
        rank: i("proto_sc.red.rank"),
        myRank: i("proto_sc.red.myRank"),
        base: i("proto_sc.red.base"),
        shop: i("proto_sc.red.shop"),
        exchange: i("proto_sc.red.exchange")
    },
    shoppingStreet: {
        mirror: i("proto_sc.shoppingStreet.mirror"),
        res: i("proto_sc.shoppingStreet.res"),
        rwd: i("proto_sc.shoppingStreet.rwd"),
        allrwd: i("proto_sc.shoppingStreet.allrwd"),
        records: i("proto_sc.shoppingStreet.records"),
        exchange: i("proto_sc.shoppingStreet.exchange"),
        rank: i("proto_sc.shoppingStreet.rank"),
        myRank: i("proto_sc.shoppingStreet.myRank"),
        shop: i("proto_sc.shoppingStreet.shop"),
    },
    jingYiHuaShang: {
        info: i("proto_sc.jingYiHuaShang.info"),
        exchange: i("proto_sc.jingYiHuaShang.exchange"),
        shop: i("proto_sc.jingYiHuaShang.shop"),
    },
    thanksGiving: {
        info: i("proto_sc.thanksGiving.info"),
        rank: i("proto_sc.thanksGiving.rank"),
        myRank: i("proto_sc.thanksGiving.myRank"),
        base: i("proto_sc.thanksGiving.base"),
        exchange: i("proto_sc.thanksGiving.exchange"),
        shop: i("proto_sc.thanksGiving.shop"),
        merge: i("proto_sc.thanksGiving.merge"),
        claim: i("proto_sc.thanksGiving.claim"),
        shangjiao: i("proto_sc.thanksGiving.shangjiao"),
        duihuan: i("proto_sc.thanksGiving.duihuan"),
        gift: i("proto_sc.thanksGiving.gift"),
        rwdLog: i("proto_sc.thanksGiving.rwdLog"),
        flist: i("proto_sc.thanksGiving.flist")
    },

    valentine: {
        info: i("proto_sc.valentine.info"),
        rank: i("proto_sc.valentine.rank"),
        myRank: i("proto_sc.valentine.myRank"),
        base: i("proto_sc.valentine.base"),
        exchange: i("proto_sc.valentine.exchange"),
        shop: i("proto_sc.valentine.shop"),
        merge: i("proto_sc.valentine.merge"),
        claim: i("proto_sc.valentine.claim"),
        shangjiao: i("proto_sc.valentine.shangjiao"),
        duihuan: i("proto_sc.valentine.duihuan"),
        gift: i("proto_sc.valentine.gift"),
        rwdLog: i("proto_sc.valentine.rwdLog"),
        lists: i("proto_sc.valentine.lists"),
        flist: i("proto_sc.valentine.flist")
    },
    liuGong: {
        info: i("proto_sc.liuGong.info"),
        rank: i("proto_sc.liuGong.rank"),
        fengyi_rank: i("proto_sc.liuGong.fengyi_rank"),
        myRank: i("proto_sc.liuGong.myRank"),
        qingan: i("proto_sc.liuGong.qingan"),
    },
    zhouNianChouJiang: {
        mirror: i("proto_sc.zhouNianChouJiang.mirror"),
        res: i("proto_sc.zhouNianChouJiang.res"),
        rwd: i("proto_sc.zhouNianChouJiang.rwd"),
        allrwd: i("proto_sc.zhouNianChouJiang.allrwd"),
        records: i("proto_sc.zhouNianChouJiang.records"),
        exchange: i("proto_sc.zhouNianChouJiang.exchange"),
        rank: i("proto_sc.zhouNianChouJiang.rank"),
        myRank: i("proto_sc.zhouNianChouJiang.myRank"),
        shop: i("proto_sc.zhouNianChouJiang.shop"),
    },
    zhouNian: {
        info: i("proto_sc.zhouNian.info"),
        exchange: i("proto_sc.zhouNian.exchange"),
        rwdLog: i("proto_sc.zhouNian.rwdLog"),
        rwd: i("proto_sc.zhouNian.rwd"),
    },
    xiuYun: {
        cfg: i("proto_sc.xiuYun.cfg"),
        exchange: i("proto_sc.xiuYun.exchange"),
        shop: i("proto_sc.xiuYun.shop"),
        rwdLog: i("proto_sc.xiuYun.rwdLog"),
        finalRank: i("proto_sc.xiuYun.finalRank"),
        give_gift: i("proto_sc.xiuYun.give_gift"),
        myLdRid: i("proto_sc.xiuYun.myLdRid"),
        score_rwd: i("proto_sc.xiuYun.score_rwd"),
    },

    xiXiang: {
        cfg: i("proto_sc.xiXiang.cfg"),
        exchange: i("proto_sc.xiXiang.exchange"),
        shop: i("proto_sc.xiXiang.shop"),
        rwdLog: i("proto_sc.xiXiang.rwdLog"),
        finalRank: i("proto_sc.xiXiang.finalRank"),
        give_gift: i("proto_sc.xiXiang.give_gift"),
        myLdRid: i("proto_sc.xiXiang.myLdRid"),
        score_rwd: i("proto_sc.xiXiang.score_rwd"),
    },

    christmas: {
        info: i("proto_sc.christmas.info"),
        records: i("proto_sc.christmas.records"),
        shop: i("proto_sc.christmas.shop"),
        level_data: i("proto_sc.christmas.level_data"),
        exchange: i("proto_sc.christmas.exchange"),
        myRank: i("proto_sc.christmas.myRank"),
        rank: i("proto_sc.christmas.rank"),
    },

    sakura: {
        info: i("proto_sc.sakura.info"),
        records: i("proto_sc.sakura.records"),
        shop: i("proto_sc.sakura.shop"),
        level_data: i("proto_sc.sakura.level_data"),
        exchange: i("proto_sc.sakura.exchange"),
        myRank: i("proto_sc.sakura.myRank"),
        rank: i("proto_sc.sakura.rank"),
    },

    linlang: {
        info: i("proto_sc.linlang.info"),
        lists: i("proto_sc.linlang.lists"),
        prize_records: i("proto_sc.linlang.prize_records"),
        buy_records: i("proto_sc.linlang.buy_records"),
        records: i("proto_sc.linlang.records"),
        myRank: i("proto_sc.linlang.myRank"),
        rank: i("proto_sc.linlang.rank"),
        htInfo: i("proto_sc.linlang.htInfo"),

    },

    hongbao: {
        lists: i("proto_sc.hongbao.lists"),
        position: i("proto_sc.hongbao.position"),
        info: i("proto_sc.hongbao.info"),
        records: i("proto_sc.hongbao.records"),
        rank: i("proto_sc.hongbao.rank"),
        shop: i("proto_sc.hongbao.shop"),
        exchange: i("proto_sc.hongbao.exchange"),
    },

    huoDongYueChouJiang: {
        mirror: i("proto_sc.huoDongYueChouJiang.mirror"),
        res: i("proto_sc.huoDongYueChouJiang.res"),
        rwd: i("proto_sc.huoDongYueChouJiang.rwd"),
        allrwd: i("proto_sc.huoDongYueChouJiang.allrwd"),
        records: i("proto_sc.huoDongYueChouJiang.records"),
        exchange: i("proto_sc.huoDongYueChouJiang.exchange"),
        rank: i("proto_sc.huoDongYueChouJiang.rank"),
        myRank: i("proto_sc.huoDongYueChouJiang.myRank"),
        shop: i("proto_sc.huoDongYueChouJiang.shop"),
        num: i("proto_sc.huoDongYueChouJiang.num"),
    },
    huoDongYue: {
        info: i("proto_sc.huoDongYue.info"),
        exchange: i("proto_sc.huoDongYue.exchange"),
        rwdLog: i("proto_sc.huoDongYue.rwdLog"),
        rwd: i("proto_sc.huoDongYue.rwd"),
    },
    xingYuDengLuo: {
        mirror: i("proto_sc.xingYuDengLuo.mirror"),
        res: i("proto_sc.xingYuDengLuo.res"),
        rwd: i("proto_sc.xingYuDengLuo.rwd"),
        allrwd: i("proto_sc.xingYuDengLuo.allrwd"),
        records: i("proto_sc.xingYuDengLuo.records"),
        exchange: i("proto_sc.xingYuDengLuo.exchange"),
        rank: i("proto_sc.xingYuDengLuo.rank"),
        myRank: i("proto_sc.xingYuDengLuo.myRank"),
        shop: i("proto_sc.xingYuDengLuo.shop"),
        base: i("proto_sc.xingYuDengLuo.base"),
    },
    jinzhu: {
        info: i("proto_sc.goldenpig.cfg")
    },

    sevenday: {
        data: i("proto_sc.sevenday.data"),
        buy: i("proto_sc.sevenday.buy"),
        point: i("proto_sc.sevenday.point"),
        taskdata: i("proto_sc.sevenday.taskdata"),
    },

    growth:{
        fund:i("proto_sc.growth.fund"),
    },
    ErrorCode: {
        noNum: 0,
        noFood: 1
    },
    ServerState: {
        no: 0,
        normal: 1,
        crowded: 2,
        full: 3,
        line: 4,
        new: 5,
        bloken: 6
    },
    SomState: {
        tName: 0,
        baby: 1,
        Child: 2,
        Student: 3,
        loser: 4,
        request: 5,
        pass: 6,
        timeout: 7,
        ok: 8,
        huen: 9,
        requestAll: 10
    }
};
window.proto_cs = {
    login: {
        loginAccount: i("proto_cs.login.loginAccount")
    },
    guide: {
        login: i("proto_cs.guide.login"),
        randName: i("proto_cs.guide.randName"),
        setUinfo: i("proto_cs.guide.setUinfo"),
        guide: i("proto_cs.guide.guide"),
        guideUpguan: i("proto_cs.guide.guideUpguan"),
        kefu: i("proto_cs.guide.kefu"),
        flushZero: i("proto_cs.guide.flushZero")
    },
    user: {
        jingYing: i("proto_cs.user.jingYing"),
        jingYingLing: i("proto_cs.user.jingYingLing"),
        jingYingAll: i("proto_cs.user.jingYingAll"),
        qzam: i("proto_cs.user.qzam"),
        zhengWu: i("proto_cs.user.zhengWu"),
        zhengWuLing: i("proto_cs.user.zhengWuLing"),
        pve: i("proto_cs.user.pve"),
        pvb: i("proto_cs.user.pvb"),
        pvb2: i("proto_cs.user.pvb2"),
        comeback: i("proto_cs.user.comeback"),
        adok: i("proto_cs.user.adok"),
        randName: i("proto_cs.user.randName"),
        getFuserMember: i("proto_cs.user.getFuserMember"),
        shengguan: i("proto_cs.user.shengguan"),
        resetName: i("proto_cs.user.resetName"),
        resetImage: i("proto_cs.user.resetImage"),
        refjingying: i("proto_cs.user.refjingying"),
        refwife: i("proto_cs.user.refwife"),
        refxunfang: i("proto_cs.user.refxunfang"),
        refson: i("proto_cs.user.refson"),
        getuback: i("proto_cs.user.getuback"),
        setuback: i("proto_cs.user.setuback"),
        serHeroShow: i("proto_cs.user.serHeroShow"),
        setClothe: i("proto_cs.user.setClothe"),
        lockClothe: i("proto_cs.user.lockClothe"),
        lvupSuit: i("proto_cs.user.lvupSuit"),
        weipai: i("proto_cs.user.weipai"),
        setAvatar: i("proto_cs.user.setAvatar"),
        clotheRank: i("proto_cs.user.clotheRank"),
        qifu: i("proto_cs.user.qifu"),
        addition: i("proto_cs.user.addition"),
        wishInfo: i("proto_cs.user.wishInfo"),
        wishPlay: i("proto_cs.user.wishPlay")
    },
    hero: {
        upgrade: i("proto_cs.hero.upgrade"),
        upgradeTen: i("proto_cs.hero.upgradeTen"),
        upsenior: i("proto_cs.hero.upsenior"),
        upzzskill: i("proto_cs.hero.upzzskill"),
        uppkskill: i("proto_cs.hero.uppkskill"),
        giveGift: i("proto_cs.hero.giveGift"),
        upghskill: i("proto_cs.hero.upghskill"),
        upcharisma: i("proto_cs.hero.upcharisma"),
        hchat: i("proto_cs.hero.hchat"),
        heroDress: i("proto_cs.hero.heroDress")
    },
    item: {
        useitem: i("proto_cs.item.useitem"),
        useforhero: i("proto_cs.item.useforhero"),
        hecheng: i("proto_cs.item.hecheng"),
        yjHecheng: i("proto_cs.item.yjHecheng"),
        itemlist: i("proto_cs.item.itemlist")
    },
    confidante: {
        info: i("proto_cs.confidante.info"), //主界面请求选中的陪伴皇子参数 参数：
        useHero: i("proto_cs.confidante.useHero"), //从星盘点击皇子请求数据 参数： //"id":9,//NPC编号
        unlock: i("proto_cs.confidante.unlock"), //解锁时装或者绘画 参数： //"type":1,(1:解锁时装,2:解锁绘画), //"id":"解锁时装或者绘画的编号"
        giveGift: i("proto_cs.confidante.giveGift"), //赠送礼物 参数： //"gid":1,礼物id,   //"num":10,礼物数量
        rwd: i("proto_cs.confidante.rwd"), //领取章节或者关卡的奖励 参数： //"type":1,1：领取关卡奖励,2:领取章节奖励,   //"cid":1,章节编号     //"tid":1,关卡编号
        intimacy: i("proto_cs.confidante.intimacy"), //领取亲密度的奖励 参数： //"lv":2,等级
        recovery: i("proto_cs.confidante.recovery"), //使用元宝恢复体力 参数：
        clearance: i("proto_cs.confidante.clearance"), //过关 参数：//"type":1, 1：正常过关,2:快速过关, //"cid":1,章节编号, //"tid":1,关卡编号 //"head":0,头饰 //"body":0,服装 //"ear":耳饰, //"background":0,背景, //"effect":0, //"animal":宠物
        rank: i("proto_cs.confidante.rank"), //章节下关卡排名 参数：//"cid":1,章节, //"tid":1,关卡
        times: i("proto_cs.confidante.times"), //元宝购买次数 参数：//"cid":1,章节, //"tid":1,关卡
        fashion: i("proto_cs.confidante.fashion"), //换装 参数：//"id":1,服装编号
        interaction: i("proto_cs.confidante.interaction"), //互动 
        accompany: i("proto_cs.confidante.accompany"),  //陪伴 
        upskill: i("proto_cs.confidante.upskill")   //技能升级 
    },
    wife: {
        xxoo: i("proto_cs.wife.xxoo"),
        xxoonobaby: i("proto_cs.wife.xxoonobaby"),
        xxoogetbaby: i("proto_cs.wife.xxoogetbaby"),
        sjcy: i("proto_cs.wife.sjcy"),
        sjxo: i("proto_cs.wife.sjxo"),
        yjxo: i("proto_cs.wife.yjxo"),
        yjxxoogetbaby: i("proto_cs.wife.yjxxoogetbaby"),
        reward: i("proto_cs.wife.reward"),
        upskill: i("proto_cs.wife.upskill"),
        weige: i("proto_cs.wife.weige"),
        hfjiaqi: i("proto_cs.wife.hfjiaqi"),
        giveGift: i("proto_cs.wife.giveGift"),
        wchat: i("proto_cs.wife.wchat")
    },
    school: {
        buydesk: i("proto_cs.school.buydesk"),
        start: i("proto_cs.school.start"),
        yjStart: i("proto_cs.school.yjStart"),
        over: i("proto_cs.school.over"),
        allover: i("proto_cs.school.allover")
    },
    son: {
        buyseat: i("proto_cs.son.buyseat"),
        sonname: i("proto_cs.son.sonname"),
        rname: i("proto_cs.son.rname"),
        play: i("proto_cs.son.play"),
        onfood: i("proto_cs.son.onfood"),
        allplay: i("proto_cs.son.allplay"),
        allfood: i("proto_cs.son.allfood"),
        keju: i("proto_cs.son.keju"),
        meipo: i("proto_cs.son.meipo"),
        tiqin: i("proto_cs.son.tiqin"),
        getTiqin: i("proto_cs.son.getTiqin"),
        zhaoqin: i("proto_cs.son.zhaoqin"),
        jiehun: i("proto_cs.son.jiehun"),
        agree: i("proto_cs.son.agree"),
        pass: i("proto_cs.son.pass"),
        allpass: i("proto_cs.son.allpass"),
        cancel: i("proto_cs.son.cancel"),
        rstzhaoqin: i("proto_cs.son.rstzhaoqin"),
        freshTime: i("proto_cs.son.freshTime"),
        shitu: i("proto_cs.son.shitu"),
        allshitu: i("proto_cs.son.allshitu"),
        allrecycleShitu: i("proto_cs.son.allrecycleShitu"),
        recycleShitu: i("proto_cs.son.recycleShitu"),
        naqie: i("proto_cs.son.naqie"),
        freshshitu: i("proto_cs.son.freshshitu"),
        intoLilian: i("proto_cs.son.intoLilian"),
        buyLilianSeat: i("proto_cs.son.buyLilianSeat"),
        delReadMail: i("proto_cs.son.delReadMail"),
        liLianSon: i("proto_cs.son.liLianSon"),
        yjLiLianSon: i("proto_cs.son.yjLiLianSon"),
        liLianReward: i("proto_cs.son.liLianReward"),
        yjLiLianReward: i("proto_cs.son.yjLiLianReward"),
        liLianMail: i("proto_cs.son.liLianMail")
    },
    ranking: {
        paihang: i("proto_cs.ranking.paihang"),
        flush: i("proto_cs.ranking.flush"),
        mobai: i("proto_cs.ranking.mobai")
    },
    laofang: {
        bianDa: i("proto_cs.laofang.bianDa")
    },
    wordboss: {
        wordboss: i("proto_cs.wordboss.wordboss"),
        hitmenggu: i("proto_cs.wordboss.hitmenggu"),
        hitgeerdan: i("proto_cs.wordboss.hitgeerdan"),
        goFightmg: i("proto_cs.wordboss.goFightmg"),
        goFightg2d: i("proto_cs.wordboss.goFightg2d"),
        scoreRank: i("proto_cs.wordboss.scoreRank"),
        g2dHitRank: i("proto_cs.wordboss.g2dHitRank"),
        shopBuy: i("proto_cs.wordboss.shopBuy"),
        comebackmg: i("proto_cs.wordboss.comebackmg"),
        comebackg2d: i("proto_cs.wordboss.comebackg2d")
    },
    fengxiandian: {
        getInfo: i("proto_cs.fengxiandian.getInfo"),
        qingAn: i("proto_cs.fengxiandian.qingAn")
    },
    chenghao: {
        setChengHao: i("proto_cs.chenghao.setChengHao"),
        offChengHao: i("proto_cs.chenghao.offChengHao"),
        wyrwd: i("proto_cs.chenghao.wyrwd")
    },
    xunfang: {
        recover: i("proto_cs.xunfang.recover"),
        zzHand: i("proto_cs.xunfang.zzHand"),
        xunfan: i("proto_cs.xunfang.xunfan"),
        yunshi: i("proto_cs.xunfang.yunshi")
    },
    mail: {
        getMail: i("proto_cs.mail.getMail"),
        redMails: i("proto_cs.mail.redMails"),
        delMail: i("proto_cs.mail.delMail"),
        delMails: i("proto_cs.mail.delMails"),
        openMails: i("proto_cs.mail.openMails")
    },
    club: {

        sysEnvelopes: i("proto_cs.club.sysEnvelopes"),
        gift: i("proto_cs.club.gift"),
        receive: i("proto_cs.club.receive"),
        envelopes: i("proto_cs.club.envelopes"),
        grabEnvelopes: i("proto_cs.club.grabEnvelopes"),
        robEnvelopes: i("proto_cs.club.robEnvelopes"),
        receiveEnvelopes: i("proto_cs.club.receiveEnvelopes"),
        investLists: i("proto_cs.club.investLists"),
        invest: i("proto_cs.club.invest"),
        join: i("proto_cs.club.join"),
        draw: i("proto_cs.club.draw"),
        taskRwd: i("proto_cs.club.taskRwd"),
        activeRwd: i("proto_cs.club.activeRwd"),
        cancel: i("proto_cs.club.cancel"),

        clubCreate: i("proto_cs.club.clubCreate"),
        clubRand: i("proto_cs.club.clubRand"),
        clubFind: i("proto_cs.club.clubFind"),
        clubApply: i("proto_cs.club.clubApply"),
        clubList: i("proto_cs.club.clubList"),
        clubInfo: i("proto_cs.club.clubInfo"),
        clubName: i("proto_cs.club.clubName"),
        clubPwd: i("proto_cs.club.clubPwd"),
        clubInfoSave: i("proto_cs.club.clubInfoSave"),
        isJoin: i("proto_cs.club.isJoin"),
        applyList: i("proto_cs.club.applyList"),
        noJoin: i("proto_cs.club.noJoin"),
        yesJoin: i("proto_cs.club.yesJoin"),
        outClub: i("proto_cs.club.outClub"),
        delClub: i("proto_cs.club.delClub"),
        dayGongXian: i("proto_cs.club.dayGongXian"),
        memberPost: i("proto_cs.club.memberPost"),
        shopList: i("proto_cs.club.shopList"),
        shopBuy: i("proto_cs.club.shopBuy"),
        clubBossInfo: i("proto_cs.club.clubBossInfo"),
        clubBossOpen: i("proto_cs.club.clubBossOpen"),
        clubBossPK: i("proto_cs.club.clubBossPK"),
        clubHeroCone: i("proto_cs.club.clubHeroCone"),
        clubBosslog: i("proto_cs.club.clubBosslog"),
        clubBossHitList: i("proto_cs.club.clubBossHitList"),
        transList: i("proto_cs.club.transList"),
        transWang: i("proto_cs.club.transWang"),
        clubMemberInfo: i("proto_cs.club.clubMemberInfo"),
        clubBossPKLog: i("proto_cs.club.clubBossPKLog"),
        kuaPKinfo: i("proto_cs.club.kuaPKinfo"),
        kuaPKCszr: i("proto_cs.club.kuaPKCszr"),
        kuaPKAdd: i("proto_cs.club.kuaPKAdd"),
        kuaPKBack: i("proto_cs.club.kuaPKBack"),
        kuaPKzr: i("proto_cs.club.kuaPKzr"),
        kuaPKusejn: i("proto_cs.club.kuaPKusejn"),
        kuaLookWin: i("proto_cs.club.kuaLookWin"),
        kuaPKbflog: i("proto_cs.club.kuaPKbflog"),
        kuaLookHit: i("proto_cs.club.kuaLookHit"),
        kuaPKrwdinfo: i("proto_cs.club.kuaPKrwdinfo"),
        kuaPKrwdget: i("proto_cs.club.kuaPKrwdget")
    },
    daily: {
        getrwd: i("proto_cs.daily.getrwd"),
        gettask: i("proto_cs.daily.gettask"),
        answer: i("proto_cs.daily.answer")
    },
    chengjiu: {
        rwd: i("proto_cs.chengjiu.rwd")
    },
    qiandao: {
        rwd: i("proto_cs.qiandao.rwd")
    },
    fuli: {
        qiandao: i("proto_cs.fuli.qiandao"),
        fcho: i("proto_cs.fuli.fcho"),
        fcho_merge: i("proto_cs.fuli.fcho_merge"),
        vip: i("proto_cs.fuli.vip"),
        buy: i("proto_cs.fuli.buy"),
        weekitem: i("proto_cs.fuli.weekitem"),
        mooncard: i("proto_cs.fuli.mooncard"),
        share: i("proto_cs.fuli.share"),
        monday: i("proto_cs.fuli.monday"),
        getOnlineRwd: i("proto_cs.fuli.getOnlineRwd"),
        getOnlineInfo: i("proto_cs.fuli.getOnlineInfo")
    },
    boite: {
        jlInfo: i("proto_cs.boite.jlInfo"),
        yhFind: i("proto_cs.boite.yhFind"),
        yhGo: i("proto_cs.boite.yhGo"),
        yhChi: i("proto_cs.boite.yhChi"),
        shopChange: i("proto_cs.boite.shopChange"),
        yhHold: i("proto_cs.boite.yhHold"),
        jlRanking: i("proto_cs.boite.jlRanking")
    },
    shop: {
        shoplist: i("proto_cs.shop.shoplist"),
        shopLimit: i("proto_cs.shop.shopLimit"),
        shopGift: i("proto_cs.shop.shopGift")
    },
    task: {
        taskdo: i("proto_cs.task.taskdo")
    },
    yamen: {
        yamen: i("proto_cs.yamen.yamen"),
        chushi: i("proto_cs.yamen.chushi"),
        tiaozhan: i("proto_cs.yamen.tiaozhan"),
        fuchou: i("proto_cs.yamen.fuchou"),
        zhuisha: i("proto_cs.yamen.zhuisha"),
        findzhuisha: i("proto_cs.yamen.findzhuisha"),
        pizun: i("proto_cs.yamen.pizun"),
        clearCD: i("proto_cs.yamen.clearCD"),
        fight: i("proto_cs.yamen.fight"),
        seladd: i("proto_cs.yamen.seladd"),
        getrwd: i("proto_cs.yamen.getrwd"),
        getrank: i("proto_cs.yamen.getrank"),
        yamenhistory: i("proto_cs.yamen.yamenhistory"),
        getHistory: i("proto_cs.yamen.getHistory")
    },
    order: {
        getOrderId: i("proto_cs.order.getOrderId"),
        orderBack: i("proto_cs.order.orderBack"),
        AppFailCallback: i("proto_cs.order.AppFailCallback")
    },
    huodong: {
        hdList: i("proto_cs.huodong.hdList"),
        hd6286Info: i("proto_cs.huodong.hd6286Info"),
        hd6286Rwd: i("proto_cs.huodong.hd6286Rwd"),
        hd6287Info: i("proto_cs.huodong.hd6287Info"),
        hd6287Rwd: i("proto_cs.huodong.hd6287Rwd"),
        hd6288Info: i("proto_cs.huodong.hd6288Info"),
        hd6288Rwd: i("proto_cs.huodong.hd6288Rwd"),
        hd6289Info: i("proto_cs.huodong.hd6289Info"),
        hd6289Rwd: i("proto_cs.huodong.hd6289Rwd"),
        hd6290Info: i("proto_cs.huodong.hd6290Info"),
        hd6290Rwd: i("proto_cs.huodong.hd6290Rwd"),
        hd6291Info: i("proto_cs.huodong.hd6291Info"),
        hd6291Rwd: i("proto_cs.huodong.hd6291Rwd"),
        hd6292Info: i("proto_cs.huodong.hd6292Info"),
        hd6292Rwd: i("proto_cs.huodong.hd6292Rwd"),
        hd6293Info: i("proto_cs.huodong.hd6293Info"),
        hd6293Rwd: i("proto_cs.huodong.hd6293Rwd"),
        hd6294Info: i("proto_cs.huodong.hd6294Info"),
        hd6294Rwd: i("proto_cs.huodong.hd6294Rwd"),
        hd6295Info: i("proto_cs.huodong.hd6295Info"),
        hd6295Rwd: i("proto_cs.huodong.hd6295Rwd"),
        hd6296Info: i("proto_cs.huodong.hd6296Info"),
        hd6296Rwd: i("proto_cs.huodong.hd6296Rwd"),
        hd6297Info: i("proto_cs.huodong.hd6297Info"),
        hd6297Rwd: i("proto_cs.huodong.hd6297Rwd"),

        hd201Info: i("proto_cs.huodong.hd201Info"),
        hd201Rwd: i("proto_cs.huodong.hd201Rwd"),
        hd202Info: i("proto_cs.huodong.hd202Info"),
        hd202Rwd: i("proto_cs.huodong.hd202Rwd"),
        hd203Info: i("proto_cs.huodong.hd203Info"),
        hd203Rwd: i("proto_cs.huodong.hd203Rwd"),
        hd204Info: i("proto_cs.huodong.hd204Info"),
        hd204Rwd: i("proto_cs.huodong.hd204Rwd"),
        hd205Info: i("proto_cs.huodong.hd205Info"),
        hd205Rwd: i("proto_cs.huodong.hd205Rwd"),
        hd206Info: i("proto_cs.huodong.hd206Info"),
        hd206Rwd: i("proto_cs.huodong.hd206Rwd"),
        hd207Info: i("proto_cs.huodong.hd207Info"),
        hd207Rwd: i("proto_cs.huodong.hd207Rwd"),
        hd208Info: i("proto_cs.huodong.hd208Info"),
        hd208Rwd: i("proto_cs.huodong.hd208Rwd"),
        hd209Info: i("proto_cs.huodong.hd209Info"),
        hd209Rwd: i("proto_cs.huodong.hd209Rwd"),
        hd210Info: i("proto_cs.huodong.hd210Info"),
        hd210Rwd: i("proto_cs.huodong.hd210Rwd"),
        hd211Info: i("proto_cs.huodong.hd211Info"),
        hd211Rwd: i("proto_cs.huodong.hd211Rwd"),
        hd212Info: i("proto_cs.huodong.hd212Info"),
        hd212Rwd: i("proto_cs.huodong.hd212Rwd"),
        hd213Info: i("proto_cs.huodong.hd213Info"),
        hd213Rwd: i("proto_cs.huodong.hd213Rwd"),
        hd214Info: i("proto_cs.huodong.hd214Info"),
        hd214Rwd: i("proto_cs.huodong.hd214Rwd"),
        hd215Info: i("proto_cs.huodong.hd215Info"),
        hd215Rwd: i("proto_cs.huodong.hd215Rwd"),
        hd216Info: i("proto_cs.huodong.hd216Info"),
        hd216Rwd: i("proto_cs.huodong.hd216Rwd"),
        hd217Info: i("proto_cs.huodong.hd217Info"),
        hd217Rwd: i("proto_cs.huodong.hd217Rwd"),
        hd218Info: i("proto_cs.huodong.hd218Info"),
        hd218Rwd: i("proto_cs.huodong.hd218Rwd"),
        hd219Info: i("proto_cs.huodong.hd219Info"),
        hd219Rwd: i("proto_cs.huodong.hd219Rwd"),
        hd220Info: i("proto_cs.huodong.hd220Info"),
        hd220Rwd: i("proto_cs.huodong.hd220Rwd"),
        hd221Info: i("proto_cs.huodong.hd221Info"),
        hd221Rwd: i("proto_cs.huodong.hd221Rwd"),
        hd222Info: i("proto_cs.huodong.hd222Info"),
        hd222Rwd: i("proto_cs.huodong.hd222Rwd"),
        hd223Info: i("proto_cs.huodong.hd223Info"),
        hd223Rwd: i("proto_cs.huodong.hd223Rwd"),
        hd224Info: i("proto_cs.huodong.hd224Info"),
        hd224Rwd: i("proto_cs.huodong.hd224Rwd"),
        hd225Info: i("proto_cs.huodong.hd225Info"),
        hd225Rwd: i("proto_cs.huodong.hd225Rwd"),
        hd226Info: i("proto_cs.huodong.hd226Info"),
        hd226Rwd: i("proto_cs.huodong.hd226Rwd"),
        hd227Info: i("proto_cs.huodong.hd227Info"),
        hd227Rwd: i("proto_cs.huodong.hd227Rwd"),
        hd6258Info: i("proto_cs.huodong.hd6258Info"),
        hd6258Rwd: i("proto_cs.huodong.hd6258Rwd"),
        hd313Info: i("proto_cs.huodong.hd313Info"),
        hd313Get: i("proto_cs.huodong.hd313Get"),
        hd313YXRank: i("proto_cs.huodong.hd313YXRank"),
        hd313UserRank: i("proto_cs.huodong.hd313UserRank"),
        hd313QuRank: i("proto_cs.huodong.hd313QuRank"),
        hd313Chat: i("proto_cs.huodong.hd313Chat"),
        hd313Check: i("proto_cs.huodong.hd313Check"),
        hd313Log: i("proto_cs.huodong.hd313Log"),
        hd314Info: i("proto_cs.huodong.hd314Info"),
        hd314Get: i("proto_cs.huodong.hd314Get"),
        hd314YXRank: i("proto_cs.huodong.hd314YXRank"),
        hd314UserRank: i("proto_cs.huodong.hd314UserRank"),
        hd314QuRank: i("proto_cs.huodong.hd314QuRank"),
        hd314Chat: i("proto_cs.huodong.hd314Chat"),
        hd314Check: i("proto_cs.huodong.hd314Check"),
        hd314Log: i("proto_cs.huodong.hd314Log"),
        hd315Info: i("proto_cs.huodong.hd315Info"),
        hd315Rank: i("proto_cs.huodong.hd315Rank"),
        hd316Info: i("proto_cs.huodong.hd316Info"),
        hd316Get: i("proto_cs.huodong.hd316Get"),
        hd316YXRank: i("proto_cs.huodong.hd316YXRank"),
        hd316UserRank: i("proto_cs.huodong.hd316UserRank"),
        hd316QuRank: i("proto_cs.huodong.hd316QuRank"),
        hd316Chat: i("proto_cs.huodong.hd316Chat"),
        hd316Check: i("proto_cs.huodong.hd316Check"),
        hd316Log: i("proto_cs.huodong.hd316Log"),
        hd6139Info: i("proto_cs.huodong.hd6139Info"),
        hd6139Rwd: i("proto_cs.huodong.hd6139Rwd"),
        hd6170Info: i("proto_cs.huodong.hd6170Info"),
        hd6170Rwd: i("proto_cs.huodong.hd6170Rwd"),
        hd6171Info: i("proto_cs.huodong.hd6171Info"),
        hd6171Rwd: i("proto_cs.huodong.hd6171Rwd"),
        hd6212Info: i("proto_cs.huodong.hd6212Info"),
        hd6212Rwd: i("proto_cs.huodong.hd6212Rwd"),
        hd6213Info: i("proto_cs.huodong.hd6213Info"),
        hd6213Rwd: i("proto_cs.huodong.hd6213Rwd"),
        hd6172Info: i("proto_cs.huodong.hd6172Info"),
        hd6172Rwd: i("proto_cs.huodong.hd6172Rwd"),
        hd6173Info: i("proto_cs.huodong.hd6173Info"),
        hd6173Rwd: i("proto_cs.huodong.hd6173Rwd"),
        hd6174Info: i("proto_cs.huodong.hd6174Info"),
        hd6174Rwd: i("proto_cs.huodong.hd6174Rwd"),
        hd6175Info: i("proto_cs.huodong.hd6175Info"),
        hd6175Rwd: i("proto_cs.huodong.hd6175Rwd"),
        hd6176Info: i("proto_cs.huodong.hd6176Info"),
        hd6176Rwd: i("proto_cs.huodong.hd6176Rwd"),
        hd6177Info: i("proto_cs.huodong.hd6177Info"),
        hd6177Rwd: i("proto_cs.huodong.hd6177Rwd"),
        hd6178Info: i("proto_cs.huodong.hd6178Info"),
        hd6178Rwd: i("proto_cs.huodong.hd6178Rwd"),
        hd6179Info: i("proto_cs.huodong.hd6179Info"),
        hd6179Rwd: i("proto_cs.huodong.hd6179Rwd"),
        hd6180Info: i("proto_cs.huodong.hd6180Info"),
        hd6180buy: i("proto_cs.huodong.hd6180buy"),
        hd6181Info: i("proto_cs.huodong.hd6181Info"),
        hd6181Rwd: i("proto_cs.huodong.hd6181Rwd"),
        hd6182Info: i("proto_cs.huodong.hd6182Info"),
        hd6182Rwd: i("proto_cs.huodong.hd6182Rwd"),
        hd6182RwdCharge: i("proto_cs.huodong.hd6182RwdCharge"),
        hd6186Info: i("proto_cs.huodong.hd6186Info"),
        hd6186Rwd: i("proto_cs.huodong.hd6186Rwd"),
        hd6187Info: i("proto_cs.huodong.hd6187Info"),
        hd6187Rwd: i("proto_cs.huodong.hd6187Rwd"),
        hd6187dayPaihang: i("proto_cs.huodong.hd6187dayPaihang"),
        hd6187Paihang: i("proto_cs.huodong.hd6187Paihang"),
        hd6187flush: i("proto_cs.huodong.hd6187flush"),
        hd6187exchange: i("proto_cs.huodong.hd6187exchange"),
        hd6188Info: i("proto_cs.huodong.hd6188Info"),
        hd6188Rwd: i("proto_cs.huodong.hd6188Rwd"),
        hd6188Journal: i("proto_cs.huodong.hd6188Journal"),
        hd6189Info: i("proto_cs.huodong.hd6189Info"),
        hd6189Rwd: i("proto_cs.huodong.hd6189Rwd"),
        hd250Info: i("proto_cs.huodong.hd250Info"),
        hd251Info: i("proto_cs.huodong.hd251Info"),
        hd252Info: i("proto_cs.huodong.hd252Info"),
        hd253Info: i("proto_cs.huodong.hd253Info"),
        hd254Info: i("proto_cs.huodong.hd254Info"),
        hd255Info: i("proto_cs.huodong.hd255Info"),
        hd256Info: i("proto_cs.huodong.hd256Info"),
        hd257Info: i("proto_cs.huodong.hd257Info"),
        hd258Info: i("proto_cs.huodong.hd258Info"),
        hd259Info: i("proto_cs.huodong.hd259Info"),
        hd6135Info: i("proto_cs.huodong.hd6135Info"),
        hd6166Info: i("proto_cs.huodong.hd6166Info"),
        hd6167Info: i("proto_cs.huodong.hd6167Info"),
        hd6215Info: i("proto_cs.huodong.hd6215Info"),
        hd6216Info: i("proto_cs.huodong.hd6216Info"),
        hd6217Info: i("proto_cs.huodong.hd6217Info"),
        hd6218Info: i("proto_cs.huodong.hd6218Info"),
        hd260Info: i("proto_cs.huodong.hd260Info"),
        hd260Rwd: i("proto_cs.huodong.hd260Rwd"),
        hd261Info: i("proto_cs.huodong.hd261Info"),
        hd261Rwd: i("proto_cs.huodong.hd261Rwd"),
        hd262Info: i("proto_cs.huodong.hd262Info"),
        hd262Rwd: i("proto_cs.huodong.hd262Rwd"),
        hd6168Info: i("proto_cs.huodong.hd6168Info"),
        hd6168Rwd: i("proto_cs.huodong.hd6168Rwd"),
        hd6168TotalRwd: i("proto_cs.huodong.hd6168TotalRwd"),
        hd6184Info: i("proto_cs.huodong.hd6184Info"),
        hd6184Rwd: i("proto_cs.huodong.hd6184Rwd"),
        hd6184TotalRwd: i("proto_cs.huodong.hd6184TotalRwd"),
        hd270Info: i("proto_cs.huodong.hd270Info"),
        hd270Rwd: i("proto_cs.huodong.hd270Rwd"),
        hd271Info: i("proto_cs.huodong.hd271Info"),
        hd271Rwd: i("proto_cs.huodong.hd271Rwd"),
        hd272Info: i("proto_cs.huodong.hd272Info"),
        hd272Rwd: i("proto_cs.huodong.hd272Rwd"),
        hd280Info: i("proto_cs.huodong.hd280Info"),
        hd280buy: i("proto_cs.huodong.hd280buy"),
        hd280exchange: i("proto_cs.huodong.hd280exchange"),
        hd280play: i("proto_cs.huodong.hd280play"),
        hd280paihang: i("proto_cs.huodong.hd280paihang"),
        hd280Rwd: i("proto_cs.huodong.hd280Rwd"),
        hd281Info: i("proto_cs.huodong.hd281Info"),
        hd281buy: i("proto_cs.huodong.hd281buy"),
        hd281exchange: i("proto_cs.huodong.hd281exchange"),
        hd281play: i("proto_cs.huodong.hd281play"),
        hd281paihang: i("proto_cs.huodong.hd281paihang"),
        hd281Rwd: i("proto_cs.huodong.hd281Rwd"),
        hd281getRwd: i("proto_cs.huodong.hd281getRwd"),
        hd282Info: i("proto_cs.huodong.hd282Info"),
        hd282buy: i("proto_cs.huodong.hd282buy"),
        hd282exchange: i("proto_cs.huodong.hd282exchange"),
        hd282play: i("proto_cs.huodong.hd282play"),
        hd282paihang: i("proto_cs.huodong.hd282paihang"),
        hd282Rwd: i("proto_cs.huodong.hd282Rwd"),
        hd283Info: i("proto_cs.huodong.hd283Info"),
        hd283buy: i("proto_cs.huodong.hd283buy"),
        hd283exchange: i("proto_cs.huodong.hd283exchange"),
        hd283play: i("proto_cs.huodong.hd283play"),
        hd283paihang: i("proto_cs.huodong.hd283paihang"),
        hd283Rwd: i("proto_cs.huodong.hd283Rwd"),
        hd284Info: i("proto_cs.huodong.hd284Info"),
        hd284buy: i("proto_cs.huodong.hd284buy"),
        hd284exchange: i("proto_cs.huodong.hd284exchange"),
        hd284play: i("proto_cs.huodong.hd284play"),
        hd284paihang: i("proto_cs.huodong.hd284paihang"),
        hd284Rwd: i("proto_cs.huodong.hd284Rwd"),
        hd284getRwd: i("proto_cs.huodong.hd284getRwd"),
        hd6136Info: i("proto_cs.huodong.hd6136Info"),
        hd6136buy: i("proto_cs.huodong.hd6136buy"),
        hd6136exchange: i("proto_cs.huodong.hd6136exchange"),
        hd6136play: i("proto_cs.huodong.hd6136play"),
        hd6136paihang: i("proto_cs.huodong.hd6136paihang"),
        hd6136getRwd: i("proto_cs.huodong.hd6136getRwd"),
        hd6136Rewards: i("proto_cs.huodong.hd6136Rewards"),
        hd6136Journal: i("proto_cs.huodong.hd6136Journal"),
        hd6137Info: i("proto_cs.huodong.hd6137Info"),
        hd6137Rwd: i("proto_cs.huodong.hd6137Rwd"),
        hd6152Info: i("proto_cs.huodong.hd6152Info"),
        hd6152Rwd: i("proto_cs.huodong.hd6152Rwd"),
        hd6121Info: i("proto_cs.huodong.hd6121Info"),
        hd6121Rwd: i("proto_cs.huodong.hd6121Rwd"),
        hd6122Info: i("proto_cs.huodong.hd6122Info"),
        hd6122Rwd: i("proto_cs.huodong.hd6122Rwd"),
        hd285Info: i("proto_cs.huodong.hd285Info"),
        hd285buy: i("proto_cs.huodong.hd285buy"),
        hd285buyGift: i("proto_cs.huodong.hd285buyGift"),
        hd285getRwd: i("proto_cs.huodong.hd285getRwd"),
        hd290Info: i("proto_cs.huodong.hd290Info"),
        hd290Yao: i("proto_cs.huodong.hd290Yao"),
        hd290log: i("proto_cs.huodong.hd290log"),
        hd290exchange: i("proto_cs.huodong.hd290exchange"),
        hd291Info: i("proto_cs.huodong.hd291Info"),
        hd291Zadan: i("proto_cs.huodong.hd291Zadan"),
        hd291Set: i("proto_cs.huodong.hd291Set"),
        hd292exchange: i("proto_cs.huodong.hd292exchange"),
        hd293Rwd: i("proto_cs.huodong.hd293Rwd"),
        hd293Task: i("proto_cs.huodong.hd293Task"),
        hd293Run: i("proto_cs.huodong.hd293Run"),
        hd287Info: i("proto_cs.huodong.hd287Info"),
        hd287Get: i("proto_cs.huodong.hd287Get"),
        hdGetXSRank: i("proto_cs.huodong.hdGetXSRank"),
        hd6169Info: i("proto_cs.huodong.hd6169Info"),
        hd6169Yao: i("proto_cs.huodong.hd6169Yao"),
        hd6123Fight: i("proto_cs.huodong.hd6123Fight"),
        hd6123Clear: i("proto_cs.huodong.hd6123Clear"),
        hd6123Add: i("proto_cs.huodong.hd6123Add"),
        hd6123Info: i("proto_cs.huodong.hd6123Info"),
        hd6123Rank: i("proto_cs.huodong.hd6123Rank"),
        hd6123Rwd: i("proto_cs.huodong.hd6123Rwd"),
        hd6123Referr: i("proto_cs.huodong.hd6123Referr"),
        hd6123GradeRwd: i("proto_cs.huodong.hd6123GradeRwd"),
        hd6183Info: i("proto_cs.huodong.hd6183Info"),
        hd6183Play: i("proto_cs.huodong.hd6183Play"),
        hd6183PlayTen: i("proto_cs.huodong.hd6183PlayTen"),
        hd6183Rwd: i("proto_cs.huodong.hd6183Rwd"),
        hd6183buy: i("proto_cs.huodong.hd6183buy"),
        hd6183exchange: i("proto_cs.huodong.hd6183exchange"),
        hd6183paihang: i("proto_cs.huodong.hd6183paihang"),
        hd6183ScoreRwd: i("proto_cs.huodong.hd6183ScoreRwd"),
        hd6142Rwd: i("proto_cs.huodong.hd6142Rwd"),
        hd6142Info: i("proto_cs.huodong.hd6142Info"),
        hd6142Rank: i("proto_cs.huodong.hd6142Rank"),
        hd6142Zan: i("proto_cs.huodong.hd6142Zan"),
        hd6142Math: i("proto_cs.huodong.hd6142Math"),
        hd6142Fight: i("proto_cs.huodong.hd6142Fight"),
        hd6010Info: i("proto_cs.huodong.hd6010Info"),
        hd6010Rank: i("proto_cs.huodong.hd6010Rank"),
        hd6010Fight: i("proto_cs.huodong.hd6010Fight"),
        hd6010Add: i("proto_cs.huodong.hd6010Add"),
        hd6211Info: i("proto_cs.huodong.hd6211Info"),
        hd6211free: i("proto_cs.huodong.hd6211free"),
        hd6211cash: i("proto_cs.huodong.hd6211cash"),
        hd6214Info: i("proto_cs.huodong.hd6214Info"),
        hd6015Rank: i("proto_cs.huodong.hd6015Rank"),
        hd6015Info: i("proto_cs.huodong.hd6015Info"),
        hd6015buy: i("proto_cs.huodong.hd6015buy"),
        hd6015exchange: i("proto_cs.huodong.hd6015exchange"),
        hd6015Rwd: i("proto_cs.huodong.hd6015Rwd"),
        hd6015GetSpoon: i("proto_cs.huodong.hd6015GetSpoon"),
        hd6015GetReward: i("proto_cs.huodong.hd6015GetReward"),
        hd6220Info: i("proto_cs.huodong.hd6220Info"),
        hd6220Rwd: i("proto_cs.huodong.hd6220Rwd"),
        hd6221Info: i("proto_cs.huodong.hd6221Info"),
        hd6221play: i("proto_cs.huodong.hd6221play"),
        hd6221paihang: i("proto_cs.huodong.hd6221paihang"),
        hd6221Rwd: i("proto_cs.huodong.hd6221Rwd"),
        hd6221Select: i("proto_cs.huodong.hd6221Select"),
        hd6222Info: i("proto_cs.huodong.hd6222Info"),
        hd6222buy: i("proto_cs.huodong.hd6222buy"),
        hd6222play: i("proto_cs.huodong.hd6222play"),
        hd6222paihang: i("proto_cs.huodong.hd6222paihang"),
        hd6222exchange: i("proto_cs.huodong.hd6222exchange"),
        hd6223Info: i("proto_cs.huodong.hd6223Info"),
        hd6223give: i("proto_cs.huodong.hd6223give"),
        hd6223Rwd: i("proto_cs.huodong.hd6223Rwd"),
        hd6224Info: i("proto_cs.huodong.hd6224Info"),
        hd6224buy: i("proto_cs.huodong.hd6224buy"),
        hd6224Rwd: i("proto_cs.huodong.hd6224Rwd"),
        hd6224change: i("proto_cs.huodong.hd6224change"),
        hd6224task: i("proto_cs.huodong.hd6224task"),
        hd6224exchange: i("proto_cs.huodong.hd6224exchange"),
        hd6224lvUp: i("proto_cs.huodong.hd6224lvUp"), //参数num:提升次数
        hd6225Info: i("proto_cs.huodong.hd6225Info"),
        hd6225Rwd: i("proto_cs.huodong.hd6225Rwd"),
        hd6225TotalRwd: i("proto_cs.huodong.hd6225TotalRwd"),
        hd6282Info: i("proto_cs.huodong.hd6282Info"),
        hd6282Rwd: i("proto_cs.huodong.hd6282Rwd"),
        hd6282TotalRwd: i("proto_cs.huodong.hd6282TotalRwd"),
        hd6226Info: i("proto_cs.huodong.hd6226Info"),
        hd6226Rwd: i("proto_cs.huodong.hd6226Rwd"),
        hd6227Info: i("proto_cs.huodong.hd6227Info"),
        hd6227Yao: i("proto_cs.huodong.hd6227Yao"),
        hd6227buy: i("proto_cs.huodong.hd6227buy"),
        hd6227Paihang: i("proto_cs.huodong.hd6227Paihang"),
        hd6227duihuan: i("proto_cs.huodong.hd6227duihuan"),
        hd6228Info: i("proto_cs.huodong.hd6228Info"),
        hd6228buy: i("proto_cs.huodong.hd6228buy"),
        hd6228Rwd: i("proto_cs.huodong.hd6228Rwd"),
        hd6229Info: i("proto_cs.huodong.hd6229Info"),
        hd6229play: i("proto_cs.huodong.hd6229play"),
        hd6229paihang: i("proto_cs.huodong.hd6229paihang"),
        hd6229Rwd: i("proto_cs.huodong.hd6229Rwd"),
        hd6229Select: i("proto_cs.huodong.hd6229Select"),
        hd6229buy: i("proto_cs.huodong.hd6229buy"),
        hd6229exchange: i("proto_cs.huodong.hd6229exchange"),
        hd6230Info: i("proto_cs.huodong.hd6230Info"),
        hd6230buy: i("proto_cs.huodong.hd6230buy"),
        hd6230play: i("proto_cs.huodong.hd6230play"),
        hd6230paihang: i("proto_cs.huodong.hd6230paihang"),
        hd6230exchange: i("proto_cs.huodong.hd6230exchange"),
        hd6231Rwd: i("proto_cs.huodong.hd6231Rwd"),
        hd6231Info: i("proto_cs.huodong.hd6231Info"),
        hd6231Rank: i("proto_cs.huodong.hd6231Rank"),
        hd6231buy: i("proto_cs.huodong.hd6231buy"),
        hd6231exchange: i("proto_cs.huodong.hd6231exchange"),
        hd6232Info: i("proto_cs.huodong.hd6232Info"),
        hd6232buy: i("proto_cs.huodong.hd6232buy"),
        hd6232play: i("proto_cs.huodong.hd6232play"),
        hd6232paihang: i("proto_cs.huodong.hd6232paihang"),
        hd6232exchange: i("proto_cs.huodong.hd6232exchange"),
        hd6233Info: i("proto_cs.huodong.hd6233Info"),
        hd6233Rwd: i("proto_cs.huodong.hd6233Rwd"),
        hd6234Info: i("proto_cs.huodong.hd6234Info"),
        hd6234Paly: i("proto_cs.huodong.hd6234Paly"),
        hd6234PalyTen: i("proto_cs.huodong.hd6234PalyTen"),
        hd6234Rwd: i("proto_cs.huodong.hd6234Rwd"),
        hd6234buy: i("proto_cs.huodong.hd6234buy"),
        hd6234exchange: i("proto_cs.huodong.hd6234exchange"),
        hd6234paihang: i("proto_cs.huodong.hd6234paihang"),

        hd6283Info: i("proto_cs.huodong.hd6283Info"),
        hd6283Play: i("proto_cs.huodong.hd6283Play"),
        hd6283PlayTen: i("proto_cs.huodong.hd6283PlayTen"),
        hd6283Rwd: i("proto_cs.huodong.hd6283Rwd"),
        hd6283buy: i("proto_cs.huodong.hd6283buy"),
        hd6283exchange: i("proto_cs.huodong.hd6283exchange"),
        hd6283paihang: i("proto_cs.huodong.hd6283paihang"),

        hd6240Info: i("proto_cs.huodong.hd6240Info"),
        hd6240exchange: i("proto_cs.huodong.hd6240exchange"),
        hd6241Info: i("proto_cs.huodong.hd6241Info"),
        hd6241paihang: i("proto_cs.huodong.hd6241paihang"),
        hd6241Paly: i("proto_cs.huodong.hd6241Paly"),
        hd6241Rwd: i("proto_cs.huodong.hd6241Rwd"),
        hd6241buy: i("proto_cs.huodong.hd6241buy"),
        hd6241exchange: i("proto_cs.huodong.hd6241exchange"),
        hd6244Info: i("proto_cs.huodong.hd6244Info"),
        hd6244Paly: i("proto_cs.huodong.hd6244Paly"),
        hd6244Give: i("proto_cs.huodong.hd6244Give"),
        hd6244Rwd: i("proto_cs.huodong.hd6244Rwd"),
        hd6244Paihang: i("proto_cs.huodong.hd6244Paihang"),
        hd6244buy: i("proto_cs.huodong.hd6244buy"),
        hd6244exchange: i("proto_cs.huodong.hd6244exchange"),
        hd6245Info: i("proto_cs.huodong.hd6245Info"), //获得数据
        hd6245play: i("proto_cs.huodong.hd6245play"), //转一圈
        hd6245exchange: i("proto_cs.huodong.hd6245exchange"), //兑换商店
        hd6245reset: i("proto_cs.huodong.hd6245reset"), //重置
        hd6245paihang: i("proto_cs.huodong.hd6245paihang"), //排行奖励
        hd6245buy: i("proto_cs.huodong.hd6245buy"), //购买道具
        hd6250Info: i("proto_cs.huodong.hd6250Info"),
        hd6250play: i("proto_cs.huodong.hd6250play"),
        hd6250paihang: i("proto_cs.huodong.hd6250paihang"),
        hd6250buy: i("proto_cs.huodong.hd6250buy"),
        hd6250exchange: i("proto_cs.huodong.hd6250exchange"),
        hd6500Info: i("proto_cs.huodong.hd6500Info"),
        hd6500Get: i("proto_cs.huodong.hd6500Get"),
        hd6251Info: i("proto_cs.huodong.hd6251Info"), //拉取数据
        hd6251Rwd: i("proto_cs.huodong.hd6251Rwd"),
        hd6251Rank: i("proto_cs.huodong.hd6251Rank"),
        hd6251buy: i("proto_cs.huodong.hd6251buy"),
        hd6251exchange: i("proto_cs.huodong.hd6251exchange"),
        hd6252info: i("proto_cs.huodong.hd6252info"), //minyue
        hd6252rwd: i("proto_cs.huodong.hd6252rwd"),
        hd6252rank: i("proto_cs.huodong.hd6252rank"),
        hd6252buy: i("proto_cs.huodong.hd6252buy"),
        hd6252exchange: i("proto_cs.huodong.hd6252exchange"),
        hd6252merge: i("proto_cs.huodong.hd6252merge"), //合成 
        hd6252shangjiao: i("proto_cs.huodong.hd6252shangjiao"), //上交
        hd6252duihuan: i("proto_cs.huodong.hd6252duihuan"), //兑换
        hd6252gift: i("proto_cs.huodong.hd6252gift"), //赠送
        hd6253Info: i("proto_cs.huodong.hd6253Info"), //秋呤相思
        hd6253paihang: i("proto_cs.huodong.hd6253paihang"),
        hd6253Paly: i("proto_cs.huodong.hd6253Paly"),
        hd6253Rwd: i("proto_cs.huodong.hd6253Rwd"),
        hd6253buy: i("proto_cs.huodong.hd6253buy"),
        hd6253exchange: i("proto_cs.huodong.hd6253exchange"),
        //垂钓
        hd6254Info: i("proto_cs.huodong.hd6254Info"), //获得数据.
        hd6254Walk: i("proto_cs.huodong.hd6254Walk"), //移动，没有参数就是自动移动.
        hd6254stamina: i("proto_cs.huodong.hd6254stamina"), //购买体力 count 购买体力点.
        hd6254fishing: i("proto_cs.huodong.hd6254fishing"), //垂钓 num 次数， timing 时机
        hd6254paihang: i("proto_cs.huodong.hd6254paihang"), //排行奖励.
        hd6254buy: i("proto_cs.huodong.hd6254buy"), //商品购买 id 商品id
        hd6254exchange: i("proto_cs.huodong.hd6254exchange"), //兑换商城 id 商品id.
        hd6254specialExchange: i("proto_cs.huodong.hd6254specialExchange"), //特殊兑换 idx 特殊兑换idx， num 特殊兑换数量

        //珍馐溯味
        hd6284Info: i("proto_cs.huodong.hd6284Info"), //获得数据.
        hd6284Walk: i("proto_cs.huodong.hd6284Walk"), //移动，没有参数就是自动移动.
        hd6284stamina: i("proto_cs.huodong.hd6284stamina"), //购买体力 count 购买体力点.
        hd6284fishing: i("proto_cs.huodong.hd6284fishing"), //垂钓 num 次数， timing 时机
        hd6284paihang: i("proto_cs.huodong.hd6284paihang"), //排行奖励.
        hd6284buy: i("proto_cs.huodong.hd6284buy"), //商品购买 id 商品id
        hd6284exchange: i("proto_cs.huodong.hd6284exchange"), //兑换商城 id 商品id.
        hd6284specialExchange: i("proto_cs.huodong.hd6284specialExchange"), //特殊兑换 idx 特殊兑换idx， num 特殊兑换数量
        //秋收
        hd6255Info: i("proto_cs.huodong.hd6255Info"),
        hd6255play: i("proto_cs.huodong.hd6255play"),
        hd6255paihang: i("proto_cs.huodong.hd6255paihang"),
        hd6255Rwd: i("proto_cs.huodong.hd6255Rwd"),
        hd6255Select: i("proto_cs.huodong.hd6255Select"),
        hd6255buy: i("proto_cs.huodong.hd6255buy"),
        hd6255exchange: i("proto_cs.huodong.hd6255exchange"),
        //万圣节
        hd6260Info: i("proto_cs.huodong.hd6260Info"),
        hd6260GiveGift: i("proto_cs.huodong.hd6260GiveGift"),
        hd6260paihang: i("proto_cs.huodong.hd6260paihang"),
        hd6260Rwd: i("proto_cs.huodong.hd6260Rwd"),
        hd6260buy: i("proto_cs.huodong.hd6260buy"),
        hd6260exchange: i("proto_cs.huodong.hd6260exchange"),

        hd6261Info: i("proto_cs.huodong.hd6261Info"),
        hd6261Rwd: i("proto_cs.huodong.hd6261Rwd"),
        hd6261Rank: i("proto_cs.huodong.hd6261Rank"),
        hd6261buy: i("proto_cs.huodong.hd6261buy"),
        hd6261exchange: i("proto_cs.huodong.hd6261exchange"),

        //红包pro
        hd6800Info: i("proto_cs.huodong.hd6800Info"),
        hd6800Rwd: i("proto_cs.huodong.hd6800Rwd"),
        hd6800Rank: i("proto_cs.huodong.hd6800Rank"),
        hd6800buy: i("proto_cs.huodong.hd6800buy"),
        hd6800Total: i("proto_cs.huodong.hd6800Total"),
        hd6800exchange: i("proto_cs.huodong.hd6800exchange"),
        hd6800Play: i("proto_cs.huodong.hd6800Play"),

        //新岁衔缘
        hd6285Info: i("proto_cs.huodong.hd6285Info"),
        hd6285paihang: i("proto_cs.huodong.hd6285paihang"),
        hd6285Paly: i("proto_cs.huodong.hd6285Paly"),
        hd6285Rwd: i("proto_cs.huodong.hd6285Rwd"),
        hd6285buy: i("proto_cs.huodong.hd6285buy"),
        hd6285exchange: i("proto_cs.huodong.hd6285exchange"),

        //购物街
        hd6262Info: i("proto_cs.huodong.hd6262Info"),
        hd6262Rwd: i("proto_cs.huodong.hd6262Rwd"),
        hd6262buy: i("proto_cs.huodong.hd6262buy"),
        hd6262Rank: i("proto_cs.huodong.hd6262Rank"),
        hd6262exchange: i("proto_cs.huodong.hd6262exchange"),
        //打折券购买
        hd6263Info: i("proto_cs.huodong.hd6263Info"),
        hd6263LimitBuy: i("proto_cs.huodong.hd6263LimitBuy"),
        hd6263exchange: i("proto_cs.huodong.hd6263exchange"),
        //携手同心
        hd6270Info: i("proto_cs.huodong.hd6270Info"),
        hd6270paihang: i("proto_cs.huodong.hd6270paihang"),
        hd6270Rwd: i("proto_cs.huodong.hd6270Rwd"),
        hd6270ServerRwd: i("proto_cs.huodong.hd6270ServerRwd"),
        hd6270CompensateRwd: i("proto_cs.huodong.hd6270CompensateRwd"),
        hd6270buy: i("proto_cs.huodong.hd6270buy"),
        //和福利包
        hd6274Info: i("proto_cs.huodong.hd6274Info"),
        hd6274free: i("proto_cs.huodong.hd6274free"),
        hd6274cash: i("proto_cs.huodong.hd6274cash"),

        //感恩
        hd6264info: i("proto_cs.huodong.hd6264info"),
        hd6264rwd: i("proto_cs.huodong.hd6264rwd"),
        hd6264rank: i("proto_cs.huodong.hd6264rank"),
        hd6264buy: i("proto_cs.huodong.hd6264buy"),
        hd6264exchange: i("proto_cs.huodong.hd6264exchange"),
        hd6264merge: i("proto_cs.huodong.hd6264merge"), //合成 
        hd6264shangjiao: i("proto_cs.huodong.hd6264shangjiao"), //上交
        hd6264duihuan: i("proto_cs.huodong.hd6264duihuan"), //兑换
        hd6264gift: i("proto_cs.huodong.hd6264gift"), //赠送
        hd6264flist: i("proto_cs.huodong.hd6264flist"),


        //情人节
        hd6509info: i("proto_cs.huodong.hd6509info"),
        hd6509rwd: i("proto_cs.huodong.hd6509rwd"),
        hd6509rank: i("proto_cs.huodong.hd6509rank"),
        hd6509buy: i("proto_cs.huodong.hd6509buy"),
        hd6509exchange: i("proto_cs.huodong.hd6509exchange"),
        hd6509merge: i("proto_cs.huodong.hd6509merge"), //合成 
        hd6509HandItem: i("proto_cs.huodong.hd6509HandItem"), //上交
        hd6509duihuan: i("proto_cs.huodong.hd6509duihuan"), //兑换
        hd6509GiveGifts: i("proto_cs.huodong.hd6509GiveGifts"), //赠送

        //合服4活动
        hd6275Info: i("proto_cs.huodong.hd6275Info"),
        hd6276Info: i("proto_cs.huodong.hd6276Info"),
        hd6277Info: i("proto_cs.huodong.hd6277Info"),
        hd6278Info: i("proto_cs.huodong.hd6278Info"),

        hd6272Info: i("proto_cs.huodong.hd6272Info"),
        hd6272Rwd: i("proto_cs.huodong.hd6272Rwd"),

        hd6273Info: i("proto_cs.huodong.hd6273Info"),
        hd6273buy: i("proto_cs.huodong.hd6273buy"),


        //周年购物街
        hd6265Info: i("proto_cs.huodong.hd6265Info"),
        hd6265Rwd: i("proto_cs.huodong.hd6265Rwd"),
        hd6265buy: i("proto_cs.huodong.hd6265buy"),
        hd6265Rank: i("proto_cs.huodong.hd6265Rank"),
        hd6265exchange: i("proto_cs.huodong.hd6265exchange"),

        //周年庆
        hd6266Info: i("proto_cs.huodong.hd6266Info"),
        hd6266exchange: i("proto_cs.huodong.hd6266exchange"),
        hd6266rwd: i("proto_cs.huodong.hd6266rwd"),

        hd6275Info: i("proto_cs.huodong.hd6275Info"),
        hd6276Info: i("proto_cs.huodong.hd6276Info"),
        hd6277Info: i("proto_cs.huodong.hd6277Info"),
        hd6278Info: i("proto_cs.huodong.hd6278Info"),

        hd6275Rwd: i("proto_cs.huodong.hd6275Rwd"),
        hd6276Rwd: i("proto_cs.huodong.hd6276Rwd"),
        hd6277Rwd: i("proto_cs.huodong.hd6277Rwd"),
        hd6278Rwd: i("proto_cs.huodong.hd6278Rwd"),

        //老友回归
        //老用户回归活动信息
        hd6280Info: i("proto_cs.huodong.hd6280Info"),
        //领取回归礼包
        hd6280RegressionRwd: i("proto_cs.huodong.hd6280RegressionRwd"),
        // 发送邀请者奖励 uid:要发送奖励的用户id
        hd6280InviteRwd: i("proto_cs.huodong.hd6280InviteRwd"),
        //领取被邀请者奖励
        hd6280InvitedRwd: i("proto_cs.huodong.hd6280InvitedRwd"),
        //七日签到领奖  id:第几天
        hd6280SignRwd: i("proto_cs.huodong.hd6280SignRwd"),
        //七日活跃领奖 id:第几天 level:第几档
        hd6280ActivityRwd: i("proto_cs.huodong.hd6280ActivityRwd"),

        //折扣礼包
        hd6280CashBuy: i("proto_cs.huodong.hd6280CashBuy"),
        //领取累充奖励
        hd6280OrderRwd: i("proto_cs.huodong.hd6280OrderRwd"),


        hd6281Rwd: i("proto_cs.huodong.hd6281Rwd"),
        hd6281Info: i("proto_cs.huodong.hd6281Info"),

        //秀韵
        hd6268Info: i("proto_cs.huodong.hd6268Info"),
        hd6268GiveGift: i("proto_cs.huodong.hd6268GiveGift"),
        hd6268paihang: i("proto_cs.huodong.hd6268paihang"),
        hd6268Rwd: i("proto_cs.huodong.hd6268Rwd"),
        hd6268buy: i("proto_cs.huodong.hd6268buy"),
        hd6268exchange: i("proto_cs.huodong.hd6268exchange"),
        hd6268ScoreRwd: i("proto_cs.huodong.hd6268ScoreRwd"),

        //待月西厢
        //秀韵
        hd6807Info: i("proto_cs.huodong.hd6807Info"),
        hd6807GiveGift: i("proto_cs.huodong.hd6807GiveGift"),
        hd6807paihang: i("proto_cs.huodong.hd6807paihang"),
        hd6807Rwd: i("proto_cs.huodong.hd6807Rwd"),
        hd6807buy: i("proto_cs.huodong.hd6807buy"),
        hd6807exchange: i("proto_cs.huodong.hd6807exchange"),
        hd6807ScoreRwd: i("proto_cs.huodong.hd6807ScoreRwd"),

        //圣诞节
        hd6505Info: i("proto_cs.huodong.hd6505Info"),
        hd6505Rank: i("proto_cs.huodong.hd6505Rank"),
        hd6505Flop: i("proto_cs.huodong.hd6505Flop"),
        hd6505Refresh: i("proto_cs.huodong.hd6505Refresh"),
        hd6505buy: i("proto_cs.huodong.hd6505buy"),
        hd6505Rwd: i("proto_cs.huodong.hd6505Rwd"),
        hd6505exchange: i("proto_cs.huodong.hd6505exchange"),

        //琳琅
        hd6506Info: i("proto_cs.huodong.hd6506Info"),
        hd6506Bets: i("proto_cs.huodong.hd6506Bets"),
        hd6506Rwd: i("proto_cs.huodong.hd6506Rwd"),
        hd6506BuyRecords: i("proto_cs.huodong.hd6506BuyRecords"),
        hd6506Prize: i("proto_cs.huodong.hd6506Prize"),
        hd6506WinPrize: i("proto_cs.huodong.hd6506WinPrize"),
        hd6506Rank: i("proto_cs.huodong.hd6506Rank"),


        //福星高照
        hd6507Info: i("proto_cs.huodong.hd6507Info"),
        hd6507LookEnvelope: i("proto_cs.huodong.hd6507LookEnvelope"),
        hd6507RobEnvelopes: i("proto_cs.huodong.hd6507RobEnvelopes"),
        hd6507GrantEnvelopes: i("proto_cs.huodong.hd6507GrantEnvelopes"),
        hd6507exchange: i("proto_cs.huodong.hd6507exchange"),
        hd6507buy: i("proto_cs.huodong.hd6507buy"),
        hd6507Records: i("proto_cs.huodong.hd6507Records"),
        hd6507Rank: i("proto_cs.huodong.hd6507Rank"),


        //周年购物街
        hd6801Info: i("proto_cs.huodong.hd6801Info"),
        hd6801Rwd: i("proto_cs.huodong.hd6801Rwd"),
        hd6801buy: i("proto_cs.huodong.hd6801buy"),
        hd6801Rank: i("proto_cs.huodong.hd6801Rank"),
        hd6801exchange: i("proto_cs.huodong.hd6801exchange"),
        hd6801Extra: i("proto_cs.huodong.hd6801Extra"),

        //周年庆
        hd6802Info: i("proto_cs.huodong.hd6802Info"),
        hd6802exchange: i("proto_cs.huodong.hd6802exchange"),
        hd6802rwd: i("proto_cs.huodong.hd6802rwd"),

        //星语灯落
        hd6803Info: i("proto_cs.huodong.hd6803Info"),
        hd6803Rwd: i("proto_cs.huodong.hd6803Rwd"),
        hd6803buy: i("proto_cs.huodong.hd6803buy"),
        hd6803Rank: i("proto_cs.huodong.hd6803Rank"),
        hd6803exchange: i("proto_cs.huodong.hd6803exchange"),
        hd6803GetReward: i("proto_cs.huodong.hd6803GetReward"),

        //七日盛典
        sevendayData: i("proto_cs.huodong.sevendayData"),
        hd6508Buy: i("proto_cs.huodong.hd6508Buy"),
        hd6508GetPointRwd: i("proto_cs.huodong.hd6508GetPointRwd"),
        hd6508TaskConfrim: i("proto_cs.huodong.hd6508TaskConfrim"),

        //金猪活动
        hd6300Info: i("proto_cs.huodong.hd6300Info"), // 金猪活动信息
        hd6300Rwd: i("proto_cs.huodong.hd6300Rwd"), //金猪活动开罐
        //基金成长
        hd6301Info: i("proto_cs.huodong.hd6301Info"),
        hd6301buy: i("proto_cs.huodong.hd6301buy"),
        hd6301ActivityRwd: i("proto_cs.huodong.hd6301ActivityRwd"),
        hd6301MainRwd: i("proto_cs.huodong.hd6301MainRwd"),

        //浪漫樱花
        hd6510Info: i("proto_cs.huodong.hd6510Info"),
        hd6510Rank: i("proto_cs.huodong.hd6510Rank"),
        hd6510Flop: i("proto_cs.huodong.hd6510Flop"),
        hd6510Refresh: i("proto_cs.huodong.hd6510Refresh"),
        hd6510buy: i("proto_cs.huodong.hd6510buy"),
        hd6510Rwd: i("proto_cs.huodong.hd6510Rwd"),
        hd6510exchange: i("proto_cs.huodong.hd6510exchange"),

        //随风纸鸢
        hd6805Info: i("proto_cs.huodong.hd6805Info"),
        hd6805Play: i("proto_cs.huodong.hd6805Play"),
        hd6805Repair: i("proto_cs.huodong.hd6805Repair"),
        hd6805Rwd: i("proto_cs.huodong.hd6805ScoreRwd"),
        hd6805rank: i("proto_cs.huodong.hd6805Rank"),
        hd6805buy: i("proto_cs.huodong.hd6805buy"),
        hd6805exchange: i("proto_cs.huodong.hd6805exchange"),

        //投珠诞玉
        hd6806Info: i("proto_cs.huodong.hd6806Info"),
        hd6806Play: i("proto_cs.huodong.hd6806Play"),
        hd6806Rwd: i("proto_cs.huodong.hd6806ScoreRwd"),
        hd6806Rank: i("proto_cs.huodong.hd6806Rank"),
        hd6806buy: i("proto_cs.huodong.hd6806buy"),
        hd6806exchange: i("proto_cs.huodong.hd6806exchange"),
    },

    chat: {
        report: i("proto_cs.chat.report"),
        sev: i("proto_cs.chat.sev"),
        sevhistory: i("proto_cs.chat.sevhistory"),
        club: i("proto_cs.chat.club"),
        kuafu: i("proto_cs.chat.kuafu"),
        clubhistory: i("proto_cs.chat.clubhistory"),
        kuafuhistory: i("proto_cs.chat.kuafuhistory"),
        blacklist: i("proto_cs.chat.blacklist"),
        addblacklist: i("proto_cs.chat.addblacklist"),
        subblacklist: i("proto_cs.chat.subblacklist")
    },
    recode: {
        exchange: i("proto_cs.recode.exchange")
    },
    hunt: {
        hunt: i("proto_cs.hunt.hunt"),
        play: i("proto_cs.hunt.play"),
        jf_rwd: i("proto_cs.hunt.jf_rwd"),
        rankRwd: i("proto_cs.hunt.rankRwd"),
        allDressRwd: i("proto_cs.hunt.allDressRwd"),
        paihang: i("proto_cs.hunt.paihang"),
        isOpen: i("proto_cs.hunt.isOpen")
    },
    taofa: {
        taofa: i("proto_cs.taofa.taofa"),
        play: i("proto_cs.taofa.play"),
        paihang: i("proto_cs.taofa.paihang"),
        rootPlay: i("proto_cs.taofa.rootPlay"),
        rootInfo: i("proto_cs.taofa.rootInfo")
    },
    hanlin: {
        listinfo: i("proto_cs.hanlin.listinfo"),
        opendesk: i("proto_cs.hanlin.opendesk"),
        comein: i("proto_cs.hanlin.comein"),
        sitdown: i("proto_cs.hanlin.sitdown"),
        ti: i("proto_cs.hanlin.ti"),
        find: i("proto_cs.hanlin.find"),
        upskill: i("proto_cs.hanlin.upskill"),
        suoding: i("proto_cs.hanlin.suoding")
    },
    silkroad: {
        trade: i("proto_cs.silkroad.trade"),
        play: i("proto_cs.silkroad.play"),
        rootPlay: i("proto_cs.silkroad.rootPlay"),
        paihang: i("proto_cs.silkroad.paihang")
    },
    gongdou: {
        gongdou: i("proto_cs.gongdou.gongdou"),
        fight: i("proto_cs.gongdou.fight"),
        showCard: i("proto_cs.gongdou.showCard"),
        spec: i("proto_cs.gongdou.spec"),
        paihang: i("proto_cs.gongdou.paihang"),
        duihuan: i("proto_cs.gongdou.duihuan"),
        giveup: i("proto_cs.gongdou.giveup"),
        shopBuy: i("proto_cs.gongdou.shopBuy"),
        recycle: i("proto_cs.gongdou.recycle"),
        downcard: i("proto_cs.gongdou.downcard"),
        battlecard: i("proto_cs.gongdou.battlecard")
    },
    kuayamen: {
        comehd: i("proto_cs.kuayamen.comehd"),
        yamen: i("proto_cs.kuayamen.yamen"),
        chushi: i("proto_cs.kuayamen.chushi"),
        tiaozhan: i("proto_cs.kuayamen.tiaozhan"),
        fuchou: i("proto_cs.kuayamen.fuchou"),
        zhuisha: i("proto_cs.kuayamen.zhuisha"),
        findzhuisha: i("proto_cs.kuayamen.findzhuisha"),
        pizun: i("proto_cs.kuayamen.pizun"),
        getSevRwd: i("proto_cs.kuayamen.getSevRwd"),
        fight: i("proto_cs.kuayamen.fight"),
        seladd: i("proto_cs.kuayamen.seladd"),
        getrwd: i("proto_cs.kuayamen.getrwd"),
        getRank: i("proto_cs.kuayamen.getRank"),
        yamenhistory: i("proto_cs.kuayamen.yamenhistory"),
        kuafu: i("proto_cs.kuayamen.kuafu"),
        kuafuhistory: i("proto_cs.kuayamen.kuafuhistory"),
        getYxRank: i("proto_cs.kuayamen.getYxRank"),
        getMyRank: i("proto_cs.kuayamen.getMyRank")
    },
    kuaguo: {
        kuaguo: i("proto_cs.kuaguo.kuaguo"),
        batHero: i("proto_cs.kuaguo.batHero"),
        healHero: i("proto_cs.kuaguo.healHero"),
        supSoldier: i("proto_cs.kuaguo.supSoldier"),
        move: i("proto_cs.kuaguo.move"),
        action: i("proto_cs.kuaguo.action")
    },
    friends: {
        flist: i("proto_cs.friends.flist"),
        fapply: i("proto_cs.friends.fapply"),
        fapplylist: i("proto_cs.friends.fapplylist"),
        getNew: i("proto_cs.friends.getNew"),
        fok: i("proto_cs.friends.fok"),
        fno: i("proto_cs.friends.fno"),
        fsub: i("proto_cs.friends.fsub"),
        assist: i("proto_cs.friends.assist"),
        getVow: i("proto_cs.friends.getVow"),
        changeVow: i("proto_cs.friends.changeVow"),
        fsend: i("proto_cs.friends.fsend"),
        fred: i("proto_cs.friends.fred"),
        frecommend: i("proto_cs.friends.frecommend"), //拉取推荐列表
        fsearch: i("proto_cs.friends.fsearch"), //搜索      id: 搜索玩家的id
        flchat: i("proto_cs.friends.flchat"), //私聊列表
        ffchat: i("proto_cs.friends.ffchat"), //新建私聊     fuid:要新建私聊的好友id
        fschat: i("proto_cs.friends.fschat"), //发送私聊     fuid:好友id.  msg:聊天内容
        fhistory: i("proto_cs.friends.fhistory"), //私聊内容列表     fuid:好友id  id:已有的聊天内容条数 
        relation_list: i("proto_cs.friends.relation_list"), //好友关系列表 
        get_rwd: i("proto_cs.friends.get_rwd") //领取亲密等级奖励
    },
    guozijian: {
        gzj: i("proto_cs.guozijian.gzj"),
        addDesk: i("proto_cs.guozijian.addDesk"),
        startStudy: i("proto_cs.guozijian.startStudy"),
        bribery: i("proto_cs.guozijian.bribery"),
        overWork: i("proto_cs.guozijian.overWork"),
        alloverWork: i("proto_cs.guozijian.alloverWork"),
        getdayreward: i("proto_cs.guozijian.getdayreward"),
        alldayreward: i("proto_cs.guozijian.alldayreward")
    },
    scpoint: {
        recored: i("proto_cs.scpoint.recored"),
        story: i("proto_cs.scpoint.story"),
        zwStory: i("proto_cs.scpoint.zwStory"),
        jyStory: i("proto_cs.scpoint.jyStory"),
        emailStory: i("proto_cs.scpoint.emailStory"),
        emailSonStory: i("proto_cs.scpoint.emailSonStory"),
        yjEmailSonStory: i("proto_cs.scpoint.yjEmailSonStory"),
        heroOrwifeStory: i("proto_cs.scpoint.heroOrwifeStory")
    },
    kitchen: {
        buyStove: i("proto_cs.kitchen.buyStove"),
        food: i("proto_cs.kitchen.food"),
        over: i("proto_cs.kitchen.over"),
        allover: i("proto_cs.kitchen.allover"),
        set: i("proto_cs.kitchen.set"),
        setinfo: i("proto_cs.kitchen.setinfo"),
        allstart: i("proto_cs.kitchen.allstart"),
        fast: i("proto_cs.kitchen.fast"),
        buyFood: i("proto_cs.kitchen.buyFood"),
        lackBuy: i("proto_cs.kitchen.buyAllFood")
    },
    treasure: {
        reward: i("proto_cs.treasure.reward"),
        treasure: i("proto_cs.treasure.treasure"),
        clipTrea: i("proto_cs.treasure.clipTrea"),
        clear: i("proto_cs.treasure.clear"),
        rank: i("proto_cs.treasure.rank"),
        trun: i("proto_cs.treasure.trun"),
        reset: i("proto_cs.treasure.reset"),
        win: i("proto_cs.treasure.win"),
        info: i("proto_cs.treasure.info"),
        tidyRank: i("proto_cs.treasure.tidyRank"),
        addCount: i("proto_cs.treasure.addCount")
    },
    voice: {},
    flower: {
        rwd: i("proto_cs.flower.rwd"),
        yjRwd: i("proto_cs.flower.yjRwd"),
        steal: i("proto_cs.flower.steal"),
        plant: i("proto_cs.flower.plant"),
        yjPlant: i("proto_cs.flower.yjPlant"),
        open: i("proto_cs.flower.open"),
        plantRwd: i("proto_cs.flower.plantRwd"),
        yjPlantRwd: i("proto_cs.flower.yjPlantRwd"),
        rank: i("proto_cs.flower.rank"),
        flush: i("proto_cs.flower.flush"),
        info: i("proto_cs.flower.info"),
        wordlTree: i("proto_cs.flower.wordlTree"),
        treeRank: i("proto_cs.flower.treeRank"),
        protectCover: i("proto_cs.flower.protectCover")
    },
    flowerFriend: {
        lists: i("proto_cs.flowerFriend.lists"),
        plant: i("proto_cs.flowerFriend.plant"),
        unlock: i("proto_cs.flowerFriend.unlock"),
        receive: i("proto_cs.flowerFriend.receive"),
        give: i("proto_cs.flowerFriend.give"), //送花 fuid 好友id, num 数量, itemid 花的id
        friends: i("proto_cs.flowerFriend.friends"),
        rank: i("proto_cs.flowerFriend.rank"),
        flush: i("proto_cs.flowerFriend.flush"),
    },
    keju: {},
    fapei: {
        info: i("proto_cs.fapei.info"),
        addDesk: i("proto_cs.fapei.addDesk"),
        banish: i("proto_cs.fapei.banish"),
        recall: i("proto_cs.fapei.recall")
    },
    liuGong: {
        getInfo: i("proto_cs.liuGong.getInfo"),
        kneel: i("proto_cs.liuGong.kneel"),
    }

};