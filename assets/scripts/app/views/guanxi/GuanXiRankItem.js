var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var init = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //排行1-3
        nodeTop: {
            default: [],
            type: cc.Node
        },
        //其它排行
        nodeOther: {
            default: null,
            type: cc.Label
        },
        //名字
        lblPlayerName: {
            default: null,
            type: cc.Label
        },
        //好友等级
        lblLevel: {
            default: null,
            type: cc.Label
        },
        //排行lv
        nodeRank: {
            default: [],
            type: cc.Node
        }
    },
    showData: function () {
        var t = this._data;
        var info = init.haoyouProxy.getFriendInfo(t.id);
        var guanxiLv = init.guanxiProxy.searchOtherLevel(t.score);
        var guanxiCls = init.guanxiProxy.searchOtherClass(t.score);
        if(!info || !guanxiLv || !guanxiCls)
        {
            util.alertUtil.alert18n("GUANXI_NO_FRIEND", {uid: t.id});
            return;
        }

        //名字
        this.lblPlayerName.string = info.name;
        this.lblPlayerName.node.color = cc.Color.WHITE.fromHEX(init.guanxiProxy.getColor(guanxiCls.fs_class));

        //等级 这里改成友情值
        this.lblLevel.string = t.score;
        this.lblLevel.node.color = cc.Color.WHITE.fromHEX(init.guanxiProxy.getColor(guanxiCls.fs_class));
        
        //蝴蝶
        for(var idx = 0; idx < this.nodeTop.length; idx++)
        {
            this.nodeTop[idx].active = (idx + 1) == t.rank;
        }

        this.nodeOther.node.active = t.rank > 3;
        this.nodeOther.string = t.rank;
        this.nodeOther.node.color = cc.Color.WHITE.fromHEX(init.guanxiProxy.getColor(guanxiCls.fs_class));
        

        //钥匙
        for(var idx = 0; idx < this.nodeRank.length; idx++)
        {
            this.nodeRank[idx].active = (idx + 1) == (init.guanxiProxy.maxFs - guanxiCls.fs_class);
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { 
    },

    // start () {

    // },

    // update (dt) {},

});

