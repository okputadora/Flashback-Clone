import { useState, useEffect } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { Queue } from './Queue';
import { Workspace } from './Workspace';
import { buildHistoricalEventList } from './utils/historyData';
import { Score } from './Score';

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function moveElementInArray(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

function App() {
  const [queueCards, setQueueCards] = useState([])
  const [workspaceCards, setworkspaceCards] = useState([])
  const [scores, setScores] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  const [isConfirming, setIsConfirming] = useState(false)
  const fetchData = async () => {
    const results = await buildHistoricalEventList();
    const formattedResults = results.map(r => ({ ...r, isConfirming: false, isCorrect: false, }))
    const shuffledResults = shuffle(formattedResults)
    const workspaceCard = {...shuffledResults[0], isStartingCard: true}
    shuffledResults.splice(0, 1)
    setScores(shuffledResults.map(x => 'unanswered'))
    setworkspaceCards([workspaceCard])
    setQueueCards(shuffledResults)
  }
  useEffect(() => {
    fetchData();
  }, [])

  const reorder = (sorted) => {
    sorted = [...sorted]
    sorted.sort((a, b) => a.year - b.year)
    setworkspaceCards(sorted)
  }

  const handleConfirm = (index) => {
    // check answer 
    const prevCard = workspaceCards[index - 1]
    const nextCard = workspaceCards[index + 1]
    const currentCard = workspaceCards[index]
    let isCorrect = true;
    if (prevCard && prevCard.year > currentCard.year) {
      isCorrect = false;
    }
    if (nextCard && nextCard.year < currentCard.year) {
      isCorrect = false;
    }
    const newCards = [...workspaceCards]
    newCards.splice(index, 1, {...currentCard, isConfirming: false, isCorrect})
    setworkspaceCards(newCards);
    setCurrentQuestion(currentQuestion + 1);
    const newScores = [...scores]
    newScores[currentQuestion] = isCorrect ? 'correct' : 'incorrect'
    setScores(newScores)
    if (isCorrect) {
      setIsConfirming(false);
      return;
    }
    setTimeout(() => {
      reorder(newCards)
      setIsConfirming(false)
    }, 2000)
  }
  console.log({queueCards})
  return (  
   <DragDropContext
    onDragEnd={(result) => {
      const { destination, source } = result
      if (!destination) return;
      if (destination.droppableId === 'workspace') {
        let newWorkspaceCards = [...workspaceCards];
        if (source.droppableId === 'workspace') {
          moveElementInArray(newWorkspaceCards, source.index, destination.index)
          setworkspaceCards(newWorkspaceCards)
          return;
        }
        queueCards[source.index].isConfirming = true;
        newWorkspaceCards.splice(destination.index, 0, queueCards[source.index])
        setworkspaceCards(newWorkspaceCards)
        setIsConfirming(true);
        const newQueueCards = [...queueCards]
        newQueueCards.splice(source.index, 1)
        setQueueCards(newQueueCards)
      } 
    }}
   >
    <div style={{ display: 'flex', minHeight: '100vh', background: '#DCDDDD', padding: 10, justifyContent: 'center'}}>
      <div style={{display: 'flex', flexGrow: 1, flexFlow: 'column', maxWidth: 900}}>
        <Score scores={scores}/>
        <Queue currentCard={queueCards[0]} isConfirming={isConfirming} />
        <Workspace cards={workspaceCards} handleConfirm={handleConfirm} />
      </div>
    </div>
   </DragDropContext>
  );
}

export default App;
