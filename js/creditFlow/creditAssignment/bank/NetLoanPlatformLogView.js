/**
 * @author
 * @class BpCustLoginlogView
 * @extends Ext.Panel
 * @description [BpCustLoginlog]管理
 * @company 智维软件
 * @createtime:
 */
NetLoanPlatformLogView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				NetLoanPlatformLogView.superclass.constructor.call(this, {
							id : 'ThirdPayLogView',
							title : '网贷平台日志管理',
							region : 'center',
							iconCls:"menu-finance",
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'column',
							region : 'north',
							border : false,
							height : 50,
							anchor : '80%',
							layoutConfig: {
				               align:'middle'
				            },
				            bodyStyle : 'padding:10px 10px 10px 10px',
							items:[{
					     		columnWidth :.3,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
											fieldLabel:'请求时间 从',
											name : 'queryTime_GE',
											flex:1,
											align:'center',
											xtype:'datefield',
											format:'Y-m-d',
											anchor : "90%"
											}]
					     	},{
					     		columnWidth :.28,
								layout : 'form',
								labelWidth : 50,
								labelAlign : 'right',
								border : false,
								items : [{
											fieldLabel:'至',
											name : 'queryTime_LE',
											flex:1,
											align:'center',
											xtype:'datefield',
											format:'Y-m-d',
											anchor : "90%"
											}]
					     	},{
					     		columnWidth :.28,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
											fieldLabel:'订单号',
											name : 'orderNo_LK',
											flex:1,
											align:'center',
											xtype:'textfield',
											anchor : "90%"
											}]
					     	},{
					     		columnWidth :.1,
								layout : 'form',
								labelWidth : 50,
								labelAlign : 'right',
								border : false,
								items : [{
										text : '查询',
										xtype : 'button',
										scope : this,
										style :'margin-left:30px',
										anchor : "90%",
										iconCls : 'btn-search',
										handler : this.search
									}]
					     	},{
					     		columnWidth :.1,
								layout : 'form',
								labelWidth : 50,
								labelAlign : 'right',
								border : false,
								items : [{
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
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({ 
						items : [{
									iconCls : 'btn-reset',
									text : '刷新',
									xtype : 'button',
									scope : this,
									handler : this.refreshLog
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					id:'BpCustLoginlogGrid',
					tbar:this.topbar,
					url : __ctxPath + "/creditFlow/creditAssignment/bank/listNetLoanPlatformLog.do",
					fields : [{
									name : 'recordId',
									type : 'int'
								}
								,'accid'
								,'accname'
								,'acfreebal'
								,'usableamount'
								,'freezeamount'
								,'riskamount'
								,'queryTime'
								,'orderNo'
							 ], 
					columns:[{
									header : 'recordId',
									dataIndex : 'recordId',
									hidden : true
								},{
									header : '账户 id',	
									dataIndex : 'accid'
								},{
									header : '查询时间',	
									dataIndex : 'queryTime'
								},{
									header : '订单号',	
									dataIndex : 'orderNo'
								},{
									header : '账户名称',
									/*hidden : true,*/
									dataIndex : 'accname'
								},{
									header : '账户余额',	
									dataIndex : 'acfreebal'
								},{
									header : '账户可用余额',	
									dataIndex : 'usableamount'
								},{
									header : '冻结金额',	
									dataIndex : 'freezeamount'
								},{
									header : '风险缓释金可用余额',	
									dataIndex : 'riskamount'
								}
					]//end of columns
				});
				
				this.gridPanel.addListener('rowdblclick',this.rowClick);
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			refreshLog : function(){
		/*var gridPanel=this.gridPanel;
		var selections = gridPanel.getSelectionModel().getSelections();
		var len = selections.length;
		if (len > 1) {
			Ext.ux.Toast.msg('状态', '只能选择一条记录');
			return;
		} else if (0 == len) {
			Ext.ux.Toast.msg('状态', '请选择一条记录');
			return;
		}*/
		Ext.Ajax.request({
			url :__ctxPath + '/creditFlow/creditAssignment/bank/getNetLoanPlatformAccountNetLoanPlatformLog.do',
			scope:this,
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if (result.success) {
					Ext.ux.Toast.msg('提示信息', '刷新成功');
					this.gridPanel.getStore().reload();
				}
			}
		})
	}
});
