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
localStorage.clear()

const titleText = document.querySelector(".title")
const postText = document.querySelector(".toastui-editor-contents")
const memoBtn = document.querySelector(".memo-btn")
const memoSection = document.querySelector(".savememo-section")




function post() {
    inputMemo()
    console.log(localStorage.key(localStorage.length))
}
// 로컬스토리지에 제목과 내용 저장
function inputMemo(){
    if(titleText.value === ''){
        alert("제목을 작성해주세요")
    } else if(postText.innerText === ''){
        alert("내용을 작성해주세요")
    } else {
        localStorage.setItem(titleText.value, postText.innerHTML)
        insertPost()
    }
}
// HTML에 메모 내용 넣기
function insertPost() {
    if(localStorage.length !== 0){
        memoSection.insertAdjacentHTML("afterbegin",
            `
            <h2>${localStorage.key(1 + localStorage.length)}</h2>
            <div>${localStorage.getItem(localStorage.key(localStorage.length-1))}</div>
            `
        )
    } else if (lolcalStorage.length === 0){
        alert("제목과 내용을 작성해주세요")
    } 
}

