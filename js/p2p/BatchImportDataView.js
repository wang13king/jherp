

SlPlansToChargeView = Ext.extend(Ext.Panel,{
	// 构造函数
	constructor : function(_cfg) {
		if(typeof(_cfg.businessType)!="undefined"){
			this.businessType=_cfg.businessType;
		}
		Ext.applyIf(this, _cfg);
		  	this.isGranted = function(a){
			var b = "";
			if("LeaseFinance"==this.businessType){
				b="_"+this.businessType;
			}else if(this.businessType == "SmallLoan"){
				b="_"+this.businessType;
			}
		    if(this.plat=='p2p'){
		    	return isGranted(a+b+"_p2p");
		    }else{
		    	return isGranted(a+b);
		    }
			
		}
		// 必须先初始化组件
		this.initUIComponents();
		SlPlansToChargeView.superclass.constructor.call(this, {
			id : 'SlPlansToChargeView',
			layout:'anchor',
	        anchor : '100%',
	        iconCls:"menu-finance",
			items : this.gridPanel,
			title:'基础收费类型'
		});
	},// end of the constructor
	// 初始化组件

	initUIComponents : function() {
		this.datafield=new Ext.form.DateField( {
			format : 'Y-m-d',
			allowBlank : false
		})

		this.comboType= new Ext.form.ComboBox({
		   	mode : 'local',
		   	displayField : 'name',
		   	valueField : 'id',
		   	editable : false,
		   	triggerAction : 'all',
		   	width : 70,
		   	autoload : false,
		   	store : new Ext.data.SimpleStore({
	       		fields : ["name", "id"],
           		data : [["百分比 (%)", "0"],["固定金额", "1"]]
			})
		})
		
		this.comboType1= new Ext.form.ComboBox({
			mode : 'local',
			displayField : 'name',
			valueField : 'id',
			editable : false,
			triggerAction : 'all',
			width : 70,
			store : new Ext.data.SimpleStore({
				fields : ["name", "id"],
				data : [["公有", "0"],["私有", "1"]]
			})
		})
		
		this.gridPanel = new HT.EditorGridPanel( {
			clicksToEdit : 1,
			border : false,
			isShowTbar : false,
			showPaging : false,
			autoHeight : true,
			// 使用RowActions
			// rowActions : true,
//				id : 'SlPlansToChargeView',
//			url : __ctxPath + "/creditFlow/finance/listSlPlansToCharge.do?businessType="+this.businessType,
			fields : [ {
				name : 'plansTochargeId'
			}, {
				name : 'name'
			},{
			  name : 'chargeStandard'
			},{
				name : 'sort'
			},{
				name : 'isType'
			},{
				name : 'businessType'
			}],
			tbar : [ {
				text : '增加',
				iconCls : 'btn-add',
				scope : this,
				hidden : isGranted('_create_zxpz')?false:true,
				handler : this.createRs
			}, '-', {
				iconCls : 'btn-del',
				scope : this,
				text : '删除',
				hidden : isGranted('_remove_zxpz')?false:true,
				handler : this.removeSelRs
			}, '-', {
				iconCls : 'btn-save' + '',
				scope : this,
				text : '保存',
				hidden : isGranted('_save_zxpz')?false:true,
				handler : this.saveRs
			}, '-', {
				iconCls : 'btn-refresh' + '',
				scope : this,
				text : '刷新',
				hidden : isGranted('_save_zxpz')?false:true,
				handler : this.refresh
			}/*, '-', {
				iconCls : 'btn-save',
				scope : this,
				text : '保存',
				handler : this.saveRs
			} */],
			columns : [ {
				header : '费用类型',
				dataIndex : 'name',
				align:'center',
				editor :new Ext.form.TextField( {
					allowBlank : false
				})
			},{
				header : '费用标准',
				align:'center',
				dataIndex : 'chargeStandard',
				editor :new Ext.form.TextField( {
					allowBlank : false
				})
			},{
				header : '类型 ',
				dataIndex : 'isType',
				align:'center',
				editor :this.comboType1,
				renderer:ZW.ux.comboBoxRenderer(this.comboType1)
			},{
				header : '排序值 ',
				align:'center',
				dataIndex : 'sort',
				editor :new Ext.form.NumberField( {
					allowBlank : false
				})
			},{
				header : '业务类型 ',
				align:'center',
				dataIndex : 'businessType',
				hidden : true,
				editor :new Ext.form.NumberField( {
					allowBlank : false
				})
			}]
		// end of columns
		});
	},
	createRs : function() {},

	getGridDate : function() {},
	refresh :function(){
	this.gridPanel.getStore().reload();
		
	},
	saveRs : function() {},
	removeSelRs : function() {}
});