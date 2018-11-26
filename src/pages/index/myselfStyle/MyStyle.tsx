import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,ScrollView ,Image} from '@tarojs/components'
import { AtTabs, AtTabsPane,AtPagination,AtTag,AtInput  } from 'taro-ui'
import  MyPage from '../myPage/MyPage'
import Imageurl1 from '../../../pic/icon/up.png'
import Imageurl2 from '../../../pic/icon/down.png'


import './myStyle.scss'

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
  constructor(props) {

    super(props);
    this.state = {
      current: 0,
	  contentList:[
	  {content1 : '被内容撑开被内容撑开被内容撑开被被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181020'},
	  {content1 : '被内容撑开被内容撑开被内容撑开撑开',content2 : '20180920'},
	  {content1 : '被内容撑开被内容容撑开',content2 : '20180820'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20180720'},
    {content1 : '被内容撑开被内容撑开被内容撑开被被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20171020'},
    {content1 : '被内容撑开被内容撑开被内容撑开撑开',content2 : '20170920'},
    {content1 : '被内容撑开被内容容撑开',content2 : '20170820'},
    {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20170720'}

	  ],
      pageSize:10,
      currentPage:1,
      titleFlag:1,
      dateFlag:1,
      titleImage : Imageurl1,
      dateImage :Imageurl1
    };
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  //点击标签栏出发的事件


  handleClicks (value) {
    this.setState({
      current: value
    })
  }

  handleChange(value1){
    this.setState({
      currentPage: value1
    })
  }

  //回到首页
  pageleftOne(){
    this.setState({
      currentPage: 1
    })
  }
  //回到上一页
  pageleft(){
   const currentPage =  this.state.currentPage
    if(currentPage <=1) return
    this.setState({
      currentPage: currentPage-1
    })
  }
  //进入下一页
  pageRight(){
    const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
    if(currentPage >=pageSize) return
    this.setState({
      currentPage: currentPage+1
    })
  }
  //进入尾页
  pageRightLast(){
    const pageSize = this.state.pageSize
    this.setState({
      currentPage: pageSize
    })
  }
  clickEnter(){
    const value = this.state.currentPage
    console.log(value)
  }

  //标题排序
  titleSort(){
      const titleFlag = this.state.titleFlag
     // const titleImage = this.state.titleImage
   //console.log(titleFlag)
    if(titleFlag == 1){

      const titleImages  = Imageurl2
      const titleFlag =2;
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content1;
        var val2 = obj2.content1;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      console.log(list.sort(compare))
     // console.log(titleImages)
      //console.log(titleFlag)
      this.setState({
        titleImage:titleImages,
        titleFlag:titleFlag,
        contentList:lists
      })
    }else{
      const titleImage  = Imageurl1
      const titleFlag = 1
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content1;
        var val2 = obj2.content1;
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      this.setState({
        titleImage:titleImage,
        titleFlag:titleFlag,
        contentList:lists
      })
    }
  }
  //日期排序
  dateSort(){
    const dateFlag = this.state.dateFlag
    // const titleImage = this.state.titleImage
    //console.log(titleFlag)
    if(dateFlag == 1){
      const dateImage  = Imageurl2
      const dateFlag =2
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content2;
        var val2 = obj2.content2;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      console.log(list.sort(compare))
      // console.log(titleImages)
      //console.log(titleFlag)
      this.setState({
        dateImage:dateImage,
        dateFlag:dateFlag,
        contentList:lists
      })
    }else{
      const dateImage  = Imageurl1
      const dateFlag = 1;
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content2;
        var val2 = obj2.content2;
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      this.setState({
        dateImage:dateImage,
        dateFlag:dateFlag,
        contentList:lists
      })
    }
  }
  render () {

	const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
	const contentList = this.state.contentList
    const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
	return (

	  <AtTabs current={this.state.current}   tabList={tabList} onClick={this.handleClicks.bind(this)}>

		<AtTabsPane  current={this.state.current} index={0} >
		 <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 650px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;text-align: center;height:736px;' >
       <view class='sort-wrap'>
         <view class='sort-btn'>
           新闻
         </view>
         <view class='sort-btn' data-index="" onClick={this.titleSort.bind(this)}>
           标题
           <view className="titleImage">
           <Image src={this.state.titleImage} ></Image>
           </view>
         </view>
         <view class='sort-btn' data-index="" onClick={this.dateSort.bind(this)}>
           日期
           <view className="titleImage">
           <Image src={this.state.dateImage}></Image>
           </view>
         </view>
       </view>
				{this.state.contentList.map((contentMap,index)=>{
					return (<View className='box' >
								<View className='contentBox' style="background-color: darkkhaki;">
								{contentMap.content1}
							  </View>
							   <View className='dateBox' style="background-color: lavender;">{contentMap.content2}</View>
				</View>)
				})}

				<AtPagination
					  icon
					  total='50'
					  pageSize='10'
					  current='1'
					>
					</AtPagination>

		  </View>
		</ScrollView>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 530px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;text-align: center;height:auto;' >
       <view className='sort-wrap'>
         <view className='sort-btn'>
           新闻
         </view>
         <view className='sort-btn' data-index="" onClick={this.titleSort.bind(this)}>
           标题
           <view className="titleImage">
             <Image src={this.state.titleImage}></Image>
           </view>
         </view>
         <view className='sort-btn' data-index="" onClick={this.dateSort.bind(this)}>
           日期
           <view className="titleImage">
             <Image src={this.state.dateImage}></Image>
           </view>
         </view>
       </view>
				{this.state.contentList.map((contentMap,index)=>{
					return (<View className='box' >
            <View className='contentBox' style="background-color: darkkhaki;">
              {contentMap.content1}
            </View>
            <View className='dateBox' style="background-color: lavender;">{contentMap.content2}</View>
          </View>)
				})}
			  <MyPage
          pageSize = {pageSize}
          currentPage = {currentPage}
        />
		  </View>
		</ScrollView>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 554px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;height:auto;' >
       <view className='sort-wrap'>
         <view className='sort-btn'>
           新闻
         </view>
         <view className='sort-btn' data-index="" onClick={this.titleSort.bind(this)}>
           标题
           <view className="titleImage">
             <Image src={this.state.titleImage}></Image>
           </view>
         </view>
         <view className='sort-btn' data-index="" onClick={this.dateSort.bind(this)}>
           日期
           <view className="titleImage">
             <Image src={this.state.dateImage}></Image>
           </view>
         </view>
       </view>
				{this.state.contentList.map((contentMap,index)=>{
          return (<View className='box' >
            <View className='contentBox' style="background-color: darkkhaki;">
              {contentMap.content1}
            </View>
            <View className='dateBox' style="background-color: lavender;">{contentMap.content2}</View>
          </View>)
				})}

				<view className='pageBox'>
          <view className = 'pageleftOne'>
            {currentPage ==1 ?
            <AtTag
           name='<<'
           type='primary'

           active
           onClick={this.pageleftOne.bind(this)}
         >
           {'<<'}
         </AtTag> :
              <AtTag
              name='<<'
              type='primary'

              onClick={this.pageleftOne.bind(this)}
              >
              {'<<'}
              </AtTag>}
       </view>
       <view className = 'pageleft'>
         {currentPage == 1 ?
           <AtTag
             name='<'
             type='primary'
             active
             onClick={this.pageleft.bind(this)}
           >
             {'<'}
           </AtTag> :
           <AtTag
           name='<'
           type='primary'
           onClick={this.pageleft.bind(this)}
           >
           {'<'}
           </AtTag>
         }

       </view >
          <view onkeydown ={this.clickEnter.bind(this)}>
          <AtInput
            name='value2'
            type='number'
            placeholder='请输入数字'
            value={this.state.currentPage}
            onChange={this.handleChange.bind(this)}
          />

          </view>
          <view >
              <AtTag
                name={this.state.pageSize}
                type='primary'

              >
                {this.state.pageSize}
              </AtTag>
          </view>
       <view className = 'pageRight'>
         {currentPage == pageSize ?
         <AtTag
           name='>'
           type='primary'

           active
           onClick={this.pageRight.bind(this)}
         >
           {'>'}
         </AtTag>
           :
           <AtTag
             name='>'
             type='primary'


             onClick={this.pageRight.bind(this)}
           >
             {'>'}
           </AtTag>}
       </view>
       <view className = 'pageRightLast'>
         {currentPage == pageSize ?
         <AtTag
           name='>>'
           type='primary'
            active

           onClick={this.pageRightLast.bind(this)}
         >
           {'>>'}
         </AtTag>:
           <AtTag
             name='>>'
             type='primary'

             onClick={this.pageRightLast.bind(this)}
           >
             {'>>'}
           </AtTag>}
       </view>
        </view>
		  </View>

		</ScrollView>

        </AtTabsPane>

      </AtTabs>

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
