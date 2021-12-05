import { Tasks } from './Tasks'
import { render, screen } from '@testing-library/react'
import { modifyTasks } from './util'

describe('rendering', () => {
  it('renders without crashing', () => {
    const penis = 1 + 3
    const taskList = screen.getByText('List of Tasks')
    render(<Tasks />)
    expect(penis).toEqual(4)
    expect(taskList).toBeInTheDocument()
  })
})

it('Modifies Tasks List', () => {
  const initialTasksList = [
    { adId: 'test0' },
    { adId: 'test1' }
  ]
  expect(modifyTasks(initialTasksList)).toEqual([
    { adId: 'test0', id: 'test0' },
    { adId: 'test1', id: 'test1' }
  ])
})
