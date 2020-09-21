var list = require("../../component/List");
var roleSpine = require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var curSelectPanel = 1; //1 搜索， 2 申请
var curSearchPanel = 2; //1 搜索， 2 推荐 默认推荐 
cc.Class({
    extends: cc.Component,

    properties: {
        //好友申请列表
        acceptList: {
            default: null,
            type: list.default,

        },
        title: cc.Label
    },

    onLoad() {

        if (this.node.openParam) {
            facade.subscribe(init.haoyouProxy.ON_GET_FRIEND_LIST, this.updateApplyFriendList, this); //获得好友列表
            //拉好友列表
            init.haoyouProxy.sendFriends();

            this.title.string = i18n.t('UNION_APPLY_FRIEND_WORD');
        } else {

            facade.subscribe(init.unionProxy.UNION_ON_GET_FRIEND_LIST, this.updateFriendList, this); //获得好友列表

            init.unionProxy.sendFriends();
            this.title.string = i18n.t('UNION_APPLY_FRIENDS_WORD');
        }

        this.init();

    },

    init() {

    },

    // start () {

    // },

    // update (dt) {},

    updateApplyFriendList() {
        //邀请列表
        var lst = [];
        if (init.haoyouProxy.friends && init.haoyouProxy.friends.length > 0) {
            for (var idx = 0; idx < init.haoyouProxy.friends.length; idx++) {
                init.haoyouProxy.friends[idx].type = 1; //1表示邀请列表
                lst.push(init.haoyouProxy.friends[idx]);
            }
        }

        this.acceptList.data = lst;
    },

    updateFriendList() {
        //申请列表
        var lst = [];
        if (init.unionProxy.investLists && init.unionProxy.investLists.length > 0) {
            for (var idx = 0; idx < init.unionProxy.investLists.length; idx++) {
                init.unionProxy.investLists[idx].type = 2; //2表示申请列表
                lst.push(init.unionProxy.investLists[idx]);
            }
        }

        this.acceptList.data = lst;
    },

    onApplyFriend(id) {
        //提示
        utils.alertUtil.alert18n("HAOYOU_TO_APPLY_SUCCESS");
    },

    onClickSearch() {
        //设显示为搜索面板
        curSearchPanel = 1;

        //搜索
        var curId = this.searchEdit.string;
        if (curId == "")
            return;

        if (init.playerProxy.userData.uid == parseInt(curId)) {
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
        if (init.haoyouProxy.applyFriends.length <= 0)
            return;

        //全部同意
        init.haoyouProxy.sendfriendOK(0);
    },
    onClickOneKeyJujue() {
        if (init.haoyouProxy.applyFriends.length <= 0)
            return;

        //全部拒绝
        init.haoyouProxy.sendfriendNo(0);
    },
    onClickClose() {
        utils.utils.closeView(this);
    },
});