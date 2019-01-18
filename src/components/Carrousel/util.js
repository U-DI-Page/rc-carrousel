// 获取中间位置图片的高度 作为组件的高度
export const getCenterImageHeight=(liArr)=>{

}

// 计算左边区域 索引集合
export const getBoxMember=(index, perSize, size, align)=>{
  let result=[];
  let lT = 0;
  if(align === 'left'){
    for(let i=0,l=index-1; i<perSize; i++,l--){
      if(l > -1){
        result.push(l);
      }else{
        result.push(size-lT-1);
        lT +=1;
      }
    }
  }else{
    for(let i=0,r=index+1; i<perSize; i++,r++){
      if(r < size){
        result.push(r);
      }else{
        result.push(0 + lT);
        lT +=1;
      }
    }
  }
  return result;
}

// 图层样式
export const getImageStyle=(props)=>{
  const { 
    width, imageWidth, perSideNum, scale,
    center, left, right, perSideWidth, gradient
  } = props;
  const align = getImgAlign(props.index, center, left, right);

  let cStyle = {};

  switch(align.name){
    case 'left': 
      cStyle = getLeftImgsStyle(gradient, align.index, perSideNum, scale, perSideWidth); 
      break;
    case 'right': 
      cStyle = getRightImgsStyle(gradient, align.index, width, imageWidth, perSideNum, scale, perSideWidth); 
      break;
    case 'center': 
      cStyle = getCurrentStyle(perSideNum, perSideWidth); 
      break;
    default:
      cStyle = getRestImgStyle(); 
      break;
  }

  return cStyle;
}

// 当前居中图片样式
const getCurrentStyle=(num, perSideWidth)=>{

  return{
    left: perSideWidth,
    zIndex: num + 1
  }
}

// 获取左半部分 图片样式
const getLeftImgsStyle=(gradient, index, num, s, perSideW)=>{
  const reverserIndex = num - index + 1;
  const scale = Math.pow(s, index);
  const dWidth = perSideW /num;
  const left = (reverserIndex - 1) * dWidth * scale;
  const opacity =gradient ? calulateOpacity(index, num) : 1;

  return {
    left,
    opacity,
    transform: `scale(${scale})`,
    transformOrigin: '0',
    zIndex: reverserIndex
  }
}

// 获取右半部分图片样式
const getRightImgsStyle=(gradient, index, width, imageWidth, num, s, perSideW)=>{
  const reverserIndex = num - index; // 3 2 1
  const scale = Math.pow(s, index);
  const dWidth = perSideW / num;
  const left = width - dWidth * reverserIndex * scale -imageWidth;
  const opacity =gradient ? calulateOpacity(index, num) : 1;

  return {
    left,
    opacity,
    transform:`scale(${scale})`,
    zIndex: reverserIndex,
    transformOrigin:'100% center 0'
  }
}

// 剩余图片样式
const getRestImgStyle=()=>{

  return {
    transform:'scale(0)'
  }
}

// 通过索引判断 当前图片所处的位置 
const getImgAlign=(index, center, left, right)=>{
  // const { center,left,right } = this.state;

  if(index === center){
    return { name:'center', index:1 };
  }else if(left.includes(index)){
    return { name:'left', index:left.indexOf(index)+1 };
  }else if(right.includes(index)){
    return { name:'right', index:right.indexOf(index)+1 };
  }

  return {};
}

// 规律计算透明度
const calulateOpacity=(index, num)=>{
  return (100 - index * (30/num)) / 100;
}