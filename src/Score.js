import styled from 'styled-components'

const colors = {
  unanswered: 'grey',
  incorrect: '#CA2129',
  correct: '#28A91B'
}

export const Score = ({ scores}) => {
  const total = scores.length;
  const current = scores.findIndex(e => e === 'unanswered')
  const totalPoints = scores.reduce((acc, score) => { 
    if (score === 'correct') acc += 1 
    return acc;
  }, 0)
  return (
  <Container>
    <ScoreText>{`${current + 1} of ${total}`}</ScoreText>

    <ScoreTicks>
      {scores.map((score, i) => {
        return <ScoreTick $color={colors[score]} $isCurrent={i === current} />
      })}
    </ScoreTicks>
    <ScoreText>{`${totalPoints} points`}</ScoreText>
  </Container>
)}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ScoreText = styled.div`
  font-weight: 700;
`

const ScoreTicks = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  margin: 0 10px;
`

const ScoreTick = styled.div`
  margin-right: 1px;
  flex-grow: 1;
  height: 10px;
  background: ${({ $color, $isCurrent}) => $isCurrent ? '#265AC1' : $color};
`
