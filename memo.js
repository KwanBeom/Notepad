// toast ui editor 적용 script
const Editor = toastui.Editor;

const editor = new Editor({
        el: document.querySelector('#editor'),
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical'
    });

editor.getMarkdown();

// 메모장 기능 script
// localStorage.clear()

const memoBtn = document.querySelector(".memo-btn"),
    memoSection = document.querySelector(".savememo-section"),
    postText = document.querySelector(".toastui-editor-contents"),
    titleText = document.querySelector(".title"),
    onfSwitch = document.querySelector(".onf-switch"),
    resetBtn = document.querySelector("[type='reset']")
    

let allMemo = JSON.parse(localStorage.getItem("allMemo"))
allMemo = allMemo ?? []

paintMemo()

// 작성하기 버튼 눌렀을시에 로컬 스토리지 내용을 HTML에 뿌려주는 함수
function post() {
    if(titleText.value === ''){
        alert("제목을 작성해주세요")
    } else if(postText.innerText === ''){
        alert("내용을 작성해주세요")
    } else {
        inputMemo()
        memoSection.innerHTML = ''
        paintMemo()
    }
}


// 로컬 스토리지에 제목/내용 저장하는 함수
function inputMemo(){
    const d = new Date(),
        {...memo} = {title: titleText.value, posttext: postText.innerHTML, time: `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${d.getHours()}시${d.getMinutes()}분`, val: 0}
    if(onfSwitch.classList.contains("on")){
        allMemo.push({...memo})
    } else {
        allMemo.unshift({...memo})
    }
    idxSet()
    localStorage.setItem('allMemo', JSON.stringify(allMemo))
}

// 로컬 스토리지 프로퍼티를 HTML에 넣어주는 함수
function paintMemo(){
    allMemo.forEach((item, idx) => {
        memoSection.insertAdjacentHTML("beforeend", 
        `
        <article class="memo-wrap">
            <header>
                <h3>${item['title']}</h3>
                <time>${item['time']}</time>
            </header>
            <p>${item['posttext']}</p>
            <button class="del-btn" data-val="${idx}">X</button>
        </article>
        `
        )
        
    })

}

// 순서대로 allMemo 배열 val키에 index 값 넣어주는 함수
function idxSet(){
    allMemo.forEach((item, idx) => {
        item.val = idx
    })
}

// 배열 삭제해서 리턴해주는 함수
memoSection.addEventListener("click", function(e){
    if(e.target.dataset.val !== undefined){
        dele(e.target.dataset.val)
        memoSection.innerHTML = ''
        paintMemo()
    }
    idxSet()
})


function dele(val) {
    allMemo = allMemo.filter(item => {
        return item.val != val
    })
    localStorage.setItem('allMemo', JSON.stringify(allMemo))
}

// onoff 스위치로 클릭시 최신, 오래된 순 정렬하는 이벤트
onfSwitch.onclick = () => {
    onfSwitch.classList.toggle("on")
    if(onfSwitch.classList.contains("on")){
        allMemo.reverse()
    }else{
        allMemo.reverse()
    }
    memoSection.innerHTML = ''
    paintMemo()
}

// 모든 메모 삭제 이벤트
resetBtn.onclick = () => {
    allMemo = [];
    localStorage.setItem('allMemo', JSON.stringify(allMemo))
    memoSection.innerHTML = ''
}








