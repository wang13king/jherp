var updateMachineInfo = function(mortgageid,refreshMortgageGridStore,businessType){
	
	var anchor = '100%';
	var showMachineInformation = function(MortgageUpdateData){
		var panel_updateMachineInfo = new Ext.form.FormPanel({
			id :'updateMachineInfo',
			url : __ctxPath +'/credit/mortgage/updateMachineinfo.do',
			monitorValid : true,
			bodyStyle:'padding:10px',
			autoScroll : true ,
			labelAlign : 'right',
			buttonAlign : 'center',
			frame : true ,
			border : false,
			items : [{
				layout : 'column',
				xtype:'fieldset',
	            title: '修改<抵质押物>基础信息',
	            collapsible: true,
	            autoHeight:true,
	            anchor : '95%',
				items : [{
	        		xtype : 'hidden',
	        		name : 'mortgageid',
	        		value : mortgageid
	        	},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {anchor : '100%'},
					items : [{
						xtype : 'textfield',
						fieldLabel : '抵质押物类型',
						value : MortgageUpdateData.vProcreditDictionary.mortgagepersontypeforvalue,
						allowBlank : false,
						blankText : '为必填内容',
						readOnly : true,
			            cls : 'readOnlyClass'
					},{
						id : 'personType_select',
						xtype : "dickeycombo",
						nodeKey :'syrlx',
						hiddenName : "procreditMortgage.personType",
						value : MortgageUpdateData.vProcreditDictionary.personTypeId,
						fieldLabel : "所有人类型",
						editable :false,
						itemName : '所有人类型', // xx代表分类名称
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							},
							'select' : function(combo,record, index){
								if(combo.getValue()==602){
									hideField(Ext.getCmp('personNameMortgage')) ;
									Ext.getCmp('personNameMortgage').disable() ;
									showField(Ext.getCmp('enterpriseNameMortgage')) ;
									Ext.getCmp('enterpriseNameMortgage').enable() ;
								}else{
									hideField(Ext.getCmp('enterpriseNameMortgage')) ;
									Ext.getCmp('enterpriseNameMortgage').disable() ;
									showField(Ext.getCmp('personNameMortgage')) ;
									Ext.getCmp('personNameMortgage').enable() ;
								}
							}
						}
					}]
				},{
					columnWidth : .5,
					labelWidth : 110,
					layout : 'form',
					defaults : {anchor : '95%'},
					items : [{
						xtype : "dickeycombo",
						nodeKey :'dblx',
						hiddenName : "procreditMortgage.assuretypeid",
						value : MortgageUpdateData.vProcreditDictionary.assuretypeid,
						fieldLabel : "担保类型",
						editable :false,
						itemName : '担保类型', // xx代表分类名称
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					},{
						xtype : "dickeycombo",
						nodeKey :'bzfs',
						hiddenName : "procreditMortgage.assuremodeid",
						value : MortgageUpdateData.vProcreditDictionary.assuremodeid,
						fieldLabel : "保证方式",
						editable :false,
						itemName : '保证方式', // xx代表分类名称
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					}]
				},{
				columnWidth : 1,
				labelWidth : 105,
				layout : 'form',
				defaults : {anchor : '97.5%'},
				items : [{
					id : 'enterpriseNameMortgage',
					xtype : 'combo',
					triggerClass :'x-form-search-trigger',
					hiddenName : 'customerEnterpriseName',
					fieldLabel : '<font color=red>*</font>所有权人',
					editable:false,
					onTriggerClick : function(){
						if(businessType=='Financing'){
							selectSlCompanyMain(selectSlCompanyMachUpdate);
						}else{
							selectEnterprise(selectCustomer);
						}
                   },
					mode : 'romote',
					lazyInit : false,
					typeAhead : true,
					forceSelection :true,
					minChars : 1,
					listWidth : 230,
					store : getStoreByBusinessType(businessType,'enterprise'),
					displayField : businessType=="Financing"?'corName':'enterprisename',
					valueField : businessType=="Financing"?'companyMainId':'id',
					triggerAction : 'all'
				},{
					id : 'personNameMortgage',
					xtype : 'combo',
					hiddenName : 'customerPersonName',
					triggerClass :'x-form-search-trigger',
					editable:false,
					onTriggerClick : function(){
						if(businessType=='Financing'){
							selectSlPersonMain(selectSlPersonMachUpdate);
						}else{
							selectPWName(selectCustomer);
						}
	               	},
					fieldLabel : '<font color=red>*</font>所有权人',
					mode : 'romote',
					lazyInit : false,
					typeAhead : true,
					minChars : 1,
					listWidth : 230,
					store : getStoreByBusinessType(businessType,'person'),
					displayField : 'name',
					valueField : businessType=="Financing"?'personMainId':'id',
					triggerAction : 'all'
				}]
			},{
					columnWidth : 1,
					labelWidth : 105,
					layout : 'form',
					defaults : {anchor : '97.5%'},
					items : [{
						id : 'mortgageNameCar',
						xtype : 'textfield',
						fieldLabel : '抵质押物名称',
						value : MortgageUpdateData.vProcreditDictionary.mortgagename,
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						name : 'procreditMortgage.mortgagename',
						allowBlank : false,
						blankText : '为必填内容'
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '最终估价.万元',
						value : MortgageUpdateData.vProcreditDictionary.finalprice==0?'':MortgageUpdateData.vProcreditDictionary.finalprice,
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						name : 'procreditMortgage.finalprice'
					},{
						fieldLabel : '可担保额度.万元',
						value : MortgageUpdateData.vProcreditDictionary.assuremoney==0?'':MortgageUpdateData.vProcreditDictionary.assuremoney,
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						name : 'procreditMortgage.assuremoney'
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 160,
					defaults : {xtype : 'textfield',anchor : '95%'},
					items : [{
						fieldLabel : '所有权人与借款人的关系',
						name : 'procreditMortgage.relation',
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						value : MortgageUpdateData.vProcreditDictionary.relation
					}]
				},{
					columnWidth : 1,
					layout : 'form',
					labelWidth : 105,
					defaults : {anchor : '97%'},
					items : [{
						xtype : 'textarea',
						fieldLabel : '备注',
						value : MortgageUpdateData.vProcreditDictionary.remarks,
						maxLength : 100,
						maxLengthText : '最大输入长度100',
						name : 'procreditMortgage.remarks'
					}]
				}]
			},{
				layout : 'column',
				xtype:'fieldset',
	            title: '修改<机器设备>详细信息',
	            collapsible: true,
	            autoHeight:true,
	            anchor : '95%',
	            items : [{
					columnWidth : 1,
					labelWidth : 100,
					layout : 'form',
					defaults : {anchor : '97.5%'},
					items : [{
						xtype : 'textfield',
						fieldLabel : '设备名称',
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						value : MortgageUpdateData.vProjMortMachineInfo.machinename,
						name : 'procreditMortgageMachineinfo.machinename'
					}]
	            },{
	            	columnWidth : 1,
					labelWidth : 100,
					layout : 'form',
					defaults : {anchor : '97.5%'},
					items : [{
						xtype : 'textfield',
						fieldLabel : '控制权人',
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						value : MortgageUpdateData.vProjMortMachineInfo.controller,
						name : 'procreditMortgageMachineinfo.controller'
					}]
	            },{
	            	columnWidth : .5,
					layout : 'form',
					labelWidth : 100,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						xtype : 'textfield',
						fieldLabel : '设备型号',
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						value : MortgageUpdateData.vProjMortMachineInfo.machinetype,
						name : 'procreditMortgageMachineinfo.machinetype'
					},{
						fieldLabel : '新货价格.万元',
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						value : MortgageUpdateData.vProjMortMachineInfo.newcarprice==0?'':MortgageUpdateData.vProjMortMachineInfo.newcarprice,
						name : 'procreditMortgageMachineinfo.newcarprice'
					},{
						fieldLabel : '使用时间.年',
						maxLength : 11,
						maxLengthText : '最大输入长度11',
						value : MortgageUpdateData.vProjMortMachineInfo.havedusedtime==0?'':MortgageUpdateData.vProjMortMachineInfo.havedusedtime,
						name : 'procreditMortgageMachineinfo.havedusedtime'
					},{
						fieldLabel : '二手价值1.万元',
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						value : MortgageUpdateData.vProjMortMachineInfo.secondaryvalueone==0?'':MortgageUpdateData.vProjMortMachineInfo.secondaryvalueone,
						name : 'procreditMortgageMachineinfo.secondaryvalueone'
					},{
						fieldLabel : '二手价值2.万元',
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						value : MortgageUpdateData.vProjMortMachineInfo.secondaryvaluetow==0?'':MortgageUpdateData.vProjMortMachineInfo.secondaryvaluetow,
						name : 'procreditMortgageMachineinfo.secondaryvaluetow'
					},{
						fieldLabel : '模型估价.万元',
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						value : MortgageUpdateData.vProjMortMachineInfo.modelrangeprice==0?'':MortgageUpdateData.vProjMortMachineInfo.modelrangeprice,
						name : 'procreditMortgageMachineinfo.modelrangeprice'
					}]
	            },{
	            	columnWidth : .5,
					layout : 'form',
					labelWidth : 110,
					defaults : {xtype : 'csRemoteCombo',anchor : '95%'},
					items : [{
						xtype : "dickeycombo",
						nodeKey :'kzqfs',
						hiddenName : "procreditMortgageMachineinfo.controllertypeid",
						value : MortgageUpdateData.vProjMortMachineInfo.controllerTypeId,
						fieldLabel : "控制权方式",
						editable :false,
						itemName : '控制权方式', // xx代表分类名称
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					},{
						xtype : "dickeycombo",
						nodeKey :'tycd',
						hiddenName : "procreditMortgageMachineinfo.commongradeid",
						value : MortgageUpdateData.vProjMortMachineInfo.commonGradeId,
						fieldLabel : "通用程度",
						editable :false,
						itemName : '通用程度', // xx代表分类名称
						//anchor : "100%",
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					},{
						xtype : "dickeycombo",
						nodeKey :'xnzk',
						hiddenName : "procreditMortgageMachineinfo.capabilitystatusid",
						value : MortgageUpdateData.vProjMortMachineInfo.capabilityStatusId,
						fieldLabel : "性能状况",
						editable :false,
						itemName : '性能状况', // xx代表分类名称
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					},{
						xtype : "dickeycombo",
						nodeKey :'bxnl',
						hiddenName : "procreditMortgageMachineinfo.cashabilityid",
						value : MortgageUpdateData.vProjMortMachineInfo.cashabilityId,
						fieldLabel : "变现能力",
						editable :false,
						itemName : '变现能力', // xx代表分类名称
						//anchor : "100%",
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					},{
						xtype : "dickeycombo",
						nodeKey :'djqk',
						hiddenName : "procreditMortgageMachineinfo.registerinfoid",
						value : MortgageUpdateData.vProjMortMachineInfo.registerInfoId,
						fieldLabel : "登记情况",
						editable :false,
						itemName : '登记情况', // xx代表分类名称
						//anchor : "100%",
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									if(combox.getValue() == 0||combox.getValue()==1){
										combox.setValue("");
									}else{
										combox.setValue(combox
											.getValue());
									}
									combox.clearInvalid();
								})
							}
						}
					},{
						xtype : 'datefield',
						fieldLabel : '出厂日期',
						format     : 'Y-m-d',
						value : MortgageUpdateData.vProjMortMachineInfo.leavefactorydate,
						name : 'procreditMortgageMachineinfo.leavefactorydate'
					},{
		            	name : 'procreditMortgageMachineinfo.id',
		            	value : MortgageUpdateData.vProjMortMachineInfo.id,
		            	xtype : 'hidden'
		            },{
		            	name : 'procreditMortgage.id',
		            	value : MortgageUpdateData.vProcreditDictionary.id,
		            	xtype : 'hidden'
		            }]
	            }]
			}],
			tbar : new Ext.Toolbar({
				border : false,
				items : [{
					text : '保存',
					iconCls : 'btn-save',
					formBind : true,
					handler : function() {
						var personType_select = Ext.getCmp('personType_select').getValue();
						var mortgageName = Ext.getCmp('mortgageNameCar').getValue();
						var personNameMortgage = Ext.getCmp('personNameMortgage').getValue();
						var enterpriseNameMortgage = Ext.getCmp('enterpriseNameMortgage').getValue();
						if(mortgageName == ""){
							Ext.Msg.alert('状态','请输入<抵质押物名称>后再保存!');
						}else if(enterpriseNameMortgage == "" && personNameMortgage == ""){
							Ext.Msg.alert('状态','请选择<所有权人>后再保存!');
						}else if(personType_select == 602 && enterpriseNameMortgage == ""){
							Ext.Msg.alert('状态','请选择<所有权人>后再保存!');
						}else if(personType_select == 603 && personNameMortgage == ""){
							Ext.Msg.alert('状态','请选择<所有权人>后再保存!');
						}else{
							panel_updateMachineInfo.getForm().submit({
								method : 'POST',
								waitTitle : '连接',
								waitMsg : '消息发送中...',
								success : function(form, action) {
									Ext.ux.Toast.msg('操作信息', '保存成功!');
									Ext.getCmp('win_updateMachineInfo').destroy();
									refreshMortgageGridStore();
								},
								failure : function(form, action) {
									Ext.ux.Toast.msg('操作信息', '保存失败!');							
								}
							});
						}
					}
				}]
			})
		});
		
		var window_updateMachineInfo = new Ext.Window({
			id : 'win_updateMachineInfo',
			title :'修改机器设备信息',
			iconCls : 'btn-update',
			width : (screen.width-180)*0.6,
			height : 460,
			constrainHeader : true ,
			collapsible : true, 
			frame : true ,
			border : false ,
			resizable : true,
			layout:'fit',
			autoScroll : true ,
			bodyStyle:'overflowX:hidden',
			constrain : true ,
			closable : true,
			modal : true,
			buttonAlign: 'right',
			items : [panel_updateMachineInfo],
			listeners : {
				'beforeclose' : function(){
					if(panel_updateMachineInfo.getForm().isDirty()){
						Ext.Msg.confirm('操作提示','数据被修改过,是否保存?',function(btn){
							if(btn=='yes'){
								panel_updateMachineInfo.getTopToolbar().items.itemAt(0).handler.call() ;
							}else{
								panel_updateMachineInfo.getForm().reset() ;
								window_updateMachineInfo.destroy() ;
							}
						}) ;
						return false ;
					}
				}
			}
		});
		window_updateMachineInfo.show();
		if(MortgageUpdateData.vProcreditDictionary.personTypeId == 602){
			hideField(Ext.getCmp('personNameMortgage')) ;
			showField(Ext.getCmp('enterpriseNameMortgage')) ;
			Ext.getCmp('enterpriseNameMortgage').valueNotFoundText = MortgageUpdateData.vProcreditDictionary.assureofnameEnterOrPerson,
			Ext.getCmp('enterpriseNameMortgage').setValue(MortgageUpdateData.vProcreditDictionary.assureofname) ;
			Ext.getCmp('enterpriseNameMortgage').originalValue = Ext.getCmp('enterpriseNameMortgage').getValue();
		}else if(MortgageUpdateData.vProcreditDictionary.personTypeId == 603){
			hideField(Ext.getCmp('enterpriseNameMortgage')) ;
			showField(Ext.getCmp('personNameMortgage')) ;
			Ext.getCmp('personNameMortgage').valueNotFoundText = (MortgageUpdateData.vProcreditDictionary.assureofnameEnterOrPerson);
			Ext.getCmp('personNameMortgage').setValue(MortgageUpdateData.vProcreditDictionary.assureofname) ;
			Ext.getCmp('personNameMortgage').originalValue = Ext.getCmp('personNameMortgage').getValue();
		}
	}
	
	function selectCustomer(obj) {
		if (obj.shortname) {//企业
			Ext.getCmp('enterpriseNameMortgage').setValue(obj.id);
			Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.enterprisename) ;
		} else if (obj.name) {//个人
			Ext.getCmp('personNameMortgage').setValue(obj.id);
			Ext.getCmp('personNameMortgage').setRawValue(obj.name) ;
		}
	}
	
	function selectSlCompanyMachUpdate(obj) {
		Ext.getCmp('enterpriseNameMortgage').setValue(obj.companyMainId);
		Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.corName) ;
	}
	
	function selectSlPersonMachUpdate(obj){
		Ext.getCmp('personNameMortgage').setValue(obj.personMainId);
		Ext.getCmp('personNameMortgage').setRawValue(obj.name) ;
	}
	
	Ext.Ajax.request({
		url : __ctxPath +'/credit/mortgage/seeMachineinfoForUpdate.do',
		method : 'POST',
		success : function(response, request) {
			obj = Ext.util.JSON.decode(response.responseText);
			if(obj.success==true){
				showMachineInformation(obj.data) ;
			}else{
				Ext.Msg.alert('状态', obj.msg);
			}
		},
		failure : function(response) {
			Ext.Msg.alert('状态', '操作失败，请重试');
		},
		params : {
			id : mortgageid,
			businessType : businessType
		}
	});
}