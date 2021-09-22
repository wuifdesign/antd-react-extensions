import React, { useState } from 'react'
import { Button, FormContainer, Sortable, EditableDate, EditableInput } from './lib'

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
      <FormContainer visible={true} onCancel={() => null} onSubmit={() => Promise.resolve()} />
    </div>
  )
}

export default App
