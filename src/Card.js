import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"

const Container = styled.div`
  position: relative; 
  display: flex; 
  flex-flow: column;
  align-items: center;
  max-width: 400px; 
  padding: 10px; 
  background: ${props => props.$isConfirming ? '#DCDDDD' : 'white'};
  color: ${props => props.$isConfirming ? '#A8ACB4' : 'black'};
  border-radius: 4px;
  border: 1px solid black;
`

const Year = styled.div`
  position: absolute;
  /* width: 40px; */
  top: -10px;
  line-height: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background: ${props => props.$color};
  color: white; 
  text-align: center;
  border-radius: 4px;
  padding: 0 12px;
  border: ${props => props.$displayYear && '1px solid black'};
`

const ConfirmButton = styled.button`
position: absolute;
top: calc(50% - 18px);
  height: 36px;
  text-align: center;
  background: #0438A0;
  color: white;
  font-weight: 700;
  padding: 4px 22px;
  border-radius: 4px;
  border: none;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background: #072C74;
  }
`

const Image = styled.img`
  height: 80px;
  margin-right: 5px;
  filter: ${({ $isConfirming }) => `grayscale(${$isConfirming ? '80%' : '0%'})`};
`

export const Card = ({
  title,
  year,
  image,
  isInQueue,
  isConfirming,
  handleConfirm,
  isCorrect,
  isStartingCard,
  index
}) => {
  let color = '#28A91B'
  if (isStartingCard) color = '#265AC1'
  if (!isCorrect && !isStartingCard) color = '#CA2129'
  const displayYear = year && !isInQueue && !isConfirming;
  return (
    <Draggable draggableId={title} index={index} isDragDisabled={!isConfirming && !isInQueue}>
      {(provided, snapshot) => (
        <div
          style={{background: 'green'}}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Container $isConfirming={isConfirming}>
            <div style={{display: 'flex'}}>
              <div><Image src={image} alt="" $isConfirming={isConfirming} /></div>
              {title}
              
              <Year $color={color} $displayYear={displayYear}>{displayYear ? year : ''}</Year>

            </div>
            {isConfirming && <ConfirmButton onClick={() => handleConfirm(index)}>Confirm</ConfirmButton>}
          </Container>
        </div>
      )}
    </Draggable>
    
  )
}