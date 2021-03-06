
Contract= Ext.extend(Ext.Panel, {
			  projectId:1,
		      businessType:6584,
		      oppositeType:307,
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				Contract.superclass.constructor.call(this, {
						
							border:false,
							title:"生成合同/法务审核",
							items : []
						})
				
			
				
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var jsArr = [__ctxPath + '/js/commonFlow/ExtUD.Ext.js',
				 __ctxPath+'/js/commonFlow/EnterpriseShareequity.js',

				  __ctxPath+'/js/creditFlow/guarantee/enterpriseBusiness/enterpriseBusinessUI.js',
				   __ctxPath+'/js/creditFlow/guarantee/enterpriseBusiness/bankInfoPanel.js',
				   __ctxPath+'/js/slContract/SlContractView.js'
				];
				$ImportSimpleJs(jsArr, this.constructPanel,this);
			
			
			},
			constructPanel:function(){
				
				
				 var title="企业客户基本信息";
			        this.perMain = "";
				    if(this.oppositeType == 307) 
				    {
					    this.perMain = new ExtUD.Ext.PeerPersonMainInfoPanel({
						isPersonNameReadOnly : true
					    });
					    title="个人客户基本信息";
				    } 
				    else 
				    {
					    this.perMain = new ExtUD.Ext.PeerMainInfoPanel({
						projectId : this.projectId,
						isEnterprisenameReadonly : true,
						bussinessType:'enterprise', //业务类别
						isEnterpriseShortNameReadonly : true
					    });
				    };	
				
				this.enterpriseBusinessProjectInfoPanel=new enterpriseBusinessProjectInfoPanel();
                
				this.bankInfoPanel=new bankInfoPanel();
				this.slContractView=new SlContractView({projId:this.projectId,businessType:this.businessType});
				this.outPanel = new Ext.Panel({
							modal : true,
							labelWidth : 100,
							buttonAlign : 'center',
							layout : 'form',
							border : false,
							frame:true,
							defaults : {
								anchor : '100%',
								xtype : 'fieldset',
								columnWidth : 1,
								collapsible : true,
								autoHeight : true
							},
							labelAlign : "right",
							items : [{
								title : '企业信息',
								items : [this.perMain]
							}, {
								title : '项目信息',
								bodyStyle : 'padding-left:8px',
								items : [this.enterpriseBusinessProjectInfoPanel]
							},{
								title : '银行信息',
								items : [this.bankInfoPanel]
							},{
								title : '合同确认',
								items : [this.slContractView]
							}, {
								title : '意见与说明',
								layout : "form",
								items : [{
									xtype : "textarea",
									fieldLabel : "说明",
									name : "comments",
									anchor : "100%",
									blankText : "说明不能为空，请正确填写!",
									allowBlank : false
								}]
							}]
		
						});
		
				this.add(this.outPanel);
				this.doLayout();

			}, 
		saveBusDatas:function(formPanel){
			Ext.MessageBox.alert("提示","保存成功！");		  
		}
})
