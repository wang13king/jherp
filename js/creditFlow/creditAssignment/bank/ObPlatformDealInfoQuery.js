//ThirdPayAccountInfoQuery.js
ObPlatformDealInfoQuery = Ext.extend(Ext.Window, {
	isLook : false,
	isRead : false,
	isflag : false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		};
		
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		ObPlatformDealInfoQuery.superclass.constructor.call(this, {
					id : 'ObPlatformDealInfoQuery',
					layout : 'form',
					items : [this.formPanel],
					modal : true,
					autoHeight : true,
					width : 1000,
					maximizable : true,
					title : '网贷平台账户信息',
					buttonAlign : 'center'
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
							layout:'column',
							bodyStyle : 'padding:10px',
							autoScroll : true,
							monitorValid : true,
							frame : true,
						    plain : true,
						    labelAlign : "right",
							defaults : {
								anchor : '96%',
								labelWidth : 110,
								columnWidth : 1,
							    layout : 'column'
							},
							items : [{  
									 columnWidth : 0.5,
								     layout : 'form',
									 items :[{
											xtype : 'textfield',
											fieldLabel : '账户 id',
											name : 'accid',
											anchor : '98%',
											readOnly:true
										  
									}]
								},{  
									 columnWidth : 0.5,
								     layout : 'form',
									 items :[{
											xtype : 'textfield',
											fieldLabel : '账户名称',
											name : 'accname',
											anchor : '98%',
											readOnly:true
										  
									}]
								},{  
									 columnWidth :0.5,
								     layout : 'form',
									 items :[{
											xtype : 'textfield',
											fieldLabel : '账户余额',
											name : 'acfreebal',
											anchor : '98%',
											readOnly:true
										  
									},{
										columnWidth : .01, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 20,
										items : [{
													fieldLabel : "元 ",
													labelSeparator : '',
													anchor : "98%"
												}]
								}]
								},{  
									 columnWidth : 0.47,
								     layout : 'form',
									 items :[{
											xtype : 'textfield',
											fieldLabel : '账户可用余额',
											name : 'usableamount',
											anchor : '98%',
											readOnly:true
										  
									},{
										columnWidth : .01, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 20,
										items : [{
													fieldLabel : "元 ",
													labelSeparator : '',
													anchor : "98%"
												}]
								}]
								},{  
									 columnWidth : 0.47,
								     layout : 'form',
									 items :[{
											xtype : 'textfield',
											fieldLabel : '冻结金额',
											name : 'freezeamount',
											anchor : '98%',
											readOnly:true
										  
									},{
										columnWidth : .01, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 20,
										items : [{
													fieldLabel : "元 ",
													labelSeparator : '',
													anchor : "98%"
												}]
								}]
				},{  
									 columnWidth : 0.47,
								     layout : 'form',
									 items :[{
											xtype : 'textfield',
											fieldLabel : '风险缓释金可用余额',
											name : 'riskamount',
											anchor : '98%',
											readOnly:true
										  
									},{
										columnWidth : .01, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 20,
										items : [{
													fieldLabel : "元 ",
													labelSeparator : '',
													anchor : "98%"
												}]
								}]
								}]
				}
								
						);
		// this.gridPanel.addListener('rowdblclick', this.rowClick);
		// 加载表单对应的数据
			var   panel =this;
			this.formPanel.loadData({
						url : __ctxPath + "/creditFlow/creditAssignment/bank/getNetLoanPlatformAccountNetLoanPlatformLog.do" ,
						root : 'data',
						success : function(response, options) {
						}
			});	

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {}// end of save
});