import React from 'react';
import Proptypes from 'prop-types';

import { getBoxMember } from './util';
// 图片
import leftPic from './assets/left.png';
import rightPic from './assets/right.png';
// 样式
import Styles from './Carrousel.module.scss';

/**
 * @constructor <Carrousel />
 * @function 旋转木马组件
 */
export default class Carrousel extends React.PureComponent{
  constructor(props){
    super(...arguments);

    const { perSideNum, width, perSideWidth, scale, imageArr } = props;
    const imageWidth = width - 2 * perSideWidth;

    this.state={
      ...this.getAreaBox(0, imageArr),

      imageArr,
      notClick:false,
      // 组件属性
      perSideNum,
      width,
      perSideWidth,
      imageWidth,
      scale
    };

    this.carrousel = React.createRef();
  }

  componentDidMount(){
    const { autoPlay } = this.props;
    
    autoPlay && this.setAutoPlay();

    window.addEventListener('transitionend', this.handleTransitionEnd);
  }

  componentWillUnmount(){
    window.removeEventListener('transitionend', this.handleTransitionEnd);
  }

  // 将图片组 通过索引划分区域
  getAreaBox=(index, imageArr)=>{
    const { perSideNum } = this.props;
    const size = imageArr.length;
    const halfSize = size / 2;
    // 每边数量不能超过二分之一总数
    const perSize = perSideNum < halfSize ? perSideNum : halfSize;
    // 首次渲染 设定中间区域显示图片索引
    const center = index;
    // 定义两个数组存放索引
    const left = getBoxMember(index, perSize, size, 'left');
    const right = getBoxMember(index, perSize, size, 'right');

    return{ center, left, right };
  }

  // 下一张
  handleNextClick=()=>{
    // 防止动画过程多次点击
    if(this.state.notClick) return;
    this.setState({ notClick:true })

    const { center:c, left:l, right:r } = this.state;
    const { onNextClick, onChange , imageArr } = this.props;
    const last = imageArr.length - 1;
    // 中间 图片索引
    const center = imageArr[c - 1] ? c - 1 : last;
    // 左边 图片索引集合
    const left = l.map(item=>{
        const newItem = imageArr[item - 1] ? item -1 : last;
        return newItem;
    });
    // 右边图片索引集合
    const right = r.map(item=>{
      const newItem = imageArr[item - 1] ? item -1 : last;
      return newItem;
    });

    this.setState({ center, left, right },()=>{
      typeof onNextClick === 'function' && onNextClick(imageArr[center]);
      typeof onchange === 'function' && onChange(imageArr[center]);
    });
  }

  // 上一张
  handlePreClick=()=>{
    // 防止动画过程多次点击
    if(this.state.notClick) return;
    this.setState({ notClick:true });

    const { center:c, left:l, right:r } = this.state;
    const { onPreClick,onChange , imageArr } = this.props;
    // 中间 图片索引
    const center = imageArr[c + 1] ? c + 1 : 0;
    // 左边 图片索引集合
    const left = l.map(item=>{
      const newItem = imageArr[item + 1]? item + 1 : 0;
      return newItem;
    });
    // 右边图片索引集合
    const right = r.map(item=>{
      const newItem = imageArr[item + 1]? item + 1 : 0;
      return newItem;
    });

    this.setState({ center, left, right }, ()=>{
      typeof onPreClick === 'function' && onPreClick(imageArr[center]);
      typeof onchange === 'function' && onChange(imageArr[center]);
    });
  }

  // 设置自动轮循
  setAutoPlay=()=>{
    const { autoDirect,autoPlayDelay } = this.props;

    this.autoPlayInterval = setInterval(() => {
      autoDirect === 'left' ? this.handlePreClick() : this.handleNextClick();
    }, autoPlayDelay || 2000);
  }

  // 监听动画结束事件
  handleTransitionEnd=()=>{
    this.setState({ notClick:false })
  }

  // 鼠标移入事件
  handleMouseEnter=()=>{
    this.autoPlayInterval && clearInterval(this.autoPlayInterval);
  }

  // 鼠标移出事件
  handleMouseLeave=()=>{
    const { autoPlay } = this.props;

    autoPlay && this.setAutoPlay();
  }

  render(){
    const { width, perSideWidth, height } = this.props;
    const { perSideNum } = this.state;
    // 计算按钮区域宽度 位置
    // const perSideW = (width - imageWidth) / 2;
    const zIndex = perSideNum + 1;

    const leftSideStyle = {
      left: 0,
      width: perSideWidth,
      height,
      zIndex
    };
    
    const rightSideStyle = {
      right: 0,
      width: perSideWidth,
      height,
      zIndex
    }

    return (
      <ul 
        ref={ this.carrousel }
        style={{ width }}
        className={ Styles.carrousel }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
      >
        {/* 左边按钮区域 */}
        <li 
          className={ Styles.btnArea }
          style={ leftSideStyle } 
          onClick={ this.handlePreClick }
        >
          <img className={ Styles.leftBtn } src={ leftPic } />
        </li>
          {/* 图片组 */}
          {this.props.children(this.state)}
          {/* { this.renderImgArr() } */}
        {/* 右边按钮区域 */}
        <li 
          style={ rightSideStyle } 
          className={ Styles.btnArea }
          onClick={ this.handleNextClick }
        >
          <img className={ Styles.rightBtn } src={ rightPic } />
        </li>

      </ul>
    )
  }
}

Carrousel.propTypes={

  children: Proptypes.func.isRequired,

  // 缩放比
  scale: Proptypes.number.isRequired,
  // 旋转木马 宽度
  width: Proptypes.number.isRequired,
  // // 高度
  // height: Proptypes.number.isRequired,
  // 图片宽度
  imageWidth:Proptypes.number.isRequired,
  // 两侧显示图片数
  perSideNum: Proptypes.number.isRequired,

  // 自动轮播
  autoPlay: Proptypes.bool,
  // 自动轮播方向
  autoDirect: Proptypes.string,
  // 自动轮播 延时
  autoPlayDelay:Proptypes.number,

  // 右滑 回调
  onNextClick: Proptypes.func,
  // 左滑 回调
  onPreClick: Proptypes.func
}