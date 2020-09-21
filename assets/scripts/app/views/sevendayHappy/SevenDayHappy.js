var ItemSlotUI = require("../item/ItemSlotUI");
var list = require("../../component/List");
var Utils = require("../../utils/Utils");
var Initializer = require("../../Initializer");
var UrlLoad = require("../../component/UrlLoad");
var UIUtils = require("../../utils/UIUtils");
var RedDot = require("../../component/RedDot");
var RoleSpine = require("../../component/RoleSpine");
var BagProxy = require("../../models/BagProxy");
/**
 * cjf
 * 七天乐
 */
cc.Class({
    extends: cc.Component,

    properties: {
        //日期
        dayToggle: [cc.Toggle],
        scroll_day: cc.ScrollView,
        //活动时间
        lab_activityTime: cc.Label,
        //领奖时间
        lab_awardTime: cc.Label,
        //积分数量
        lab_scoreNum: cc.Label,
        //积分进度条
        bar_score: cc.ProgressBar,
        //活动toggle
        activityToggle: [cc.Toggle],
        //奖品
        item_reward: ItemSlotUI.default,
        //领奖按钮
        btn_award: cc.Button,
        //领奖已完成
        lab_awardDone: cc.Label,
        //伙伴
        roleImg: UrlLoad.default,
        //tab红点
        tabRed: [RedDot.default],
        //服装展示
        roleSpine: RoleSpine.default,

        //每日福利
        node_welfareDaily: cc.Node,
        //每日福利列表
        list_welfareDaily: list.default,
        //每日福利前往
        btn_welfareGo: cc.Button,
        //每日福利限购
        lab_welfareLimit: cc.Label,
        //每日福利已领取
        lab_awardOver: cc.Label,

        //超值购
        node_disCount: cc.Node,
        //超值购列表
        list_disCount: list.default,
        //超值购原价
        lab_originalPrice: cc.Label,
        //超值购现价
        lab_currentPrice: cc.Label,
        //超值购购买按钮
        btn_disCountBuy: cc.Button,
        //超值购限购
        lab_disCountLimit: cc.Label,
        lab_disCountScore: cc.Label,

        //其他通用
        node_common: cc.Node,
        scroll_common: cc.ScrollView,
        //其他通用列表
        list_common: list.default,

        curDay: -1,
        //当前选择的天数
        selectDay: -1,
        //当前选择的任务
        selectTask: 0,
        //当前任务数据
        curTaskData: [],
        //伙伴ID
        heroId: 21,
        //每日福利积分
        welfareScore: 5,
        //展示的衣服
        clothId: 68,
    },

    onLoad() {
        facade.subscribe(
            "SEVENDAY_HAPPY_DATA",
            this.updateBase,
            this
        );
        facade.subscribe(
            "SEVENDAY_HAPPY_BUY",
            this.updateDisCount,
            this
        );
        facade.subscribe(
            Initializer.limitActivityProxy.UPDATE_LIMIT_ACTIVE_SEVEN,
            this.updateWelfare,
            this
        );
        facade.subscribe(
            "PLAYER_USER_UPDATE",
            this.updateCommonTask,
            this
        );
        facade.subscribe(
            Initializer.timeProxy.UPDATE_FLOAT_REWARD,
            this.checkHeroReward,
            this
        );
        var msg = new proto_cs.huodong.sevendayData();
        JsonHttp.send(msg);

    },

    start() {
        var table = localcache.getList(localdb.table_sevenday_rwdlist);
        var rwd = table[table.length - 1];
        this.heroId = rwd.rwd[0].id;
        this.roleImg.url = UIUtils.uiHelps.getServantSmallSpine(this.heroId);
        var cloth = localcache.getItem(localdb.table_usersuit, this.clothId),
            o = {};
        for (i = 0; i < cloth.clother.length; i++) {
            var a = localcache.getItem(
                localdb.table_userClothe,
                cloth.clother[i]
            )
            switch (a.part) {
                case 1:
                    o.head = a.id;
                    break;
                case 2:
                    o.body = a.id;
                    break;
                case 3:
                    o.ear = a.id;
                    break;
                case 4:
                    o.background = a.id;
                    break;
                case 5:
                    o.effect = a.id;
                    break;
                case 6:
                    o.animal = a.id;
            }
        }
        var t = Initializer.playerProxy.userData;
        this.roleSpine.setClothes(t.sex, t.job, t.level, o);
        this.roleSpine.replayAll();
    },

    updateBase() {
        var data = Initializer.limitActivityProxy.sevenDayHappy;
        if (!data)
            return;
        //天数显示
        this.curDay = data.day > 7 ? 7 : data.day;
        if (this.selectDay < 0) {
            this.selectDay = this.curDay;
            this.dayToggle[this.curDay - 1].check();
            this.scroll_day.scrollToOffset(cc.v2(146 * (this.selectDay - 1), 0), 0.1);
        }
        this.updateDay(null, this.selectDay);
        //活动时间(7天减去开始时间) ,领取时间(8天减去领取时间)
        var startTime = data.startDay;
        var activityTime = startTime + 604800 - Utils.timeUtil.second;
        //根据天数变灰
        for (let index = 0; index < this.dayToggle.length; index++) {
            const element = this.dayToggle[index];
            let isDisable = index < this.curDay;
            element.interactable = isDisable;
            element.enableAutoGrayEffect = !isDisable;
        }
        var receiveTime = startTime + 691200 - Utils.timeUtil.second;
        if (activityTime > 0) {
            this.lab_activityTime.string = i18n.t("USER_ACTIVITY_TIME", {
                d: Utils.timeUtil.second2hms(activityTime)
            });
        } else {
            this.lab_activityTime.string = i18n.t("SEVEN_TASK_DAY_LIMIT");
        }
        if (receiveTime > 0) {
            this.lab_awardTime.string = i18n.t("USER_RECEIVE_TIME", {
                d: Utils.timeUtil.second2hms(receiveTime)
            });
        } else
            this.lab_awardTime.node.active = false;
        //积分显示
        this.updateScore(data.point);
    },

    updateDay(e, index) {
        index = ~~index;
        this.selectDay = index;
        //获取对应任务,前两个单独展示
        var typeArr = [null, null];
        var dataArr = [null, null];
        var table = localcache.getList(localdb.table_sevenday_task);
        for (let index = 0; index < table.length; index++) {
            const element = table[index];
            if (~~element.openday == this.selectDay) {
                let typeIndex = typeArr.indexOf(element.type);
                if (typeIndex < 0) {
                    typeArr.push(element.type);
                    let arr = [element];
                    dataArr.push(arr);
                } else {
                    dataArr[typeIndex].push(element);
                }
            }
        }
        this.curTaskData = dataArr;
        this.updateTaskTitle(dataArr);
        this.activityToggle[this.selectTask].check();
        this.updateTask(null, this.selectTask);
        Initializer.limitActivityProxy.updateSevenHappyTask(this.selectDay);
    },

    updateTaskTitle(dataArr) {
        for (let index = 0; index < dataArr.length; index++) {
            const element = dataArr[index];
            let toggle = this.activityToggle[index];
            let lab = toggle.node.getChildByName("lab_name").getComponent(cc.Label);
            if (index == 0)
                lab.string = "每日福利";
            else if (index == 1)
                lab.string = i18n.t("SEVEN_DAY_DISCOUNT");
            else {
                lab.string = element[0].name;
                if (this.tabRed[index]) {
                    this.tabRed[index].binding[0] = "SevenHappyTask" + element[0].type;
                    this.tabRed[index].node.active = false;
                    RedDot.default.change("SevenHappyTask" + element[0].type, false);
                }
            }
        }
    },

    updateScore(t) {
        var table = localcache.getList(localdb.table_sevenday_rwdlist);
        var maxScore;
        //根据积分更新奖品
        var rwd = Initializer.limitActivityProxy.sevenDayHappy.rwd;
        var rwdCount = (rwd && rwd.length) ? rwd[rwd.length - 1] : 0;
        var itemData = table[rwdCount];
        if (!itemData) {
            itemData = table[table.length - 1];
            this.lab_awardDone.node.active = true;
            this.btn_award.node.active = false;
            maxScore = itemData.points;
        } else {
            this.lab_awardDone.node.active = false;
            this.btn_award.node.active = t >= itemData.points;
            maxScore = itemData.points;
        }
        this.lab_scoreNum.string = t + "/" + maxScore;
        this.bar_score.progress = t / maxScore;
        this.item_reward.data = itemData.rwd[0];
    },

    updateTask(e, index) {
        index = ~~index;
        this.selectTask = index;
        switch (index) {
            case 0:
                //每日福利
                this.node_welfareDaily.active = true;
                this.node_disCount.active = false;
                this.node_common.active = false;
                this.updateWelfare();
                break;
            case 1:
                //超值购买
                this.node_welfareDaily.active = false;
                this.node_disCount.active = true;
                this.node_common.active = false;
                this.updateDisCount();
                break;
            default:
                this.node_welfareDaily.active = false;
                this.node_disCount.active = false;
                this.node_common.active = true;
                this.updateCommonTask();
                break;
        }
    },

    updateWelfare() {
        var isReceived = true;
        if (Initializer.limitActivityProxy.sevenSign) {
            var o = Initializer.limitActivityProxy.sevenSign.level[this.selectDay - 1];
            if (o && 2 != o.type) {
                isReceived = false;
                this.list_welfareDaily.data = Initializer.limitActivityProxy.sevenSign.rwd[o.day - 1].items;
            } else
                isReceived = true;
        }
        this.lab_welfareLimit.string = i18n.t("SEVEN_DAY_SCORE", {
            num: this.welfareScore
        });
        this.list_welfareDaily.node.active = !isReceived;
        this.lab_welfareLimit.node.active = !isReceived;
        this.btn_welfareGo.node.active = !isReceived;
        this.lab_awardOver.node.active = isReceived;
    },

    updateDisCount() {
        if (!Initializer.limitActivityProxy.sevenDayHappy)
            return;
        var table = localcache.getList(localdb.table_sevenday_sale);
        for (let index = 0; index < table.length; index++) {
            const element = table[index];
            if (element.openday == this.selectDay) {
                this.list_disCount.data = element.rwd;
                this.lab_originalPrice.string = element.original + "";
                this.lab_currentPrice.string = element.price + "";
                let buyCount = 0;
                let sale = Initializer.limitActivityProxy.sevenDayHappy.sale;
                if (sale && sale.length) {
                    for (let i = 0; i < sale.length; i++) {
                        let id = sale[i].id;
                        let count = sale[i].count;
                        if (id == element.id) {
                            buyCount = count;
                            break;
                        }
                    }
                }
                this.lab_disCountScore.string = i18n.t("SEVEN_DAY_SCORE", {
                    num: element.point
                });
                this.lab_disCountLimit.string = buyCount + "/" + element.limits;
                //买完了
                if (buyCount >= element.limits) {
                    this.btn_disCountBuy.node.active = false;
                } else
                    this.btn_disCountBuy.node.active = true;
                break;
            }
        }
    },

    updateCommonTask() {
        var data = Initializer.limitActivityProxy.sevenDayHappy;
        //已完成
        let completeArr = [];
        //可领取
        let receiveArr = [];
        //未完成
        let onGoingArr = [];
        let array = this.curTaskData[this.selectTask];
        if (!array || !array.length)
            return;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (data.done && data.done.indexOf(element.id) > -1) {
                completeArr.push({ data: element, status: 0 });
                continue;
            }
            var list;
            var count = 0;
            switch (element.type) {
                case 65:        //任意知己技能等级达到10级
                    list = Initializer.wifeProxy.wifeList;
                    for (let index = 0; index < list.length; index++) {
                        const wife = list[index];
                        for (const wifeSkill of wife.skill) {
                            if (wifeSkill.level > count)
                                count = wifeSkill.level;
                        }
                    }
                    break;
                case 7:         //"通关剧情第1章\"凤栖于梧\""
                    count = Initializer.playerProxy.userData.bmap;
                    break;
                case 14:        //"身份晋升为“慎容”"
                    count = Initializer.playerProxy.userData.level;
                    break;
                case 60:        //"收集5件不重复的服装"
                    count = Initializer.playerProxy.clothes ? Initializer.playerProxy.clothes.length : 0;
                    break;
                case 5:         //"1个伙伴等级达到10"
                    list = Initializer.servantProxy.servantList;
                    for (let index = 0; index < list.length; index++) {
                        const servant = list[index];
                        if (servant.level >= element.set[1])
                            count++;
                    }
                    break;
                case 62:        //"伙伴总资质达到60"
                    list = Initializer.servantProxy.servantList;
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
                    let taskIndex = data.taskid.indexOf(element.id);
                    if (taskIndex > -1) {
                        count = data.taskcount[taskIndex];
                    }
                    break;
            }
            if (count >= element.set[0])
                receiveArr.push({ data: element, status: 1, count: count });
            else
                onGoingArr.push({ data: element, status: 2, count: count });
        }
        receiveArr = receiveArr.concat(onGoingArr);
        receiveArr = receiveArr.concat(completeArr)
        this.list_common.data = receiveArr;
        this.scroll_common.scrollToOffset(cc.v2(0, 0), 0.1);
    },

    onWelfareGoClick(e, t) {
        Utils.utils.openPrefabView(t);
    },

    onAwardClick() {
        //根据积分更新奖品
        var table = localcache.getList(localdb.table_sevenday_rwdlist);
        var rwd = Initializer.limitActivityProxy.sevenDayHappy.rwd;
        var rwdCount = (rwd && rwd.length) ? rwd[rwd.length - 1] : 0;
        var itemData = table[rwdCount];
        if (!itemData)
            return;
        var msg = new proto_cs.huodong.hd6508GetPointRwd();
        msg.id = itemData.id;
        JsonHttp.send(msg);
    },

    onDiscountBuyClick() {
        var table = localcache.getList(localdb.table_sevenday_sale);
        for (let index = 0; index < table.length; index++) {
            const element = table[index];
            if (element.openday == this.selectDay) {
                var msg = new proto_cs.huodong.hd6508Buy();
                msg.id = element.id;
                msg.count = 1;
                JsonHttp.send(msg);
                break;
            }
        }
    },

    onRoleClick() {
        var heroSys = localcache.getItem(localdb.table_hero, this.heroId);
        if (Initializer.servantProxy.getHeroData(this.heroId)) {
            Utils.utils.openPrefabView("servant/ServantView", !1, {
                hero: heroSys,
                tab: 4
            });
            Utils.utils.closeNameView("servant/ServantListView", !1);
        } else
            Utils.utils.openPrefabView("servant/ServantInfo", !1, heroSys);
    },

    checkHeroReward() {
        
        var itemReward = Initializer.timeProxy.itemReward;
        if (null != itemReward && 0 != itemReward.length) {
            for (var o = 0; o < itemReward.length; o++) {
                var l = itemReward[o];
                if (l.kind == BagProxy.DataType.HERO && l.id == this.heroId) {
                    this.scheduleOnce(function () {
                        var heroData = Initializer.servantProxy.getHeroData(l.id);
                        if (heroData) {
                            Utils.utils.openPrefabView(
                                "ServantShow",
                                !0,
                                heroData
                            );
                        }
                    }, 0.3);
                    break;
                }
            }
        }

        Initializer.timeProxy.floatReward();
    },

    clearData() {
        this.curDay = -1;
        this.selectDay = -1;
        this.selectTask = 0;
        this.curTaskData = [];
    },

    onClose() {
        this.clearData();
        Utils.utils.closeView(this);
    }
    // update (dt) {},
});
