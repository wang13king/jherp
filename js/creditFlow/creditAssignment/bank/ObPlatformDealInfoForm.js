/**
 * @author
 * @createtime
 * @class ObPlatformDealInfoForm
 * @extends Ext.Window
 * @description ObPlatformDealInfo表单
 * @company 智维软件
 */
ObPlatformDealInfoForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObPlatformDealInfoForm.superclass.constructor.call(this, {
					id : 'ObPlatformDealInfoFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : this.transferType == 1? '充值' :  '提现',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					// id : 'ObPlatformDealInfoForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'obPlatformDealInfo.id',
								xtype : 'hidden',
								value : this.id == null ? '' : this.id
							}, {
								name : 'obPlatformDealInfo.transferType',
								xtype : 'hidden',
								value : this.transferType == null ? '' : this.transferType
							}, /*{
								fieldLabel : '银行名称',
								xtype : "combo",
								allowBlank:false,
								name : 'bankcodeID',
								maxLength : 255,
								value :'廊坊银行',
								valueField : '78',
								readOnly : true
							},*//*{					
								fieldLabel : "银行名称",
								xtype : "combo",
								displayField : 'itemName',
								valueField : 'itemId',
								allowBlank:false,
								triggerAction : 'all',
								store : new Ext.data.ArrayStore({
									url : __ctxPath
													+ '/creditFlow/common/getBankList2CsBank.do',
											fields : ['itemId', 'itemName'],
											autoLoad : true
								}),
								mode : 'remote',
								hiddenName : "bankcodeID",
								editable : false,
								blankText : "银行名称不能为空，请正确填写!",
								anchor : "96%",
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
											combox.setValue(combox.getValue());
											
										})
										combox.clearInvalid();
									}
									
								}
							
							},*/{					
								fieldLabel :"银行名称",
								hiddenName : 'bankcodeID',
								allowBlank : false,
								xtype : 'combo',
								mode : 'local',
								valueField : 'itemId',
								editable : false,
								value : '78',
								readOnly: true,
								displayField : 'itemName',
								store : new Ext.data.SimpleStore({
									fields : ["itemId","itemName"],
									data : [["78","廊坊银行"]]
								}),
								triggerAction : "all",
								blankText : "银行名称不能为空，请正确填写!",
								anchor : "96%",
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
											combox.setValue(combox.getValue());
										})
										combox.clearInvalid();
									}
								}
							},/* {
								fieldLabel : '交易流水号',
								name : 'obPlatformDealInfo.recordNumber',
								maxLength : 255
							}, {
								fieldLabel : '交易类型',
								name : 'obPlatformDealInfo.transferType',
								maxLength : 255
							}, {
								fieldLabel : '创建这条交易记录的时间',
								name : 'obPlatformDealInfo.createDate',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}, {
								fieldLabel : '交易时间',
								name : 'obPlatformDealInfo.transferDate',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}, {
								fieldLabel : '收入金额',
								name : 'obPlatformDealInfo.incomMoney',
								xtype : 'numberfield'
							}, {
								fieldLabel : '',
								name : 'obPlatformDealInfo.payMoney',
								xtype : 'numberfield'
							}, {
								fieldLabel : '应答描述',
								name : 'obPlatformDealInfo.message',
								maxLength : 255
							}, {
								fieldLabel : '受理编号',
								name : 'obPlatformDealInfo.transid',
								maxLength : 255
							}, {
								fieldLabel : '银行编号',
								name : 'obPlatformDealInfo.bankcode',
								maxLength : 255
							}*/ {
								fieldLabel : '银行卡号',
								allowBlank:false,
								name : 'obPlatformDealInfo.cardnbr',
								value : '601144020000000028',
								readOnly: true,
								maxLength : 255
							}, {
								fieldLabel : '账户名称',
								value : '11',
								allowBlank:false,
								name : 'obPlatformDealInfo.acctname',
								value : '金交在线',
								readOnly: true,
								maxLength : 255
							}, {
								fieldLabel :this.transferType == 1? '充值金额' :  '提现金额' ,
								allowBlank:false,
								name : 'obPlatformDealInfo.transamt',
								maxLength : 255
							},{					
												fieldLabel :this.transferType == null ? '到账方式' : this.transferType == 1 ? '': '到账方式' ,
												hiddenName : 'obPlatformDealInfo.arrivalmode',
												hidden : this.transferType == null ? false : this.transferType == 1 ? true : false,
												anchor : "100%",
												allowBlank : this.transferType == null ? false : this.transferType == 1 ? true : false,
												xtype : 'combo',
												mode : 'local',
												valueField : 'value',
												editable : false,
												displayField : 'item',
												store : new Ext.data.SimpleStore({
													fields : ["item","value"],
													data : [["普通","1"], 
															["实时 ","2"]
														    ]
												}),
												triggerAction : "all"
										}]
				});
		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath
						+ '/fund/getObPlatformDealInfo.do?id='
						+ this.id,
				root : 'data',
				preName : 'obPlatformDealInfo'
			});
		}

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
	save : function() {
		$postForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath
					+ '/fund/saveObPlatformDealInfo.do',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('ObPlatformDealInfoGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});