UpdateLeaseFinanceMaterialsWin = Ext.extend(Ext.Window, {
	layout : 'anchor',
	anchor : '100%',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		UpdateLeaseFinanceMaterialsWin.superclass.constructor.call(this, {
			        buttonAlign:'center',
			        title:'编辑抵质押物',
			        iconCls : 'btn-add',
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
					maximizable :true,
					items : [this.formPanel],
					buttons:[{
					    text : '保存',
						iconCls : 'btn-save',
						scope : this,
						handler : this.save
					},{
					    text : '关闭',
						iconCls : 'close',
						scope : this,
						handler : function(){
							this.close();
						}
					}]
					
				})
	},
	initUIComponents : function() {
		    var businessType=this.businessType
			function selectCustomer(obj) {
				if (obj.enterprisename) {//企业
					Ext.getCmp('enterpriseNameMortgage').setValue(obj.id);
					Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.enterprisename) ;
				} else if (obj.name) {//个人
					Ext.getCmp('enterpriseNameMortgage').setValue(obj.id);
					Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.name) ;
				}
			
			}
		
			function selectSlCompany(obj) {
				Ext.getCmp('enterpriseNameMortgage').setValue(obj.companyMainId);
				Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.corName) ;
			}
			
			function selectSlPerson(obj){
				Ext.getCmp('enterpriseNameMortgage').setValue(obj.personMainId);
				Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.name) ;
			}
        if(this.type ==1){
			this.otherPanel=new VehicleCarForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==2){
			this.otherPanel=new StockownershipForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==5){
			this.otherPanel=new MachineinfoForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==6){
			this.otherPanel=new ProductForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==7 || this.type==15 || this.type==16 || this.type==17){
			this.otherPanel=new HouseForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==8){
			this.otherPanel=new OfficeBuildingForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==9){
			this.otherPanel=new HousegroundForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==10){
			this.otherPanel=new BusinessForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==11){
			this.otherPanel=new BusinessandliveForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==12){
			this.otherPanel=new EducationForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==13){
			this.otherPanel=new IndustryForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==14){
			this.otherPanel=new DroitForm({id:this.id,type:this.type,objectType:'mortgage'})
		}
 	   var data = [['住宅',7],['商铺写字楼',8],['住宅用地',9],['商业用地',10],['商住用地',11],/*['教育用地',12],*/['工业用地',13],['公寓',15],['联排别墅',16],['独栋别墅',17]];
	   var data1 = [['车辆',1],['股权',2],['机器设备',5],['存货/商品',6],['无形权利',14]];
	   this.formPanel = new Ext.FormPanel( {
			url : __ctxPath +'/credit/mortgage/addMortgageOfDY.do',
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
	            title: '填写<抵质押物>基础信息',
	            collapsible: true,
	            autoHeight:true,
	            anchor : '95%',
				items : [{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {anchor : '100%'},
					items : [{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.projid',
		        		value : this.projectId
		        	},{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.businessType',
		        		value : this.businessType
		        	},{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.id'
		        	},{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.createTime'
		        	},{
		        		
						xtype : "dickeycombo",
						nodeKey : 'dblx',
						hiddenName : "procreditMortgage.assuretypeid",
						fieldLabel : "担保类型",
						itemName : '担保类型', // xx代表分类名称
						allowBlank :false,
						readOnly : true,
						listeners : {
							scope:this,
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.setValue(combox
											.getValue());
									combox.clearInvalid();
								})
							},
							'select' : function(combox){
								var obj=this.getCmpByName('procreditMortgage.mortgagenametypeid')
								obj.store.removeAll()
								if(combox.getValue()=='604'){
									
									var store=new Ext.data.SimpleStore({
												   data : data,
												   fields:['typeValue','typeId']
											  })
									obj.store.insert(0,store.getAt(0))
									obj.store.insert(1,store.getAt(1))
									obj.store.insert(2,store.getAt(2))
									obj.store.insert(3,store.getAt(3))
									obj.store.insert(4,store.getAt(4))
									obj.store.insert(5,store.getAt(5))
									obj.store.insert(6,store.getAt(6))
									obj.store.insert(7,store.getAt(7))
									obj.store.insert(8,store.getAt(8))
									//obj.store.insert(9,store.getAt(9))
									//obj.store.insert(10,store.getAt(10))
								}else if(combox.getValue()=='605'){
									var obj=this.getCmpByName('procreditMortgage.mortgagenametypeid')
									obj.store.removeAll()
									var store=new Ext.data.SimpleStore({
												   data : data1,
												   fields:['typeValue','typeId']
											  })
									obj.store.insert(0,store.getAt(0))
									obj.store.insert(1,store.getAt(1))
									obj.store.insert(2,store.getAt(2))
									obj.store.insert(3,store.getAt(3))
									obj.store.insert(4,store.getAt(4))
									//obj.store.insert(5,store.getAt(5))
								}
							}
						}
					
					},{
						id : 'persontype_id',
						xtype : "dickeycombo",
						nodeKey : 'syrlx',
						hiddenName : "procreditMortgage.personType",
						fieldLabel : "所有人类型",
						itemName : '所有人类型', // xx代表分类名称
						allowBlank :false,
						listeners : {
							scope:this,
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.setValue(combox
											.getValue());
									combox.clearInvalid();
								})
							},
							'select' : function(combo,record, index){
								Ext.getCmp('enterpriseNameMortgage').setValue('')
							}
						}
					}]
				},{
					columnWidth : .5,
					labelWidth : 110,
					layout : 'form',
					defaults : {anchor : '95%'},
					items : [{
					xtype:'combo',
					id:'mortgagenametypeid',
					hiddenName : 'procreditMortgage.mortgagenametypeid',
					anchor : '95%',
					fieldLabel:'抵质押物类型',
					allowBlank :false,
					mode : 'local',
					forceSelection : true, 
					displayField : 'typeValue',
					valueField : 'typeId',
					editable : false,
					triggerAction : 'all',
					readOnly:true,
					store : new Ext.data.SimpleStore({
						data : data,
						fields:['typeValue','typeId']
					})
				},{
				    xtype:'hidden',
				    name:'procreditMortgage.mortgagepersontypeforvalue'
				},{
					xtype:'textfield',
					fieldLabel : '与债务人的关系',
					name : 'procreditMortgage.relation',
					maxLength : 50,
					maxLengthText : '最大输入长度50'
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
								if(Ext.getCmp('persontype_id').getValue()==602){
									selectSlCompanyMain(selectSlCompany);
								}else if(Ext.getCmp('persontype_id').getValue()==603){
									selectSlPersonMain(selectSlPerson);
								}
							}else{
								if(Ext.getCmp('persontype_id').getValue()==602){
									selectEnterprise(selectCustomer);
								}else if(Ext.getCmp('persontype_id').getValue()==603){
									selectPWName(selectCustomer);
								}
							}
	                   },
						mode : 'romote',
						lazyInit : true,
						allowBlank : false,
						typeAhead : true,
						forceSelection :true,
						minChars : 1,
						listWidth : 230,
						store: new Ext.data.JsonStore({}),
						/*store : getStoreByBusinessType(this.businessType,'enterprise'),
						displayField : businessType=="Financing"?'corName':'enterprisename',
						valueField : businessType=="Financing"?'companyMainId':'id',*/
						triggerAction : 'all'
					}]
				}/*,{
					columnWidth : 1,
					labelWidth : 105,
					layout : 'form',
					defaults : {anchor : '97.5%'},
					items : [{
						xtype : 'textfield',
						fieldLabel : '<font color=red>*</font>抵质押物名称',
						name : 'procreditMortgage.mortgagename',
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						blankText : '为必填内容'
					}]
				}*/,{
					columnWidth : .32,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '评估价值',
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						allowBlank : false,
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.finalprice'/*,// 控制文本框的长度
						listeners : {
							scope : this,
							afterrender : function(obj) {
								obj.on("keyup")
							},
							change : function(nf) {

								var value = nf.getValue();
								var index = value.indexOf(".");
								if (index <= 0) { // 如果第一次输入
													// 没有进行格式化
									nf.setValue(Ext.util.Format.number(value,'0,000.00'))
								
								} else {

									if (value.indexOf(",") <= 0) {
										var ke = Ext.util.Format.number(value,'0,000.00')
										nf.setValue(ke);
										
									} else {
										var last = value.substring(index+ 1,value.length);
										if (last == 0) {
											var temp = value.substring(0,index);
											temp = temp.replace(/,/g,"");
										
										} else {
											var temp = value.replace(/,/g,"");
		
										}
									}

								}
							}
						}*/
					}]
				}, {
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 20,
					items : [{
						fieldLabel : "元 ",
						labelSeparator : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .26,
					layout : 'form',
					labelWidth : 80,
					labelAlign:'right',
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '公允价值',
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						allowBlank : false,
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.finalCertificationPrice',
						listeners :{
							scope : this,
							'blur':function(field){
								var com=this.formPanel.getCmpByName('procreditMortgage.assuremoney')
								var finalCertificationPrice=field.getValue()
								if(this.projectMoney==null || this.projectMoney=="" || typeof(this.projectMoney)=='undefined'  || finalCertificationPrice==null || finalCertificationPrice==""){
									com.setValue(0)
								}else{									
									com.setValue((this.projectMoney/finalCertificationPrice*100).toFixed(2))
								}
							}
						}
					}]
				}, {
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 20,
					items : [{
						fieldLabel : "元 ",
						labelSeparator : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .26,
					layout : 'form',
					labelWidth : 80,
					labelAlign:'right',
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '抵质押率',
						allowBlank : false,
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.assuremoney'
					}]
				}, {
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 20,
					items : [{
						fieldLabel : "%",
						labelSeparator : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						xtype:'textfield',
						fieldLabel : '公允价值获取方式',
						width : 90,
						name : 'procreditMortgage.valuationMechanism'
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '95%'},
					items : [{
						xtype:'datefield',
						fieldLabel : '获取时间',
						format:'Y-m-d',
						name : 'procreditMortgage.valuationTime'
					}]
				},{
					columnWidth : 1,
					layout : 'form',
					labelWidth : 105,
					defaults : {anchor : '97.5%'},
					items : [{
						xtype : 'textarea',
						fieldLabel : '备注',
						maxLength : 100,
						maxLengthText : '最大输入长度100',
						name : 'procreditMortgage.mortgageRemarks'
					}]
				}]
			},{
			   anchor:'95%',
			   items:[this.otherPanel]
			},{
			   anchor:'95%',
			   name:'otherInfo',
//			   items:[new LeaseFinanceMaterialsView({projectId:this.projectId,isHidden_materials:false,businessType:this.businessType})]//2013年9月2日更改by gao 不能以projectId为key要以记录id为key，由于是新创建的两个表，无其他关联，所以暂定用记录id作为key
			   items:[new LeaseFinanceMaterialsView({projectId:this.id,isHidden_materials:false,businessType:this.businessType})]
			}]
		})

		if(null!=this.id && null!=this.type){
			this.formPanel.loadData({
				url : __ctxPath +'/credit/mortgage/getMortgageByType.do?mortgageid='
						+ this.id,
				root : 'data',
				preName : ['procreditMortgage','assureofname'],
				scope : this,
				success : function(resp, options) {
					var obj=Ext.util.JSON.decode(resp.responseText)
					Ext.getCmp('enterpriseNameMortgage').setValue(obj.data.procreditMortgage.assureofname)
					Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.data.assureofname)
					
				}
			});
		}

	},
	save:function(){
	    var mortgagenametypeid=this.getCmpByName('procreditMortgage.mortgagenametypeid').getValue();
	    var customerName=this.getCmpByName('customerEnterpriseName').getValue();

	    var win=this
	    var gridPanel=this.gridPanel
	   /* if(mortgagenametypeid==1){
	    	var factoryName = Ext.getCmp('factoryName').getValue();
			if(factoryName == ""){
				Ext.ux.Toast.msg('状态','请选择<制造商>后再保存!');
				return;
			}
	    }else*/ if(mortgagenametypeid==2){
	    	var targetEnterpriseName = Ext.getCmp('targetEnterpriseName').getValue();
	    	if(targetEnterpriseName==""){
				Ext.ux.Toast.msg('状态','请选择<目标公司名称>后再保存!');
				return;
			}
	    }else if(mortgagenametypeid==4){
	    	var card_number = Ext.getCmp('card_number').getValue();
	    	if(card_number == ""){
				Ext.ux.Toast.msg('状态','<证件号码>不能为空!');
				return;
			}
	    }
		if(customerName==''){
			Ext.ux.Toast.msg('状态','请选择<所有权人>后再保存!');
			return;
		}else{
			this.formPanel.getForm().submit({
				method : 'POST',
				waitTitle : '连接',
				waitMsg : '消息发送中...',
				success : function(form, action) {
					Ext.ux.Toast.msg('操作信息', '保存成功!');
					win.destroy();
					gridPanel.getStore().reload()
				},
				failure : function(form, action) {
					Ext.ux.Toast.msg('操作信息', '保存失败!');
				}
			});				
		}		    
	}
});
