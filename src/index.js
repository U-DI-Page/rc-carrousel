import React,{ Fragment } from 'react';
import ReactDOM from 'react-dom';

import Carrousel from './components/Carrousel/index';


const App=()=>{

  const imgPath = './static';

  const imageArr = [
    { title:'shuangzi', src:`${ imgPath }/shuangzi.png` },
    { title:'baiyang', src:`${ imgPath }/baiyang.png` },
    { title:'chunv', src:`${ imgPath }/chunv.png` },
    { title:'jingniu', src:`${ imgPath }/jingniu.png` },

    { title:'juxie', src:`${ imgPath }/juxie.png` },
    { title:'mojie', src:`${ imgPath }/mojie.png` },
    { title:'sheshou', src:`${ imgPath }/sheshou.png` },
    { title:'shizi', src:`${ imgPath }/shizi.png` },

    { title:'shuangyu', src:`${ imgPath }/shuangyu.png` },
    { title:'shuiping', src:`${ imgPath }/shuiping.png` },
    { title:'tianping', src:`${ imgPath }/tianping.png` },
    { title:'tianxie', src:`${ imgPath }/tianxie.png` },

  ]

  return(
    <Carrousel 
      width={ 750 } 
      perSideWidth={ 150 }
      perSideNum={ 3 }
      scale={ 0.8 }
      imageArr={ imageArr }
      gradient={ true }
      onChange={(i)=>{
        console.log(i)
      }}
      // onPreClick={(i)=>{
      //   console.log(i)
      // }}
      />
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))