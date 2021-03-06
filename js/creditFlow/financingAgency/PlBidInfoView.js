/**
 * @author
 * @class PlBidInfoView
 * @extends Ext.Panel
 * @description [PlBidInfo]管理
 * @company 智维软件
 * @createtime:
 */
PlBidInfoView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		this.title="产品购买查询"
		if(this.userType==1&&this.Type==1){
			this.title="提前赎回处理";
		}
		if(this.userType==0){this.title="会员投资查询"}
		if(this.userType==1&&this.Type==2){this.title="打印对账单"}
		PlBidInfoView.superclass.constructor.call(this, {
					id : 'PlBidInfoView_'+this.userType+this.Type,
					title : this.title,
					iconCls : this.userType==0?"menu-finance":"menu-finance",
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel

		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			region : 'north',
			border : false,
			height : 50,
			anchor : '96%',
			layoutConfig: {
               align:'middle'
            },
             bodyStyle : 'padding:10px 10px 10px 10px',
            items : [{
		     		columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '投资人',
						name : 'userName',
						anchor : "100%",
						xtype : 'textfield'
					},{
						fieldLabel : '投资金额',
						name : 'userMoney',
						anchor : "100%",
						xtype : 'numberfield'
					}]
		     	},{
		     		columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '投资项目',
						name : 'bidName',
						anchor : "100%",
						xtype : 'textfield'
					},{
//						fieldLabel : '投资期限',
//						name : 'periodTime',
//						anchor : "100%",
//						xtype : 'numberfield'
						fieldLabel : '合同编号',
						name : 'contractNo',
						anchor : "100%",
						xtype : 'textfield'
					}]
		     	},{
		     		columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '投资时间',
						name : 'bidtime',
						anchor : "100%",
						xtype : 'datefield',
						format : 'Y-m-d'
					},{
						fieldLabel : '年化收益率',
						name : 'yeaRate',
						anchor : "100%",
						xtype : 'numberfield'
					}]
		     	},{
		     		columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '到',
						name : 'endtime',
						anchor : "100%",
						hidden:this.userType==0?true:false,
						xtype : 'datefield',
						format : 'Y-m-d'
					},{
						fieldLabel : '投资状态',
						hiddenName : 'state',
						name:'state',
						anchor : "100%",
						xtype : 'combo',
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'item',
						store : new Ext.data.SimpleStore({
							fields : ["item","value"],
							data : [["投资中",1], ["投资成功",2], ["已流标",3],["投资失败",0],["已完成",10],["已关闭",-2]]
						}),
						triggerAction : "all"
					},{
						fieldLabel : this.userType==0?'投资类型':'',
						hiddenName : 'proType',
						name:'state',
						anchor : "100%",
						xtype : 'combo',
						mode : 'local',
						hidden:this.userType==0?false:true,
						valueField : 'value',
						editable : false,
						displayField : 'item',
						store : new Ext.data.SimpleStore({
							fields : ["item","value"],
							data : [["企业直投标","B_Dir"],["个人直投标","P_Dir"], ["企业债权标","B_Or"], ["个人债权标","P_Or"], ["理财U计划","UPlan"], ["理财D计划","mmplan"]]
						}),
						triggerAction : "all"
					}]
		     	},{
	     			columnWidth :.15,
					layout : 'form',
					border : false,
					labelWidth :50,
					items :[{
						text : '查询',
						xtype : 'button',
						scope : this,
						style :'margin-left:30px',
						anchor : "90%",
						iconCls : 'btn-search',
						handler : this.search
					},{
						text : '重置',
						style :'margin-left:30px',
						xtype : 'button',
						scope : this,
						//width : 40,
						anchor : "90%",
						iconCls : 'btn-reset',
						handler : this.reset
					}]
	     		}]
		});
		if (this.userType == 0) {
			this.topbar = new Ext.Toolbar({
				items : [{
					iconCls : 'btn-detail',
					text : '查看收益',
					xtype : 'button',
					scope : this,
					handler : this.seeprofit
				},{
						iconCls : 'btn-xls',
						text : '导出到Excel',
						xtype : 'button',
						scope : this,
						//hidden : isGranted('_apply_extcelMoney') ? false : true,
						handler : function() {
							var userName=this.getCmpByName('userName').getValue();
							var bidName=this.getCmpByName('bidName').getValue();
							
//							var periodTime=this.getCmpByName('periodTime').getRawValue();;
							var bidtime=this.getCmpByName('bidtime').getRawValue();
							var userMoney=this.getCmpByName('userMoney').getValue();
							var yeaRate=this.getCmpByName('yeaRate').getValue();
							var state=this.getCmpByName('state').getValue();
							var proType=this.getCmpByName('proType').getValue();
						
							window.open(__ctxPath + "/creditFlow/financingAgency/getPersonInvestProjectToexcelPlManageMoneyPlanBuyinfo.do?userType="+this.userType
							+'&userName='+encodeURIComponent(encodeURIComponent(userName))
							+'&bidName='+encodeURIComponent(encodeURIComponent(bidName))
//							+"&periodTime="+periodTime
							+"&bidtime="+bidtime
							+"&userMoney="+userMoney
							+"&yeaRate="+yeaRate
							+"&state="+state
							+"&proType="+proType
							+'&isExcel=1','_blank');
			
					
						}
					}]
			});
		} else if(this.userType == 1){
			this.topbar = new Ext.Toolbar({
				items : [{
					iconCls : 'btn-detail',
					text : '查看收益',
					xtype : 'button',
					scope : this,
					handler : this.assignLixi
				},{
					iconCls : 'btn-detail',
					text : '查看详细信息',
					xtype : 'button',
					scope : this,
					handler : this.seeInfo
				},{
					iconCls : 'btn-tree-team15',
					text : '提前赎回',
					hidden:this.Type==1?false:true,
					xtype : 'button',
					scope : this,
					handler : this.earlyRedemption
				},{
					iconCls : 'btn-tree-team22',
					text : '打印对账单',
					xtype : 'button',
					hidden:this.Type==2?false:true,
					scope : this,
					handler : this.print
				}]
			});
		}
		var summary = new Ext.ux.grid.GridSummary();
				function totalMoney(v, params, data) {
					return '总计(元)';
				}
		var rightValue =  isGranted('_PlBidInfoView_Mmproduce_see_All_'+this.isShow);
		var isShop = isGranted('_PlBidInfoView_Mmproduce_see_shop_'+this.isShow);

		this.gridPanel = new HT.GridPanel({
			tbar : this.topbar,
			plugins : [summary],
			region : 'center',
			id : 'PlBidInfoGrid',
			url : __ctxPath + "/creditFlow/financingAgency/getPersonInvestProjectPlManageMoneyPlanBuyinfo.do?userType="+this.userType+"&Type="+this.Type+"&isAll="+rightValue+"&isShop="+isShop,
			fields : [{
						name : 'infoId',
						type : 'int'
					}, 'planId', 'proType', 'bidName', 'userType', 'userId','userName','userMoney','startinInterestTime','endinInterestTime',
					'bidtime','periodTime','yeaRate','contractNo','state','planTable','isOtherFlow','runId','earlierOutDate'],
			columns : [{
						header : 'infoId',
						align:'center',
						dataIndex : 'infoId',
						hidden : true
					},{
						header : 'runId',
						align:'center',
						dataIndex : 'runId',
						hidden : true
					}/*,{
						header  :"合同编号",
						align:'left',
						dataIndex : 'contractNo'
					}*/,{
						header : this.userType==0?'用户名':'投资人姓名',
						dataIndex : 'userName',
						align:'center',
						summaryRenderer : totalMoney
					},{
						header : '投资名称',
						dataIndex : 'bidName'
					}
//					,{
//						header : '投资类型',
//						align:'center',
//						dataIndex : 'proType',
//						renderer:function(v){
//							if(v=="B_Dir"){
//								return "企业直投标";
//							}else if(v=="P_Dir"){
//								return "个人直投标";
//							}else if(v=="B_Or"){
//								return "企业债权标";
//							}else if(v=="P_Or"){
//								return "个人债权标";
//							}else if(v=="UPlan"){
//								return "理财U计划";
//							}else if(v=="mmplan"){
//								return "理财D计划";
//							}else if(v=="UPlan"){
//								return "U债权";
//							}else if(v=="DPlan"){
//								return "D债权";
//							}else{
//								return "";
//							}
//						
//						}
//					}
					,{
						header : '投标金额（元）',
						align:'right',
						dataIndex : 'userMoney',
						summaryType : 'sum'
					},{
						header : '投标期限（个月）',
						align:'center',
						dataIndex : 'periodTime',
						align:'right'
					},{
						header : '投标年化利率（%）',
						dataIndex : 'yeaRate',
						align:'right'
					},{
						header : '投资日期',
						align:'center',
						dataIndex : 'bidtime'
					},{
						header : '计息起期',
						align:'center',
						dataIndex : 'startinInterestTime'
					},{
						header : '计息止日',
						align:'center',
						dataIndex : 'endinInterestTime'
					},{
						header : '投资状态',
						align:'center',
						dataIndex : 'state',
						renderer:function(v){
							if(eval(v)==eval(1)){
								return "投资中";
							}else if(eval(v)==eval(2)){
								return "投资成功";
							}else if(eval(v)==eval(3)){
								return "已流标";
							}else if(eval(v)==eval(0)){
								return "投资失败";
							}else if(eval(v)==eval(10)){
								return "已完成";
							}else if(eval(v)==eval(-2)){
								return "已关闭";
							}else{
								return "";
							}
						
						}
					}]
				// end of columns
			});

		//this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new PlBidInfoForm({
								id : rec.data.id
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		new PlBidInfoForm().show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath
							+ '/creditFlow.financingAgency/multiDelPlBidInfo.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath
							+ '/creditFlow.financingAgency/multiDelPlBidInfo.do',
					grid : this.gridPanel,
					idName : 'id'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		new PlBidInfoForm({
					id : record.data.id
				}).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.id);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	},
	assignLixi : function() {
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			var record =s[0];
			if(record.data.proType=="mmproduce"||record.data.proType=="mmplan"){
				new PlMmOrderAssignInterestView({
						orderId : s[0].data.infoId,
						investPersonName : s[0].data.userName,
						mmName : s[0].data.bidName,
						buyMoney : s[0].data.userMoney,
						orderlimit : s[0].data.periodTime*30,
						promisIncomeSum : null,
						currentGetedMoney :null

					}).show();
			}else{
				new PerInvestFundIntentWindow({
						investpersonId : s[0].data.userId,
						planId:s[0].data.planId,
						investPersonName : s[0].data.userName,
						mmName : s[0].data.bidName,
						buyMoney : s[0].data.userMoney,
						orderlimit : s[0].data.periodTime*30,
						promisIncomeSum : null,
						currentGetedMoney :null,
						isAssignInterRest:true,
						isPrint:true,
						isOwnBpFundProject:false
				}).show()
			}
		}
	},
	seeprofit:function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			var record =s[0];
			if(record.data.proType=="mmproduce"||record.data.proType=="mmplan"){
				new PlMmOrderAssignInterestView({
						orderId : s[0].data.infoId,
						investPersonName : s[0].data.userName,
						mmName : s[0].data.bidName,
						buyMoney : s[0].data.userMoney,
						orderlimit : s[0].data.periodTime*30,
						promisIncomeSum : null,
						currentGetedMoney :null

					}).show();
			}else{
				new PerInvestFundIntentWindow({
						infoId : s[0].data.infoId,
						investpersonId : s[0].data.userId,
						planId:s[0].data.planId,
						investPersonName : s[0].data.userName,
						mmName : s[0].data.bidName,
						buyMoney : s[0].data.userMoney,
						orderlimit : s[0].data.periodTime*30,
						promisIncomeSum : null,
						currentGetedMoney :null,
						isAssignInterRest:true,
						isPrint:true,
						isOwnBpFundProject:false
				}).show()
			}
			
		}
	},
	earlyRedemption : function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			var record =s[0];
			var isOtherFlow =record.data.isOtherFlow;
			if(isOtherFlow==1){
				Ext.ux.Toast.msg('操作信息', '正在进行提前赎回流程，不能启动新的提前赎回流程！');
				return false;
			}else{
				var earlierOutDate =record.data.earlierOutDate;//提前赎回的日期
				if(earlierOutDate!=null&&""!=earlierOutDate){//已经有提前赎回日期后的记录不能赎回
					Ext.ux.Toast.msg('操作信息', '已经提前赎回了，不能启动新的提前赎回流程！');
					return false;
				}else{
					var gridPanel=this.gridPanel
					Ext.Ajax.request( {
						url : __ctxPath +"/creditFlow/financingAgency/startEarlyRedemptionProcessPlEarlyRedemption.do",
						params : {orderId : record.data.infoId},
						method : 'POST',
						success : function(response) {
							debugger
							gridPanel.getStore().reload()
							var obj=Ext.util.JSON.decode(response.responseText)
							var contentPanel = App.getContentPanel();
							if(obj.taskId==1){
								Ext.ux.Toast.msg('操作信息','您不是提前赎回流程中任务<提前赎回申请>的处理人!');
								return;
							}else if(obj.num == 0){
								Ext.ux.Toast.msg('操作信息','此标已派息完成,不能提前赎回！');
								return;
							}else{
								var formView = contentPanel.getItem('ProcessNextForm' + obj.taskId);
								if (formView == null) {
									formView = new ProcessNextForm({
										taskId : obj.taskId,
										activityName : obj.activityName,
										projectName : obj.projectName,
										agentTask : true
									});
									contentPanel.add(formView);
								}
								contentPanel.activate(formView);
							}
							gridPanel.getStore().reload()
						},
					   failure : function(fp, action) {
								Ext.MessageBox.show({
									title : '操作信息',
									msg : '信息保存出错，请联系管理员！',
									buttons : Ext.MessageBox.OK,
									icon : 'ext-mb-error'
								});
						}
					});
			 	}
				
			}
		}
	},
	seeInfo : function(){debugger
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			var record =s[0];
			var contentPanel = App.getContentPanel();
			if(record.data.proType=="mmproduce"||record.data.proType=="mmplan"){
					var seeManageMoneyInfo = new SeeManageMoneyInfo({
						orderId : record.data.infoId,
						userName: record.data.userName,
						bidName : record.data.bidName,
						runId  :record.data.runId,
						titles:1
					})
					contentPanel.add(seeManageMoneyInfo);
				 contentPanel.add(seeManageMoneyInfo);
				contentPanel.activate('SeeManageMoneyInfo_'+record.data.infoId);
			}
				
		}
	},
	print : function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			var record =s[0];
			window.open (__ctxPath +"/creditFlow/financingAgency/printOrdersPlManageMoneyPlanBuyinfo.do?orderId="+record.data.infoId ,"_blank" ) ;
				
		}
	}
});
