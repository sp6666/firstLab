var e = module,
    o = exports;
window.localdb = {
    table_hero: "hero",
    table_epSkill: "epSkill",
    table_pkSkill: "pkSkill",
    table_heroLvUp: "heroLvUp",
    table_epLvUp: "epLvUp",
    table_pkLvUp: "pkLvUp",
    table_nobility: "nobility",
    table_pvpText: "pvpText",
    table_yoke: "yoke",
    table_heroinfo: "heroinfo",
    table_heroGuan: "heroGuan",
    table_leaderExp: "leaderExp",
    table_leaderAt: "leaderAt",
    table_heroClothe: "heroClothe",
    table_officer: "officer",
    table_officerType: "officerType",
    table_roleSkin: "roleSkin",
    table_item: "item",
    table_group: "group",
    table_enumItem: "enumItem",
    table_wife: "wife",
    table_wifeSkill: "wifeSkill",
    table_vipReward: "vipReward",
    table_kite: "kite",
    table_kiteWind: "kite_wind",
    table_vip: "vip",
    table_vip2: "vip2",
    table_bigPve: "bigPve",
    table_midPve: "midPve",
    table_smallPve: "smallPve",
    table_wordsPve: "wordsPve",
    table_minor: "minor",
    table_adult: "adult",
    table_lvUp: "lvUp",
    table_seat: "seat",
    table_music: "music",
    table_zw: "zw",
    table_boss: "boss",
    table_scoreChange: "scoreChange",
    table_award: "award",
    table_fashion: "fashion",
    table_lookBuild: "lookBuild",
    table_look: "look",
    table_lookEvent: "lookEvent",
    table_lookCityEvent: "lookCityEvent",
    table_union: "union",
    table_construction: "construction",
    table_unionSend: "unionSend",
    table_unionDrawCost: "unionDrawCost",
    table_unionDraw: 'unionDraw',
    table_unionGiftBag: 'unionGiftBag',
    table_clubDailyTask: "clubDailyTask",
    table_clubDailyRwd: "clubDailyRwd",
    table_unionBoss: "unionBoss",
    table_lover: "lover",
    table_school: "school",
    table_schoollv: "schoollv",
    table_storySelect2: "storySelect2",
    table_story6: "story6",
    table_story5: "story5",
    table_story4: "story4",
    table_story3: "story3",
    table_story2: "story2",
    table_storyzw: "storyzw",
    table_achieveName: "achieveName",
    table_achieve: "achieve",
    table_qiandaoReward: "qiandaoReward",
    table_shouchongReward: "shouchongReward",
    table_merge_shouchongReward: "mergeShouchongReward",
    table_yuekaReward: "yuekaReward",
    table_shenji: "shenji",
    table_mainTask: "mainTask",
    table_yamenShop: "yamenShop",
    table_yanmenRwd: "yanmenRwd",
    table_yanmenText: "yanmenText",
    table_dailyTask: "dailyTask",
    table_dailyRwd: "dailyRwd",
    table_guide: "guide",
    table_help: "help",
    table_sonExp: "sonExp",
    table_sonCost: "sonCost",
    table_checkPoint: "checkPoint",
    table_tradePoint: "tradePoint",
    table_iconOpen: "iconOpen",
    table_homeSkin: "homeSkin",
    table_userClothe: "userClothe",
    table_userblank: "userblank",
    table_userhead: "userhead",
    table_usersuit: "usersuit",
    table_userjob: "userjob",
    table_userSuitLv: "userSuitLv",
    table_imperialDeskCost: "imperialDeskCost",
    table_imperialTitle: "imperialTitle",
    table_imperialDailyGift: "imperialDailyGift",
    table_imperialBribe: "imperialBribe",
    table_imperialAddtion: "imperialAddtion",
    table_param: "param",
    table_jyevent: "jyevent",
    table_jytext: "jytext",
    table_heropve: "heropve",
    table_heropveJbLevel: "heropveJbLevel",
    table_heropveJbProp: "heropveJbProp",
    table_treeType: "treeType",
    table_email: "email",
    table_emailgroup: "emailgroup",
    table_battledialog: "battledialog",
    table_lunZhan: "lunZhan",
    table_lunZhanSingle: "lunZhanSingle",
    table_jyWeipai: "jyWeipai",
    table_jyBase: "jyBase",
    table_kitchen: "kitchen",
    table_kitunlock: "kitunlock",
    table_kitshop: "kitshop",
    table_kitwife: "kitwife",
    table_kitlv: "kitlv",
    table_treasureGroup: "treasureGroup",
    table_treasure: "treasure",
    table_treasureDay: "treasureDay",
    table_treasureTidy: "treasureTidy",
    table_feast: "feast",
    table_feastShop: "feastShop",
    table_feastFood: "feastFood",
    table_prisoner: "prisoner",
    table_prisoner_pic: "prisoner_pic",
    table_prisoner_lv: "prisoner_lv",
    table_qihuan_candy: "qihuan_candy",
    table_qihuan_person: "qihuan_person",
    table_qihuan_text: "qihuan_text",
    table_practiceTravel: "practiceTravel",
    table_practiceItem: "practiceItem",
    table_practiceCity: "practiceCity",
    table_practiceLvli: "practiceLvli",
    table_practiceMail: "practiceMail",
    table_practiceSeat: "practiceSeat",
    table_tips: "tips",
    table_yingyuanBuyShop: "yingyuanBuyShop",
    table_yingyuantalk: "yingyuantalk",
    table_heroTalk: "heroTalk",
    table_wifeTalk: "wifeTalk",
    table_heroVoice: "heroVoice",
    table_wifeVoice: "wifeVoice",
    table_talkPos: "talkPos",
    table_voiceDown: "voiceDown",
    table_power: "power",
    table_powerStar: "powerStar",
    table_levelup: "levelup",
    table_clothepve: "clothepve",
    table_flowerRain: "flowerRain",
    table_flowerCore: "flowerCore",
    table_flowerLv: "flowerLv",
    table_flowerFeild: "flowerFeild",
    table_flowerTalk: "flowerTalk",
    table_flowerProtect: "flowerProtect",
    table_friend_flowerCore: "flowerFriendCore",
    table_friend_flowerField: "flowerFriendField",
    table_friend_flowerLv: "flowerFriendLv",
    table_monday: "monday",
    table_exam_lv: "exam_lv",
    table_exam_type: "exam_type",
    table_exam_quest: "exam_quest",
    table_worldtree: "worldtree",
    table_treecoor: "treecoor",
    table_dafuweng_point: "dafuweng_point",
    table_dafuweng_event: "dafuweng_event",
    table_lion_rwd: "lion_rwd",
    table_lion_task: "lion_task",
    table_chungeng_point: "chungeng_point",
    table_duanwu_point: "duanwu_point",
    table_duanwu_event: "duanwu_event",
    table_balloon_point: "balloon_point",
    table_balloon_event: "balloon_event",
    table_qingyuan: "qingyuan",
    table_friendPray: "friendPray",
    table_zhongyuan_reward: "zhongyuan_reward",
    table_zhongyuan: "zhongyuan",
    table_bishu_point: "bishu_point",
    table_bishu_event: "bishu_event",
    table_starting_school: "starting_school",
    table_starting_school_reward: "starting_school_reward",
    table_starting_school_refresh: "starting_school_refresh",
    table_mingyue: "mingyue",
    table_chuidiao_point: "chuidiao_point",
    table_chuidiao_msg: "chuidiao_msg",
    table_chuidiao_fish: "chuidiao_fish",
    table_chuidiao_exchange: "chuidiao_exchange",
    table_thanksGiving: "thanksGiving",
    table_friendship_class: "friendship_class",
    table_friendship_level: "friendship_level",
    table_friendship_other_level: "friendship_other_level",
    table_clothequality: "clothequality",
    table_confidante_story: "confidanteStory",
    table_confidante_chapter: "confidanteChapter",
    table_confidante_cts: "confidanteCts",
    table_confidante_level: "confidanteLevel",
    table_confidante_clothe: "confidanteClothe",
    table_confidante_voice: "confidanteVoice",
    table_confidante_big_pve: "bf_bigPve",
    table_confidante_mid_pve: "bf_midPve",
    table_confidante_sml_pve: "bf_smallPve",
    table_confidante_bf_story: "bf_story",
    table_confidante_bf_pve: "bf_pve",
    table_confidante_gallery: "confidanteGallery",
    table_confidante_donate: "confidanteDonate",
    table_confidante_strength: "confidanteStrength",
    table_confidante_times: "confidanteTimes",
    table_confidante_skill: "bf_skill",
    table_confidante_skill_lv: "skilllevel",
    table_xiuyun_candy: "xiuyun_candy",
    table_xiuyun_person: "xiuyun_person",
    table_xiuyun_text: "xiuyun_text",
    table_fuxinghongbao: "hongbaopos",
    table_hongbaowords: "hongbaowords",
    table_sevenday_sale: "sale",
    table_sevenday_task: "task",
    table_sevenday_rwdlist: "rwdlist",
    table_jijin_fund_act:"fund_act",
    table_jijin_fund_task:"fund_task",
    table_xixiang_candy: "xixiang_candy",
    table_xixiang_person: "xixiang_person",
    table_xixiang_text: "xixiang_text",
    
    KEYS: {
        hero: "heroid",
        epSkill: "sid",
        pkSkill: "id",
        heroLvUp: "level",
        epLvUp: "epstar",
        pkLvUp: "level",
        nobility: "id",
        pvpText: "id",
        yoke: "level",
        heroinfo: "id",
        heroGuan: "id",
        leaderExp: "id",
        leaderAt: "id",
        heroClothe: "id",
        officer: "id",
        officerType: "id",
        roleSkin: "id",
        item: "id",
        group: "id",
        enumItem: "id",
        wife: "wid",
        wifeSkill: "id",
        vipReward: "id",
        vip: "vip",
        vip2: "vip",
        bigPve: "id",
        midPve: "id",
        smallPve: "id",
        wordsPve: "id",
        minor: "id",
        adult: "id",
        lvUp: "level",
        seat: "seat",
        music: "id",
        zw: "id",
        boss: "id",
        scoreChange: "id",
        award: "id",
        fashion: "id",
        lookBuild: "id",
        look: "id",
        lookEvent: "id",
        lookCityEvent: "id",
        union: "id",
        construction: "id",
        unionSend: "id",
        unionDrawCost: "id",
        unionDraw: "id",
        unionGiftBag: "id",
        clubDailyTask: "id",
        clubDailyRwd: "lv",
        unionBoss: "id",
        school: "num",
        lover: 'id',
        schoollv: "school_lv",
        storySelect2: "id",
        story6: "id",
        story5: "id",
        story4: "id",
        story3: "id",
        story2: "id",
        storyzw: "id",
        achieveName: "id",
        achieve: "id",
        qiandaoReward: "id",
        shouchongReward: "id",
        mergeShouchongReward: "id",
        yuekaReward: "id",
        shenji: "id",
        mainTask: "id",
        yamenShop: "id",
        yanmenRwd: "id",
        yanmenText: "id",
        dailyTask: "id",
        dailyRwd: "id",
        guide: "guide_id",
        help: "id",
        sonExp: "level",
        sonCost: "id",
        checkPoint: "id",
        tradePoint: "id",
        iconOpen: "id",
        homeSkin: "id",
        userClothe: "id",
        userblank: "id",
        userhead: "id",
        usersuit: "id",
        userjob: "id",
        userSuitLv: "id",
        imperialDeskCost: "num",
        imperialTitle: "id",
        imperialDailyGift: "id",
        imperialBribe: "id",
        imperialAddtion: "id",
        param: "id",
        jyevent: "id",
        jytext: "id",
        heropve: "id",
        heropveJbLevel: "story_lv",
        heropveJbProp: "story_lv",
        treeType: "id",
        email: "id",
        emailgroup: "id",
        battledialog: "id",
        lunZhan: "id",
        lunZhanSingle: "id",
        jyWeipai: "id",
        jyBase: "id",
        kitchen: "id",
        kitunlock: "num",
        kitshop: "id",
        kitwife: "wifeid",
        kitlv: "level",
        treasureGroup: "id",
        treasure: "id",
        treasureDay: "number",
        treasureTidy: "barrier",
        feast: "id",
        feastShop: "id",
        feastFood: "id",
        prisoner: "id",
        prisoner_pic: "id",
        prisoner_lv: "level",
        qihuan_candy: "id",
        qihuan_person: "id",
        qihuan_text: "id",
        practiceTravel: "id",
        practiceItem: "id",
        practiceCity: "id",
        practiceLvli: "id",
        practiceMail: "id",
        practiceSeat: "id",
        tips: "id",
        yingyuanBuyShop: "id",
        yingyuantalk: "hero_id",
        heroTalk: "heroid",
        wifeTalk: "wid",
        heroVoice: "voiceid",
        wifeVoice: "voiceid",
        talkPos: "id",
        voiceDown: "id",
        power: "id",
        powerStar: "star",
        levelup: "id",
        clothepve: "id",
        flowerRain: "id",
        flowerCore: "id",
        flowerLv: "lv",
        flowerFeild: "id",
        flowerTalk: "id",
        flowerProtect: "id",
        flowerFriendCore: "id",
        flowerFriendField: "id",
        flowerFriendLv: "lv",
        monday: "id",
        exam_lv: "level",
        exam_type: "id",
        exam_quest: "id",
        worldtree: "lv",
        treecoor: "id",
        dafuweng_point: "id",
        dafuweng_event: "id",
        lion_rwd: "id",
        lion_task: "id",
        chungeng_point: "cg_id",
        duanwu_point: "dwm_id",
        duanwu_event: "dwe_id",
        balloon_point: "id",
        balloon_event: "id",
        qingyuan: "qingyuan_level",
        friendPray: "itemxy_id",
        zhongyuan_reward: "id",
        zhongyuan: "id",
        bishu_point: "id",
        bishu_event: "id",
        starting_school: "id",
        starting_school_reward: "id",
        starting_school_refresh: "id",
        mingyue: "id",
        chuidiao_point: "id",
        chuidiao_msg: "id",
        chuidiao_fish: "fishid",
        chuidiao_exchange: "chuidiao_exchange",
        thanksGiving: "id",
        friendship_class: "fs_class",
        friendship_level: "level",
        friendship_other_level: "level",
        clothequality: "type",
        confidanteStory: "id",
        confidanteChapter: "hid",
        confidanteCts:"hid",
        confidanteLevel: "lv",
        confidanteClothe: "id",
        confidanteVoice: "hid",
        bf_bigPve: "id",
        bf_midPve: "id",
        bf_smallPve: "id",
        bf_story: "id",
        bf_pve: "id",
        confidanteGallery: "id",
        confidanteDonate: "hid",
        confidanteStrength: "times",
        confidanteTimes: "times",
        bf_skill:"id",
        skilllevel:"id",
        xiuyun_candy: "id",
        xiuyun_person: "id",
        xiuyun_text: "id",
        xixiang_candy: "id",
        xixiang_person: "id",
        xixiang_text: "id",
        hongbaopos: "id",
        hongbaowords: "id",
        sale: "id",
        task: "id",
        rwdlist: "id",
        kite: "id",
        kite_wind: "id",
        fund_act:"id",
        fund_task:"id",
        xixiang_candy: "id",
        xixiang_person: "id",
        xixiang_text: "id",
    }
};