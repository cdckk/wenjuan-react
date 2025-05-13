import { useState, useEffect } from 'react'

// 获取鼠标位置
function useMouse() {
  const [x, setx] = useState(0)
  const [y, setY] = useState(0)

  const mouseMoveHandler = (event: MouseEvent) => {
    setx(event.clientX)
    setY(event.clientY)
  }

  useEffect(()  => {
    window.addEventListener('mousemove', mouseMoveHandler)
    // 组件销毁解绑dom事件 
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return {x, y  }
}

export default useMouse