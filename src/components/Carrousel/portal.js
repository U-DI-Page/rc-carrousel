import React, { Fragment } from 'react';
import Proptypes from 'prop-types';

import Carrousel from './Carrousel';
import Image from './Image';

/**
 * @constructor <Portal />
 * @function 图片组件入口
 */
export default class Portal extends React.PureComponent{
  constructor(props){
    super(...arguments);

    this.state={
      height:0
    }
  }

  // 作为属性方法 当image渲染完成后
  // 重置容器高度为中间图片的高度
  setContainerHeight=(height)=>{
    this.setState({ height });
  }
  
  render(){
    const { imageArr } = this.props;
    const { height } = this.state; 

    return(
      <Carrousel height={ height } { ...this.props }>
        {
          (state)=>{
            
            return imageArr.map((item, index)=>(
              <Image 
                {...item}
                { ...state } 
                key={ index } 
                index={ index } 
                setContainerHeight={ this.setContainerHeight } />
            ))
          }
        }
      </Carrousel>
    )
  }
}

Portal.propTypes={
  // children: Proptypes.func.isRequired,

  imageArr: Proptypes.array.isRequired,

  // 缩放比
  scale: Proptypes.number.isRequired,
  // 旋转木马 宽度
  width: Proptypes.number.isRequired,
  // 两侧图片位置
  align: Proptypes.string,
  // 两侧显示图片数
  perSideNum: Proptypes.number.isRequired,
  // 两侧宽度
  perSideWidth: Proptypes.number,

  // 自动轮播
  autoPlay: Proptypes.bool,
  // 自动轮播方向
  autoDirect: Proptypes.string,
  // 自动轮播 延时
  autoPlayDelay:Proptypes.number,

  // 右滑 回调
  onNextClick: Proptypes.func,
  // 左滑 回调
  onPreClick: Proptypes.func,
  // 切换回调
  onChange: propTypes.func
}

Portal.defaultProps={
  scale: 0.8,
  width: 600,
  align: 'center',
  perSideNum: 2,
  perSideWidth: 150,

  autoPlay: false,
  autoDirect: 'right',
  autoPlayDelay: 2,

  onNextClick: (e)=>{},
  onPreClick: (e)=>{}

}