> **前端页面根据后端返回数据生成对应组件样式**

## 后端

 1. 模型说明
 2. 参数设计
 3. json字段设计

## 前端

 1. 字段配置
 2. 全局配置
 3. 图片上传



## 后端

### 模型说明：

> 模型接口url以模型名命名   

    /products

> 模型接口使用rest api操作

    # 列表数据模型操作
    GET POST /products
    
    # 单个数据模型操作
    GET POST PUT DELETE /product/:id
    # 注:id 单个数据id


    # 列表数据
    GET /products
    {
        rs_code: 200,
        list: [
            { product },
            { product },
            { product }
        ],
        page: 1,
        limit_page: 20,
        total_page: 10
    }
    
    POST /products
    {
        rs_code: 200,
        rs_msn: "商品添加成功!",
        model: { product }
    }
    
    # 单个数据
    GET /product/:id
    {
        rs_code: 200,
        model: { product }
    }
    
    PUT /product/:id
    {
        rs_code: 200,
        rs_msn: "商品编辑成功!",
        model: { product }
    }
    
    DELETE /product/:id
    {
        rs_code: 200,
        rs_msn: "商品删除成功!"
    }

### 参数设计：

    GET /products +参数 
    
    #页码
    ?page=2
    
    # 筛选：字段名_筛选方式
    # 筛选方式：
    
    # eq 等于
    &product_title_eq="2017夏季新款韩版高腰显瘦裤裙花色雪纺七分休闲裤"
    
    # lt 小于
    &product_price_lt=100
    
    # lteq 小于等于
    &product_price_lteq=100
    
    # gt 大于
    &product_price_gt=100
    
    # gteq 大于等于
    &product_price_gteq=100
    
    # in 匹配数组里面任意一项
    &product_tag_in=[包邮, 折扣, 7天无条件退换]
    
    # matches Mysql LIKE
    &email_matches=@gmail.com


### json字段设计：

> 字段+后缀

    # 文字
    _text
    _textarea
    _email
    
    # 布尔
    _boolean
    _checkbox
    
    # 选项
    _select
    _tag
    _radio
    
    # 数字
    _number
    _int
    _float
    _decimal
    
    # 链接
    _url
    
    # 日期
    _time
    _month
    _date
    _range_date
    _datetime
    _range_datetime
    
    # 范围
    _range
    
    # 文件
    _file
    _img
    
    # 编辑器
    _editor
    # 编辑器图片附件
    _imgarr


## 前端
首先新建模型文件
    
    import { List, getColumns } from '../List'; # 引入所需依赖

例：project.js

    import React, { Component } from 'react';
    import { List, getColumns } from '../List';
    
    var projects_url = "/projects";
    
    const columns = getColumns([
      {
        title: "项目名称",
        width: 200,
        key: "title_text", 
        required: true, 
        message: '请填写项目名称!',
        filter_type: 'text',
        filter_key: 'q[title_text_cont]',
        filter_placeholder: '搜索项目名称'
      },
      {
        title: "缩略图",
        width: 200,
        key: "pic1_img", 
        required: true, 
        message: '请上传项目缩略图!',
        valuePropName: 'fileList',
        getValueFromEvent: true,
      },
      {
        title: "所属分类",
        width: 200,
        key: "cate_id", 
        keyName: "cate_name",
        required: true, 
        message: '请选择所属分类!',
        filter_type: 'select',
        filter_key: 'q[cate_id_eq]',
        filter_placeholder: '搜索所属分类'
      },
      {
        title: "子标题",
        key: "project_hd1_text", 
        required: true, 
        message: '请填写子标题!',
        listHidden: true
      },
      {
        title: "子标题对应内容",
        key: "project_bd1_editor",
        listHidden: true
      },
      {
        title: "项目开始时间",
        width: 200,
        key: "start_at",
        dataType: "object",
      },
      {
        title: "项目结束时间",
        width: 200,
        key: "end_at",
        dataType: "object",'
      },
      {
        title: "是否首页推荐",
        width: 100,
        key: "is_recommend_boolean",
        valuePropName: "checked",
        initialValue: false,
      },
      {
        title: "操作",
        width: 200,
        key: "action", 
        showHidden: true,
        addHidden: true,
        editHidden: true
      }
    ], "project");
    
    class Project extends Component {
    
      componentDidMount() {
      }
    
      render() {
    
        return (
          <List listsTitle={"项目管理"}
                addTitle={"添加项目"}
                showTitle={"项目详情"}
                addTips={"项目已添加"}
                updateTips={"项目已更新"}
                deleteTips={"项目已删除"}
                model={"project"}
                modelUrl={projects_url}
                columns={columns}
          />
        );
      }
    }
    
    export default Project;


### 字段配置 TO DO

    title 
    width
    key
    fixed
    required