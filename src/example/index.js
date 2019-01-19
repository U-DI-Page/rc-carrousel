import React from 'react';

import Carrousel from '../components/Carrousel'
import { imageArr } from './config';
import './index.scss';

export default class Example extends React.PureComponent{

  render(){
    
    return (
      <div className="wrapper">
        <section className="sec header">
          <p className="title">一个React旋转木马轮播图组件</p>
          <p className="title">rc-carrousel</p>
        </section>
        <section className="sec example">
          <div className="des">基础配置</div>
          <div className="showArea">
            <Carrousel 
              imageArr={ imageArr }
            />
          </div>
        </section>
        <section className="sec example">
          <div className="des">设置渐变和两侧图片数量  gradient = true perSideNum=5 </div>
          <div className="showArea">
            <Carrousel 
              width={ 600 }
              gradient={ true }
              perSideNum={ 5 }
              imageArr={ imageArr }
            />
          </div>
        </section>
        <section className="sec example">
          <div className="des">自动轮播 鼠标移入暂停</div>
          <div className="showArea rowEx">
            <div>
              <Carrousel 
                autoPlay
                autoDirect="left"
                width={ 600 }
                imageArr={ imageArr }
              />
            </div>
            <div>
              <Carrousel 
                autoPlay
                autoDirect="right"
                width={ 600 }
                imageArr={ imageArr }
              />
            </div>
          </div>
        </section>
        <section className="sec example">
          <div>调整组件样式 align = top || center || bottom</div> 
          <div className="showArea rowEx">
            <div>
              <Carrousel 
                align="top"
                width={ 400 }
                perSideWidth={ 80 }
                imageArr={ imageArr }
              />
            </div>
            <div>
              <Carrousel 
                align="center"
                width={ 400 }
                perSideWidth={ 80 }
                imageArr={ imageArr }
              />
            </div>
            <div>
              <Carrousel 
                align="bottom"
                width={ 400 }
                perSideWidth={ 80 }
                imageArr={ imageArr }
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}