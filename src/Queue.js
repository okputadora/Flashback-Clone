import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Card } from './Card'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-bottom: 10px;
  padding: 10px;
`


export const Queue = ({ currentCard, isConfirming }) => {
  if (!currentCard) return <div>loading</div>
  return (
    <Droppable droppableId="queue">
      {(provided, snapshot) => (
        <div
        ref={provided.innerRef}
        style={{ minHeight: 140 }}
        {...provided.droppableProps}
        >
          <Container>
              {!isConfirming && <Card title={currentCard.title} year={currentCard.year} image={currentCard.image} index={0} isInQueue />}
              <div style={{textAlign: 'center'}}>Drag the event onto the timeline</div>
          </Container>
        </div>
      )}
    </Droppable>
  )
}