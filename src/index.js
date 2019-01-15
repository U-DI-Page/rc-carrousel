import React,{ Fragment } from 'react';
import ReactDOM from 'react-dom';

import Carrousel,{ Image } from './components/Carrousel/index';


const App=()=>{

  const imgPath = './static';

  return(
    // <div>777</div>
    <Carrousel 
    // autoPlay
    // autoDirect='left'
    // autoPlayDelay={ 2000 }
    width={ 750}
    height={ 500 }
    imageWidth={ 450 }
    perSideNum={ 3 }
    scale={ 0.8 }
    onNextClick={(i)=>{
      console.log(i)
    }}
    onPreClick={(i)=>{
      console.log(i)
    }}
  >
    {
      (state)=>(
        <Fragment>
          <Image index={ 0 } { ...state } src={ `${ imgPath }/baiyang.png` } /> 
          <Image index={ 1 } { ...state } src={ `${ imgPath }/chunv.png` } /> 
          <Image index={ 2 } { ...state } src={ `${ imgPath }/shuangzi.png` } />
          <Image index={ 3 } { ...state } src={ `${ imgPath }/jingniu.png` } /> 

          <Image index={ 4 } { ...state } src={ `${ imgPath }/juxie.png` } /> 
          <Image index={ 5 } { ...state } src={ `${ imgPath }/mojie.png` } /> 
          <Image index={ 6 } { ...state } src={ `${ imgPath }/sheshou.png` } /> 
          <Image index={ 7 } { ...state } src={ `${ imgPath }/shizi.png` } /> 

          <Image index={ 8 } { ...state } src={ `${ imgPath }/shuangyu.png` } /> 
          <Image index={ 9 } { ...state } src={ `${ imgPath }/shuiping.png` } /> 
          <Image index={ 10 } { ...state } src={ `${ imgPath }/tianping.png` } /> 
          <Image index={ 11 } { ...state } src={ `${ imgPath }/tianxie.png` } /> 
        </Fragment>
      )
    }
  </Carrousel>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))