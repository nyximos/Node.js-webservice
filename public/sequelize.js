//사용자 이름 눌렷을 때 댓글 로딩
document.querySelectorAll('#question-list tr').forEach((el) => {
    el.addEventListener('click', function () {
        const id = el.querySelector('td').textContent;
        getComment(id);
    });
});

//사용자로딩

async function getUser() {
    try {
        const res = await axios.get('/question');
        const questions = res.data;
        console.log(questions);
        const tbody = document.querySelector('#question-list tbody');
        tbody.innerHTML = '';
        questions.map(function (questions) {
            const row = document.createElement('tr');
            row.addEventListener('click', () => {
                // getComment(question.id);
            });
            //로우 셀 추가
            let td = document.createElement('td');
            td.textContent = questions.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = questions.title;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = questions.content;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = questions.nick;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = questions.createdAt;
            row.appendChild(td);
            tbody.appendChild(row); 
        });
    } catch (err) {
        console.error(err);
    }
}

//댓글 로딩
// async function getComment(id) {
//     try {
//         const res = await axios.get(`/question/${id}/comments`);
//         const comments = res.data;
//         const tbody = document.querySelector('#question-list tbody');
//         tbody.innerHTML = '';
//         comments.map(function (comment) {
//             //로우셀 추가
//             const row = document.createElement('tr');
//             let td = document.createElement('td');
//             td.textContent = comment.id;
//             row.appendChild(td);
//             td = document.createElement('td');
//             td.textContent = comment.User.name;
//             row.appendChild(td);
//             td = document.createElement('td');
//             td.textContent = comment.comment;
//             row.appendChild(td);
//             const edit = document.createElement('button');
//             edit.textContent = '수정';
//             edit.addEventListener('click', async () => {
//                 const newComment = prompt('바꿀 내용 입력');
//                 if (!newComment) {
//                     return alert('내용 반드시 입력');
//                 }
//                 try {
//                     await axios.patch(`/question${commennt.id}`,{ comment: newComment});
//                     getComment(id);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             });
//             const remove = document.createElement('button');
//             remove.textContent = '삭제';
//             remove.addEventListener('click', async () => {
//                 try{
//                     await axios.delete(`/question${commennt.id}`);
//                     getComment(id);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             });
//             // 버튼 추가
//             td = document.createElement('td');
//             td.appendChild(edit);
//             row.appendChild(td);
//             td = document.createElement('td');
//             td.appendChild(remove);
//             row.appendChild(td);
//             tbody.appendChild(row);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

//사용자 등록 시 
document.getElementById('question-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    console.log(title);
    if (!title) {
        return alert('제목을 입력하세요');
    }
    if (!content) {
        return alert('내용 입력');
    }
    try {
        await axios.post('/question', { title, content });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.title.value = '';
    e.target.content.value = '';
});

//댓글 등록시
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
    if (!id) {
        return alert('아이디입력');
    }
    if (!comment) {
        return alert('댓글 입력');
    }
    try {
        await axios.post('/comments', { id, comment });
        getComment(id);
    } catch (err) {
        console.error(err);
    }
    e.target.userid.vale = '';
    e.target.comment.value = '';
});
