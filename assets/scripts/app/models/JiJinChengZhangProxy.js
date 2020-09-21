var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../component/RedDot"),
    l = (function () {
        function t() {
            this.JIJIN_OPENINFO = "JIJIN_OPENINFO";
            this.JIJIN_REHCARGE_SUCCESS = "JIJIN_REHCARGE_SUCCESS";
            this.JIJIN_LXZL_RWD ="JIJIN_LXZL_RWD";
            this.JIJIN_HYDL_RWD="JIJIN_HYDL_RWD";
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.growth.fund, this.backMes, this);
        };
        
        //cfg 信息请求
        t.prototype.openInfo = function () {
            var info = new proto_cs.huodong.hd6301Info();
            JsonHttp.send(info);

        };

        //活跃登录 list 红点数据
        t.prototype.updateLstHydl = function () {
            var hydl = localcache.getList(localdb.table_jijin_fund_act);
            this.lst_hydl = [];
            this.redPoint_1 = false;
            hydl.forEach(element => {
                var itemStatue = this.activity_fund && element.id > this.activity_fund_rwd && this.activity_fund_rwd == element.id - 1
                    && (element.type == 1 && this.cons >= element.param || element.type == 2 && this.day >= element.param);
                var hasGet = element.id <= this.activity_fund_rwd  //只要id小于等于已领取id 就表示 已领取了
                this.lst_hydl.push({
                    id: element.id,
                    cfg: element,
                    statue: itemStatue,   //状态 充值 满足条件 id>rwd&&rwd==id-1
                    score: element.type == 1 ? `(${this.cons}/${element.param})` : element.type == 2 ? `(${this.day}/${element.param})` : "",
                    isGet: hasGet,
                })
                if (!this.redPoint_1) {
                    this.redPoint_1 = itemStatue;
                }
            });
            this.lst_hydl.sort((a, b) => {
                var itema = a.id;
                var itemb = b.id;
                if (a.isGet) {
                    itema = a.id + 100;
                }
                if (b.isGet) {
                    itemb = b.id + 100;
                }
                return itema - itemb;
            });
            n.default.change("jiJin", this.redPoint_1 || this.redPoint_2);
            n.default.change("red_jj_1", this.redPoint_1);
            n.default.change("red_jj_2", this.redPoint_2);
        };

        //凌霄之路
        t.prototype.updateLstLxzl = function () {
            var lxzl = localcache.getList(localdb.table_jijin_fund_task);
            this.lst_lxzl = [];
            this.redPoint_2 = false;
            lxzl.forEach(element => {
                var itemStatue = this.main_fund && element.id > this.main_fund_rwd && this.main_fund_rwd == element.id - 1
                    && this.mytask_id >= element.task_id;
                var hasGet = element.id <= this.main_fund_rwd  //只要id小于等于已领取id 就表示 已领取了
                this.lst_lxzl.push({
                    id: element.id,
                    cfg: element,
                    statue: itemStatue,
                    isGet: hasGet
                })
                if (!this.redPoint_2) {
                    this.redPoint_2 = itemStatue;
                }
            });
            this.lst_lxzl.sort((a, b) => {
                var itema = a.id;
                var itemb = b.id;
                if (a.isGet) {
                    itema = a.id + 100;
                }
                if (b.isGet) {
                    itemb = b.id + 100;
                }
                return itema - itemb;
            });
            n.default.change("jiJin", this.redPoint_1 || this.redPoint_2);
            n.default.change("red_jj_1", this.redPoint_1);
            n.default.change("red_jj_2", this.redPoint_2);
        };

        //领取奖励
        t.prototype.sendGetActivityRdw = function () {
            var e = new proto_cs.huodong.hd6301ActivityRwd();
            JsonHttp.send(e, function (a) {
                if (a.a.system.errror == null) {
                    i.timeProxy.floatReward()
                    var data = a.a.growth;
                    if (data) {
                        var proxy = i.jiJinChengZhangProxy
                        proxy.activity_fund = data.fund.activity_fund;
                        proxy.activity_fund_rwd = data.fund.activity_fund_rwd;
                        proxy.cons = data.fund.cons;
                        proxy.day = data.fund.day;
                        proxy.main_fund = data.fund.main_fund;
                        proxy.main_fund_rwd = data.fund.main_fund_rwd;
                        proxy.mytask_id = data.fund.mytask_id;
                        proxy.updateLstLxzl();
                        facade.send(i.jiJinChengZhangProxy.JIJIN_HYDL_RWD);
                    }
                }
            })
        };

        t.prototype.sendGetMainRwd = function () {
            var e = new proto_cs.huodong.hd6301MainRwd();
            JsonHttp.send(e, function (a) {
                if (a.a.system.errror == null) {
                    i.timeProxy.floatReward()
                    var data = a.a.growth;
                    if (data) {
                        var proxy = i.jiJinChengZhangProxy
                        proxy.activity_fund = data.fund.activity_fund;
                        proxy.activity_fund_rwd = data.fund.activity_fund_rwd;
                        proxy.cons = data.fund.cons;
                        proxy.day = data.fund.day;
                        proxy.main_fund = data.fund.main_fund;
                        proxy.main_fund_rwd = data.fund.main_fund_rwd;
                        proxy.mytask_id = data.fund.mytask_id;
                        proxy.updateLstLxzl();
                        facade.send(i.jiJinChengZhangProxy.JIJIN_LXZL_RWD);
                    }
                }
            })
        };


        //心跳是为任务问题做的
        t.prototype.sendJiJinAdok = function () {
            var e = new proto_cs.user.adok();
            e.label = "fund";
            JsonHttp.send(e, function (a) {
                if (a.a.system.errror == null) {
                    var data = a.a.growth;
                    if (data) {
                        var proxy = i.jiJinChengZhangProxy
                        proxy.activity_fund = data.fund.activity_fund;
                        proxy.activity_fund_rwd = data.fund.activity_fund_rwd;
                        proxy.cons = data.fund.cons;
                        proxy.day = data.fund.day;
                        proxy.main_fund = data.fund.main_fund;
                        proxy.main_fund_rwd = data.fund.main_fund_rwd;
                        proxy.mytask_id = data.fund.mytask_id;
                        proxy.updateLstLxzl();
                    }
                }
            });
        };

        t.prototype.backMes = function (s) {
            this.activity_fund = s.activity_fund;
            this.main_fund = s.main_fund;
            this.cons = s.cons;
            this.day = s.day;
            this.mytask_id = s.mytask_id;
            this.activity_fund_rwd = s.activity_fund_rwd;
            this.main_fund_rwd = s.main_fund_rwd;
            this.updateLstHydl();
            this.updateLstLxzl();
            facade.send(i.jiJinChengZhangProxy.JIJIN_REHCARGE_SUCCESS);
            facade.send(i.jiJinChengZhangProxy.JIJIN_OPENINFO);
        }
        t.prototype.complete = function () {
            if (!this.lst_lxzl && !this.lst_hydl) {
                return false;
            }
            return this.lst_lxzl && this.lst_hydl && this.activity_fund_rwd == this.lst_hydl.length && this.main_fund_rwd == this.lst_lxzl.length ? false : true;
        }
        return t;
    })();
o.JiJinChengZhangProxy = l;