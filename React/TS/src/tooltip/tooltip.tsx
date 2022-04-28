/*
 * @Author: huanghq 
 * @Date: 2022-04-28 16:08:53 
 * @Last Modified by: huanghq
 * @Last Modified time: 2022-04-28 16:09:15
 * 超出两行显示省略号，显示tooltip
 */
import React, { useRef , useEffect, useState } from 'react';
import { Tooltip } from 'antd';

export default ({info}) => {
  const ref = useRef(undefined);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  useEffect(() => {
    ref.current && setIsShowTooltip(ref.current.clientHeight < ref.current.scrollHeight);
  }, [ref.current])

  return (
    <Tooltip title={isShowTooltip && info} >
      <span className="cityMap" ref={ref}>
        {info}
      </span>  
    </Tooltip>
    )
}