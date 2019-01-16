import React from 'react';
import Proptypes from 'prop-types';

import { getImageStyle } from '../util';
// 样式
import Styles from './Image.module.scss';

/**
 * 图片显示组件
 * @constructor <Image />
 * @function 控制图层样式
 */
export default class Image extends React.Component{
  constructor(props){
    super(...arguments);

    this.state = { cStyle: getImageStyle(props) };

    this.img = React.createRef();
  }

  static getDerivedStateFromProps(nProps, preState){
    return { cStyle: getImageStyle(nProps) };
  }


  // 图片加载完成
  handleImgOnLoad=()=>{
    const { index, center, setContainerHeight } = this.props;

    if(index === center){
      setContainerHeight && setContainerHeight(this.img.current.clientHeight);
    }
  }

  render(){
    const { src, imageWidth } = this.props;
    const { cStyle } = this.state;

    return(
      <li style={ cStyle } className={ Styles.picItem }>
        <img 
          ref={ this.img } 
          width={ imageWidth } 
          src={ src } 
          onLoad={ this.handleImgOnLoad }
        />
      </li>
    )
  }
}

Image.propTypes={
  // 图片路径
  src: Proptypes.string.isRequired,
  // 索引
  index: Proptypes.number.isRequired,
  // 重置容器高度方法
  setContainerHeight: Proptypes.func.isRequired
}