import React, { useState } from 'react'
import Button from './lib/components/button/button'
import { EditableDate, EditableInput } from './lib'
import FormOverlay from './lib/components/form-overlay/form-overlay'
import Sortable from './lib/components/sortable'

function App() {
  const [items, setItems] = useState([{ name: 'Name 1' }, { name: 'Name 2' }, { name: 'Name 3' }])

  return (
    <div className="App">
      <Sortable
        items={items}
        getItemKey={(item) => item.name}
        renderItem={(item) => <div>{item.name}</div>}
        onSortEnd={(data) => {
          setItems(data.newItems)
        }}
      />
      <Button>Button</Button>
      <EditableInput />
      <EditableDate />
      <EditableDate />
      <FormOverlay visible={true} onClose={() => null} onSubmit={() => Promise.resolve()} />
    </div>
  )
}

export default App
