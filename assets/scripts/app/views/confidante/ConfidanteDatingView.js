var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./ConfidanteDatingBigItem"),
    n = require("./ConfidanteDatingGroupItem"),
    utils = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.bigItem = null;
            e.context = null;
            e.groupItem = null;
            e.scorll = null;
            e.curIndex = 0;
            e.bmaps = [];
            e.bigItems = [];
            e._isShowStory = !1;
            e.curData = null;
            e.lblStrength = null;
            return e;
        }
        e.prototype.onLoad = function() {
            //点击大关卡
            facade.subscribe(r.confidanteProxy.ON_CON_DATING_CLICK_BIG_ITEM, this.onClickBig, this); 
            //点击小关卡
            facade.subscribe(r.confidanteProxy.ON_CON_DATING_CLICK_MID_ITEM, this.onClickMid, this); 
            //过关结束，刷新列表 
            facade.subscribe(r.confidanteProxy.ON_CON_DATING_GATE, this.updateList, this);
            //购买体力返回 
            facade.subscribe(r.confidanteProxy.ON_CON_BUY_STRENGTH, this.updateStrength, this);
            //领奖返回 
            facade.subscribe(r.confidanteProxy.ON_CON_GET_RWD_BACK, this.updateList, this);

            this.curIndex = 0;
            this.bigItems.push(this.bigItem);
            this.bigItem.node.active = !1;
            this.groupItem.node.active = !1;
            facade.subscribe("STORY_END_RECORD", this.onStoryEnd, this);
            this.showIndex();

            for(var idx = 0; idx < this.bmaps.length; idx++)
            {
                if(this.bmaps[idx].lv == r.confidanteProxy.lastChapter)
                {
                    //初始打开最后一大关
                    this.onClickBig(this.bmaps[idx]);
                    break;
                }
            }

            this.updateStrength();  //刷新体力
        };
        //e.prototype.onEnable = function() {
        //    facade.send(r.guideProxy.UPDATE_TRIGGER_GUIDE, {type: 10, value: r.confidanteProxy.lastChapter + "|" + r.confidanteProxy.lastLevel});
        //};
        e.prototype.onStoryEnd = function() {
            this._isShowStory = !1;
            //这里剧情结束
            r.confidanteProxy.sendClearance(
                1,
                r.confidanteProxy.datingCurChapter, 
                r.confidanteProxy.datingCurLevel,
                0,0,0,0,0,0);
        };
        e.prototype.showIndex = function() {
            this.bmaps = [];
            this.groupItem.node.active = !1;
            var heroId = r.confidanteProxy.hero.id; //当前英雄id
            var e = localcache.getList(localdb.table_confidante_chapter); //大关

            for(var idx = 0; idx < e.length; idx++)
            {
                //本人大章节
                if(heroId == e[idx].hid)
                {
                    this.bmaps.push(e[idx]);
                }
            }
            for (l = 0; l < this.bigItems.length; l++)
                this.bigItems[l].node.active = !1;

            for (l = 0; l < this.bmaps.length; l++)
                if (this.bigItems.length > l) {
                    this.bigItems[l].data = this.bmaps[l];
                    this.bigItems[l].node.active = !0;
                } else {
                    var s = cc.instantiate(this.bigItem.node),
                        c = s.getComponent(i.default);
                    this.bigItems.push(c);
                    this.context.addChild(s);
                    c.data = this.bmaps[l];
                }
            this.scheduleOnce(this.onDelayScroll, 0.3);
        };
        e.prototype.updateList = function() {
            for(var idx = 0; idx < this.bmaps.length; idx++)
            {
                if(this.bmaps[idx].lv == r.confidanteProxy.lastChapter)
                {
                    //初始打开最后一大关
                    this.onClickBig(this.bmaps[idx]);
                    break;
                }
            }

            //this.onClickBig(this.curData);
            this.updateStrength();  //刷新体力
        };
        e.prototype.onDelayScroll = function() {
            this.scorll.scrollToTop();
        };
        e.prototype.onClickBig = function(e) {
            this.curData = e;
            this.groupItem.node.active = this.groupItem.data != this.curData;
            var i = this.bmaps.indexOf(this.curData);
            this.groupItem.node.removeFromParent(!1);
            this.context.addChild(this.groupItem.node);
            this.groupItem.node.setSiblingIndex(i + 1);
            this.groupItem.data = this.curData;

            if(r.confidanteProxy.getStatus() == 0)  //新玩家才走这里
            {
                this.scheduleOnce(()=>{
                    facade.send(r.guideProxy.UPDATE_TRIGGER_GUIDE, 
                        {type: 10, value: r.confidanteProxy.lastChapter + "|" + r.confidanteProxy.lastLevel});
                },0.1);
            }
            
        };
        e.prototype.updateStrength = function() {
            //刷新体力
            this.lblStrength.string = r.confidanteProxy.hero.count;
        };
        e.prototype.onClickStrength = function() {
            if(r.confidanteProxy.hero.count >= r.confidanteProxy.cstMaxStrength)
            {
                utils.alertUtil.alert(i18n.t("CONFIDANTE_FULL_STRENBGTH"));
                return;
            }
            
            utils.utils.openPrefabView("confidante/ConfidanteItemMore");
        };
        e.prototype.onClickCurIndex = function(t, e) {
            var o = parseInt(e),
                i = r.playerProxy.userData.bmap;
            i = Math.floor((i - 1) / 10);
            this.curIndex += o;
            this.curIndex = this.curIndex < 0 ? 0 : this.curIndex;
            this.curIndex = this.curIndex > i ? i : this.curIndex;
            this.showIndex();
        };
        e.prototype.onClickMid = function(e) {
            //保存章节
            r.confidanteProxy.datingCurChapter = e.chapter;
            r.confidanteProxy.datingCurLevel = e.lv;
            switch(e.value.type)
            {
                case 2:
                    {
                        //打开过关界面e
                        utils.utils.openPrefabView("confidante/ConfidanteDatingItem", false, e);
                        break;
                    }
                case 1:
                case 3:
                    {
                        //打开剧情界面
                        if (!this._isShowStory){
                            r.playerProxy.storyIds = [];
                            this._isShowStory = !0;
                            //取mid
                            var story = localcache.getItem(localdb.table_confidante_bf_pve, e.value.plot);
                            if(0 != (story.storyId) && r.playerProxy.getStoryData(story.storyId))
                            {
                                //开头
                                r.playerProxy.addStoryId(story.storyId);
                            }
                            /*
                            if(0 != (story.endStoryId) && r.playerProxy.getStoryData(story.endStoryId))
                            {
                                //结尾
                                r.playerProxy.addStoryId(story.endStoryId);
                            }
                            */
                        }

                        r.playerProxy.storyIds.length > 0 && utils.utils.openPrefabView("StoryView", false, { type: 99 });
                        break;
                    }
            }

            return;
        };
        e.prototype.onClickRank = function() {
            //打开排行界面
            utils.utils.openPrefabView("confidante/ConfidanteRankView");
        },
        e.prototype.onClickClost = function() {
            utils.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "bigItem", void 0);
        __decorate([_(cc.Node)], e.prototype, "context", void 0);
        __decorate([_(n.default)], e.prototype, "groupItem", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scorll", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblStrength", void 0);  //体力
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
