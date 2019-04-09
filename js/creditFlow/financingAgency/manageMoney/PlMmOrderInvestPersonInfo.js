/**
 * 投资人信息
 * @class plMmOrderInfoPanel
 * @extends Ext.Panel
 */
PlMmOrderInvestPersonInfo = Ext.extend(Ext.Panel, {
	layout : 'anchor',
	anchor : '100%',
	companyHidden : false,
	border : false,
	constructor : function(_cfg) {
		if (typeof(_cfg.spouseHidden) != "undefined") {
		}
		Ext.applyIf(this, _cfg);
		console.log(_cfg);
		PlMmOrderInvestPersonInfo.superclass.constructor.call(this, {
		//	layout : 'column',
		/*	labelAlign : 'right',
			buttonAlign : 'center',
			frame : true,
			monitorValid : true,
			labelWidth : 100,
			autoScroll : true,
			bodyStyle : 'overflowX:hidden',*/
			layout : 'column',
		//	url:this.url,
			border : false,
			items : [{
								columnWidth : .33,
								labelWidth : 90,
								layout : 'column',
								items : [{
									columnWidth : 1,
									layout : 'form',
									defaults : {
										anchor : '100%'
									},
									scope : this,
									items : [{
										xtype : "hidden",
										name : "csInvestmentperson.creater"
									},{
										xtype : "hidden",
										name : "csInvestmentperson.investId"
									}, {
										xtype : "hidden",
										name : "csInvestmentperson.createrId"
									}, {
										xtype : "hidden",
										name : "csInvestmentperson.createdate"
									}, {
										xtype : "hidden",
										name : "csInvestmentperson.companyId"
									}, {
										xtype : 'textfield',
										fieldLabel : '<font color=red>*</font>姓名',
										allowBlank : false,
										name : 'csInvestmentperson.investName',
										blankText : '姓名为必填内容',
										readOnly : this.isRead,
										listeners : {
											'afterrender':function(com){
											    com.clearInvalid();
											}
										}
												
									}, {
										xtype : "dickeycombo",
										nodeKey : 'card_type_key',
										hiddenName : "csInvestmentperson.cardtype",
										itemName : '证件类型', // xx代表分类名称
										fieldLabel : "证件类型",
										allowBlank : false,
										editable : true,
										readOnly : this.isRead,
										// emptyText : "请选择",
										blankText : "证件类型不能为空，请正确填写!",
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
									},{
										xtype : 'textfield',
										fieldLabel : '邮政编码',
										name : 'csInvestmentperson.postcode',
										readOnly : this.isRead,
										blankText : '邮政编码为必填内容',
										regex : /^[0-9]{6}$/,
										regexText : '邮政编码格式不正确'
												
									}, {
										xtype : 'hidden',
										name : 'personSFZZId'
									}, {
										xtype : 'hidden',
										name : 'personSFZFId'
									}]

								}]
							},{
								columnWidth : .66,
								labelWidth : 90,
								layout : 'column',
								items : [{
									columnWidth : 0.5,
									layout : 'form',
									defaults : {
										anchor : '100%'
									},
									scope : this,
									items : [{
										xtype : "dickeycombo",
										nodeKey : 'sex_key',
										hiddenName : 'csInvestmentperson.sex',
										fieldLabel : "性别",
										allowBlank : false,
										editable : true,
										blankText : "性别不能为空，请正确填写!",
										readOnly : this.isRead,
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
									},  {
										xtype : 'textfield',
										fieldLabel : '证件号码',
										name : 'csInvestmentperson.cardnumber',
										allowBlank : false,
										blankText : '证件号码为必填内容',
										readOnly : this.isRead,
										listeners : {
											scope:this,
											'beforerender':function(com){/*
												if(this.getCmpByName('csInvestmentperson.cardtype').getValue()==309){
													if(validateIdCard(com.getValue())==1){
														Ext.ux.Toast.msg('身份证号码验证','证件号码不正确,请仔细核对')
													}else if(validateIdCard(com.getValue())==2){
														Ext.ux.Toast.msg('身份证号码验证','证件号码地区不正确,请仔细核对')
														
													}else if(validateIdCard(com.getValue())==3){
														Ext.ux.Toast.msg('身份证号码验证','证件号码生日日期不正确,请仔细核对')														
													}
												}
											*/},
											'blur' : function(f) {
												if(this.getCmpByName('csInvestmentperson.cardtype').getValue()==309){
													if(validateIdCard(f.getValue())==1){
														Ext.Msg.alert('身份证号码验证','证件号码不正确,请仔细核对')
														return;
													}else if(validateIdCard(f.getValue())==2){
														Ext.Msg.alert('身份证号码验证','证件号码地区不正确,请仔细核对')
														return;
													}else if(validateIdCard(f.getValue())==3){
														Ext.Msg.alert('身份证号码验证','证件号码生日日期不正确,请仔细核对')
														return;
													}
												}
												if(!isEdit&&personData==null){
													var cardNumber = f.getValue();
													var brithday= cardNumber.substr(6,8);
													var formatBrithday = brithday.substr(0,4)+"-"+brithday.substr(4,2)+"-"+brithday.substr(6,2);
													this.getCmpByName("csInvestmentperson.birthDay").setValue(formatBrithday)
												}
												/*
												var penal=this.getCmpByName("person.birthday");
												var cardNumber = f.getValue();
												var personId = (personData==null)?0:personData.personId;
												Ext.Ajax.request({
								                   url:  __ctxPath + '/credit/customer/person/verificationPerson.do',
								                   method : 'POST',
								                   params : {
															cardNum : cardNumber,
															personId:personId
														},
								                  success : function(response,request) {
														var obj=Ext.util.JSON.decode(response.responseText);
					                            		if(obj.msg=="false"){					                            			
					                            			Ext.ux.Toast.msg('操作信息',"该证件号码已存在，请重新输入");
					                            			f.setValue("");
					                            			//penal.setValue("");
					                            		}else{
					                            			//拆分身份证号码 ，拿出出生年月日  
					                            			if(!isEdit&&personData==null){//只有新增才需要默认加载身份证上的出生年月日
						                            			var brithday= cardNumber.substr(6,8);
																var formatBrithday = brithday.substr(0,4)+"-"+brithday.substr(4,2)+"-"+brithday.substr(6,2);
						                            			penal.setValue(formatBrithday)
					                            			}
					                            		}
							                      }
					                             });  
												if(!isEdit&&personData==null){
													var cardNumber = f.getValue();
													var brithday= cardNumber.substr(6,8);
													var formatBrithday = brithday.substr(0,4)+"-"+brithday.substr(4,2)+"-"+brithday.substr(6,2);
													this.getCmpByName("person.birthday").setValue(formatBrithday)
												}
												ajaxUniquenessValidator(this,
														"validatorPersonCard",
														"该人员已存在！");
											*/}
										}
									},{
										xtype : 'textfield',
										fieldLabel : '电子邮箱',
										name : 'csInvestmentperson.selfemail',
										readOnly : this.isRead,
										regex : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
										regexText : '电子邮箱格式不正确',
										listeners : {
											'afterrender':function(com){
											    com.clearInvalid();
											}
										}	

									}]

								}, {
									columnWidth : 0.5,
									layout : 'form',
									defaults : {
										anchor : '100%'
									},
									items : [{
										xtype : 'textfield',
										fieldLabel : '电话号码',
										name : 'csInvestmentperson.cellphone',
										allowBlank : false,
										readOnly : this.isRead,
										regex : /^[1][3456789][0-9]{9}$/,
										regexText : '手机号码格式不正确'										
										/*listeners : {
											'afterrender':function(com){
											    com.clearInvalid();
											}
										}*/
										
									},{
										xtype : 'datefield',
										labelSeparator : '',
										format : 'Y-m-d',
										fieldLabel : '出生日期',
										name : 'csInvestmentperson.birthDay',
										readOnly : this.isRead
												
									},{
										xtype : "hidden",
										name : 'csInvestmentperson.belongedId'
									},{	
										name : 'csInvestmentperson.belongedName',
										hiddenName : 'csInvestmentperson.belongedName',
										xtype : 'trigger',
										fieldLabel : '客户经理',
										submitValue : true,
										triggerClass : 'x-form-search-trigger',
										editable : false,
										readOnly : (this.isRead == false&&isGranted('_editBelongeder_grkh'))
												? false
												: true,
										scope : this,
										onTriggerClick : function() {
											var obj = this;
											var belongedObj = obj
													.previousSibling();
											var userIds = belongedObj
													.getValue();
											if (null == obj.getValue()
													|| "" == obj.getValue()) {
												userIds = "";
											}
											new UserDialog({
												userIds : userIds,
												userName : obj.getValue(),
												single : false,
												title : "客户授权人",
												callback : function(uId, uname) {
													if((!isEdit)&&((","+uId+",").indexOf(","+curUserInfo.userId+",")==-1)){
														uId=uId+","+curUserInfo.userId
														uname=uname+","+curUserInfo.fullname
													}
													obj.setRawValue(uname);
													belongedObj.setValue(uId);
												}
											}).show();
										}
									}]

								}]
							},{
									columnWidth : 1,
									layout : 'form',
									defaults : {
										anchor : '99%'
									},
									items : [ {
										fieldLabel : '登记门店',
										allowBlank : false,
										readOnly : this.isRead,
										xtype:'trigger',
										triggerClass :'x-form-search-trigger',
										name : 'csInvestmentperson.shopName',
										hiddenName:'csInvestmentperson.shopName',
										onTriggerClick : function() {
										var op = this.ownerCt.ownerCt.ownerCt.ownerCt;
										var EnterpriseNameStockUpdateNew = function(obj) {
											if (null != obj.orgName&& "" != obj.orgName)
												op.getCmpByName('csInvestmentperson.shopName').setValue(obj.orgName);
											if (null != obj.orgId&& "" != obj.orgId)
												op.getCmpByName('csInvestmentperson.shopId').setValue(obj.orgId);
										}
										selectShop(EnterpriseNameStockUpdateNew);
									}
									},{
										xtype : 'hidden',
										name : 'csInvestmentperson.shopId'
									},{
										xtype : 'textfield',
										fieldLabel : '通讯地址',
										allowBlank : false,
										readOnly : this.isRead,
										name : 'csInvestmentperson.postaddress'
									}]

								},{
									columnWidth : .3,
									layout : 'form',
									hidden : !this.isHidden,
									items : [{
										xtype : 'button',
										iconCls : 'btn-detail',
										text : '查看投资人资料',
										scope : this,
										handler : function(){
											var investId=this.getCmpByName('csInvestmentperson.investId').getValue();
											Ext.Ajax.request({
										url : __ctxPath
												+ '/creditFlow/creditAssignment/customer/seePersonCsInvestmentperson.do',
										method : 'POST',
										scope : this,
										success : function(response, request) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											var personData = obj.data;
											var randomId = rand(100000);
											var id = "see_person" + randomId;
											var anchor = '100%';
											var window_see = new Ext.Window({
														title : '查看个人客户详细信息',
														layout : 'fit',
														width : (screen.width - 180) * 0.7
																+ 160,
														maximizable : true,
														height : 460,
														closable : true,
														modal : true,
														plain : true,
														border : false,
														items : [new investmentObj({
																	url : null,
																	id : id,
																	personData : personData,
																	isReadOnly : true
																})],
														listeners : {
															'beforeclose' : function(panel) {
																window_see.destroy();
															}
														}
													});
											window_see.show();
										},
										failure : function(response) {
											Ext.ux.Toast.msg('状态', '操作失败，请重试');
										},
										params : {
											investId : investId
										}
									});
										}
									}]
								}]
		})
		
		  if (this.investPersonId != null && this.investPersonId != 'undefined') {
		  	  var panel = this;
			  this.loadData( {
				  url : __ctxPath + '/creditFlow/creditAssignment/customer/seePersonCsInvestmentperson.do?investId=' + this.investPersonId,
				  root : 'data', 
				  preName : 'csInvestmentperson' ,
				  success : function (response,obj){
				  		var	result = Ext.util.JSON.decode(response.responseText);
				  		panel.getCmpByName('csInvestmentperson.shopName').setValue(result.data.shopName);
				  		panel.getCmpByName('csInvestmentperson.shopId').setValue(result.data.shopId);
				  		panel.getCmpByName('csInvestmentperson.belongedName').setValue(result.data.belongedName);
				  		panel.getCmpByName('csInvestmentperson.belongedId').setValue(result.data.belongedId);
				  }
			  }); 
		  }
		 
	}

});
