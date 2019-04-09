//PersonAccountDealInfoListQuery.js
/** 投资人收支查询---投资人账户明细查询 */
PersonAccountDealInfoListQuery = Ext.extend(Ext.Panel, {
	titlePrefix : "",
	seniorHidden : false,
	Confirmhidden : false,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		PersonAccountDealInfoListQuery.superclass.constructor.call(this, {
					id : 'PersonAccountDealInfoListQuery'+this.Type,
					title :"资金账户收支查询",
					region : 'center',
					layout : 'border',
					iconCls:"menu-finance",
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		
		var isShow = false;
		var rightValue =  isGranted('_investmentAccountDealInfoView_see_All');
		var isShop = isGranted('_investmentAccountDealInfoView_see_shop');
		if (RoleType == "control") {
			isShow = true;
		}
		
		var anchor = '100%';
		var typevalue=this.Type;
		this.searchPanel = new Ext.FormPanel({
					layout : 'column',
					region : 'north',
					border : false,
					height : 70,
					anchor : '100%',
					layoutConfig : {
						align : 'middle'
					},
					bodyStyle : 'padding-top:20px',
					items : [{
								columnWidth : .2,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
									fieldLabel : '投资人姓名',
									allowBlank : false,
									readOnly : this.isRead,
									xtype:'trigger',
									triggerClass :'x-form-search-trigger',
									editable : false,
									name : 'investpersonName'+typevalue,
									hiddenName:'investpersonName'+typevalue,
									onTriggerClick : function() {
										var op = this.ownerCt.ownerCt.ownerCt.ownerCt;
										var topbar=this.ownerCt.ownerCt.ownerCt;
										var EnterpriseNameStockUpdateNew = function(obj) {
											if (null != obj.accountId&& "" != obj.accountId){
												op.getCmpByName('accountId').setValue(obj.accountId);
											}
											if (null != obj.accountName&& "" != obj.accountName){
												op.getCmpByName('investpersonName'+typevalue).setValue(obj.accountName);
											}
											if(null != obj.html&& "" != obj.html){
												topbar.topbar.items.last().setText(obj.html,false);
											}
												
										}
										SelectSystemAccountList(EnterpriseNameStockUpdateNew,this.ownerCt.ownerCt.ownerCt.Type,rightValue,isShop);
									}
								},{
									xtype : 'hidden',
									name : 'accountId'
								}]
							},{
								columnWidth : .2,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
											
											fieldLabel : '交易起始时间',
											name : 'startDate',
											anchor : "100%",
											format : 'Y-m-d',
											xtype : 'datefield'
										}]
							},{
								columnWidth : .2,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
											fieldLabel : '交易截止时间',
											name : 'endDate',
											anchor : "100%",
											format : 'Y-m-d',
											xtype : 'datefield'
										}]
							},{
								columnWidth : .2,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
									xtype : "combo",
									anchor : "100%",
									hiddenName : "transferType",
									displayField : 'itemName',
									valueField : 'itemValue',
									triggerAction : 'all',
									mode : 'remote',
									store : new Ext.data.ArrayStore({
										autoLoad : true,
										url : __ctxPath
												+ '/creditFlow/creditAssignment/accountSetting/settingListObSystemaccountSetting.do',
										fields : ['itemValue', 'itemName']
									}),
									fieldLabel : "交易类型"
									
								}]
							},{
								columnWidth : .07,
								layout : 'form',
								border : false,
								items : [{
											text : '查询',
											xtype : 'button',
											scope : this,
											style : 'margin-left:20px',
											anchor : "100%",
											iconCls : 'btn-search',
											handler : this.search
										}]
							},{
								columnWidth : .07,
								layout : 'form',
								border : false,
								items : [{
											text : '重置',
											style : 'margin-left:20px',
											xtype : 'button',
											scope : this,
											anchor : "100%",
											iconCls : 'btn-reset',
											handler : this.reset
										}]
							}]
				});
		this.topbar = new Ext.Toolbar({
			items : [{
						iconCls : 'btn-clock',
						text :'查看系统账户信息',
						xtype : 'button',
						scope : this,
						hidden : true,
						handler : this.seeSystemAccountInfo
					},{
						iconCls : 'btn-write',
						text :'账号导入',
						xtype : 'button',
						scope : this,
						hidden : true,
						handler : this.importMember
					},{
						iconCls : 'btn-write',
						text :'账号存管账户导入',
						xtype : 'button',
						scope : this,
						hidden : true,
						handler : this.importMemberFlag
					},{
						iconCls : 'btn-write',
						text :'标的导入',
						xtype : 'button',
						scope : this,
						hidden : true,
						handler : this.importBid
					},{
						iconCls : 'btn-write',
						text :'投标记录导入',
						xtype : 'button',
						scope : this,
						hidden : true,
						handler : this.importBidInfo
					},{
						iconCls : 'btn-write',
						text :'款项台账导入',
						xtype : 'button',
						scope : this,
						hidden : true,
						handler : this.importFund
					} ,{
						iconCls : 'btn-collapse',
						text : '刷新台账',
						xtype : 'button',
						scope:this,
						hidden : true,
						handler : this.refreshFundIntent
					},'->',{
					    xtype:'label',html : ''
				    }]
		});
		var summary = new Ext.ux.grid.GridSummary();
				function totalMoney(v, params, data) {
					return '总计(元)';
				}
		this.gridPanel = new HT.GridPanel({
			// name : 'confirmRechargeGrid',
			region : 'center',
			tbar : this.topbar,
			plugins : [summary],
			root : 'result',
			notmask : true,
			// 不适用RowActions
			rowActions : false,
			isautoLoad:false,
			url : __ctxPath+ "/creditFlow/creditAssignment/bank/accountListQueryObAccountDealInfo.do",
			fields : [{
						name : 'id',
						type : 'int'
					},'accountId', 'incomMoney', 'payMoney', 'currentMoney','transferType' ,'dealType', 'transferDate', 'investPersonName', 'rechargeLevel','rechargeConfirmStatus','dealRecordStatus','msg','recordNumber','transferTypeName','createDate'],

			columns : [{
						header : '交易创建日期',
						dataIndex : 'createDate',
						align:'center',
						renderer:function(v){
							return Ext.isEmpty(v)?"--":v;
                        }
					},{
						header : '交易流水号',
						align:'center',
						dataIndex : 'recordNumber',
						summaryRenderer : totalMoney,
						renderer:function(v){
							return Ext.isEmpty(v)?"--":v;
                        }
					},{
						header : '交易日期',
						align:'center',
						dataIndex : 'transferDate',
						renderer:function(v){
							return Ext.isEmpty(v)?"--":v;
                        }
					},{
						header : '交易类型',
						align:'center',
						dataIndex : 'transferTypeName'
					}, {
						header : '收入金额（元）',
						summaryType : 'sum',
						align:'right',
						dataIndex : 'incomMoney',
						renderer : function(value) {
							if (value == "") {
								return "0.00";
							} else {
								return Ext.util.Format.number(value,
										',000,000,000.00');
							}
						}
					}, {
						header : '支出金额（元）',
						summaryType : 'sum',
						align:'right',
						dataIndex : 'payMoney',
						renderer : function(value) {
							if (value == "") {
								return "0.00";
							} else {
								return Ext.util.Format.number(value,
										',000,000,000.00');
							}
						}
					}, {
						header : '剩余金额（元）',
						summaryType : 'sum',
						align:'right',
						dataIndex : 'currentMoney',
						 renderer : function(value) {
					 if (value == "") {
					 return "0.00";
					 } else {
					 return Ext.util.Format.number(value,
					 ',000,000,000.00');
					 }
					 }
				}, {
						header : '交易状态',
						align:'center',
						dataIndex : 'dealRecordStatus',
						renderer:function(v,a,r){
							if(Ext.isEmpty(v)){
								return "--";
							}else{
								if(v==1){
									return "交易等待中";
								}else if(v==2){
									return "交易成功";
								}else if(v==3){
									return "交易失败";
								}else if(v==4){
									return "取现审批复核";
								}else if(v==5){
									return "取现办理";
								}else if(v==6){
									return "交易异常";
								}else if(v==7){
									return "资金冻结";
								}else if(v==8){
									return "资金解冻";
								
								}
							}
                        }
				}]
		});
		/*this.gridPanel.addListener('afterrender', function() {
					this.loadMask1 = new Ext.LoadMask(this.gridPanel.getEl(), {
								msg : '正在加载数据中······,请稍候······',
								store : this.gridPanel.store,
								removeMask : true
							});
					this.loadMask1.show(); // 显示
				}, this);*/
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
	//根据任何一条交易记录就可以查询到系统账户信息
	seeSystemAccountInfo:function(){
		var selectRs = this.gridPanel.getSelectionModel().getSelections();
				if (selectRs.length == 0) {
					Ext.ux.Toast.msg('操作信息', '请选择记录!');
					return;
				} else if (selectRs.length > 1) {
					Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
					return;
				} else {
					var record = selectRs[0];
					var  accountId =record.data.accountId;
					var window_see = new SeeSingleSystemAccountInfo({
										investPeronId : record.data.investmentPersonId,
										systemAccountName : record.data.accountName,
										systemAccountNumber : record.data.accountNumber,
										accountId : record.data.id,
										rechargeLevel:distinguish,
										isReadOnly : true
									});
					window_see.show();
					}
	},
	importMember:function(){
		new Ext.Window({
					id : 'importMemberWin',
					title : '导入用户',
					layout : 'fit',
					width : (screen.width - 180) * 0.6 - 150,
					height : 130,
					closable : true,
					resizable : true,
					plain : false,
					bodyBorder : false,
					border : false,
					modal : true,
					constrainHeader : true,
					bodyStyle : 'overflowX:hidden',
					buttonAlign : 'center',
					items : [new Ext.form.FormPanel({
						id : 'importMemberForm',
						monitorValid : true,
						labelAlign : 'right',
							url :  __ctxPath +'/creditFlow/customer/enterprise/batchImportMemberBatchImportDatabase.do',
						buttonAlign : 'center',
						enctype : 'multipart/form-data',
						fileUpload : true,
						layout : 'column',
						frame : true,
						items : [{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {
										anchor : '95%'
									},
									items : [{}, {
												xtype : 'textfield',
												fieldLabel : '请选择文件',
												allowBlank : false,
												blankText : '文件不能为空',
												inputType : 'file',
												id : 'fileBatch',
												name : 'fileBatch'
											}]
								}]
					})],
					buttons : [{
						text : '导入',
						iconCls : 'uploadIcon',
						formBind : true,
						handler : function() {
							Ext.getCmp('importMemberForm').getForm()
									.submit({
										method : 'POST',
										waitTitle : '连接',
										waitMsg : '消息发送中...',
										success : function(form, action) {
											debugger
//										var	objt = Ext.util.JSON.decode(action.response.responseText);
//										gridPanel.getStore().loadData(objt);
								//		gridPanel.getView().refresh();
											Ext.ux.Toast.msg('状态', '导入成功!');
											Ext.getCmp('importMemberWin').close();
											

										},
										failure : function(form, action) {
											var	objt = Ext.util.JSON.decode(action.response.responseText);
											
											Ext.ux.Toast.msg('状态',objt.msg+ '用户名不存在，导入失败!');
										}
									});
						}
					}]
				}).show();
	},
	importMemberFlag:function(){
		new Ext.Window({
					id : 'importMemberWin',
					title : '导入用户存管账户',
					layout : 'fit',
					width : (screen.width - 180) * 0.6 - 150,
					height : 130,
					closable : true,
					resizable : true,
					plain : false,
					bodyBorder : false,
					border : false,
					modal : true,
					constrainHeader : true,
					bodyStyle : 'overflowX:hidden',
					buttonAlign : 'center',
					items : [new Ext.form.FormPanel({
						id : 'importMemberForm',
						monitorValid : true,
						labelAlign : 'right',
							url :  __ctxPath +'/creditFlow/customer/enterprise/batchImportMemberFlagBatchImportDatabase.do',
						buttonAlign : 'center',
						enctype : 'multipart/form-data',
						fileUpload : true,
						layout : 'column',
						frame : true,
						items : [{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {
										anchor : '95%'
									},
									items : [{}, {
												xtype : 'textfield',
												fieldLabel : '请选择文件',
												allowBlank : false,
												blankText : '文件不能为空',
												inputType : 'file',
												id : 'fileBatch',
												name : 'fileBatch'
											}]
								}]
					})],
					buttons : [{
						text : '导入',
						iconCls : 'uploadIcon',
						formBind : true,
						handler : function() {
							Ext.getCmp('importMemberForm').getForm()
									.submit({
										method : 'POST',
										waitTitle : '连接',
										waitMsg : '消息发送中...',
										success : function(form, action) {
											debugger
//										var	objt = Ext.util.JSON.decode(action.response.responseText);
//										gridPanel.getStore().loadData(objt);
								//		gridPanel.getView().refresh();
											Ext.ux.Toast.msg('状态', '导入成功!');
											Ext.getCmp('importMemberWin').close();
											

										},
										failure : function(form, action) {
											var	objt = Ext.util.JSON.decode(action.response.responseText);
											
											Ext.ux.Toast.msg('状态',objt.msg+ '用户名不存在，导入失败!');
										}
									});
						}
					}]
				}).show();
	},
	importBid:function(){
		new Ext.Window({
					id : 'importBidWin',
					title : '导入标的',
					layout : 'fit',
					width : (screen.width - 180) * 0.6 - 150,
					height : 130,
					closable : true,
					resizable : true,
					plain : false,
					bodyBorder : false,
					border : false,
					modal : true,
					constrainHeader : true,
					bodyStyle : 'overflowX:hidden',
					buttonAlign : 'center',
					items : [new Ext.form.FormPanel({
						id : 'importBidForm',
						monitorValid : true,
						labelAlign : 'right',
							url :  __ctxPath +'/creditFlow/customer/enterprise/batchImportPlanBatchImportDatabase.do',
						buttonAlign : 'center',
						enctype : 'multipart/form-data',
						fileUpload : true,
						layout : 'column',
						frame : true,
						items : [{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {
										anchor : '95%'
									},
									items : [{}, {
												xtype : 'textfield',
												fieldLabel : '请选择文件',
												allowBlank : false,
												blankText : '文件不能为空',
												inputType : 'file',
												id : 'fileBatch',
												name : 'fileBatch'
											}]
								}]
					})],
					buttons : [{
						text : '导入',
						iconCls : 'uploadIcon',
						formBind : true,
						handler : function() {
							Ext.getCmp('importBidForm').getForm()
									.submit({
										method : 'POST',
										waitTitle : '连接',
										waitMsg : '消息发送中...',
										success : function(form, action) {
										var	objt = Ext.util.JSON.decode(action.response.responseText);
										gridPanel.getStore().loadData(objt);
								//		gridPanel.getView().refresh();
											Ext.ux.Toast.msg('状态', '导入成功!');
											Ext.getCmp('importBidWin').close();
											

										},
										failure : function(form, action) {
											var	objt = Ext.util.JSON.decode(action.response.responseText);
											
											Ext.ux.Toast.msg('状态',objt.msg+ '用户名不存在，导入失败!');
										}
									});
						}
					}]
				}).show();
	},
	importBidInfo:function(){
		new Ext.Window({
					id : 'importBidInfoWin',
					title : '导入投标明细',
					layout : 'fit',
					width : (screen.width - 180) * 0.6 - 150,
					height : 130,
					closable : true,
					resizable : true,
					plain : false,
					bodyBorder : false,
					border : false,
					modal : true,
					constrainHeader : true,
					bodyStyle : 'overflowX:hidden',
					buttonAlign : 'center',
					items : [new Ext.form.FormPanel({
						id : 'importBidInfoForm',
						monitorValid : true,
						labelAlign : 'right',
							url :  __ctxPath +'/creditFlow/customer/enterprise/batchImportBidInfoBatchImportDatabase.do',
						buttonAlign : 'center',
						enctype : 'multipart/form-data',
						fileUpload : true,
						layout : 'column',
						frame : true,
						items : [{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {
										anchor : '95%'
									},
									items : [{}, {
												xtype : 'textfield',
												fieldLabel : '请选择文件',
												allowBlank : false,
												blankText : '文件不能为空',
												inputType : 'file',
												id : 'fileBatch',
												name : 'fileBatch'
											}]
								}]
					})],
					buttons : [{
						text : '导入',
						iconCls : 'uploadIcon',
						formBind : true,
						handler : function() {
							Ext.getCmp('importBidInfoForm').getForm()
									.submit({
										method : 'POST',
										waitTitle : '连接',
										waitMsg : '消息发送中...',
										success : function(form, action) {
										var	objt = Ext.util.JSON.decode(action.response.responseText);
										gridPanel.getStore().loadData(objt);
								//		gridPanel.getView().refresh();
											Ext.ux.Toast.msg('状态', '导入成功!');
											Ext.getCmp('importBidInfoWin').close();
											

										},
										failure : function(form, action) {
											var	objt = Ext.util.JSON.decode(action.response.responseText);
											
											Ext.ux.Toast.msg('状态',objt.msg+ '用户名不存在，导入失败!');
										}
									});
						}
					}]
				}).show();
	},
	importFund:function(){
		new Ext.Window({
					id : 'importFundWin',
					title : '导入款项台账',
					layout : 'fit',
					width : (screen.width - 180) * 0.6 - 150,
					height : 130,
					closable : true,
					resizable : true,
					plain : false,
					bodyBorder : false,
					border : false,
					modal : true,
					constrainHeader : true,
					bodyStyle : 'overflowX:hidden',
					buttonAlign : 'center',
					items : [new Ext.form.FormPanel({
						id : 'importFundForm',
						monitorValid : true,
						labelAlign : 'right',
							url :  __ctxPath +'/creditFlow/customer/enterprise/batchImportFundIntentBatchImportDatabase.do',
						buttonAlign : 'center',
						enctype : 'multipart/form-data',
						fileUpload : true,
						layout : 'column',
						frame : true,
						items : [{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {
										anchor : '95%'
									},
									items : [{}, {
												xtype : 'textfield',
												fieldLabel : '请选择文件',
												allowBlank : false,
												blankText : '文件不能为空',
												inputType : 'file',
												id : 'fileBatch',
												name : 'fileBatch'
											}]
								}]
					})],
					buttons : [{
						text : '导入',
						iconCls : 'uploadIcon',
						formBind : true,
						handler : function() {
							Ext.getCmp('importFundForm').getForm()
									.submit({
										method : 'POST',
										waitTitle : '连接',
										waitMsg : '消息发送中...',
										success : function(form, action) {
										var	objt = Ext.util.JSON.decode(action.response.responseText);
										gridPanel.getStore().loadData(objt);
								//		gridPanel.getView().refresh();
											Ext.ux.Toast.msg('状态', '导入成功!');
											Ext.getCmp('importFundWin').close();
											

										},
										failure : function(form, action) {
											var	objt = Ext.util.JSON.decode(action.response.responseText);
											
											Ext.ux.Toast.msg('状态',objt.msg+ '用户名不存在，导入失败!');
										}
									});
						}
					}]
				}).show();
	}	
	,refreshFundIntent : function() {
				Ext.ux.Toast.msg('操作信息',"刷新时间可能较长！");
					Ext.Ajax.request({
						url : __ctxPath + '/p2p/refreshFundIntentBpCustMember.do',
						method : 'POST',
						scope:this,
						success :function(response, request){
						var	objt = Ext.util.JSON.decode(response.responseText);
						Ext.ux.Toast.msg('操作信息',objt.msg);
						}
			       })
						}
});