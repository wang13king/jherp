/**
 * @author
 * @class PlBidInfoViewList
 * @extends Ext.Panel
 * @description [PlBidInfo]管理
 * @company 智维软件
 * @createtime:
 */
PlBidInfoViewList = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		this.title="提前赎回列表"
		PlBidInfoViewList.superclass.constructor.call(this, {
					id : 'PlBidInfoViewList',
					title : this.title,
					iconCls : "menu-finance",
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		
		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-detail',
				text : '查看详细信息',
				xtype : 'button',
				scope : this,
				handler : this.seeInfo
			}]
		});

		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			region : 'north',
			border : false,
			height : 50,
			anchor : '96%',
			layoutConfig: {
               align:'middle'
            },
             bodyStyle : 'padding:10px 10px 10px 10px',
            items : [{
		     		columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '投资人',
						name : 'investPersonName',
						anchor : "100%",
						xtype : 'textfield'
					},{
						fieldLabel : '投资金额',
						name : 'buyMoney',
						anchor : "100%",
						xtype : 'numberfield'
					}]
		     	},{
		     		columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '投资项目',
						name : 'mmName',
						anchor : "100%",
						xtype : 'textfield'
					},{
						fieldLabel : '投资期限',
						name : 'investDue',
						anchor : "100%",
						xtype : 'numberfield'

					}]
		     	},{
		     		columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '投资时间',
						name : 'bidtime',
						anchor : "100%",
						xtype : 'datefield',
						format : 'Y-m-d'
					},{
						fieldLabel : '年化收益率',
						name : 'rate',
						anchor : "100%",
						xtype : 'numberfield'
					}]
		     	},{
		     		columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '到',
						name : 'endtime',
						anchor : "100%",
						hidden:false,
						xtype : 'datefield',
						format : 'Y-m-d'
					}]
		     	},{
	     			columnWidth :.15,
					layout : 'form',
					border : false,
					labelWidth :50,
					items :[{
						text : '查询',
						xtype : 'button',
						scope : this,
						style :'margin-left:30px',
						anchor : "90%",
						iconCls : 'btn-search',
						handler : this.search
					},{
						text : '重置',
						style :'margin-left:30px',
						xtype : 'button',
						scope : this,
						anchor : "90%",
						iconCls : 'btn-reset',
						handler : this.reset
					}]
	     		}]
		});
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}
		this.gridPanel = new HT.GridPanel({
			tbar : this.topbar,
			plugins : [summary],
			region : 'center',
			id : 'PlBidInfoGrid',
			url : __ctxPath + "/creditFlow/financingAgency/getEarlyRedemptionListPlEarlyRedemption.do",
			fields : [{
				name : 'orderId',
						type : 'int'
					},'runId','earlyRedemptionId','investPersonName', 'investPersonId','mmName', 'buyMoney', 'investDue', 'rate','buyDate','startinInterestTime','earlyDate'],
			columns : [{
						header : 'earlyRedemptionId',
						align:'center',
						dataIndex : 'earlyRedemptionId',
						hidden : true
					},{
						header : 'investPersonId',
						align:'center',
						dataIndex : 'investPersonId',
						hidden : true
					},{
						header : '投资人姓名',
						dataIndex : 'investPersonName',
						align:'center',
					},{
						header : '投资名称',
						dataIndex : 'mmName'
					},{
						header : '投标金额（元）',
						align:'right',
						dataIndex : 'buyMoney',
						summaryType : 'sum'
					},{
						header : '投标期限（个月）',
						align:'center',
						dataIndex : 'investDue',
						align:'right'
					},{
						header : '投标年化利率（%）',
						dataIndex : 'rate',
						align:'right'
					},{
						header : '投资日期',
						align:'center',
						dataIndex : 'buyDate'
					},{
						header : '计息起期',
						align:'center',
						dataIndex : 'startinInterestTime'
					},{
						header : '赎回日期',
						align:'center',
						dataIndex : 'earlyDate'
					}]
			});


	},
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	seeInfo : function(){debugger
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			var record =s[0];
			var contentPanel = App.getContentPanel();
			var seeManageMoneyInfo = new SeeManageMoneyInfo({
				orderId : record.data.orderId,
				userName: record.data.investPersonName,
				bidName : record.data.mmName,
				runId  :record.data.runId,
				earlyRedemptionId :record.data.earlyRedemptionId,
				investPersonId : record.data.investPersonId,
				titles:2
			})
			contentPanel.add(seeManageMoneyInfo);
			contentPanel.activate('SeeManageMoneyInfo_'+record.data.orderId);
				
		}
	},
});
