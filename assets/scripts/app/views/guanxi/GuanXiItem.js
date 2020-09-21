var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var init = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //头像
        nodeHead: {
            default: null,
            type: head.default
        },
        //底板
        spSelected: {
            default: [],
            type: cc.Node
        },
        //名字
        lblPlayerName: {
            default: null,
            type: cc.Label
        },
        //友情值
        lblShili: {
            default: null,
            type: cc.Label
        },
        //友情等级
        lblLevel: {
            default: null,
            type: cc.Label
        },
        //底板
        nodeLevel: {
            default: [],
            type: cc.Node
        },
    },
    showData () {
        var t = this._data;
        var info = init.haoyouProxy.getFriendInfo(t.id);

        if(!info)
        {
            util.alertUtil.alert18n("GUANXI_NO_FRIEND", {uid: t.id});
            return;
        }
        //头像
        this.nodeHead.setUserHead(info.job, info.headavatar);

        //名字
        this.lblPlayerName.string = info.name;

        //友情值
        this.lblShili.string = i18n.t("GUANXI_FUN_NUMBER", { num: t.score});

        //友情等级
        var lv = init.guanxiProxy.searchOtherLevel(t.score);
        if(lv)
        {
            this.lblLevel.string = i18n.t("GUANXI_FUN_LEVEL", { num: lv.level});
        }
        //友情档次
        var cls = init.guanxiProxy.searchOtherClass(t.score);
        if(cls)
        {
            for(var idx = 0; idx < this.nodeLevel.length; idx++)
            {
                this.nodeLevel[idx].active = (cls.fs_class - 1) == idx;
            }
        }
        
        //选中
        var index = t.select ? 1 : 0;
        if(index < this.spSelected.length)
        {
            for(var idx = 0; idx < this.spSelected.length; idx++)
            {
                this.spSelected[idx].active = idx == index;
            }
        }

        //
        /*
        if(t.rank == 1)
        {
            this.node.setScale(1.1,1.1);
        }
        else{
            this.node.setScale(1,1);
        }

        this.node.setPositionX(0, this.node.getPositionY());
        */
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { 

    },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickItem() {
        facade.send(init.guanxiProxy.ON_RELATION_SELECT, this._data.id);
    },
    onClickAvatarItem() {
        var t = this.data;
        t && (t.id == init.playerProxy.userData.uid ? time.funUtils.openView(time.funUtils.userView.id) : init.playerProxy.sendGetOther(t.id));
    },
});

