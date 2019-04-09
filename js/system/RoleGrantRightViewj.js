Ext.ns('App');

App.TreeLoader = Ext.extend(Ext.ux.tree.XmlTreeLoader, {
			processAttributes : function(attr) {
				if(attr.tagName == 'Function'){
					attr.leaf = true;
				}else if (attr.tagName == 'Item') {
					attr.loaded = true;
					attr.expanded = true;
				} else if (attr.tagName == 'Items') {
					attr.loaded = true;
					attr.expanded = true;
				}
			}
});

/**
 * 角色授权窗口
 * 
 * @param {}
 *            roleId
 */
var RoleGrantRightViewj = function(mmplanId) {
	debugger
	var mmplanId=mmplanId
	this.depTreePanel=new zhiwei.ux.TreePanelEditor({
		title:'公司',
		id:'depTreePanel',
		url : __ctxPath+'/system/treeCompanyOrganization.do?type=0',//1代表行政维度
		scope:this,
		autoScroll:true,
		showContextMenu:false,
		height:371,
		width:230,
		dblclick:function(node){
			console.log(node)
			if(node.id==0) return;
			var store=this.depGridPanel.getStore();
			var nodeId=node.id;
			var orgType=node.attributes.orgType;//点击的组织类型 只有点击部门才可以添加
//			if(orgType==2){//门店不能当做部门使用
				for(var i=0;i<store.getCount();i++){
					if(store.getAt(i).data.orgId==nodeId){
						return;
					}
				}
				var recordType=store.recordType;
				store.add(new recordType({
					orgId:node.id,
					orgName:node.text,
					isPrimary:store.getCount()>0?0:1
				}));
//			}else{
//				Ext.ux.Toast.msg('操作信息', '只能选择部门类型!');
//				return false;
//			}
			}
	});
	this.depGridPanel=new HT.GridPanel({
		id:'depGridPanel',
		width:400,
		height:371,
		isShowTbar:false,
		showPaging:false,
		autoScroll:true,
		title:'已选公司',
		url:__ctxPath+'/creditFlow/financingAgency/findPlManageMoneyPlan.do?mmplanId='+mmplanId,
		fields:['userOrgId','orgId','orgName','isPrimary'],
		columns:[{
				header:'部门名',
				dataIndex:'orgName'
			},{
				header:'部门id',
				dataIndex:'orgId',
				hidden : true
			},
		],
		listeners:{
			scope:this,
			'rowdblclick':function(grid,rowIndex,e){
				var userOrgId=grid.getStore().getAt(rowIndex).userOrgId;
				debugger
				/*	if(userOrgId){
						Ext.Ajax.request({
							url:__ctxPath+'/system/delUserOrg.do?userOrgId='+userOrgId,
							method:'Post',
							scope:this,
							success:function(response,options){
								Ext.ux.Toast.msg('操作信息','成功删除所属部门');
								this.depGridPanel.getStore().removeAt(rowIndex);
							}
						});
					}else{*/
						this.depGridPanel.getStore().removeAt(rowIndex);
					/*}*/
				}
		},
	});
	depPanel=new HT.HBoxPanel({
		id:'depPanel',
		items:[
			this.depTreePanel,
			this.depGridPanel
		]
	});
	//可选择的部门树
	var granWin = new Ext.Window({
				id : 'RoleGrantView',
				title : '设置权限',
				width : 600,
//				tbar:tbar,
				height : 450,
				modal : true,
				layout : 'fit',
				plain : true,
				maximizable : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [depPanel],
				buttons : [
						{
							text : '保存',
							iconCls:'btn-save',
							handler : function() {
								//alert(roleGrantView.getValue().toString());
								debugger
								console.log(Ext.getCmp('depGridPanel').getStore().getCount())
								var orgIds=[];
								for(var i=0;i< Ext.getCmp('depGridPanel').getStore().getCount();i++){
									orgIds.push(Ext.getCmp('depGridPanel').getStore().getAt(i).data.orgId);
								}
								console.log(mmplanId);
								console.log(orgIds)
								Ext.Ajax.request({
									url : __ctxPath + '/creditFlow/financingAgency/grantPlManageMoneyPlan.do',
									method : 'POST',
									params:{mmplanId:mmplanId,orgIds:orgIds/*,roleType:roleType*/},
									success : function(response, options) {
										Ext.ux.Toast.msg('操作提示','操作成功！');
										granWin.close();
									},
									failure : function(response, options) {
										Ext.ux.Toast.msg('操作信息','授权出错，请联系管理员！');
									},
									scope : this
								});
							}
						},{
							text : '取消',
							iconCls:'btn-cancel',
							handler:function(){
								granWin.close();
							}
						}
				]
			});
	
	
	granWin.show();

}
