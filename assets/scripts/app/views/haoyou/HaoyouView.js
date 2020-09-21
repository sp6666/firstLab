var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        list:{
            default:null,
            type:list.default
        },
        roleSpine:{
            default:null,
            type:roleSpine.default
        },
        sister_num:{
            default:null,
            type:cc.Label
        },
        btnSub:{
            default:null,
            type:cc.Button
        },
        nodeSonghua:{
            default:null,
            type:cc.Button
        },
        nodeGuanxi:{
            default:null,
            type:cc.Button
        }
    },


    onLoad () {
        facade.subscribe(init.haoyouProxy.ON_GET_FRIEND_LIST, this.updateFriendList, this); //获得好友列表
        facade.subscribe(init.haoyouProxy.ON_FRIEND_LIST_SELECTED, this.onSelectId, this);  //点击好友

        facade.subscribe(init.guanxiProxy.ON_GET_RELATION_LIST, this.showGuanxiView, this);  //获取关系列表
        
        this.sendFriendList();
        this.init();
    },

    // start () {

    init () {
        //刷新一下申请列表红花
        if(init.haoyouProxy.applyFriends)
        {
            red.default.change("haoyouAdd", init.haoyouProxy.applyFriends.length > 0 && time.funUtils.isOpen(time.funUtils.haoyou));
        }   
        if(this.nodeSonghua)
        {
            this.nodeSonghua.interactable = false;
        }

        if(this.nodeGuanxi)
        {
            this.nodeGuanxi.interactable = false;
        }
    },
    // },

    // update (dt) {},

    sendFriendList(){
        init.haoyouProxy.sendFriends();
    },

    updateFriendList() {
        //数量
        var friendCount = (init.haoyouProxy.friends.length <= 0 || null == init.haoyouProxy.friends) ? 0 : init.haoyouProxy.friends.length;
        this.sister_num.string = i18n.t("HAOYOU_COUNT",{count:friendCount, max:init.haoyouProxy.upLimit});

        //还没有好友
        if(!init.haoyouProxy.friends || init.haoyouProxy.friends.length <= 0)
        {
            //好友列表没有的时候初始化
            this.list.data = [];
            this.onSelectId(-1);
            //提示 没有好友
            utils.alertUtil.alert18n("HAOYOU_NO_FRIEND");
            return;
        }
        
        //初始化选中第一个
        if(init.haoyouProxy.curSelectId <= 0 || !init.haoyouProxy.isFriend(init.haoyouProxy.curSelectId))
        {
            this.onSelectId(init.haoyouProxy.friends[0].id); 
        }

        //刷新一下申请列表红花
        if(init.haoyouProxy.applyFriends)
        {
            red.default.change("haoyouAdd", init.haoyouProxy.applyFriends.length > 0 && time.funUtils.isOpen(time.funUtils.haoyou));
        }

        //是否有好友
        var hasFriends = init.haoyouProxy.friends.length;

        if(this.nodeSonghua)
        {
            this.nodeSonghua.interactable = hasFriends;
        }

        if(this.nodeGuanxi)
        {
            this.nodeGuanxi.interactable = hasFriends;
        }
    },
    showGuanxiView() {
        if(init.guanxiProxy.relationType == 0)
        {
            return;
        }
        if(init.guanxiProxy.relation.length <= 0)
        {
            //没有好友关系列表
            return;
        }
        //显示关系面板
        utils.utils.openPrefabView("guanxi/GuanXiView");
        init.guanxiProxy.relationType = 0;
    },

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

        this.roleSpine.node.active = false;
        if(role)
        {
            init.haoyouProxy.curSelectId = role.id;
            this.roleSpine.node.active = true;
            this.roleSpine.setClothes(role.sex, role.job, role.level, role.clothe);
        }
        this.list.data = init.haoyouProxy.friends;

        this.btnSub.interactable = this.roleSpine.node.active;
    },
    onClickAdd() {
        utils.utils.openPrefabView("haoyou/HaoyouAdd");
    },
    onClickDel() {
        if(init.haoyouProxy.curSelectId <= 0)
        {
            utils.alertUtil.alert18n("HAOYOU_SELECT_FIRST");
            return;
        }

        var user = init.haoyouProxy.getUser(init.haoyouProxy.curSelectId);
        if(user)
        {
            utils.utils.showConfirm(i18n.t("HAOYOU_SHANCHU_CONFIRM", {name: user.name}), function () {
                init.haoyouProxy.sendfriendSub(init.haoyouProxy.curSelectId);
            }) 
        }
        else
        {
            //未能找到该玩家
            utils.alertUtil.alert18n("HAOYOU_SEARCH_NOT_FOUND");
        }
    },
    onClickBlackList() {
        //黑名单
        utils.utils.openPrefabView("haoyou/HaoyouBlackList");
    },
    onClickMeet() {
        //暂无拜访
    },
    onClickMsg() {
        if(init.haoyouProxy.curSelectId <= 0)
        {
            //提示请先选择好友
            utils.alertUtil.alert(i18n.t("HAOYOU_SELECT_FIRST"));
            return;
        }
        init.haoyouProxy.goChat = true;
        utils.utils.openPrefabView("chat/ChatView", false, { type: 6 });
    },
    onClickGuanXi() {
        if(init.haoyouProxy.friends.length <= 0)
        {
            //提示
            utils.alertUtil.alert18n("HAOYOU_NO_FRIEND");
            return;
        }
        //点击关系
        init.guanxiProxy.sendRelation(1);
    },
    onClickZenSong() {
        if(init.haoyouProxy.friends.length <= 0)
        {
            //提示
            utils.alertUtil.alert18n("HAOYOU_NO_FRIEND");
            return;
        }
        //打开赠送界面
        utils.utils.openPrefabView("guanxi/GuanXiZenSongView");
    },
    onClickClose() {
        init.haoyouProxy.curSelectId = 0;
        utils.utils.closeView(this, true);
    },
    onClickBack() {
        
    },
});
