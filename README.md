# rc-carrousel —— 一款 React 旋转木马图片轮播组件 

想写个应用发现没找到react旋转木马这种类型的轮播图组件，于是就自己写了一个;

## 开始使用

安装

> npm i rc-carrousel -S 

> 或者

> yarn add rc-carrousel -S

使用：

```javascript
  import React from 'react';
  import Carrousel from 'rc-carrousel';

  const App=()=>{
    // 图片路径
    const imgPath = './static';
    // 图片数组，包含title 和 src 属性，按顺序渲染
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

    ];

    return(
      <Carrousel 
        width={ 750 } 
        perSideWidth={ 150 }
        perSideNum={ 3 }
        scale={ 0.8 }
        align="bottom"
        imageArr={ imageArr }
      />
    )
  }
```

## 配置参数

| 属性 | 说明 | 默认 |
| ---  | --- | --- |
| width | `Number` 组件宽度 | `600` |
| perSideWidth | `Number` 两侧按钮宽度 | `150` |
| perSideNum | `Number` 两侧显示图片数 | `2` |
| scale | `Number` 两侧图片缩放比 | `0.8` |
| gradient | `Boolean` 两侧图片透明度渐变 | `false` |
| autoPlay | `Boolean` 是否开启自动轮播 | `false` |
| autoDirect | `Boolean` 自动轮播方向 | `right` |
| autoPlayDelay | `Boolean` 自动轮播时间间隔 | `2` |
| onNextClick | `Function` 点击向右 回调 | `(img)=>{console.log(img);//返回中间图片信息对象}` |
| onPreClick | `Function` 点击向左 回调 | `(img)=>{console.log(img);//返回中间图片信息对象}` |
| onChange | `Function` 图片切换 回调 | `(img)=>{console.log(img);//返回中间图片信息对象}` |







