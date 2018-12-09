import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane,AtTabBar,AtList, AtListItem,AtInput,AtSwipeAction  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import  AriticleTitle from './ariticleTitle/AriticleTitle'
import  MySearch from './search/Search'
import  Product from './product/product'
import  SearchResult from './searchResult/SearchResult'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion


export default  class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
   static options = {
    addGlobalClass: true
  }

    config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor(...props) {
    super(...props);
  }
  componentWillMount () {
    //console.log(this.$router)
    const current = this.$router.params.current ? this.$router.params.current:0
    const currents = parseInt(current)
    const currentTab = this.$router.params.currentTab ? this.$router.params.currentTab:0
    const searchResult = this.$router.params.searchResult ? this.$router.params.searchResult:0
    //console.log(SearchResult)
    //console.log("currentTab ==== " + currentTab)
    this.state = {
      current: currents,
      currentTab:currentTab,
      searchResult:searchResult
    }
  }

  componentDidShow () { }

  componentDidHide () { }


 // tab切换
  handleClick = (e) => {
    const urls = "/pages/index/index?current="+e
    Taro.navigateTo({url:urls})

  }

  render () {
	return (
	 <View className=''>
		 {this.state.current == 0 && <AriticleTitle>{this.state.currentTab}</AriticleTitle>}
		 {this.state.current == 1 && this.state.searchResult == 0 &&<MySearch></MySearch>}
		 {this.state.current == 2 && <Product>{this.state.currentTab}</Product>}
		 {this.state.current == 1 && this.state.searchResult == 1 && <SearchResult></SearchResult>}
		<AtTabBar
		  fixed
		  color="#909399"
          current={this.state.current}
          iconSize="25"
          fontSize="12"
		  tabList={[
			{ title: '新闻', iconType: 'bullet-list', text: 'new' },
			{ title: '搜索', iconType: 'search' },
			{ title: '商品', iconType: 'shopping-cart' }
		  ]}
		  onClick={this.handleClick}
		  current={this.state.current}
		/>
	  </View>

    )
  }
}
