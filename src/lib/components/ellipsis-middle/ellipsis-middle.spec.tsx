import React from 'react'
import { render } from '@testing-library/react'
import { EllipsisMiddle } from './ellipsis-middle'

describe('EllipsisMiddle', () => {
  it('should render', () => {
    render(<EllipsisMiddle suffixCount={5}>ButtonText</EllipsisMiddle>)
  })
})
