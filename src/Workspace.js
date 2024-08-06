import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { Card } from './Card'
import FlipMove from 'react-flip-move'

const Line = styled.div`
  width: 5px;
  background: #768CB6;
  /* height: 200px; */
  border-radius: 4px;
  flex-grow: 1;
`

export const Workspace = ({ cards, handleConfirm, setIsConfirming }) => {
  const onAnimationFinish = () => {
    console.log("Animation finished")
  }
  return <div style={{flexGrow: 1}}>
    <Droppable droppableId="workspace">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{ backgroundColor:'#DCDDDD', height: '100%' }}
          {...provided.droppableProps}
        >
          <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
            <div>Before</div>
            <Line />
            <FlipMove easing={"cubic-bezier(0, 0.7, 0.8, 0.1)"} enterAnimation={false} leaveAnimation={false} onFinshAll={onAnimationFinish}>
              {cards.map((props, index) => {
                return (
                  <div style={{margin: 20}} key={props.title}>
                    <Card 
                      key={props.title} 
                      {...props}
                      index={index}
                      isDraggable={props.isConfirming}
                      handleConfirm={handleConfirm}
                    />
                  </div>
                )
              })}
            </FlipMove>
            <Line />
            <div>After</div>
          </div>
        </div>
      )}
    </Droppable>
  </div>
}