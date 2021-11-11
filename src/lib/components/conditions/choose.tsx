import React from 'react'

export type WhenProps = {
  condition: boolean
  comment?: string
}

export type OtherWiseProps = {
  comment?: string
}

export type ChooseProps = {
  comment?: string
}

const When: React.FC<WhenProps> = ({ children }) => {
  return <>{children}</>
}
When.displayName = 'When'

const OtherWise: React.FC<OtherWiseProps> = ({ children }) => {
  return <>{children}</>
}
OtherWise.displayName = 'OtherWise'

const Choose: React.FC<ChooseProps> = ({ children }) => {
  const childrenArray: any[] = React.Children.toArray(children)

  for (let index = 0; index < childrenArray.length; index++) {
    const el = childrenArray[index]
    if (el.type.displayName === 'When' && el.props.condition) {
      return el
    }
  }

  for (let index = 0; index < childrenArray.length; index++) {
    const el = childrenArray[index]
    if (el.type.displayName === 'OtherWise') {
      return el
    }
  }

  return null
}

export { When, OtherWise, Choose }
