import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, ScrollView,Image } from '@tarojs/components'
import {  AtListItem,AtInput  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import Img from '../../../pic/productImg/123.jpg'

import { add, minus, asyncAdd } from '../../../actions/counter'

import './Read.scss'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Taro.Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  constructor(props) {

    super(props);
    this.state = {
	  tabList:[{id:'product1',name:'商品1',src:Img},{id:'product2',name:'商品2',src:Img},{id:'product3',name:'商品3',src:Img},{id:'product4',name:'商品4',src:Img}]
    };
  }
 
  //点击标签栏进入详情页面

  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
 
  
  render () {
	return (
		<ScrollView className='container'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          lowerThreshold='10'
          upperThreshold='10'
          style='height:658px'
          onScrolltoupper={this.updateList}
          onScrolltolower={this.appendNextPageList}
        >
          
          <View className='shop_floor'>
                {this.state.tabList.map((item, index) => {
                  return <View key={index} className='goods_item' onClick={this.navigateTo.bind(this,'/pages/index/shop/ShopDetail')}>
                    <View className='goods_img'>
                      <Image className='goods_img_image' src={item.src} mode='widthFix' lazyLoad />
                    </View>
                    <View className='goods_info'>
                      <Text className='goods_name' onClick={this.navigateTo.bind(this,'/pages/index/shop/ShopDetail')}>{item.name}</Text>
           
                    </View>
                  </View>
                })}
              
            
          </View>
        </ScrollView>
	
	
	
	  
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
