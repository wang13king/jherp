

Ext.define('htmobile.approve.person.ApplyEnterpriseloan', {
    extend: 'Ext.form.Panel',
    
    name: 'ApplyPersonloan',

    constructor: function (config) {
    	config = config || {};
    	this.operationType=config.operationType;
    	if(this.operationType=="SmallLoan_SmallLoanBusiness"){
			this.title="企业贷款申请";
			if(this.history=='businessVehicleMortgage'){
				this.title="企业车辆抵押流程"
			}else if(this.history=='businessVehiclePledge'){
				this.title="企业车辆质押流程"
			}else if(this.history=='businessSpecial'){
				this.title="企业特殊业务流程"
			}
		}else if(this.operationType=="SmallLoan_PersonalCreditLoanBusiness"){
			this.title="个人贷款申请"
			if(this.history=='personHouse'){
				this.title="个人房屋抵押流程"
			}else if(this.history=='personVehicleMortgage'){
				this.title="个人车辆抵押流程"
			}else if(this.history=='personVehiclePledge'){
				this.title="个人车辆质押流程"
			}else if(this.history=='personSpecial'){
				this.title="个人特殊业务流程"
			}
		}else{
			this.title="项目申请"
		}
    	Ext.apply(config,{
		    fullscreen: true,
		    title:this.title,
		    scrollable:{
		    	direction: 'vertical'
		    },
		    items: [
    			{
	    			xtype: 'fieldset',
	    			defaults:{
	    				 labelWidth:document.body.clientWidth/3,
	    				 clearIcon : true
	    			},
	    			items:[
				             /*{
				            labelWidth:'36%',
				            xtype: 'uxSelectfield',
				            name:'person.shopId',
				            displayField: 'text',
           	                valueField: 'value',
           	                value:"",
                            hiddenName:'person.shopId',
				            store:Ext.create('StoreSelect', {
			          	       	url : __ctxPath + '/creditFlow/customer/person/perQueryListPerson.do?isAll='+ isGranted('_detail_sygrkh')+"&isMobile=1"
			                }),
			                callback:function(record){
			                   var applypersoncardnumber= Ext.getCmp("applypersoncardnumber");
			                   var applypersontelphone= Ext.getCmp("applypersontelphone");
			                    	Ext.Ajax.request({
								                  url : __ctxPath + '/creditFlow/customer/person/seeInfoPerson.do',
												  params:{
												    id:record.data.value
												    },
								                   method : 'POST',
								                  success : function(response,request) {
														 var obj = Ext.util.JSON.decode(response.responseText);
						                                 var data = obj.data;
						                                 applypersoncardnumber.setValue(data.cardnumber);
						                                 applypersontelphone.setValue(data.telphone);
							                      }
					                             });
			                },
				            label: '姓名'
				        },*/
				        {
				            labelWidth:'36%',
				            xtype: 'textfield',
				            id:'applypersonname',
				            name:'person.name',
				            label: '姓名',
				            readOnly:true,
				             listeners : {
								scope:this,
								'focus' : function(f) {
									
									   mobileNavi.push(Ext.create('htmobile.public.SelectPersonlist',{callback:function(data){
									   	   var applypersonid= Ext.getCmp("applypersonid");
									   	   var applypersoncardnumber= Ext.getCmp("applypersoncardnumber");
									   	   var applypersoncellphone= Ext.getCmp("applypersontelphone");
									   	   var applypersonname= Ext.getCmp("applypersonname");
									   	    applypersoncellphone.setValue(data.cellphone);
									        applypersoncardnumber.setValue(data.cardnumber);
						                    applypersonid.setValue(data.id);
						                     applypersonname.setValue(data.name);
									   }}));
								}
								}
				        },{
				            
				           id:'applypersonid',
				           name:'person.id',
				           xtype:'hiddenfield'
				        
				        
				        },{
				            xtype: 'textfield',
				            labelWidth:'36%',
				            id:"applypersoncardnumber",
				            name: 'person.cardnumber',
				            readOnly:true,
				            label: '身份证号码'
				        },{
				            xtype: 'textfield',
				            labelWidth:'36%',
				            readOnly:true,
				            id:"applypersontelphone",
				            name: 'person.cellphone',
				            label: '手机号码'
				        },
				        {
				            labelWidth:'36%',
				            xtype: 'uxSelectfield',
				            name:'slSmallloanProject.productId',
				            displayField: 'text',
           	                valueField: 'value',
                            hiddenName:'slSmallloanProject.productId',
				            store:Ext.create('StoreSelect', {
			          	         url : __ctxPath + "/system/listBpProductParameter.do?isMobile=1&Q_operationType_S_EQ=SmallLoan_PersonalCreditLoanBusiness"
			                }),
				            label: '产品名称'
				        },
				        {
				            labelWidth:'36%',
				            xtype: 'textfield',
				            id:'slSmallloanProject.appUserName',
				            name:'slSmallloanProject.appUserName',
				            label: '项目经理',
				            readOnly:true,
				             listeners : {
								scope:this,
								'focus' : function(f) {
									
									   mobileNavi.push(Ext.create('htmobile.public.AppuserList',{callback:function(data){
									   	  var appUserName= Ext.getCmp("slSmallloanProject.appUserName");
									   	   var appUserId= Ext.getCmp("slSmallloanProject.appUserId");
									        appUserName.setValue(data.fullname); 
									         appUserId.setValue(data.userId); 
									   }}));
								}
								}
				        },{
				           id:'slSmallloanProject.appUserId',
				           name:'slSmallloanProject.appUserId',
				           xtype:'hiddenfield'
				        },
				        {
				            labelWidth:'36%',
				            xtype: 'uxSelectfield',
				            name:'slSmallloanProject.departId',
				            displayField: 'text',
           	                valueField: 'value',
                            hiddenName:'slSmallloanProject.departId',
				            store:Ext.create('StoreSelect', {
			          	         url : __ctxPath + "/system/getShopList1Organization.do?isMobile=1"
			                }),
				            label: '分公司',   
				            callback:function(record){
			                   var newbasepersonshopName= Ext.getCmp("slSmallloanProject.departMentName");
			                    	Ext.Ajax.request({
								                   url : __ctxPath + "/system/getOrganization.do",
												  params:{
												    orgId:record.data.value
												    
												    },
//								                   method : 'POST',
								                  success : function(response,request) {
														 var obj = Ext.util.JSON.decode(response.responseText);
						                                 var data = obj.data;
						                                 newbasepersonshopName.setValue(data.orgName);
							                      }
					                             });
			                }
				        },{
				            xtype:"hiddenfield",
				            id:"slSmallloanProject.departMentName",
				            name:"slSmallloanProject.departMentName"
				        	
				        	
				        },{
						xtype : 'hiddenfield',
						name : 'preHandler',
						value : 'creditProjectService.startCreditP2PProjectFlow'
					},{
							xtype : 'hiddenfield',
							name:"operationType",
							value : "SmallLoan_PersonalCreditLoanBusiness"
						},{
							labelWidth:'36%',
							xtype : "textfield",
							label : "贷款金额",
							name : "projectMoney",
							listeners : {
								scope : this,
								blur : function(obj, e, eOpts) {
						
									var value = obj.getValue();
									var projectMoney=this.getCmpByName("slSmallloanProject.projectMoney");
									projectMoney.setValue(parseFloat(value));
								}
							}
						},{
							xtype : "hiddenfield",
							name : "slSmallloanProject.projectMoney"
						}/*,{
							xtype : 'hiddenfield',
							name : 'history',
							value : "personSmall"
						}*/
					        ]
				        },
				        {
				            xtype: 'button',
				            style:'border-radius: 0.2em;color:#ffffff;font-family: 微软雅黑;',
				            name: 'submit',
				            text:'启动项目',
				            cls : 'buttonCls',
				            handler:this.formSubmit
				        }
	        ]
    	});

    	this.callParent([config]);
    },
    formSubmit:function(){
    	
    	var name=this.parent.getCmpByName("person.name").getValue(); 
		  if(Ext.isEmpty(name)){
		    Ext.Msg.alert('','名字不能为空');
			return;
		  }
		  
		  var productId=this.parent.getCmpByName("slSmallloanProject.productId").getValue(); 
		  if(Ext.isEmpty(productId)){
		    Ext.Msg.alert('','产品名称不能为空');
			return;
		  }
		  
		  var appUserName=this.parent.getCmpByName("slSmallloanProject.appUserName").getValue(); 
		  if(Ext.isEmpty(appUserName)){
		    Ext.Msg.alert('','项目经理不能为空');
			return;
		  }
		  
		 var departId=this.parent.getCmpByName("slSmallloanProject.departId").getValue(); 
		 if(Ext.isEmpty(departId)){
			    Ext.Msg.alert('','分公司不能为空');
				return;
		  }
		  
		var projectMoney=this.parent.getCmpByName("projectMoney").getValue();
    	if(Ext.isEmpty(projectMoney)){
    		 Ext.Msg.alert('','金额不能为空');
    	     return ;
    	}
    	if(parseFloat(projectMoney)==0){
    		 Ext.Msg.alert('','金额要大于0');
    	     return ;
    	}
    	
    	
		  
    	var flag=false;
    	var remainder=0;
    	
		Ext.Ajax.request({
            url :  __ctxPath + '/creditFlow/generalCredit/project/getRemainderPlCreditOrganization.do',
            params : {
				departId:departId
			},
        	method : 'POST',
        	async: false,
        	success : function(response, request) {
        	obj = Ext.util.JSON.decode(response.responseText);
        	 remainder = obj.remainder;
        	if(remainder-projectMoney<=0){
        			flag=true
        		}
        
			}

		});
		if(flag){
	        Ext.Msg.alert('操作信息','该分子公司的剩余授信额度为'+remainder+'元，小于'+projectMoney+'元,请重新填写项目金额');
	        return;
		}
		
		var cflag=false;
		
		var personId =this.parent.getCmpByName('person.id').getValue();
		Ext.Ajax.request({
            url :  __ctxPath + '/creditFlow/customer/person/getRemainderPerson.do',
            params : {
				personId:personId
			},
			async: false,
        	method : 'POST',
        	success : function(response, request) {
				var obj = Ext.util.JSON.decode(response.responseText);
        	 	cremainder = obj.remainder;
	        	if(cremainder-projectMoney<0){
	    			cflag=true;
	        	}
        
			}
			
		});
		if(cflag){
	        Ext.Msg.alert('操作信息','该客户的剩余授信额度为'+cremainder+'元，小于'+projectMoney+'元,请重新填写项目金额');
	        return;
		}
  	 /*var telphone=this.parent.getCmpByName("person.telphone").getValue(); 
  	  if(Ext.isEmpty(telphone)){
			 Ext.Msg.alert('', "<font color='#fff'>手机号不能为空</font>");
			  return;
			}
		 if(!isMobile(telphone)){
		   Ext.Msg.alert('', "<font color='#fff'>手机号格式不正确</font>");
		   return;
		 }
		 
		 var cardnumber=this.parent.getCmpByName("person.cardnumber").getValue(); 
		  if(Ext.isEmpty(cardnumber)){
		    Ext.Msg.alert('','身份证号码不能为空');
			return;
		  }*/
		 
    	
    	 var loginForm = this.up('formpanel');
       	loginForm.submit({
			   url : __ctxPath + "/flow/saveProcessActivity.do",
		        params: {
		        },
		        method: 'POST',
		        success: function(form,action,response) {
		          var obj = Ext.util.JSON.decode(response);
		        	if(obj.success==true){
						Ext.Msg.alert('状态', '项目：'+obj.data.projectNumber+'启动成功!');
						mobileNavi.pop();
		        	}else{
		        	   Ext.Msg.alert('状态', '项目：启动失败!');
		        	   mobileNavi.pop();
		        	}
		        },
		        failure: function(form,action,response){
					alert('启动项目失败,请联系管理员!');
		        }
			});
    }

});
