const getCards = () => localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : []
let cards = getCards()

//save cards in localStorage
const saveCards = () => localStorage.setItem('cards',JSON.stringify(cards))

//Elements
const cardListEl = document.querySelector('#flash-card-list')
const addCardsEl = document.querySelector('#add-cards')
const createFlashEl = document.querySelector('#create-flash')
const delCardsEl = document.querySelector('#del-cards')
const closeCreateFlashEl = document.querySelector('#close-create-flash')
const saveCardsEl = document.querySelector('#save-flash-card')
const questionInputEl = document.querySelector('#question-input')
const answerInputEl = document.querySelector('#answer-input')
const flashCardsEl = document.querySelector('#flash-crads')

//add card and open create flash box
addCardsEl.addEventListener('click', () => {
    createFlashEl.classList.remove('create-flash')
    createFlashEl.classList.add('create-flash-show')
})

//del cards
delCardsEl.addEventListener('click', ()=>{
    cards = []
    saveCards(cards)
    renderCards(cards)
})

//save cards in flash box
saveCardsEl.addEventListener('click', ()=>{
    if(questionInputEl.value.trim() && answerInputEl.value.trim()) {
        cards.push({
            question: questionInputEl.value,
            answer: answerInputEl.value,
            visibility: false
        })
        saveCards()
        renderCards(cards)
        questionInputEl.value = ''
        answerInputEl.value = ''
    } else {
        alert('Please fill the Question and Answer')
    }
})

//close create flash box
closeCreateFlashEl.addEventListener('click',() => {
    createFlashEl.classList.remove('create-flash-show')
    createFlashEl.classList.add('create-flash')
})

//render cards
const renderCards = (cards) => {
    flashCardsEl.innerHTML = ''
    if(cards.length > 0) {
        cards.forEach(card => {
            flashCardsEl.appendChild(cardsDom(card))
        });
    } else {
        const emptyCardsEl = document.createElement('h3')
        emptyCardsEl.textContent = "There aren't any card to show..."
        emptyCardsEl.classList.add('empty-cards')
        flashCardsEl.appendChild(emptyCardsEl)
    }
    
}

//cards dom
const cardsDom = (card) => {
    const cardBody = document.createElement('div')
    const cardQuestion = document.createElement('p')
    const cardAnswer = document.createElement('p')

    cardQuestion.textContent = card.question
    cardAnswer.textContent = card.answer

    cardQuestion.classList.add('card-question')
    cardAnswer.classList.add('hide-answer')
    cardBody.classList.add('card-body')

    cardBody.addEventListener('click',() => {
        if(!card.visibility){
            card.visibility = !card.visibility
            cardAnswer.classList.remove('hide-answer')
            cardAnswer.classList.add('show-answer')
        } else {
            card.visibility = !card.visibility
            cardAnswer.classList.add('hide-answer')
            cardAnswer.classList.remove('show-answer')
        }
    })

    cardBody.appendChild(cardQuestion)
    cardBody.appendChild(cardAnswer)

    return cardBody
}

renderCards(cards)