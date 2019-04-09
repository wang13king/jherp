/**
 * @author
 * @class ObPlatformDealInfoView
 * @extends Ext.Panel
 * @description [ObPlatformDealInfo]管理
 * @company 智维软件
 * @createtime:
 */
ObPlatformDealInfoView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ObPlatformDealInfoView.superclass.constructor.call(this, {
					id : 'ObPlatformDealInfoView',
					title : '管理',
					region : 'center',
					layout : 'border',
					items : [
					//this.searchPanel,
					this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({
					layout : 'form',
					region : 'north',
					colNums : 3,
					items : [{
								fieldLabel : 'recordNumber',
								name : 'Q_recordNumber_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'transferType',
								name : 'Q_transferType_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'createDate',
								name : 'Q_createDate_D_EQ',
								flex : 1,
								xtype : 'datefield',
								format : 'Y-m-d'
							}, {
								fieldLabel : 'transferDate',
								name : 'Q_transferDate_D_EQ',
								flex : 1,
								xtype : 'datefield',
								format : 'Y-m-d'
							}, {
								fieldLabel : 'incomMoney',
								name : 'Q_incomMoney_L_EQ',
								flex : 1,
								xtype : 'numberfield'
							}, {
								fieldLabel : 'payMoney',
								name : 'Q_payMoney_L_EQ',
								flex : 1,
								xtype : 'numberfield'
							}, {
								fieldLabel : 'message',
								name : 'Q_message_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'transid',
								name : 'Q_transid_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'bankcode',
								name : 'Q_bankcode_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'cardnbr',
								name : 'Q_cardnbr_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'acctname',
								name : 'Q_acctname_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : 'transamt',
								name : 'Q_transamt_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}],
					buttons : [{
								text : '查询',
								scope : this,
								iconCls : 'btn-search',
								handler : this.search
							}, {
								text : '重置',
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
				});// end of searchPanel

		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '充值',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							},{
								iconCls : 'btn-add',
								text : '提现',
								xtype : 'button',
								scope : this,
								handler : this.createRs1
							}, {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}/*,{
								iconCls : 'btn-add',
								text : '查询网络平台账户',
								xtype : 'button',
								scope : this,
								handler : this.queryRs
							}*/]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			//rowActions : true,
			id : 'ObPlatformDealInfoGrid',
			url : __ctxPath
					+ "/fund/listObPlatformDealInfo.do",
			fields : [{
						name : 'id',
						type : 'int'
					}, 'recordNumber', 'transferType', 'createDate',
					'transferDate', 'incomMoney', 'payMoney', 'message',
					'transid', 'bankcode', 'cardnbr', 'acctname', 'transamt','dealRecordStatus'],
			columns : [{
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}, {
						header : '交易流水号',
						dataIndex : 'recordNumber'
					}, {
						header : '交易类型',
						dataIndex : 'transferType',
						renderer:function(value){
							if(value=="1"){
								return "充值";
							}else if(value=="2"){
								return "提现";
							}else{
								return value;
							}
						}
					}, {
						header : '创建日期',
						dataIndex : 'createDate'
					}/*, {
						header : 'transferDate',
						dataIndex : 'transferDate'
					}*/, {
						header : '交易金额',
						dataIndex : 'transamt'
					}, {
						header : '交易状态',
						dataIndex : 'dealRecordStatus',
						renderer:function(value){
							if(value=="1"){
								return "等待支付";
							}else if(value=="2"){
								return "成功";
							}else if(value=="3"){
								return "失败";
							}else{
								return value;
							}
						}
					}/* {
						header : 'payMoney',
						dataIndex : 'payMoney'
					}, {
						header : 'message',
						dataIndex : 'message'
					}, {
						header : 'transid',
						dataIndex : 'transid'
					}, {
						header : 'bankcode',
						dataIndex : 'bankcode'
					}, {
						header : 'cardnbr',
						dataIndex : 'cardnbr'
					}, {
						header : 'acctname',
						dataIndex : 'acctname'
					}, {
						header : 'transamt',
						dataIndex : 'transamt'
					}, new Ext.ux.grid.RowActions({
								header : '管理',
								width : 100,
								actions : [{
											iconCls : 'btn-del',
											qtip : '删除',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-edit',
											qtip : '编辑',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})*/]
				// end of columns
		});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

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
	rowClick : function(grid, rowindex, e) {/*
		grid.getSelectionModel().each(function(rec) {
					new ObPlatformDealInfoForm({
								id : rec.data.id
							}).show();
				});
	*/},
	// 创建记录
	createRs : function() {
		new ObPlatformDealInfoForm({transferType:'1'}).show();
	},
	createRs1 : function() {
		new ObPlatformDealInfoForm({transferType:'2'}).show();
	},
	//查询网贷平台充值提现记录
	/*queryRs :function(){
		new ObPlatformDealInfoQuery().show();
	},*/
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
			url : __ctxPath
					+ '/fund/multiDelObPlatformDealInfo.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
			url : __ctxPath
					+ '/fund/multiDelObPlatformDealInfo.do',
			grid : this.gridPanel,
			idName : 'id'
		});
	},
	// 编辑Rs
	editRs : function(record) {
		new ObPlatformDealInfoForm({
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
	}
});
