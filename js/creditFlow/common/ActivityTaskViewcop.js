/**
 * @author lisl
 * @extends Ext.Panel
 * @description 待处理任务
 * @company 智维软件
 * @createtime:
 */
ActivityTaskViewcop = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		
		Date.prototype.format = function(format){
		    var o ={
		        "M+" : this.getMonth()+1, //month
		        "d+" : this.getDate(),    //day
		        "h+" : this.getHours(),   //hour
		        "m+" : this.getMinutes(), //minute
		        "s+" : this.getSeconds(), //second
		        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		        "S" : this.getMilliseconds() //millisecond
		    }
		    if(/(y+)/.test(format))
		    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
		    for(var k in o)
		    if(new RegExp("("+ k +")").test(format))
		    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		    return format;
		};
		
		compareDateTime = function(dueDate){
			var dateNow = new Date();
								   var now= new Date();
								   var limit= new Date(dueDate);
								   var nowFormat=now.format('yyyy-MM-dd');
								   var limitFormat=limit.format('yyyy-MM-dd');
								   var s1 = nowFormat.replace(/-/g, "/"); 
									var s2 = limitFormat.replace(/-/g, "/"); 
									s1 = new Date(s1);
									s2 = new Date(s2);
								   if(s1>s2){
								   		return true;
								   }else{
								   		return false;
								   }
		}
		// 调用父类构造
		ActivityTaskViewcop.superclass.constructor.call(this, {
					id : 'ActivityTaskViewcop',
					title : '审核流程查询',
					region : 'center',
					layout : 'border',
					iconCls : 'btn-tree-team2',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'menu-flowWaitc',
								text : '处理任务',
								xtype : 'button',
								scope : this,
								//hidden : isGranted('_detailPro') ? false : true,
								handler : this.detailPro
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_flowRecords')
												? false
												: true
									}), {
								iconCls : 'btn-advice',
								text : '意见与说明记录',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_flowRecords2')
										? false
										: true,
								handler : this.flowRecords
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_showFlowImg')
												? false
												: true
									}), {
								iconCls : 'btn-flow-chart',
								text : '流程示意图',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_showFlowImg')
										? false
										: true,
								handler : this.showFlowImg
							}]
				});


		this.searchPanel = new Ext.form.FormPanel({
					height : 40,
					border : false,
					region : 'north',
					layout : 'hbox',
					layoutConfig : {
						align : 'middle',
						pack : 'left'
					},
					style : 'background-color:white;padding:5px;',
					defaults : {
						margins : '0px 8px 0px 4px'
					},
					items : [{
								xtype : 'label',
								text : '项目名称:'
							}, {
								xtype : 'textfield',
								name : 'projectName',
								width : 200
							}, /*{
								xtype : 'label',
								text : '项目编号:'
							}, {
								xtype : 'textfield',
								name : 'projectNumber',
								width : 200
							},*/ {
								xtype : 'button',
								text : '查询',
								iconCls : 'btn-search',
								scope : this,
								handler : this.search
							}, {
								xtype : 'button',
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}]
				});
		var rightValue =  isGranted('_PlBidInfoView_Mmproduce_see_All1_'+this.isShow);
		var isShop = isGranted('_PlBidInfoView_Mmproduce_see_shop1_'+this.isShow);

		this.gridPanel = new HT.GridPanel({
					region : 'center',
//					tbar : this.topbar,
					// 使用RowActions
					rowActions : false,
					notmask :true,
				    //loadMask :true,
					root : 'result',
					totalProperty : 'totalCounts',
					id : 'ActivityTaskGrid',
					url : __ctxPath
							+ "/flow/userProcessedActivityAllTask.do?processName="
							+ processNameFlowKey+"&isAll="+rightValue+"&isShop="+isShop, 
					/*
					 * baseParams:{ 'Q_runStatus_SN_EQ':1 },
					 */
					fields : ['taskName','shopName','investDue','rate','buyMoney','buyDate','customerManagerName','orderNumber','startinInterestTime', 'activityName', 'assignee',
							'createTime', 'dueDate', 'executionId', 'pdId',
							'taskId', 'isMultipleTask'/*{
								name : 'task.taskId',
								type : 'int'
							}, 'task.dueDate',
							'task.activityName',
							'task.createTime',
							'vCommonProjectFlow.runId',
							'vCommonProjectFlow.taskCreateTime',
							'vCommonProjectFlow.projectId',
							'vCommonProjectFlow.subject',
							'vCommonProjectFlow.customerName',
							'vCommonProjectFlow.projectNumber',
							// 'vCommonProjectFlow.operationTypeValue',//视图没有，删除掉。
							'vCommonProjectFlow.activityName',
							'vCommonProjectFlow.businessType',
							'vCommonProjectFlow.projectName'*/],// 'vCommonProjectFlow.creator',
					columns : [/*{
								header : '项目Id',
								dataIndex : 'vCommonProjectFlow.projectId',
								hidden : true
							}, {
								header : 'runId',
								dataIndex : 'vCommonProjectFlow.runId',
								hidden : true
							}, {
								header : 'projectNumber',
								dataIndex : 'task.processRun.projectNumber',
								width : 120,
								hidden : true,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									alert("runId==="+value);
									return value;
								}
							}, {
								header : '项目名称',
								dataIndex : 'vCommonProjectFlow.projectName',
								width : 615,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('task.dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}
							}, {
								header : '项目编号',
								dataIndex : 'vCommonProjectFlow.projectNumber',
								width : 125,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('task.dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}
							}, */{
								header : '任务ID',
								align:'center',
								dataIndex : 'taskId',
								hidden : true
							},{
								header : 'executionId',
								align:'center',
								dataIndex : 'executionId',
								hidden : true
							},{
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '项目名称',
								dataIndex : 'taskName',
								width : 250/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							},{
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '投资期限（个月）',
								dataIndex : 'investDue',
								width : 80/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							},{
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '投资年化利率（%）',
								dataIndex : 'rate',
								width : 80/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							},{
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '投资金额（元）',
								dataIndex : 'buyMoney',
								width : 100/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							}, {
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '投资日期',
								dataIndex : 'buyDate',
								width : 90,
								renderer: function(value) {
									if(value!=null){
										return new Date(value).format("yyyy-MM-dd");
									}
									return value; 
								}
								/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							}, {
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '客户经理',
								dataIndex : 'customerManagerName',
								width : 90
								/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							}, {
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '合同编号',
								dataIndex : 'orderNumber',
								width : 200
								/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							}, {
								//header : '项目名称'+'<span style="color:red;">'+"(红色代表任务为超时未处理)"+'</span>',
								header : '起息日期',
								dataIndex : 'startinInterestTime',
								width : 90,
								renderer: function(value) {
									if(value!=null){
										return new Date(value).format("yyyy-MM-dd");
									}
									return value; 
								}
								/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							},{
								header : '所属部门',
								dataIndex : 'shopName',
								width : 100/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							},{
								header : '审核状态',
								dataIndex : 'activityName',
								width : 100,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									debugger
									var datavalue;
									datavalue=value;
									if(datavalue=="认购审核"){
										datavalue="业务审核中";
										return datavalue;
									}else if(datavalue=="财务确认"){
										datavalue="财务审核中";
										return datavalue;
									}else if(datavalue=="产品认购申请"||datavalue=="理财产品认购申请"){
										datavalue="录入中";
										return datavalue;
									}else{
										return datavalue;
									}
							}
							}, {
								header : '任务分配时间',
								align:'center',
								dataIndex : 'createTime',
								width : 90/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							}, {
								header : '完成时限',
								align:'center',
								dataIndex : 'dueDate',
								width : 90/*,
								renderer : function(value, metadata, record,rowIndex, colIndex) {
									var dueDate=record.get('dueDate');
									if(dueDate!=null&&dueDate!=''){
										if(compareDateTime(dueDate)){
											return '<span style="color:red;">'+value+'</span>';
										}else{
											return value;
										}
									}
								   return value;
								}*/
							}],// end of columns
					listeners : {
						scope : this,
						rowdblclick : function(grid, rowIndex, e) {

						/*	if (true == isGranted('_detailPro') ? false : true) {

								return;
							}*/
							this.detailPro.call(this);

						},
						afterrender : function(){
							 this.loadMask1 = new Ext.LoadMask(this.gridPanel.getEl (), {
								 msg  : '正在加载数据中······,请稍候······',
								 store:this.gridPanel.store,
								 removeMask : true// 完成后移除
							});
							this.loadMask1 .show(); //显示
							
						}
					}
				});
				
	},// end of the initComponents()

	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 查询条件
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
});
