applyRechargeWindows = Ext.extend(Ext.Window, {
	isLook : false,
	isRead : false,
	isflag : false,
	// 构造函数
	investPersonPanel : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		};
		if (typeof(_cfg.isReadOnly) != "undefined") {
			this.isRead = _cfg.isReadOnly;
		};
		if (null != _cfg.personData) {
			this.isflag = true;
		};
		if (typeof(_cfg.isLook) != "undefined") {
			this.isLook = _cfg.isLook;
		}
		this.isReadOnly=true
		Ext.applyIf(this, _cfg);
		/*alert("this.personData==="+this.personData)
		var personData = this.personData;*/
		this.initUIComponents();
		applyRechargeWindows.superclass.constructor.call(this, {
					id : 'applyRechargeWindows',
					layout : 'form',
					items : [{
								xtype : 'fieldset',
								title : '投资人基本信息',
								collapsible : true,
								autoHeight : true,
								bodyStyle : 'padding-left: 0px',
								items : [this.persoormPanel]
							}
//					,{
//								xtype : 'fieldset',
//								title : '银行账户信息',
//								collapsible : true,
//								autoHeight : true,
//								bodyStyle : 'padding-left: 0px',
//								items : [this.accountPanel]
//							}
					],
					modal : true,
					autoHeight : true,
					width : 1000,
					maximizable : true,
					title : '确认信息',
					buttonAlign : 'center',
					buttons : [{
								text : '确定',
								iconCls : 'btn-save',
								hidden : this.isLook,
								scope : this,
								handler : this.save
							},  {
								text : '取消',
								iconCls : 'btn-cancel',
								hidden : this.isLook,
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.persoormPanel = new Ext.form.FormPanel({
			autoHeight : true,
			autoWidth : true,
			layout : 'column',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			frame : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%',
				labelWidth : 60
			},
			items : [{
						columnWidth : 0.5,
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						items : [{
									xtype : 'textfield',
									fieldLabel : '姓名',
									name : 'csInvestmentPerson.investName',
									blankText : '姓名为必填内容',
									anchor : '100%',
									readOnly : true,
								}]

					}, {
						columnWidth : .5, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						items : [{
							xtype : "dickeycombo",
							nodeKey : 'sex_key',
							hiddenName : 'csInvestmentPerson.sex',
							fieldLabel : "性别",
							anchor : '100%',
							editable : true,
							readOnly : true,
							//value : personData == null ? null : personData.sex,
							listeners : {
								afterrender : function(combox) {
									var st = combox.getStore();
									st.on("load", function() {
										if (combox.getValue() == 0
												|| combox
														.getValue() == 1
												|| combox
														.getValue() == ""
												|| combox
														.getValue() == null) {
											combox.setValue("");
										} else {
											combox.setValue(combox
													.getValue());
										}
										combox.clearInvalid();
									})
								}
							}
						}, {
							xtype : "hidden",
							name : "csInvestmentPerson.investPersonId",
							value : this.investPeronId
						}]
					}, {
						columnWidth : .5, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						items : [{
							xtype : "dickeycombo",
							nodeKey : 'card_type_key',
							hiddenName : "csInvestmentPerson.cardtype",
							itemName : '证件类型', // xx代表分类名称
							fieldLabel : "证件类型",
							editable : true,
							readOnly :true,
							anchor : '100%',
							// emptyText : "请选择",
							listeners : {
								scope : this,
								afterrender : function(combox) {
									var st = combox.getStore();
									st.on("load", function() {
										if(combox.getValue()=='' || combox.getValue()==null){												
											combox.setValue(st.getAt(0).data.itemId);
											combox.clearInvalid();
										}else{
											combox.setValue(combox.getValue());
											combox.clearInvalid();
										}
									})
								}
							}
						}]
					}, {
						columnWidth : .5, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						items : [{
									id : 'cardnumber',
									xtype : 'textfield',
									fieldLabel : '证件号码',
									name : 'csInvestmentPerson.cardnumber',
									anchor : '100%',
									readOnly : this.isReadOnly,
								}]

					}, {
						columnWidth : 0.5,
						layout : 'form',
						labelWidth : 70,
						labelAlign : 'right',
						items : [{
									xtype : 'textfield',
									fieldLabel : '电话号码',
									name : 'csInvestmentPerson.cellphone',
									readOnly : this.isReadOnly,
									anchor : '100%',
								}]
					}, {
						columnWidth : .5, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						items : [{
							xtype : 'textfield',
							fieldLabel : '电子邮箱',
							name : 'csInvestmentPerson.selfemail',
							readOnly : true,
							anchor : '100%',

						}]
					}, {
						columnWidth : 0.5,
						layout : 'form',
						labelWidth : 70,
						labelAlign : 'right',
						defaults : {
							anchor : anchor
						},
						items : [{
									xtype : 'textfield',
									fieldLabel : '通讯地址',
									readOnly : true,
									anchor : '100%',
									name : 'csInvestmentPerson.postaddress'
								}]
					},{
						columnWidth : 0.5,
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						items : [	{
							xtype : 'textfield',
							fieldLabel : '银行卡号',
//							name : 'plMmOrderInfo.bankNum',
							id:'bankNum',
							readOnly : true,
							anchor : '100%'
						}]
					}]
		});
		var leftlabel = 85;
		var centerlabel = 87;
		var rightlabel = 90;
		var orderId=this.orderId
//		this.accountPanel = new Ext.form.FormPanel({
//			autoHeight : true,
//			autoWidth : true,
//			layout : 'column',
//			bodyStyle : 'padding:10px',
//			border : false,
//			autoScroll : true,
//			frame : true,
//			labelAlign : 'right',
//			defaults : {
//				anchor : '96%',
//				labelWidth : 60
//			},
//				items : [{
//					columnWidth : 0.5,
//					layout : "form", // 从上往下的布局
//					labelWidth : 70,
//					labelAlign : 'right',
//					items : [	{
//						xtype : 'textfield',
//						fieldLabel : '姓名',
////						name : 'plMmOrderInfo.bankNum',
//						id:'bank_name',
//						readOnly : true,
//						anchor : '100%'
//					}]
//				},{
//					columnWidth : 0.5,
//					layout : "form", // 从上往下的布局
//					labelWidth : 70,
//					labelAlign : 'right',
//					items : [	{
//						xtype : 'textfield',
//						fieldLabel : '银行卡号',
////						name : 'plMmOrderInfo.bankNum',
//						id:'bankNum',
//						readOnly : true,
//						anchor : '100%'
//					}]
//				}]
//		});
		// this.gridPanel.addListener('rowdblclick', this.rowClick);
		// 加载表单对应的数据
		if (this.investPeronId != null && this.investPeronId != 'undefined') {
			this.persoormPanel.loadData({
				url : __ctxPath
						+ '/creditFlow/creditAssignment/customer/getCsInvestmentperson.do?investId='
						+ this.investPeronId,
				root : 'data',
				preName : 'csInvestmentPerson',
				success : function (response,obj){
					var	result = Ext.util.JSON.decode(response.responseText);
					console.log(result)
					console.log(orderId)
					Ext.Ajax.request({
						url : __ctxPath
								+ "/creditFlow/financingAgency/getPlManageMoneyPlanBuyinfo.do?id="+orderId,
						method : 'post',
						success : function(response, obj) {
							 var	result = Ext.util.JSON.decode(response.responseText);
							 Ext.getCmp('bankNum').setValue(result.data.plMmOrderInfo.bankNum)
						}
					})
			  }
			});
//			this.accountPanel.loadData({
//				url : __ctxPath
//						+ '/creditFlow/financingAgency/getPlManageMoneyPlanBuyinfo.do?id='
//						+ this.orderId,
//				root : 'data',
//				preName : 'plMmOrderInfo',
//				success : function (response,obj){
//				  		var	result = Ext.util.JSON.decode(response.responseText);
//				  		console.log(result)
//				  		 Ext.getCmp('bankNum').setValue(result.data.plMmOrderInfo.bankNum)
//				  		 Ext.getCmp('bank_name').setValue(result.data.plMmOrderInfo.investPersonName)
//				  }
//			});
		}

	},// end of the initcomponents
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
//		var investpersonName = this
//				.getCmpByName("csInvestmentPerson.investName").getValue();
//		$postForm({
//			formPanel : this.formPanel,
//			scope : this,
//			url : __ctxPath
//					+ '/creditFlow/creditAssignment/bank/saveDealInfoObAccountDealInfo.do',
//			params : {
//				'investpersonName' : investpersonName
//			},
//			callback : function(fp, action) {
//				alert(action.result.msg);
//				this.close();
//			}
//		});
		
		var keystr=this.keystr;
		var buttonType=this.buttonType;
		Ext.Ajax.request({
		url : __ctxPath+ "/creditFlow/financingAgency/assignInterestPlMmOrderAssignInterest.do?keystr="+keystr,
		method : 'post',
		success : function(response, request) {
		var a = Ext.decode(response.responseText);
		var obj = eval( a);
		if(obj.success=="true"){
			Ext.ux.Toast.msg('操作信息', '派息成功');
			Ext.getCmp('applyRechargeWindows').close();
			Ext.getCmp('investmentMmAssignInterestGrid'+keystr+buttonType).getStore().reload();
		}else{
			Ext.ux.Toast.msg('操作信息',obj.msg);
			Ext.getCmp('applyRechargeWindows').close();
			Ext.getCmp('investmentMmAssignInterestGrid'+keystr+buttonType).getStore().reload();
		}
		},
		params : {
			assignInterestId : this.assignInterestId,
			investPersonId : this.investPersonId
		}
	});

	}// end of save
});