import React, { useCallback, useEffect, useRef } from 'react'

export type CollapseContainerProps = {
  style?: React.CSSProperties
  isOpened?: boolean
}

const outerHeight = (element: HTMLDivElement) => {
  const style = getComputedStyle(element)
  return element.offsetHeight + (parseInt(style.marginTop, 10) || 0) + (parseInt(style.marginBottom, 10) || 0)
}

const checkFinished = (container: HTMLDivElement, content: HTMLDivElement, shouldOpen: boolean) => {
  const containerHeight = container.offsetHeight
  const contentHeight = outerHeight(content)
  const isFullyOpened = shouldOpen && contentHeight === containerHeight
  const isFullyClosed = !shouldOpen && containerHeight === 0
  return isFullyOpened || isFullyClosed
}

const setInitStyle = (container: HTMLDivElement | null, isOpened: boolean) => {
  if (container) {
    if (isOpened) {
      container.style.removeProperty('overflow')
    } else {
      container.style.overflow = 'hidden'
    }
    container.style.height = isOpened ? 'auto' : '0px'
  }
}

const CollapseContainer: React.FC<CollapseContainerProps> = ({ style, isOpened = true, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const isInitial = useRef(true)

  const onResize = useCallback((shouldOpen: boolean) => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) {
      return
    }

    if (!checkFinished(container, content, shouldOpen)) {
      container.style.overflow = 'hidden'
      container.style.height = shouldOpen ? '0px' : `${outerHeight(content)}px`
      requestAnimationFrame(() => {
        container.style.height = shouldOpen ? `${outerHeight(content)}px` : '0px'
      })
    }
  }, [])

  const onTransitionEnd = useCallback(() => {
    setInitStyle(containerRef.current, isOpened)
  }, [isOpened])

  useEffect(() => {
    onResize(isOpened)
  }, [isOpened, onResize])

  return (
    <div
      ref={(ref) => {
        if (isInitial.current) {
          isInitial.current = false
          setInitStyle(ref, isOpened)
        }
        containerRef.current = ref
      }}
      className="collapse-container"
      onTransitionEnd={onTransitionEnd}
    >
      <div ref={contentRef} style={{ ...style }}>
        {children}
      </div>
    </div>
  )
}

export { CollapseContainer }
