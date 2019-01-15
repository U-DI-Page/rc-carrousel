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

    this.state={ cStyle:getImageStyle(props) };
  }

  static getDerivedStateFromProps(nProps, preState){
    // console.log(nProps.index, getImageStyle(nProps))
    return { cStyle:getImageStyle(nProps) };
  }

  render(){
    const { src, imageWidth } = this.props;
    const { cStyle } = this.state;

    return(
      <li style={ cStyle } className={ Styles.picItem }>
        <img width={ imageWidth } src={ src } />
      </li>
    )
  }
}

Image.propTypes={
  //图片路径
  src: Proptypes.string.isRequired
}