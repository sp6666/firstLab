var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var init = require("../Initializer"),
    red = require("../component/RedDot"),
    utils = require("../utils/Utils"),
    time = require("./TimeProxy"),
    r = (function () {
        function t() {
            //更新技能列表
            this.ON_CONFIDANTE_SKILL_UPDATE = "ON_CONFIDANTE_SKILL_UPDATE";

            //主界面请求选中的陪伴皇子
            this.ON_GET_MAIN_CONFIDANTE = "ON_GET_MAIN_CONFIDANTE";
            //皇子信息
            this.ON_GET_CONFIDANTE_INFO = "ON_GET_CONFIDANTE_INFO";
            //皇子信息
            this.ON_GET_CONFIDANTE_INFO_SER = "ON_GET_CONFIDANTE_INFO_SER";
            //没有该皇子
            this.ON_GET_CONFIDANTE_INFO_NO_NPC = "ON_GET_CONFIDANTE_INFO_NO_NPC";
            //陪伴
            this.ON_CONFIDANTE_ACCOMPANY = "ON_CONFIDANTE_ACCOMPANY";
            //亲密度升级
            this.ON_CONFIDANTE_UPGRADE = "ON_CONFIDANTE_UPGRADE";

            //时装界面
            //通知蓝颜界面衣服修改
            this.ON_CON_CHANGE_CLOTHE_TO_VIEW = "ON_CON_CHANGE_CLOTHE_TO_VIEW";
            //通知好友界面衣服修改
            this.ON_CON_CHANGE_CLOTHE_TO_HAOYOU = "ON_CON_CHANGE_CLOTHE_TO_HAOYOU";
            //刷新衣服列表
            this.ON_CON_CHANGE_CLOTHE_LST = "ON_CON_CHANGE_CLOTHE_LST";
            //可以更换衣服
            //this.ON_CON_CHANGE_CLOTHE
            //end时装界面

            //关系界面
            //领取奖励返回
            this.ON_CON_RELATION_GET_RWD = "ON_CON_RELATION_GET_RWD";
            //end关系界面

            //约会界面
            //选中大关卡
            this.ON_CON_DATING_CLICK_BIG_ITEM = "ON_CON_DATING_CLICK_BIG_ITEM";
            //选中小关
            this.ON_CON_DATING_CLICK_MID_ITEM = "ON_CON_DATING_CLICK_MID_ITEM";
            //过关
            this.ON_CON_DATING_GATE = "ON_CON_DATING_GATE";
            //保存衣服
            this.CONFIDANT_PVE_SAVE = "CONFIDANT_PVE_SAVE";
            //购买体力返回
            this.ON_CON_BUY_STRENGTH = "ON_CON_BUY_STRENGTH";
            //领奖励返回
            this.ON_CON_GET_RWD_BACK = "ON_CON_GET_RWD_BACK";
            //购买通关次数返回
            this.ON_CON_GET_TIMES_BACK = "ON_CON_GET_TIMES_BACK";
            //end约会界面

            //排行榜界面
            //选中大章的排行榜
            this.ON_CON_DATING_RANK_SLECT = "ON_CON_DATING_RANK_SLECT";
            //拉取排行榜数据返回
            this.ON_CON_DATING_RANK_CHAPTER_BACK = "ON_CON_DATING_RANK_CHAPTER_BACK";
            //end排行榜界面

            //绘画界面
            //选中绘画
            this.ON_CON_GALLERY_SELECT = "ON_CON_GALLERY_SELECT";
            //end绘画界面

            //赠送
            //赠送礼物
            this.ON_CON_DONATE_GIFT = "ON_CON_DONATE_GIFT";
            //解锁
            this.ON_CON_DONATE_TO_VIEW = "ON_CON_DONATE_TO_VIEW";
            //end赠送

            //互动
            this.ON_CON_INTERACTION_BACK = "ON_CON_INTERACTION_BACK";
            //end互动

            //商店
            this.ON_CON_GIFT_BACK = "ON_CON_GIFT_BACK";
            //end商店

            //变量
            this.info = null;
            this.hero = null;

            //
            this.talkIdx = 0;
            //当前皇子衣服配置列表
            this.clotheList = [];
            //当前穿在身上的衣服(不一定能穿上)
            this.curClothe = 0;

            //约会
            //静态 体力上限为10
            this.cstMaxStrength = 10;
            //恢复时间为2个小时
            this.cstRecoverTime = 2 * 60 * 60;
            //当前开放的最后大关
            this.lastChapter = 0;
            //当前开放的最后小关
            this.lastLevel = 0;

            //保存关卡列表
            this.lstLevel = [];

            //当前约会选中的章节
            this.datingCurChapter = 0;
            //当前约会选中的关卡
            this.datingCurLevel = 0;

            //保存当前选中的章节排行榜列表
            this.lstCurLvRank = [];

            //rank 当前排行榜选中的章节
            this.curRankCpt = 1;
            this.curRankLv = 1;

            //显示关卡奖励的id
            this.curShowRwd = [];
            this.curShowRwdMaxId = 1;
            //end约会

            //选中的绘画
            this.galleryCurData = null;
            
            //选中的绘画位置
            this.galleryCurPt = new cc.Vec2(0, 0);

            //选中绘画的大小
            this.galleryCurSize = new cc.Size(720, 1280);

            //绘画的资源
            this.galleryCurImg = 0;

            //动画播放状态
            this.galleryAction = false;
            this.galleryStart = false;

            //互动
            this.interactMove = false;  //点击时锁住操作
            this.curAddProp = 0;        //增加属性
            //end互动

            //商店
            this.curGiftType = 1;   //当前商店类型
            //end商店

            //
            this.lastTime = 0;
        }
        t.prototype.ctor = function () { 
            JsonHttp.subscribe(proto_sc.confidante.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.confidante.lists, this.onHero, this);
        };
        t.prototype.clearData = function () {
            this.info = null;
            this.hero = null;

            this.talkIdx = 0;
            this.clotheList = [];

            this.lastChapter = 0;
            this.lastLevel = 0;

            this.lstLevel = [];

            this.lstCurLvRank = [];

            this.curRankCpt = 1;
            this.curRankLv = 1;

            this.curShowRwd = [];
            this.curShowRwdMaxId = 1;

            this.galleryCurData = null;
            this.galleryCurPt = new cc.Vec2(0, 0);
            this.galleryCurSize = new cc.Size(0, 0);
            this.galleryCurImg = 0;
            this.galleryAction = false;

            this.interactMove = false;
            this.curAddProp = 0;

            this.curGiftType = 1;   //当前商店类型

            this.lastTime = 0;
        };
        //数据处理
        //皇子技能列表
        t.prototype.getSkillList = function() {
            var self = this;
            var skillList = [];
            var skills = localcache.getList(localdb.table_confidante_skill);
            if(skills)
            {
                skillList = skills.filter(function(item){
                    return item.hid == self.hero.id;
                });
            }

            for(var idx = 0; idx < skillList.length; idx++)
            {
                //查找动态数据
                skillList[idx].value = this.findSkillServerData(skillList[idx].skill);
            }
            return skillList;
        };
        //从服务器数据里获取技能数据
        t.prototype.findSkillServerData = function(skillId) {
            for(var idx = 0; idx < this.hero.heros.skills.length; idx++)
            {
                if(this.hero.heros.skills[idx].id == skillId)
                {
                    return this.hero.heros.skills[idx];
                }
            }

            return null;
        };
        //新老玩家（打开情愫的位置）(1=>老玩家,0=>新玩家)
        t.prototype.getStatus = function() {
            return this.info.status;
        };
        //拿当前形象的id
        t.prototype.getConUrlId = function(id) {
            var clothe = 0;
            for(var key in this.info.heros){
                if(this.info.heros[key].id == id)
                {
                    clothe = this.info.heros[key].clothes_id > 0 ? this.info.heros[key].clothes_id : id;
                    break;
                }
            }
            return clothe;
        };

        //检查此id的皇子cfg
        t.prototype.checkPrinceCfg = function(id) {
            if(this.info == null)
            {
                return 0;
            }
            for(var idx = 0; idx < this.info.heros.length; idx++)
            {
                if(id == this.info.heros[idx].id)
                {
                    return this.info.heros[idx];
                }
            }

            return null;
        };
        //检查此人是否开放了皇子
        t.prototype.checkNpcExist = function(id) {
            if(this.info == null)
            {
                return false;
            }
            for(var idx = 0; idx < this.info.heros.length; idx++)
            {
                if(id == this.info.heros[idx].id)
                {
                    return this.info.heros[idx].prince == 2;
                }
            }

            return false;
        };

        t.prototype.getCurGalleryCfg = function() {
            //获取当前英雄的绘画配置列表
            var galList = [];
            var gallery = localcache.getList(localdb.table_confidante_gallery);
            for(var idx = 0; idx < gallery.length; idx++)
            {
                if(gallery[idx].hid == this.hero.id)
                {
                    galList.push(gallery[idx]);
                }
            }

            return galList;
        };

        //从hid找chapter列表
        t.prototype.getChapterById = function(hid) {
            if(utils.stringUtil.isBlank(hid))
            {
                hid = this.hero.id;
            }
            var capterList = [];
            var lst = localcache.getList(localdb.table_confidante_chapter);
            for(var idx = 0; idx < lst.length; idx++)
            {
                if(lst[idx].hid == hid)
                {
                    capterList.push(lst[idx]);
                }
            }

            return capterList;
        };
        //从hid找cts列表
        t.prototype.getCtsById = function(hid) {
            if(utils.stringUtil.isBlank(hid))
            {
                hid = this.hero.id;
            }
            var ctsList = [];
            var lst = localcache.getList(localdb.table_confidante_cts);
            for(var idx = 0; idx < lst.length; idx++)
            {
                if(lst[idx].hid == hid)
                {
                    ctsList.push(lst[idx]);
                }
            }

            return ctsList;
        };
        //检出关卡列表
        t.prototype.buildListLv = function(heroId, cts) {
            var chapters = this.getCtsById(heroId);
            if(chapters == null || chapters == [])
            {
                return;
            }

            var last = false;
            this.lstLevel = [];
            for(var cpIdx = 0; cpIdx < chapters.length; cpIdx++)
            {
                var curChapter = chapters[cpIdx];   //本章
                var level = {};
                level.chapter = curChapter.id;          //章节号
                level.lv = curChapter.tid;   //小节号
                level.value = curChapter;    //小节内容
                level.info = this.findCts(level.chapter, level.lv);
                level.isOpen = level.info != null;      //是否开放
                if(level.info != null && this.hero.heros.level >= curChapter.id)
                {
                    //暂存最后一节
                    this.lastChapter = level.chapter;
                    this.lastLevel = level.lv;
                }
                //服务器消息没有这节的记录，还没有记录过last，英雄当前亲密等级已经达到
                if(level.info == null && last == false && this.hero.heros.level >= curChapter.id)
                {
                    //这里就是最后一节
                    this.lastChapter = level.chapter;
                    this.lastLevel = level.lv;
                    level.isOpen = true;
                    last = true;
                }

                this.lstLevel.push(level);
            }
        };
        t.prototype.pushChapter = function(ct) {

        };
        //搜索已通关的章节
        t.prototype.findCts = function(cpt, lv){
            var item = null;
            
            for(var key in this.hero.heros.cts)
            {
                var strCpt = key.split("_");
                if(strCpt.length == 2)
                {
                    var curCp = parseInt(strCpt[0]);
                    var curLv = parseInt(strCpt[1]);

                    if(curCp == cpt && curLv == lv)
                    {
                        item = this.hero.heros.cts[key];
                        break;
                    }
                }
            }

            if(item != null && this.hero.heros.scores)
            {
                for(var key in this.hero.heros.scores)
                {
                    var strCpt = key.split("_");
                    if(strCpt.length == 2)
                    {
                        var curCp = parseInt(strCpt[0]);
                        var curLv = parseInt(strCpt[1]);

                        if(curCp == cpt && curLv == lv)
                        {
                            item.score = this.hero.heros.scores[key];
                            break;
                        }
                    }
                }
            }
           
            return item;
        };
        t.prototype.getCurHeroTalk = function () {
            //获取聊天
            if(this.hero == null)
            {
                return "";
            }

            var voiceCfg = localcache.getList(localdb.table_confidante_voice);
            if(voiceCfg == null)
            {
                return "";
            }

            var voiceLst = [];
            for(var idx = 0; idx < voiceCfg.length; idx++)
            {
                if(voiceCfg[idx].lv == this.hero.heros.level && voiceCfg[idx].hid == this.hero.id)
                {
                    voiceLst = voiceCfg[idx].voice;
                    break;
                }
            }

            if(this.talkIdx >= voiceLst.length)
            {
                this.talkIdx = 0;
            }

            var talk = voiceLst[this.talkIdx];
            this.talkIdx++;

            return talk;
        };
        t.prototype.getClotheList = function() {
            //获取当前皇子对应的服装列表
            this.clotheList = [];
            var id = this.hero != null ? this.hero.id : (this.info ? this.info.id : 0)
            if(id > 0)
            {
                var tmpList = localcache.getList(localdb.table_confidante_clothe);
                for(var idx = 0; idx < tmpList.length; idx++)
                {
                    if(tmpList[idx].hid == id)
                    {
                        this.clotheList.push(tmpList[idx]);
                    }
                }
            }

            return this.clotheList;
        };
        t.prototype.getClotheResId = function(id) {
            //拿到当前id的服装id
            if(this.clotheList.length <= 0)
            {
                this.getClotheList();
            }

            for(var idx = 0; idx < this.clotheList.length; idx++)
            {
                if(this.clotheList[idx].id == id)
                {
                    return this.clotheList[idx].res;
                }
            }

            return this.clotheList[0].res;
        };
        t.prototype.checkUse = function(checkId) {
            //检查是否可以穿，如果可以就返回id，否则就返回0
            if(this.hero == null)
            {
                return 0;
            }

            for(var key in this.hero.heros.clothes)
            {
                if(checkId == this.hero.heros.clothes[key])
                {
                    return checkId;
                }
            }

            return 0;
        };
        t.prototype.checkLevel = function(lv) {
            //检查这个皇子这个等级是否可领取 0可领取，1未能领取（锁），2已领取, 3可显示不可领取
            if(lv > this.hero.heros.level)
            {
                //此等级高于英雄等级，不可领
                return 1;
            }
            else if(lv == this.hero.heros.level)
            {
                //如果等级相同
                //先看是否最后一级
                var level = localcache.getItem(localdb.table_confidante_level, lv + 1 + "");
                if(!level)
                {
                    //没有找到，认为lv是最后一级
                    var curLv = localcache.getItem(localdb.table_confidante_level, lv + "");
                    if(curLv && curLv.intimacy < this.hero.heros.curr)
                    {
                        //如果是最后一级的话，看经验是否已满
                        //经验值已满的话可以领取
                        for(var key in this.hero.heros.intimates){
                            if(key == lv + "")  
                            {
                                //已领取
                                return 2;
                            }
                        }
                        return 0;
                    }
                }

                //否则可显示不可领取
                return 3;
            }
            else
            {
                //如果此等级低于英雄等级
                //检查该等级是否已经领取过
                for(var key in this.hero.heros.intimates){
                    if(key == lv + "")  
                    {
                        //已领取
                        return 2;
                    }
                }
    
                return 0;
            }
        };
        //检查亲密度等级
        t.prototype.checkCpLvUnlock = function(lv) {
            return this.hero.heros.level >= lv;
        };
        t.prototype.checkCpLevel = function(chapter, level) {
            //检查当前关卡是否开放
            if(this.lastChapter >= chapter)
            {
                if(this.lastLevel >= level)
                {
                    if(this.hero.heros)
                    return true;
                }
            }

            return false;
        };
        t.prototype.checkCpRwd = function(chapter) {
            //检查当前章节奖励是否已领取
            var cp = chapter + "";
            for(var key in this.hero.heros.chapters)
            {
                if(cp == key)
                {
                    return true;
                }
            }

            //未领取
            return false;
        };
        t.prototype.getStarCount = function(chapter, level) {
            //拿当前关卡星数
            var strKey = chapter + "_" + level;
            for(var key in this.hero.heros.cts){
                if(key == strKey)
                {
                    if(this.hero.heros.cts[key].star != undefined && this.hero.heros.cts[key].star != null)
                    {
                        //cc.log(strKey + "+++++++++++++++++++++星数:" + this.hero.heros.cts[key].star);
                        return this.hero.heros.cts[key].star;
                    }
                }
            }

            return 0;
        };
        t.prototype.getScoreChapter = function(chapter, level) {
            //拿当前关卡分数
            if(this.hero.heros.scores)
            {
                var strKey = chapter + "_" + level;
                for(var key in this.hero.heros.scores){
                    if(key == strKey)
                    {
                        return this.hero.heros.scores[key];
                    }
                }
            }
            
            return 0;
        };
        t.prototype.getCurChapterList = function(chapterId) {
            //拿到当前章节的关卡列表
            var lstCurLevel = [];
            for(var idx = 0; idx < this.lstLevel.length; idx++)
            {
                if(this.lstLevel[idx].chapter == chapterId)
                {
                    lstCurLevel.push(this.lstLevel[idx]);
                }
            }

            return lstCurLevel;
        };

        //发送
        t.prototype.sendInfo = function () {
            //主界面请求选中的陪伴皇子
            var self = this;
            JsonHttp.send(new proto_cs.confidante.info(), function (t) {
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.info = t.a.confidante.info;
                    facade.send(self.ON_GET_MAIN_CONFIDANTE, self.info);
                }
            });
        };
        t.prototype.sendUseHero = function (id, type) {
            if(this.info == null)
            {
                return;
            }
            if(this.info.heros.length <= 0)
            {
                utils.alertUtil.alert(i18n.t("CONFIDANTE_CROWN_LOCK"));
                return;
            }
            //取伙伴数据
            id = id > 0 ? id : this.info.id; //没有传参数就显示info的id
            var self = this;
            var req = new proto_cs.confidante.useHero();
            req.id = id;
            JsonHttp.send(req, function (t) {
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    var open = self.checkNpcExist(id);
                    if(open)
                    {
                        self.getClotheList();   //读取当前皇子的衣服
                        self.buildListLv(self.hero.id, self.hero.heros.cts);     //读取当前皇子的章节
                        if(self.hero.heros.clothes_id > 0)
                        {
                            //如果当前身上有衣服的话，就换上
                            self.curClothe = self.hero.heros.clothes_id;
                        }
                    }
                    
                    if(type)
                    {
                        facade.send(self.ON_GET_CONFIDANTE_INFO_SER);
                    }
                    else
                    {
                        facade.send(self.ON_GET_CONFIDANTE_INFO);
                    }
                }
            });
        };
        t.prototype.sendAccompany = function() {
            //陪伴
            var self = this;
            JsonHttp.send(new proto_cs.confidante.accompany(), function (t) {
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    self.hero.heros.is_ay = 1;
                    facade.send(self.ON_CONFIDANTE_ACCOMPANY);
                }
            });
        };
        t.prototype.sendFashion = function(clotheId) {
            //换衣服
            var self = this;
            var req = new proto_cs.confidante.fashion();
            req.id = clotheId;
            JsonHttp.send(req, function (t) {
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    //真穿在身上
                    self.hero.heros.clothes_id = clotheId;
                    for(var idx = 0; idx < self.info.heros.length; idx++)
                    {
                        if(self.info.heros[idx].id == self.hero.id)
                        {
                            self.info.heros[idx].clothes_id = clotheId;
                        }
                    }
                    facade.send(self.ON_CON_CHANGE_CLOTHE_LST);
                }
            });
        };
        //领取章节或者关卡的奖励 参数： //"type":1,1：领取关卡奖励,2:领取章节奖励,   //"cid":1,章节编号     //"tid":1,关卡编号
        t.prototype.sendRwd = function(type, cid, tid){
            var self = this;
            var req = new proto_cs.confidante.rwd();
            req.type = type;
            req.cid = cid;
            req.tid = tid;
            JsonHttp.send(req, function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    init.timeProxy.floatReward();
                    facade.send(self.ON_CON_GET_RWD_BACK);
                }
            });
        };
        t.prototype.sendIntimacy = function(lv) {
            //领亲密奖励
            var self = this;
            var req = new proto_cs.confidante.intimacy();
            req.lv = lv;
            JsonHttp.send(req, function (t) {
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    init.timeProxy.floatReward(); 
                    facade.send(self.ON_CON_RELATION_GET_RWD);
                }
            });
        };
        t.prototype.sendClearance = function(type, cid, tid, head, body, ear, background, effect, animal) {
            var self = this;
            //过关 参数：
            var req = new proto_cs.confidante.clearance();
            req.type = type;            //"type":1, 1：正常过关,2:快速过关, 

            req.cid = cid;              //"cid":1,章节编号, 
            req.tid = tid;              //"tid":1,关卡编号 

            req.head = head;            //"head":0,头饰 
            req.body = body;            //"body":0,服装 
            req.ear = ear;              //"ear":耳饰, 
            req.background = background;//"background":0,背景, 
            req.effect = effect;        //"effect":0, 
            req.animal = animal;        //"animal":宠物

            JsonHttp.send(req, function (t){
                var newCon = t.a.confidante.lists;

                if(type == 2)
                {
                    //快速过关，直接赢
                    init.timeProxy.floatReward();
                }
                else{
                    if(newCon.plot == 2)
                    {
                        //换装通关
                        var data = {};
                        data.iswin = newCon.win;
                        data.score = newCon.score;
                        data.animal = animal;
                        data.background = background;
                        data.body = body;
                        data.ear = ear;
                        data.effect = effect;
                        data.head = head;
                        utils.utils.openPrefabView("clothe/ClotheWin", false, data);
                    }
                }
                
                self.hero = newCon;
                self.buildListLv(self.hero.id, self.hero.heros.cts);     //读取当前皇子的章节
                if(newCon.exp && newCon.exp > 0)
                {
                    //+情愫值
                    utils.alertUtil.alert(i18n.t("CONFIDANTE_LBL_LOVE_ADD", {num:newCon.exp}));
                }
                facade.send(self.ON_CON_DATING_GATE);
            });
        };

        t.prototype.sendRank = function(chapterId, levelId) {
            //读排行榜
            var self = this;
            var req = new proto_cs.confidante.rank();
            req.cid = chapterId;
            req.tid = levelId;
            JsonHttp.send(req, function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.curRankCpt = chapterId;
                    self.curRankLv = levelId;
                    self.lstCurLvRank = [];
                    self.lstCurLvRank = t.a.confidante.rank;
                    for(var idx = 0; idx < self.lstCurLvRank.length; idx++)
                    {
                        //用来显示排行
                        self.lstCurLvRank[idx].rank = idx;
                    }
                    facade.send(self.ON_CON_DATING_RANK_CHAPTER_BACK, chapterId);
                }
            });
        };

        //赠送
        t.prototype.sendGift = function(ItemId, count) {
            var self = this;
            var req = new proto_cs.confidante.giveGift();
            req.gid = ItemId;
            req.num = count;
            JsonHttp.send(req, function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    if(t.a.confidante.lists.intimate && t.a.confidante.lists.intimate > 0)
                    {
                        //亲密度+
                        utils.alertUtil.alert(i18n.t("CONFIDANTE_LBL_FAVOR_ADD", {num:t.a.confidante.lists.intimate}));
                    }
                    if(t.a.confidante.lists.exp && t.a.confidante.lists.exp > 0)
                    {
                        //亲密度+
                        utils.alertUtil.alert(i18n.t("CONFIDANTE_LBL_LOVE_ADD", {num:t.a.confidante.lists.exp}));
                    }
                    if(t.a.confidante.lists.is_new > 0)
                    {
                        t.a.confidante.lists.is_new = 0;
                        
                        //更新本英雄的等级
                        self.onChangeInfoLv(self.hero.id, t.a.confidante.lists.heros.level);
                        //弹升级特效 
                        facade.send(self.ON_CONFIDANTE_UPGRADE);
                    }
                    //更新本英雄的数据
                    self.onHero(t.a.confidante.lists);
                    //升级更新章节开放
                    self.buildListLv(t.a.confidante.lists.id);
                    
                    //更新
                    facade.send(self.ON_CON_GIFT_BACK);
                }
            });
        };
        //互动
        t.prototype.sendInteraction = function() {
            var self = this;
            JsonHttp.send(new proto_cs.confidante.interaction(), function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    if(t.a.confidante.lists.intimate && t.a.confidante.lists.intimate > 0)
                    {
                        //亲密度+
                        utils.alertUtil.alert(i18n.t("CONFIDANTE_LBL_FAVOR_ADD", {num:t.a.confidante.lists.intimate}));
                    }
                    if(t.a.confidante.lists.exp && t.a.confidante.lists.exp > 0)
                    {
                        //亲密度+
                        utils.alertUtil.alert(i18n.t("CONFIDANTE_LBL_LOVE_ADD", {num:t.a.confidante.lists.exp}));
                    }
                    if(t.a.confidante.lists.is_new > 0)
                    {
                        t.a.confidante.lists.is_new = 0;
                         
                        //更新本英雄的等级
                        self.onChangeInfoLv(self.hero.id, t.a.confidante.lists.heros.level);
                        //弹升级特效 
                        facade.send(self.ON_CONFIDANTE_UPGRADE);
                    }
                    self.onHero(t.a.confidante.lists);
                    //升级更新章节开放
                    self.buildListLv(t.a.confidante.lists.id);
                    facade.send(self.ON_CONFIDANTE_ACCOMPANY);   //刷新界面数据
                    facade.send(self.ON_CON_INTERACTION_BACK);
                }
            });
        };
        //购买
        t.prototype.sendUnlock = function(type, id) {
            //"type":1,(1:解锁时装,2:解锁绘画), //"id":"解锁时装或者绘画的编号"
            var self = this;
            var req = new proto_cs.confidante.unlock();
            req.type = type ? type : this.curGiftType;
            req.id = id;
            JsonHttp.send(req, function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    facade.send(self.ON_CON_DONATE_GIFT);
                }
            });
        };
        //购买体力
        t.prototype.sendRecovery = function() {
            var self = this;
            JsonHttp.send(new proto_cs.confidante.recovery(), function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    facade.send(self.ON_CON_BUY_STRENGTH);
                }
            })
        };
        //购买章节通关次数
        t.prototype.sendTimes = function(cid, tid) {
            var self = this;
            var req = new proto_cs.confidante.times();
            req.cid = cid;
            req.tid = tid;
            JsonHttp.send(req, function(t){
                if(utils.stringUtil.isBlank(t.a.system.errror))
                {
                    self.onHero(t.a.confidante.lists);
                    facade.send(self.ON_CON_GET_TIMES_BACK);
                }
            })
        };
        //技能升级
        t.prototype.sendUpSkill = function(skillId) {
            //防止点击太快
            if(cc.sys.now() - this.lastTime < 500)
            {
                var all = cc.sys.now() - this.lastTime;
                cc.log("~~~~~~~~" + all);
                return;
            }
            this.lastTime = cc.sys.now();


            var req = new proto_cs.confidante.upskill();
            req.skillId = skillId;
            JsonHttp.send(req);
        };

        //接收数据
        t.prototype.onInfo = function (t) {
            this.info = t;
        };
        t.prototype.onHero = function (t) {
            this.hero = t;
            facade.send(this.ON_CONFIDANTE_SKILL_UPDATE);
        };
        t.prototype.onChangeInfoLv = function(hero, lv) {
            //更新英雄在info中的等级
            for(var idx = 0; idx < this.info.heros.length; idx++)
            {
                if(this.info.heros[idx].id == hero)
                {
                    this.info.heros[idx].level = lv;
                    break;
                }
            }
        };

        return t;
    })();
o.ConfidanteProxy = r;