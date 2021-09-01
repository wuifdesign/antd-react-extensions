import React, { useCallback, useEffect, useRef } from 'react'

export type CollapseContainerProps = {
  style?: React.CSSProperties
  isOpened?: boolean
}

const CollapseContainer: React.FC<CollapseContainerProps> = ({ isOpened = true, style, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const onResize = useCallback((shouldOpen: boolean) => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) {
      return
    }

    const containerHeight = container.clientHeight
    const contentHeight = content.offsetHeight
    const isFullyOpened = shouldOpen && contentHeight === containerHeight
    const isFullyClosed = !shouldOpen && containerHeight === 0

    if (isFullyOpened || isFullyClosed) {
      container.style.overflow = shouldOpen ? 'initial' : 'hidden'
      container.style.height = shouldOpen ? 'auto' : '0px'
    } else {
      container.style.overflow = 'hidden'
      container.style.height = shouldOpen ? '0px' : `${contentHeight}px`
      setTimeout(() => (container.style.height = shouldOpen ? `${contentHeight}px` : '0px'))
    }
  }, [])

  useEffect(() => {
    onResize(isOpened)
  }, [isOpened, onResize])

  return (
    <div ref={containerRef} className="collapse-container">
      <div ref={contentRef} style={{ ...style, margin: 0 }}>
        {children}
      </div>
    </div>
  )
}

export { CollapseContainer }
