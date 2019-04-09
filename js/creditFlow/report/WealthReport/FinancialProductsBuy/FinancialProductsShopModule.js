/**
 * @author
 * @class PlManageMoneyPlanView
 * @extends Ext.Panel
 * @description [PlManageMoneyPlan]管理
 * @company 智维软件
 * @createtime:
 */
FinancialProductsShopModule = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		FinancialProductsShopModule.superclass.constructor.call(this, {
					id : 'FinancialProductsShopModule'+this.type,
					title : '团队业绩统计' ,
					region : 'center',
					layout : 'border',
					iconCls:"btn-tree-team43",
					items : [this.searchPanel,this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	
	initUIComponents : function() {
		var firstDate = new Date();
		firstDate.setDate(1);
		var endDate = new Date(firstDate);
		endDate.setMonth(firstDate.getMonth()+1);
		endDate.setDate(0);
		
		var xlsButton = new Ext.Button({
			text : 'excel',
			iconCls : 'btn-xls'
		});
		
		this.toolbar = new Ext.Toolbar({
			autoWidth : true,
			layout : 'hbox',
			defaults : {
				anchor : '10%,10%'
			},
			items : [xlsButton]
		});
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			region : 'north',
			height : 20,
			anchor : '100%',
			keys : [{
				key : Ext.EventObject.ENTER,
				fn : this.search,
				scope : this
			}, {
				key : Ext.EventObject.ESC,
				fn : this.reset,
				scope : this
			}],
			layoutConfig: {
               align:'middle'
            },
			items : [{ 
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				items : [ {
					labelWidth:70,    
					fieldLabel : '投资日期起',
					name : 'investTime_GE',
					xtype :'datefield',
					anchor : '100%',
					format : 'Y-m-d',
					value:firstDate
				}] 
			},{ 
				columnWidth : .15,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				style : 'padding-left:15px;',
				labelWidth:15,
				items : [{
					fieldLabel : '至',
					name : 'investTime_LE',
					xtype :'datefield',
					anchor : '90%',
					format : 'Y-m-d',
					value:endDate
				}] 
			},{
				columnWidth : .15,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:100px;',
				items : [{
					text : '查询',
					scope : this,
					iconCls : 'btn-search',
					handler:this.search
				}]
			}]
		});
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}


		this.gridPanel = new HT.GridPanel({
			tbar:this.toolbar,
			region : 'center',
			plugins : [summary],

			url : __ctxPath+ "/system/otherReportPlmmInfoWealthReport.do",
			fields : [ 'userName','shopName','achievement','foldingAchievement','total'],
			
			columns : [ {
						header : '下级客户',
						width : 120,
						dataIndex : 'userName'
					},{
						header : '门店名称',
						width : 120,
						dataIndex : 'shopName'
					}, {
						header : '订单数量',
						width : 120,
						dataIndex : 'total',
							summaryType : 'sum'
					}, {
						header : '规模业绩(万元)',
						dataIndex : 'achievement',
						width : 60,
						align : 'center',
						summaryType : 'sum'
							
					}, {
						header : '折标业绩(万元)',
						align : 'center',
						dataIndex : 'foldingAchievement', 
						summaryType : 'sum'
					}]
			});
		xlsButton.on('click', function(xlsButton) {
			window.open(__ctxPath + '/system/outResultPutExcelWealthReport.do','_blank');
		}, this);

	},
	// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	}
	
});
