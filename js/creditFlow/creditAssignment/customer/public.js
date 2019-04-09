/**
 * 
 * @class
 * @extends Ext.form.FormPanel
 * 设置参数  id:随机ID
 *           personData:add时null edit时为从数据库查询的对象
 */
var investmentObj = Ext.extend(Ext.form.FormPanel, {
	isRead : false,
	isflag : false,
	isGrant : false,
	tempTitle:'填写个人基本信息',
	isHidden:true,
	id:'investmentObj',
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		};
		debugger
		Ext.applyIf(this, _cfg);
		if(_cfg.isGrant){
			this.isGrant = _cfg.isGrant
		};
		if(_cfg.isReadOnly)
		{
			this.isRead=_cfg.isReadOnly;
		};
		if(_cfg.isReadOnlys)
		{
			this.isReads=_cfg.isReadOnlys;
		}else if(_cfg.isReadOnly){
			this.isReads=_cfg.isReadOnly;
		};
		if(_cfg.shopName)
		{
			this.shopNames=_cfg.shopName;
		};
		if(_cfg.shopId)
		{
			this.shopIds=_cfg.shopId;
		};
		if(null!=_cfg.personData){
		    this.isflag=true;
		};
		if(null!=_cfg.accountData){
		    this.isflag=true;
		};
		if(null!=_cfg.tempTitle){
		    this.tempTitle=_cfg.tempTitle;
		};
		if(null!=_cfg.isHidden){
		    this.isHidden=_cfg.isHidden;
		};
		this.initUIComponents();
		var personData = this.personData;
		var accountData = this.accountData;
		var personData_shopName=null;
		if(this.shopNames){
			personData_shopName=this.shopNames
		}else if(personData){
			personData_shopName=personData.shopName
		}
		var personData_investId=null
		if(this.personData){
			personData_investId=this.personData.investId;
		}
		this.bjrun=true;
		var panelId=_cfg.id;
		var panel_add=this;
		var isEdit =true;//用来标示是否为添加页面   false表示添加页面
		/*if(accountData==null||accountData=="undefined"){
				isEdit=false;
		}*/
		if(personData==null||personData=="undefined"){
				isEdit=false;
		}
		investmentObj.superclass.constructor.call(this, {
			labelAlign : 'right',
			buttonAlign : 'center',
			frame : true,
			monitorValid : true,
			labelWidth : 110,
			id:panelId,
			autoScroll : true,
			bodyStyle : 'overflowX:hidden',
			layout : 'form',
			url:this.url,
			border : false,
			items : [{
				layout : 'form',
				autoHeight : true,
				collapsible : false,
				anchor : '100%',
				items : [{
						layout : 'column',
						xtype : 'fieldset',
						title : this.tempTitle,
						collapsible : true,
						autoHeight : true,
						anchor : '100%',
						items : [{
							columnWidth : 1,
							labelWidth : 90,
							layout : 'column',
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
										name : "csInvestmentperson.creater",
										value : personData == null?null:personData.creater
									},{
										xtype : "hidden",
										name : "csInvestmentperson.investId",
										value : personData == null?null:personData.investId
									}, {
										xtype : "hidden",
										name : "csInvestmentperson.createrId",
										value : personData == null? null: personData.createrId
									}, {
										xtype : "hidden",
										name : "csInvestmentperson.createdate",
										value : personData == null?null:personData.createdate
									}, {
										xtype : "hidden",
										name : "csInvestmentperson.companyId",
										value : personData == null?null:personData.companyId
									}, {
										xtype : 'textfield',
										fieldLabel : '<font color=red>*</font>姓名',
										allowBlank : false,
										name : 'csInvestmentperson.investName',
										blankText : '姓名为必填内容',
										readOnly : this.isRead,
										value : personData == null?null:personData.investName,
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
										value : personData == null
												? null
												: personData.cardtype,
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
//										allowBlank : false,
										blankText : '邮政编码为必填内容',
										regex : /^[0-9]{6}$/,
										regexText : '邮政编码格式不正确',
										value : personData == null
												? null: personData.postcode
												
									}, {
										xtype : 'hidden',
										name : 'personSFZSId',
										value : personData==null?null:personData.personSFZSId
									}, {
										xtype : 'hidden',
										name : 'personSFZZId',
										value : personData==null?null:personData.personSFZZId
									}, {
										xtype : 'hidden',
										name : 'personSFZFId',
										value : personData==null?null:personData.personSFZFId
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
										value : personData == null? null: personData.sex,
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
										value : personData == null
												? null
												: personData.cardnumber,	
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
														f.setValue(null);
														Ext.Msg.alert('身份证号码验证','证件号码不正确,请仔细核对')
														return;
													}else if(validateIdCard(f.getValue())==2){
														f.setValue(null);
														Ext.Msg.alert('身份证号码验证','证件号码地区不正确,请仔细核对')
														return;
													}else if(validateIdCard(f.getValue())==3){
														f.setValue(null);
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
												
												var penal=this.getCmpByName("csInvestmentperson.birthDay");
												var sex = this.getCmpByName('csInvestmentperson.sex');
												var cardNumber = f.getValue();
												var personId = (personData==null)?0:personData.personId;
												Ext.Ajax.request({
								                   url:  __ctxPath + '/creditFlow/creditAssignment/customer/verificationCsInvestmentperson.do',
								                   method : 'POST',
								                   params : {
															cardNum : cardNumber,
															personId:personId
														},
								                  success : function(response,request) {
														var obj=Ext.util.JSON.decode(response.responseText);
					                            		if(obj.msg==false){					                            			
					                            			Ext.ux.Toast.msg('操作信息',"该证件号码已存在，请重新输入");
					                            			f.setValue("");
					                            			//penal.setValue("");
					                            		}else{
					                            			
					                            			if(cardNumber.split("").reverse()[1]%2==0){
					                            				sex.setValue(313);
					                            				sex.setRawValue("女")
					                            			}else{
					                            				sex.setValue(312);
					                            				sex.setRawValue("男")
					                            			}
					                            			//拆分身份证号码 ，拿出出生年月日  
//					                            			if(!isEdit&&personData==null){//只有新增才需要默认加载身份证上的出生年月日
						                            			var brithday= cardNumber.substr(6,8);
																var formatBrithday = brithday.substr(0,4)+"-"+brithday.substr(4,2)+"-"+brithday.substr(6,2);
						                            			penal.setValue(formatBrithday);
//					                            			}
					                            		}
							                      }
					                             });  
												if(!isEdit&&personData==null){
													var cardNumber = f.getValue();
													var brithday= cardNumber.substr(6,8);
													var formatBrithday = brithday.substr(0,4)+"-"+brithday.substr(4,2)+"-"+brithday.substr(6,2);
													penal.setValue(formatBrithday);
												}
//												ajaxUniquenessValidator(this,"validatorPersonCard","该人员已存在！");
											}
										}
									},{
										xtype : 'textfield',
										fieldLabel : '电子邮箱',
										name : 'csInvestmentperson.selfemail',
										readOnly : this.isRead,
										value : personData == null
												? null
												: personData.selfemail,
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
										value : personData == null? null: personData.cellphone,
										allowBlank : false,
										readOnly : this.isRead,
										regex : /^[1][3456789][0-9]{9}$/,
										regexText : '手机号码格式不正确',
										maxLength:11
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
										readOnly : this.isRead,
										
										value : personData == null
												? null: personData.birthDay
												
									},{
										xtype : "hidden",
										name : 'csInvestmentperson.belongedId',
										value : personData == null? null: personData.belongedId
									},{
										hiddenName : 'belongedName',
										xtype : 'trigger',
										fieldLabel : '客户经理',
										submitValue : true,
										allowBlank : false,
										triggerClass : 'x-form-search-trigger',
										editable : false,
										readOnly : (this.isGrant == true)
												? false
												: true,
										value : personData == null
												? null
												: personData.belongedName,
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
												title : "客户经理",
												callback : function(uId, uname) {
													//if((!isEdit)&&((","+uId+",").indexOf(","+curUserInfo.userId+",")==-1)){
														//uId=uId+","+curUserInfo.userId
														//uname=uname+","+curUserInfo.fullname
														
													//}
													obj.setRawValue(uname);
													belongedObj.setValue(uId);
													Ext.Ajax.request({
														url : __ctxPath + '/creditFlow/creditAssignment/customer/getDepartmentCsInvestmentperson.do',
														method : 'POST',
														scope:this,
														success : function(response, request) {
															var object=Ext.util.JSON.decode(response.responseText);
															Ext.getCmp('shopName').setValue(object.data.orgName);
															Ext.getCmp('shopId').setValue(object.data.orgId)
														},
														failure : function(response,request) {
															debugger
															Ext.ux.Toast.msg('状态', '出错了，稍后再试');
															return;
														},
														params : {
															uId:uId
														}
														});
													
												}
											}).show();
										}
									}]

								}]
							},
							{
									columnWidth : 1,
									layout : 'form',
									defaults : {
										anchor : '99%'
									},
									items : [ {
										fieldLabel : '登记门店',
										allowBlank : false,
										editable : false,
										readOnly : this.isReads,
										xtype:'trigger',
										id:'shopName',
										triggerClass :'x-form-search-trigger',
//										value : personData == null? null: personData.shopName,
										value : personData_shopName == null ? null: personData_shopName,
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
										name : 'csInvestmentperson.shopId',
										id:'shopId',
										value:this.shopIds?this.shopIds:null
									},{
										xtype : 'textfield',
										fieldLabel : '通讯地址',
										allowBlank : false,
										readOnly : this.isRead,
										value : personData == null
												? null
												: personData.postaddress,
										name : 'csInvestmentperson.postaddress'
									}]

								}]
						}]
					}, {
						layout : 'column',
						xtype : 'fieldset',
						title : '身份证扫描件',
						labelWidth : 90,
						collapsible : true,
						autoHeight : true,
						anchor : '100%',
						items : [{
							columnWidth : 1,
							layout : 'column',
							labelWidth : 65,
							defaults : {
								anchor : '100%'
							},
							items : [{
								columnWidth : 0.3,
								layout : 'form',
								labelWidth : 65,
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items : [{
									xtype : 'label',
									style : 'padding-left :10px',
									html : this.isRead
											? ''
											: '手持身份证&nbsp;&nbsp;&nbsp;<a href="#" onClick =uploadPhotoBtnPerson_new(\'手持身份证\',\'cs_investMentperson_sfzs\',\'shenfenzheng-sc\',\'personSFZSId\',\''+ panelId+'\')>上传</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =getSrc(\'personSFZSId\',\''+ panelId+'\')>下载</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =delePhotoFile_new(\'personSFZSId\',\'shenfenzheng-sc\',\''+ panelId+'\')>删除</a>'
								}, {
									xtype : 'label',
									style : 'padding-left :20px',
									name:'shenfenzheng-sc',
									html :function(){
										if(personData==null || null==personData.personSFZSId || ""==personData.personSFZSId || personData.personSFZSId==0){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
													+ __ctxPath
													+ '/images/nopic.jpg" width =140 height=80/></div>'
													
										}else if(personData!=null && null!=personData.personSFZSId && ""!=personData.personSFZSId && personData.personSFZSId!=0 && (personData.personSFZSExtendName!=".pdf")){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ 'http://'+personData.fileHost
													+ '/'
													+ personData.personSFZSUrl
													+ '" ondblclick=showPic("http://'
													+personData.fileHost
													+ '/'
													+ personData.personSFZSUrl
													+ '") width =140 height=80  /></div>'
										}else if(personData!=null && null!=personData.personSFZSId && ""!=personData.personSFZSId && personData.personSFZSId!=0 && personData.personSFZSExtendName==".pdf"){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ __ctxPath
													+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
													+personData.personSFZSId+',"'
													+ personData.personSFZSUrl
													+ '") width =140 height=80  /></div>'
										}
									}()
									
									/*(personData==null || null==personData.personSFZZId || ""==personData.personSFZZId || personData.personSFZZId==0)?
											'<img src="'
													+ __ctxPath
													+ '/images/nopic.jpg" width =140 height=80 />'
											        : '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ __ctxPath
													+ '/'
													+ personData.personSFZZUrl
													+ '" ondblclick=showPic("'
													+ personData.personSFZZUrl
													+ '") width =140 height=80  /></div>'*/
								}]
							}, {
								columnWidth : 0.3,
								layout : 'form',
								labelWidth : 65,
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items : [{
									xtype : 'label',
									style : 'padding-left :10px',
									html : this.isRead?'': '身份证正面&nbsp;&nbsp;&nbsp;<a href="#" onClick =uploadPhotoBtnPerson_new(\'身份证正面\',\'cs_investMentperson_sfzz\',\'shenfenzheng-z\',\'personSFZZId\',\''+ panelId+'\')>上传</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =getSrc(\'personSFZZId\',\''+ panelId+'\')>下载</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =delePhotoFile_new(\'personSFZZId\',\'shenfenzheng-z\',\''+ panelId+'\')>删除</a>'
								}, {
									name:'shenfenzheng-z',
									xtype : 'label',
									html : function(){
										if(personData==null || null==personData.personSFZZId || ""==personData.personSFZZId || personData.personSFZZId==0){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
													+ __ctxPath
													+ '/images/nopic.jpg" width =140 height=80/></div>'
//										}else if(personData!=null && null!=personData.personSFZZId && ""!=personData.personSFZZId && personData.personSFZZId!=0 && (personData.personSFZZExtendName==".jpg" || personData.personSFZZExtendName==".jpeg")){
										}else if(personData!=null && null!=personData.personSFZZId && ""!=personData.personSFZZId && personData.personSFZZId!=0 && (personData.personSFZZExtendName!=".pdf")){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px;"><img src="'
												+ 'http://'+personData.fileHost
												+ '/'
												+ personData.personSFZZUrl
												+ '" ondblclick=showPic("http://'
												+personData.fileHost
												+ '/'
												+ personData.personSFZZUrl
												+ '") width =140 height=80  /></div>'
										}else if(personData!=null && null!=personData.personSFZZId && ""!=personData.personSFZZId && personData.personSFZZId!=0 && personData.personSFZZExtendName==".pdf"){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ __ctxPath
													+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
													+personData.personSFZZId+',"'
													+ personData.personSFZZUrl
													+ '") width =140 height=80  /></div>'
										}
									}()
									
									
								}]
							}, {
								columnWidth : 0.3,
								layout : 'form',
								labelWidth : 65,
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items : [{
									xtype : 'label',
									style : 'padding-left :10px',
									html : this.isRead?'': '身份证反面&nbsp;&nbsp;&nbsp;<a href="#" onClick =uploadPhotoBtnPerson_new(\'身份证反面\',\'cs_investMentperson_sfzf\',\'shenfenzheng-f\',\'personSFZFId\',\''+ panelId+'\')>上传</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =getSrc(\'personSFZFId\',\''+ panelId+'\')>下载</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =delePhotoFile_new(\'personSFZFId\',\'shenfenzheng-f\',\''+ panelId+'\')>删除</a>'
								}, {
									name:'shenfenzheng-f',
									xtype : 'label',
									html : function(){
										if(personData==null || null==personData.personSFZFId || ""==personData.personSFZFId || personData.personSFZFId==0){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
													+ __ctxPath
													+ '/images/nopic.jpg" width =140 height=80/></div>'
										}else if(personData!=null && null!=personData.personSFZFId && ""!=personData.personSFZFId && personData.personSFZFId!=0 && (personData.personSFZFExtendName!=".pdf")){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px;"><img src="'
												+ 'http://'+personData.fileHost
												+ '/'
												+ personData.personSFZFUrl
												+ '" ondblclick=showPic("http://'
												+personData.fileHost
												+ '/'
												+ personData.personSFZFUrl
												+ '") width =140 height=80  /></div>'
										}else if(personData!=null && null!=personData.personSFZFId && ""!=personData.personSFZFId && personData.personSFZFId!=0 && personData.personSFZFExtendName==".pdf"){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ __ctxPath
													+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
													+personData.personSFZFId+',"'
													+ personData.personSFZFUrl
													+ '") width =140 height=80  /></div>'
										}
									}()
									
									
								}]
							}]
						}]
					},{
						columnWidth : .4,
						layout : 'form',
						defaults : {
							anchor : '40%'
						},
						hidden:this.personData?false:true,
						scope : this,
						items : [{
									  xtype:'combo',
							          mode : 'local',
						              displayField : 'itemName',
						              valueField : 'itemId',
						              value : personData == null?null:personData.bankNum,
						              editable : false,
//						              readOnly : this.isRead,
						              width : 40,
								  	  store : new Ext.data.ArrayStore({
										url : __ctxPath
												+ '/creditFlow/creditAssignment/customer/selBankNumCsInvestmentperson.do?investId='+personData_investId,
										fields : ['itemId', 'itemName'],
//										autoLoad : true
									   }),
									   mode : 'remote',
							            triggerAction : "all",
//						                hiddenName:"enterpriseBank.BankNum",
					                	fieldLabel : '选择银行卡',	
					                	anchor : '40%',
//					                	allowBlank:false,
					                	disabled:this.isHiddenBank,
//							          	name : 'enterpriseBank.BankNum',
							          	listeners : {
												scope : this,
												select : function(combox, record, index) {
												var v = record.data.itemId;
												console.log(v)
												Ext.Ajax.request({
												url : __ctxPath + '/creditFlow/creditAssignment/customer/selBankCsInvestmentperson.do',
												method : 'POST',
												scope:this,
												success : function(response, request) {
													var object=Ext.util.JSON.decode(response.responseText);
													var enterpriseBank=object.data.enterpriseBank
													console.log(enterpriseBank)
													debugger
//													Ext.getCmp("fieldset_hidden").removeAll()
//													Ext.getCmp("fieldset_hidden").doLayout()
													Ext.getCmp('areaId').setValue(enterpriseBank.areaId)
													Ext.getCmp('areaName').setValue(enterpriseBank.areaName)
													Ext.getCmp('accountnum').setValue(enterpriseBank.accountnum)
													Ext.getCmp('bankOutletsName').setValue(enterpriseBank.bankOutletsName)
													Ext.getCmp('remarks').setValue(enterpriseBank.remarks)
													Ext.getCmp('enterpriseid').setValue(enterpriseBank.enterpriseid)
													Ext.getCmp('id2').setValue(enterpriseBank.id)
													Ext.getCmp('openType').setValue(enterpriseBank.openType)
													Ext.getCmp('accountTypeid').setValue(enterpriseBank.accountType)
													Ext.getCmp('bankid').setValue(enterpriseBank.bankid)
													Ext.getCmp('name').setValue(enterpriseBank.name)
													if(enterpriseBank.openCurrency == 0){
														Ext.getCmp('openCurrency').setValue(true);
													}else{
														Ext.getCmp('openCurrency1').setValue(true);
													}
													Ext.getCmp('personYHKZId').setValue(object.data.personYHKZId)
													Ext.getCmp('personYHKFId').setValue(object.data.personYHKFId)
//													var html=""
//													html+='银行卡正面&nbsp;&nbsp;&nbsp;<a href="#" onClick =uploadPhotoBtnPerson_new(\'银行卡正面\',\'cs_investmentperson_yhkz\',\'yinhangka-z\',\'personYHKZId\',\''+ panelId+'\')>上传</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =getSrc(\'personYHKZId\',\''+ panelId+'\')>下载</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =delePhotoFile_new(\'personYHKZId\',\'yinhangka-z\',\''+ panelId+'\')>删除</a>'	
//													Ext.getCmp('yhkzhtml').setText('<a>12192819281</a>',false)
//													var msg=object.msg;
//													Ext.ux.Toast.msg('状态', msg);
//													return;
													var yinhangka_zhtml='';
													if(object.data.personYHKZId==null || null==object.data.personYHKZId || ""==object.data.personYHKZId || object.data.personYHKZId==0){
														yinhangka_zhtml+='<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
															+ __ctxPath
															+ '/images/nopic.jpg" width =140 height=80/></div>';
													}else if(object.data.personYHKZId!=null && null!=object.data.personYHKZId && ""!=object.data.personYHKZId && object.data.personYHKZId!=0 && (object.data.personYHKZExtendName!=".pdf")){
														yinhangka_zhtml+='<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
															+ 'http://'+object.data.fileHost
															+ '/'
															+ object.data.personYHKZUrl
															+ '" ondblclick=showPic("http://'
															+ object.data.fileHost
															+ '/'
															+ object.data.personYHKZUrl
															+ '") width =140 height=80  /></div>'
													}else if(object.data.personYHKZId!=null && null!=object.data.personYHKZId && ""!=object.data.personYHKZId && object.data.personYHKZId!=0 && object.data.personYHKZExtendName==".pdf"){
														yinhangka_zhtml+='<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
															+ __ctxPath
															+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
															+object.data.personYHKZId+',"'
															+ object.data.personYHKZUrl
															+ '") width =140 height=80  /></div>'
													}
													Ext.getCmp('yinhangka-z').setText(yinhangka_zhtml,false)
													var yinhangka_fhtml='';
													if(object.data.personYHKFId==null || null==object.data.personYHKFId || ""==object.data.personYHKFId || object.data.personYHKFId==0){
														yinhangka_fhtml+='<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
															+ __ctxPath
															+ '/images/nopic.jpg" width =140 height=80/></div>';
													}else if(object.data.personYHKFId!=null && null!=object.data.personYHKFId && ""!=object.data.personYHKFId && object.data.personYHKFId!=0 && (object.data.personYHKFExtendName!=".pdf")){
														yinhangka_fhtml+='<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
															+ 'http://'+object.data.fileHost
															+ '/'
															+ object.data.personYHKFUrl
															+ '" ondblclick=showPic("http://'
															+ object.data.fileHost
															+ '/'
															+ object.data.personYHKFUrl
															+ '") width =140 height=80  /></div>'
													}else if(object.data.personYHKFId!=null && null!=object.data.personYHKFId && ""!=object.data.personYHKFId && object.data.personYHKFId!=0 && object.data.personYHKFExtendName==".pdf"){
														yinhangka_fhtml+='<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
															+ __ctxPath
															+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
															+object.data.personYHKFId+',"'
															+ object.data.personYHKFUrl
															+ '") width =140 height=80  /></div>'
													}
													Ext.getCmp('yinhangka-f').setText(yinhangka_fhtml,false)
												},
												failure : function(response,request) {
													debugger
													Ext.ux.Toast.msg('状态', '出错了，稍后再试');
													return;
												},
												params : {
													id:v
												}
												});
				//								Ext.getCmp("fieldset_hidden").removeAll()
				//								Ext.getCmp("fieldset_hidden").doLayout()
//												Ext.getCmp('openType').setValue('0')
//												Ext.getCmp('accountTypeid').setValue('2')
//												Ext.getCmp('bankid').setValue('241')
//												Ext.getCmp('name').setValue('按实际卡灰色空间')
//												Ext.getCmp('openCurrency').setValue(true);
//												Ext.getCmp('yhkhtml').setText('<a>12192819281</a>',false)
											    this.newbank()
					                          //arrStore.load();
											},
											afterrender : function(combox) {
//												alert("A")
//												var st = combox.getStore();
//												st.on("load", function() {
//													if(combox.getValue()=='' || combox.getValue()==null){												
//														combox.setValue(st.getAt(0).data.itemId);
//														combox.clearInvalid();
//													}else{
//														combox.setValue(combox.getValue());
//														combox.clearInvalid();
//													}
//												})
											}
										
								}
					 }]
						},
						{
						layout : 'column',
						xtype : 'fieldset',
						title : '银行账户信息',
						collapsible : true,
						autoHeight : true,
						hidden:this.isHiddenBank,//意向客户转化的时候会传
						disabled:this.isHiddenBank,
						anchor : '100%',
						id:'fieldset_hidden',
						items : [{
							columnWidth : 0.9,
							labelWidth : 90,
							layout : 'column',
							items : [{
								columnWidth : .5,
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
												xtype:'combo',
										          mode : 'local',
									               displayField : 'name',
									              valueField : 'id',
									              editable : false,
									              readOnly : this.isRead,
									              width : 70,
									              id:"openType",
									              store : new Ext.data.SimpleStore({
											      fields : ["name", "id"],
										          data : [["个人", "0"],
													     	["公司", "1"]]
									              	}),
										            triggerAction : "all",
									                hiddenName:"enterpriseBank.openType",
								                	fieldLabel : '开户类型',	
								                	anchor : '100%',
								                	allowBlank:false,
								                	disabled:this.isHiddenBank,
								                	value : personData == null?null:personData.openType,
										          	name : 'enterpriseBank.openType',
										          	listeners : {
															scope : this,
															select : function(combox, record, index) {
															var v = record.data.id;
															var obj = Ext.getCmp('accountTypeid');
															obj.enable();
															var arrStore = null;
															if(v==0){
																arrStore = new Ext.data.SimpleStore({
															        fields : ["name", "id"],
														            data : [["个人储蓄户", "0"]]
																});
															}else{
																arrStore = new Ext.data.SimpleStore({
															        fields : ["name", "id"],
														            data : [["基本户", "1"],["一般户", "2"]]
												              	});
															}
															obj.clearValue();
								                            obj.store = arrStore;
								                            if(obj.view){
								                            	obj.view.setStore(arrStore);
								                            }
								                          //arrStore.load();
														},
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
								 }, {
										fieldLabel : "银行名称",
										xtype : "combo",
										displayField : 'itemName',
										valueField : 'itemId',
										allowBlank:false,
										readOnly : this.isRead,
										disabled:this.isHiddenBank,
										triggerAction : 'all',
										store : new Ext.data.ArrayStore({
											url : __ctxPath
															+ '/creditFlow/common/getBankListCsBank.do',
													fields : ['itemId', 'itemName'],
													autoLoad : true
										}),
										mode : 'remote',
										hiddenName : "enterpriseBank.bankid",
										id:'bankid',
										editable : false,
										blankText : "银行名称不能为空，请正确填写!",
										anchor : "100%",
										value : personData == null?null:personData.bankId,
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
								},{
											name : 'enterpriseBank.areaId',
											id:'areaId',
											xtype:'hidden',
											value:personData == null?null:personData.areaId
								}/*,{					
											name : 'enterpriseBank.areaName',
										    hiddenName : 'enterpriseBank.areaName',
											fieldLabel : '开户地区',	
											anchor : '100%',
											readOnly : this.isRead,
											allowBlank:false,
					                      	xtype:'trigger',
											triggerClass :'x-form-search-trigger',
											editable : false,
											scope : this,
											disabled:this.isHiddenBank,
											value:personData == null?null:personData.areaName,
											onTriggerClick : function(){
												var com=this
												var selectBankLinkMan = function(array){
													var str="";
													var idStr=""
													for(var i=array.length-1;i>=0;i--){
														str=str+array[i].text+"-"
														idStr=idStr+array[i].id+","
													}
													if(str!=""){
														str=str.substring(0,str.length-1);
													}
													if(idStr!=""){
														idStr=idStr.substring(0,idStr.length-1)
													}
													com.previousSibling().setValue(idStr)
													com.setValue(str);
												};
												selectDictionary('area',selectBankLinkMan);
											}
									}*/,{
									 
										fieldLabel : '开户地区',	
		                              	name : 'enterpriseBank.areaName',
		                              	id:'areaName',
										xtype:'textfield',
										anchor : '100%',
										readOnly : this.isRead,
										disabled:this.isHiddenBank,
										allowBlank:false,
										value : personData == null?null:personData.areaName
								 	},{
									 
										fieldLabel : '开户名称',	
		                              	name : 'enterpriseBank.name',
		                              	id:'name',
										xtype:'textfield',
										anchor : '100%',
										readOnly : this.isRead,
										disabled:this.isHiddenBank,
										allowBlank:false,
										value : personData == null?null:personData.khname
								 	}]

								}]
							},{
								columnWidth : .5,
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
											xtype:'combo',
								            mode : 'local',
							                displayField : 'name',
							                valueField : 'id',
							                editable : false,
							                width : 70,
								            triggerAction : "all",
								            id:'accountTypeid',
							                hiddenName:"enterpriseBank.accountType",
						                	fieldLabel : '账户类型',	
						                	anchor : '100%',
						                	readOnly : this.isRead,
						                	disabled:this.isHiddenBank,
						                	allowBlank:false,
						                	store:new Ext.data.SimpleStore({
												        	fields : ["name", "id"],
											            data : [["个人储蓄户", "0"],["基本户", "1"],["一般户", "2"]]
													}),
								          	name : 'enterpriseBank.accountType',
								          	value : personData == null?null:personData.accountType,
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
							 		},{	
						                	xtype: 'radiogroup',
							                fieldLabel: '银行开户类别',
							                items: [
							                    {boxLabel: '本币开户',id:'openCurrency', name: 'enterpriseBank.openCurrency',  disabled : this.isRead,inputValue: "0",checked:personData == null?true:(personData.openCurrency==0?true:false)},
							                    {boxLabel: '外币开户',id:'openCurrency1', name: 'enterpriseBank.openCurrency',  disabled : this.isRead,inputValue: "1",checked:personData == null?false:(personData.openCurrency==1?true:false)}
							                ]
				                	}, {
									
										fieldLabel : "网点名称",
	                                    name : 'enterpriseBank.bankOutletsName',
	                                    id:'bankOutletsName',
									    xtype:'textfield',
									    disabled:this.isHiddenBank,
										allowBlank:false,
										readOnly : this.isRead,
										anchor : "100%",
										value : personData == null?null:personData.bankOutletsName
									},{
										fieldLabel : '卡号',	
									 	name : 'enterpriseBank.accountnum',
									 	id:'accountnum',
									  	maxLength: 100,
									  	xtype:'textfield',
									  	readOnly : this.isRead,
									  	disabled:this.isHiddenBank,
									  	anchor : '100%',
									  	allowBlank:false,
									  	value : personData == null?null:personData.bankNum
								}]

							}]
							},{
				              	columnWidth : 1,
								layout : 'form',
								labelWidth : 90,
								hidden:!this.isHidden,
								items :[{
									xtype : 'textarea',
									 anchor : '100%',
									fieldLabel : '备注',
									readOnly : this.isRead,
									height : 80,
									name : 'enterpriseBank.remarks',
									id:'remarks',
									value : personData == null?null:personData.remarks
								}]
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.enterpriseid',
								id:'enterpriseid',
								value : personData == null?null:(personData.enterpriseid==0?null:personData.enterpriseid)
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.id',
								id:'id2',
								value : personData == null?null:(personData.enterpriseBankId==0?null:personData.enterpriseBankId)
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.isEnterprise',
								value : "1"
				              }, {
								xtype : 'hidden',
								name : 'enterpriseBank.isInvest',
								value : "3"//表示这个属于债权转让的客户
							}, {
								xtype : 'hidden',
								name : 'enterpriseBank.isCredit',
								value : "0"
							},{
										xtype : 'hidden',
										name : 'personYHKZId',
										id:'personYHKZId',
										value : personData==null?null:personData.personYHKZId
							}, {
										xtype : 'hidden',
										name : 'personYHKFId',
										value : personData==null?null:personData.personYHKFId,
										id:'personYHKFId'	
							}]
						}]
					
					},{
						layout : 'column',
						xtype : 'fieldset',
						title : '银行卡扫描件',
						labelWidth : 80,
						collapsible : true,
						autoHeight : true,
						anchor : '100%',
						hidden:this.isHiddenBank,//意向客户转化的时候会传
						items : [{
							columnWidth : 1,
							layout : 'column',
							labelWidth : 65,
							defaults : {
								anchor : '100%'
							},
							items : [{
								columnWidth : 0.33,
								layout : 'form',
								labelWidth : 65,
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items : [{
									xtype : 'label',
									style : 'padding-left :20px',
									id:"yhkzhtml",
									html : this.isRead
											? ''
											: '银行卡正面&nbsp;&nbsp;&nbsp;<a href="#" onClick =uploadPhotoBtnPerson_new(\'银行卡正面\',\'cs_investmentperson_yhkz\',\'yinhangka-z\',\'personYHKZId\',\''+ panelId+'\')>上传</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =getSrc(\'personYHKZId\',\''+ panelId+'\')>下载</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =delePhotoFile_new(\'personYHKZId\',\'yinhangka-z\',\''+ panelId+'\')>删除</a>'
								}, {
									xtype : 'label',
									style : 'padding-left :20px',
									name:'yinhangka-z',
									id:'yinhangka-z',
									html :function(){
										if(personData==null || null==personData.personYHKZId || ""==personData.personYHKZId || personData.personYHKZId==0){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
													+ __ctxPath
													+ '/images/nopic.jpg" width =140 height=80/></div>'
										}else if(personData!=null && null!=personData.personYHKZId && ""!=personData.personYHKZId && personData.personYHKZId!=0 && (personData.personYHKZExtendName!=".pdf")){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ 'http://'+personData.fileHost
													+ '/'
													+ personData.personYHKZUrl
													+ '" ondblclick=showPic("http://'
													+personData.fileHost
													+ '/'
													+ personData.personYHKZUrl
													+ '") width =140 height=80  /></div>'
										}else if(personData!=null && null!=personData.personYHKZId && ""!=personData.personYHKZId && personData.personYHKZId!=0 && personData.personYHKZExtendName==".pdf"){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ __ctxPath
													+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
													+personData.personYHKZId+',"'
													+ personData.personYHKZUrl
													+ '") width =140 height=80  /></div>'
										}
									}()
								}]
							}, {
								columnWidth : 0.33,
								layout : 'form',
								labelWidth : 65,
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items : [{
									xtype : 'label',
									style : 'padding-left :20px',
									id:"yhkfhtml",
									html : this.isRead?'': '银行卡反面&nbsp;&nbsp;&nbsp;<a href="#" onClick =uploadPhotoBtnPerson_new(\'银行卡反面\',\'cs_investmentperson_yhkf\',\'yinhangka-f\',\'personYHKFId\',\''+ panelId+'\')>上传</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =getSrc(\'personYHKFId\',\''+ panelId+'\')>下载</a>&nbsp;&nbsp;&nbsp;<a href="#" onClick =delePhotoFile_new(\'personYHKFId\',\'yinhangka-f\',\''+ panelId+'\')>删除</a>'
								}, {
									name:'yinhangka-f',
									xtype : 'label',
									id:'yinhangka-f',
									html : function(){
										if(personData==null || null==personData.personYHKFId || ""==personData.personYHKFId || personData.personYHKFId==0){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 10px; padding:1px 1px 1px 1px;"><img src="'
													+ __ctxPath
													+ '/images/nopic.jpg" width =140 height=80/></div>'
										}else if(personData!=null && null!=personData.personYHKFId && ""!=personData.personYHKFId && personData.personYHKFId!=0 && (personData.personYHKFExtendName!=".pdf")){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px;"><img src="'
												+ 'http://'+personData.fileHost
												+ '/'
												+ personData.personYHKFUrl
												+ '" ondblclick=showPic("http://'
												+personData.fileHost
												+ '/'
												+ personData.personYHKFUrl
												+ '") width =140 height=80  /></div>'
										}else if(personData!=null && null!=personData.personYHKFId && ""!=personData.personYHKFId && personData.personYHKFId!=0 && personData.personYHKFExtendName==".pdf"){
											return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px"><img src="'
													+ __ctxPath
													+ '//images//desktop//pdf_win.jpg" ondblclick=showPdf('
													+personData.personYHKFId+',"'
													+ personData.personYHKFUrl
													+ '") width =140 height=80  /></div>'
										}
									}()
									
									/*(personData==null || null==personData.personSFZFId || ""==personData.personSFZFId || personData.personSFZFId==0)? '<img src="'+ __ctxPath+ '/images/nopic.jpg" width =140 height=80 />'
										        : '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px;"><img src="'
												+ __ctxPath
												+ '/'
												+ personData.personSFZFUrl
												+ '" ondblclick=showPic("'
												+ personData.personSFZFUrl
												+ '") width =140 height=80  /></div>'*/
								}]
							}]
						}]
					
					},{
						
						columnWidth : .5, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign : 'right',
						id:'bank_hidden_button',
						hidden:true,
						items : [{ // 上面是第三行
							xtype : 'button',
							text : '增加银行卡',
							iconCls : 'btn-customer',
							width : 110,
							scope : this,
							handler : function() {
							}
						}]
											
				},
					{
						layout : 'column',
						xtype : 'fieldset',
						title : '平台账户信息',
						collapsible : true,
						autoHeight : true,
						hidden:this.isHidden,
						anchor : '100%',
						items : [{
							columnWidth : 1,
							labelWidth : 95,
							layout : 'column',
							items : [{
								columnWidth : .33,
								labelWidth : 95,
								layout : 'column',
								items : [{
									columnWidth : 1,
									layout : 'form',
									defaults : {
										anchor : '100%'
									},
									scope : this,
									items : [{
										xtype : 'textfield',
										fieldLabel : '<font color=red>*</font>平台账户',
										name : 'obSystemAccount.accountName',
										readOnly : this.isRead,
										value : accountData == null?null:accountData.accountName,
										listeners : {
											'afterrender':function(com){
											    com.clearInvalid();
											}
										}		
									}]
								}]
							},{
									columnWidth : .33,
									layout : 'form',
									defaults : {
										anchor : '99%'
									},
									items : [{
										xtype : 'numberfield',
										fieldLabel : '平台账号',
										name : 'obSystemAccount.accountNumber',
										allowBlank : this.isHidden,
										readOnly : this.isRead,
										value : accountData == null? null: accountData.accountNumber
									}]
								
							},{
									columnWidth : .33,
									layout : 'form',
									defaults : {
										anchor : '99%'
									},
									items : [{
										xtype : 'numberfield',
										fieldLabel : '余额',
										name : 'obSystemAccount.totalMoney',
										allowBlank : this.isHidden,
										readOnly : this.isRead,
										value : accountData == null? null: accountData.totalMoney
									}]
							}]
						}]
					}]
			}]
		})
	},
	initUIComponents : function() {
	},
	newbank:function(){
//		var html='';
//		html+="{"+
//			"xtype : 'label',"+
//			"style : 'padding-left :20px',"+
//			"html : 银行卡反面"+
//		"}";
	}
})
