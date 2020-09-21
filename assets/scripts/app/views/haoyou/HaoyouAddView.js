var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var curSelectPanel = 1; //1 搜索， 2 申请
var curSearchPanel = 2; //1 搜索， 2 推荐 默认推荐 
cc.Class({
    extends: cc.Component,

    properties: {
        //我的编号
        lblMyId:{
            default:null,
            type:cc.Label
        },
        ////////////////////////////////
        //搜索标签
        findTab:{
            default:null,
            type:cc.Node
        },
        //搜索框
        searchEdit:{
            default:null,
            type:cc.EditBox
        },
        //搜索面板
        findNode:{
            default:null,
            type:cc.Node
        },
        //搜索列表
        findLlist:{
            default:null,
            type:list.default
        },
        //推荐列表
        recommendLlist:{
            default:null,
            type:list.default
        },
        //搜索节点
        findNodeLlist:{
            default:null,
            type:cc.Node
        },
        //推荐节点
        recommendNodeLlist:{
            default:null,
            type:cc.Node
        },
        //无人推荐节点
        recommendNodeNoBody:{
            default:null,
            type:cc.Node
        },

        ///////////////////////////////////////////
        //好友申请标签
        acceptTab:{
            default:null,
            type:cc.Node
        },
        //好友申请面板
        acceptNode:{
            default:null,
            type:cc.Node
        },
        //好友申请列表
        acceptLlist:{
            default:null,
            type:list.default
        }
    },

    onLoad () {
        facade.subscribe(init.haoyouProxy.ON_GET_APPLY_FRIEND_LIST, this.updateApplyFriendList, this);      //申请列表
        facade.subscribe(init.haoyouProxy.ON_GET_SEARCH_FRIEND_LIST, this.updateSearchFriendList, this);    //搜索列表 

        facade.subscribe(init.haoyouProxy.ON_FRIEND_APPLY_SUCCESS, this.onApplyFriend, this);               //申请好友成功回调
        facade.subscribe(init.haoyouProxy.ON_GET_RECOMMEND_LIST, this.updateRecommendList, this);               //申请好友成功回调
        
        //拉申请好友列表
        init.haoyouProxy.sendApplyFriends();
        //拉推荐列表
        init.haoyouProxy.sendFrecommend();

        this.init();
    },

    init() {
        //初始为推荐面板
        curSearchPanel = 2;

        //更新自己的编号
        this.lblMyId.string = i18n.t("HAOYOU_MY_ID", { uid:init.playerProxy.userData.uid });

        //无人推荐图标
        this.recommendNodeNoBody.active = true;

        //打开搜索界面
        if(init.haoyouProxy.applyFriends && init.haoyouProxy.applyFriends.length > 0)
        {
            //如果申请列表有数据就打开申请面板
            this.onClickTab(null, "2");
        }
        else
        {
            this.onClickTab(null, "1"); 
        }
    },

    // start () {

    // },

    // update (dt) {},

    updateApplyFriendList() {
        //申请列表
        var lst = [];
        if(init.haoyouProxy.applyFriends && init.haoyouProxy.applyFriends.length > 0)
        {
            for(var idx = 0; idx < init.haoyouProxy.applyFriends.length; idx++)
            {
                init.haoyouProxy.applyFriends[idx].type = 2;    //2表示申请列表
                lst.push(init.haoyouProxy.applyFriends[idx]);
            }
        }
        
        this.acceptLlist.data = lst;

        //清掉搜索列表
        init.haoyouProxy.searchFriends = [];
        this.updateSearchFriendList();
    },
    updateRecommendList() {
        //推荐列表
        var pushList = [];
        var tmpList = init.haoyouProxy.getRecommend();
        if(!utils.stringUtil.isBlank(tmpList))
        {
            for(var idx = 0; idx < tmpList.length; idx++)
            {
                if(!init.haoyouProxy.isApplied(tmpList[idx].id) && !utils.stringUtil.isBlank(tmpList[idx].id))
                {
                    var item = tmpList[idx];
                    item.type = 1;
                    pushList.push(item);
                }
            }
        }

        this.recommendLlist.data = pushList;

        if(curSearchPanel == 2)
        {
            this.onNodeTab(0);
        }

        //无人推荐图标
        this.recommendNodeNoBody.active = pushList.length <= 0;
    },

    updateSearchFriendList() {
        //搜索列表
        var pushList = [];
        if(!utils.stringUtil.isBlank(init.haoyouProxy.searchFriends))
        {
            //1表示推荐或者搜索列表
            init.haoyouProxy.searchFriends.type = 1;    
            pushList.push(init.haoyouProxy.searchFriends);
        }
        
        this.findLlist.data = pushList;

        if(curSearchPanel == 1)
        {
            this.onNodeTab(1);
        }

        //重置输入框
        this.searchEdit.string = "";
    },
    onApplyFriend(id) {
        //申请好友回调
        //清掉搜索列表
        init.haoyouProxy.searchFriends = [];
        this.updateSearchFriendList();
        this.updateRecommendList();

        //提示
        utils.alertUtil.alert18n("HAOYOU_TO_APPLY_SUCCESS");
    },

    onClickTab(t, e) {
        curSelectPanel = parseInt(e);
        if(this.findNode)
        {
            this.findNode.active = "1" == e;
        }
        if(this.acceptNode)
        {
            this.acceptNode.active = "2" == e;
        }

        var btnSearch = this.findTab.getComponent(cc.Button);
        var btnAccept = this.acceptTab.getComponent(cc.Button);
        if(btnSearch && btnAccept)
        {
            btnSearch.interactable = "1" != e;
            btnAccept.interactable = "2" != e;
        }
    },
    onNodeTab(type) {

        this.recommendNodeLlist.active = type == 0;
        this.findNodeLlist.active = type == 1;
    },
    onClickSearch() {
        //设显示为搜索面板
        curSearchPanel = 1;

        //搜索
        var curId = this.searchEdit.string;
        if(curId == "")
            return;

        if(init.playerProxy.userData.uid == parseInt(curId))
        {
            utils.alertUtil.alert18n("HAOYOU_SEARCH_SELF"); //不让搜索自己
            return;
        }

        init.haoyouProxy.sendFriendSearch(parseInt(curId));
    },
    onClickGetNextRecommend() {
        //
        curSearchPanel = 2;

        //换一批推荐
        init.haoyouProxy.addRecommendIdx();

        //
        this.updateRecommendList();
    },
    onClickDel() {},
    onClickBlackList() {},

    onClickOneKeyTongyi() {
        if(init.haoyouProxy.applyFriends.length <= 0)
            return;

        //全部同意
        init.haoyouProxy.sendfriendOK(0);
    },
    onClickOneKeyJujue() {
        if(init.haoyouProxy.applyFriends.length <= 0)
            return;

        //全部拒绝
        init.haoyouProxy.sendfriendNo(0);
    },
    onClickClose() {
        utils.utils.closeView(this);
    },
});
