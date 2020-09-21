/**
 * 凤仪榜
 */
const LiuGongUserItem = require("./LiuGongUserItem");
const List = require("../../component/List");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        userItems : [LiuGongUserItem],
        list : List.default,
        lblMyRank : cc.Label,
        lblMyName : cc.Label,
        lblMyScore : cc.Label,
        lblServer : cc.Label,
    },

    onLoad() {
        facade.subscribe(Initializer.liuGongProxy.LIUGONG_FENGYI_RENGYIRANK, this.onDataUpdate, this);
        facade.subscribe(Initializer.liuGongProxy.LIUGONG_FENGYI_MYRANK, this.onDataUpdate, this);
    },

    start() {
        this.onDataUpdate();
    },


    onDataUpdate : function() {
        if(Initializer.liuGongProxy.fengyiRankData != null) {
            //更新凤仪榜
            var fengyiData = Initializer.liuGongProxy.fengyiRankData.concat();
            for(var i = 0; i < this.userItems.length; i ++) {
                var itemData = fengyiData[0];
                if(itemData != null) {
                    this.userItems[i].init(itemData);
                    fengyiData.shift();
                }else {
                    this.userItems[i].node.active = false;
                }
            }

            this.list.data = Initializer.liuGongProxy.fengyiRankData;

        }

        if(Initializer.liuGongProxy.myRankData != null) {
            //更新自己的
            this.lblMyName.string = Initializer.liuGongProxy.myRankData.name;
            this.lblMyRank.string = Initializer.liuGongProxy.myRankData.rid == 0 ? "未上榜" : Initializer.liuGongProxy.myRankData.rid;
            this.lblServer.string = Initializer.liuGongProxy.myRankData.sevName;
            this.lblMyScore.string = Initializer.liuGongProxy.myRankData.score;

        }
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    }
});
