var list=require("../../component/List");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
var item = require("./ConfidanteRankItem");
cc.Class({
    extends: cc.Component,

    properties: {
        lblName:{
            //大章名字
            default:null,
            type:cc.Label
        },
        lstLevel:{
            //关卡列表
            default:null,
            type:list.default
        },
        lstRank:{
            //排名列表
            default:null,
            type:list.default
        },
        itemSelf:{
            //自己排名
            default:null,
            type:item.default
        }
    },

    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CON_DATING_RANK_CHAPTER_BACK, this.updateLvList, this); //点击陪伴更新界面
        this.init();
    },

    init () {
        //初始化显示第一章的排行,从第一个过关的章节开始
        init.confidanteProxy.sendRank(1,2);
    },

    // update (dt) {},
    updateLvList(chapter) {
        //刷新章节列表
        var cpt = init.confidanteProxy.getCurChapterList(chapter);

        var tmpLst = [];
        var rankLv = 1;
        for(var idx = 0; idx < cpt.length; idx++)
        {
            if(cpt[idx].value.type == 2)
            {
                var item = {};
                item.rank = chapter + "-" + rankLv;
                item.lv = cpt[idx].lv;
                item.chapter = chapter;
                tmpLst.push(item);
                rankLv++;
            }
            
        }
        this.lstLevel.data = tmpLst;

        //更新排行
        this.updateRankList();
        //章节名
        this.updateRankInfo(chapter);
    },

    updateRankList() {
        //更新排行
        var tmpLst = [];
        var self = null;
        for(var idx = 0; idx < init.confidanteProxy.lstCurLvRank.length; idx++)
        {
            if(init.confidanteProxy.lstCurLvRank[idx].uid == init.playerProxy.userData.uid)
            {
                self = init.confidanteProxy.lstCurLvRank[idx];
            }
            tmpLst.push(init.confidanteProxy.lstCurLvRank[idx]);
        }
        this.lstRank.data = tmpLst;

        if(!self)
        {
            self = {};
            self.uid = init.playerProxy.userData.uid;
            self.headavatar = init.playerProxy.headavatar;
            self.name = init.playerProxy.userData.name;
            self.score = init.confidanteProxy.getScoreChapter(init.confidanteProxy.curRankCpt, init.confidanteProxy.curRankLv);
            self.rank = -1;
        }

        this.itemSelf.data = self;
    },
    updateRankInfo(chapter) {
        //章节名
        //var info = init.confidanteProxy.getCurHeroChapterInfo();
        var info = init.confidanteProxy.getChapterById();
        if(info)
        {
            for(var idx = 0; idx < info.length; idx++)
            {
                if(info[idx].lv == chapter)
                {
                    this.lblName.string = info[idx].name;
                    break;
                }
            }
            
        }
    },
    onClickChange() {
        //点击选章
        utils.utils.openPrefabView("confidante/ConfidanteRankChapterView");
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
