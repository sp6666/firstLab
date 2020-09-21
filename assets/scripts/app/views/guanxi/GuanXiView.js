var list=require("../../component/List");
var role=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        //好友列表
        list:{
            default:null,
            type:list.default
        },
        //人
        roleSpine:{
            default:null,
            type:role.default
        },
        //奖励列表
        rwdList:{
            default:null,
            type:list.default
        },
        //属性列表
        propList:{
            default:null,
            type:list.default
        },
        //领取奖励按钮
        btnGetRwd:{
            default:null,
            type:cc.Button
        },
        //最高友情值
        spRank: {
            default: [],
            type: cc.Node
        },
        //最佳姐妹
        nodeBest: {
            default: null,
            type: cc.Node
        },
        //列表 cc.ScrollView
        propScall: {
            default: null,
            type: cc.ScrollView
        },
        //自己友好值
        lvlSelfPt: {
            default: null,
            type: cc.Label
        },
        //自己关系等级
        lvlSelfLv: {
            default: null,
            type: cc.Label
        },
        //普通奖励显示
        nodeNormal: {
            default: null,
            type: cc.Node
        },
        //奖励已满显示
        nodeMax: {
            default: null,
            type: cc.Node
        },
    },


    onLoad () {
        //选中关系好友
        facade.subscribe(init.guanxiProxy.ON_RELATION_SELECT, this.onSelectId, this); 
        //领奖返回 刷新领奖面板
        facade.subscribe(init.guanxiProxy.ON_GET_RELATION_RWD, this.onUpdate, this); 
        this.init();
    },

    init() {
        if(init.guanxiProxy.relation.length > 0)
        {
            this.onSelectId(init.guanxiProxy.relation[0].id);
        }

        this.updateGuanxiList();
        this.onUpdate();
    },

    // start () {},
    // update (dt) {},
    updateSelf() {
        //刷新自己的关系等级和友好值
        var curProp = init.guanxiProxy.curLvCfg;
        var nextProp = init.guanxiProxy.nextLvCfg;
        if(!nextProp || !curProp)
        {
            return;
        }
        this.lvlSelfPt.string = i18n.t("GUANXI_FUN_NUMBER_NEXT", {num:init.guanxiProxy.selfFriendPt, max:nextProp.need});
        this.lvlSelfLv.string = i18n.t("GUANXI_FUN_SELF_LEVEL", {num:curProp.level});
    },
    updateGuanxiList(){
        //刷新好友列表
        var showList = [];
        for(var idx = 0; idx < 5 && idx < init.guanxiProxy.relation.length; idx++)
        {
            showList.push(init.guanxiProxy.relation[idx]);
        }
        this.list.data = showList;
    },
    updateRwdList(){
        //面板显示
        var tab = localcache.getList(localdb.table_friendship_class);
        var max = tab[tab.length - 1];

        this.nodeNormal.active = init.guanxiProxy.getRwd < max.fs_class;
        this.nodeMax.active = init.guanxiProxy.getRwd >= max.fs_class;

        //刷新领奖列表
        var curProp = init.guanxiProxy.curRwd;
        if(!curProp)
        {
            return;
        }

        this.rwdList.data = init.guanxiProxy.curRwd.rwd;

        //按钮 已领取的lv小于最高可领取的lv时可以使用
        this.btnGetRwd.interactable = init.guanxiProxy.getRwd < init.guanxiProxy.lastRwd.fs_class;
    },
    updatePropList(){
        //刷新属性列表
        var props = [];
        var curProp = init.guanxiProxy.curLvCfg;
        var nextProp = init.guanxiProxy.nextLvCfg;
        if(!curProp || !nextProp)
        {
            return;
        }
        //如果后一级和当前一样，显示最后一级
        if(curProp.level == nextProp.level)
        {
            for(var idx = 0; idx < curProp.ep_type.length; idx++)
            {
                var cur = {};
                cur.ep_type = curProp.ep_type[idx].ep_type;
                cur.curPt = curProp.ep_type[idx].ep;
                cur.nextPt = 0;

                props.push(cur);
            }
            return;
        }

        //
        for(var idx = 0; idx < curProp.ep_type.length && idx < nextProp.ep_type.length; idx++)
        {
            var cur = {};
            cur.ep_type = curProp.ep_type[idx].ep_type;
            cur.curPt = curProp.ep_type[idx].ep;
            cur.nextPt = nextProp.ep_type[idx].ep;

            props.push(cur);
        }

        this.propList.data = props;
        this.propScall.scrollToBottom();
    },
    updateLevel() {
        //刷新最高好感值
        if(!init.guanxiProxy.curRwd)
        {
            return;
        }
        var lv = init.guanxiProxy.curRwd.fs_class;
        for(var idx = 0; idx < this.spRank.length; idx++)
        {
            this.spRank[idx].active = (idx + 1) == (init.guanxiProxy.maxFs - lv);
        }
    },

    updateRoleSpine(id) {},
    onSelectId(id) {
        //选中好友以后
        if(init.haoyouProxy.friends.length < 0)
        {
            this.roleSpine.node.active = false;
            return;
        }
        var role = null;
        for(var idx = 0; idx < init.haoyouProxy.friends.length; idx++)
        {
            init.haoyouProxy.friends[idx].isSelect = init.haoyouProxy.friends[idx].id == id ? 0 : 1;
            if(init.haoyouProxy.friends[idx].isSelect == 0)
            {
                role = init.haoyouProxy.friends[idx];
            }
        }

        var selfRank = 0;
        for(var idx = 0; idx < init.guanxiProxy.relation.length; idx++)
        {
            init.guanxiProxy.relation[idx].select = init.guanxiProxy.relation[idx].id == id;
            if(init.guanxiProxy.relation[idx].id == id)
            {
                selfRank = init.guanxiProxy.relation[idx].rank;
            }
        }
        
        this.roleSpine.node.active = false;
        if(role)
        {
            init.haoyouProxy.curSelectId = role.id;
            this.roleSpine.node.active = true;
            this.roleSpine.setClothes(role.sex, role.job, role.level, role.clothe);

            //最佳姐妹
            this.nodeBest.active = selfRank == 1;
        }
        
        
        //刷新列表
        this.updateGuanxiList();
        //this.onUpdate();
    },
    onUpdate() {
        //刷新自己
        this.updateSelf();
        //属性列表
        this.updatePropList();
        //奖励列表
        this.updateRwdList();
        //刷新好感值
        this.updateLevel();
    },
    onClickRank() {
        utils.utils.openPrefabView("guanxi/GuanXiRankView");
    },
    onClickGetRwd() {
        init.guanxiProxy.sendGetRwd();
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
