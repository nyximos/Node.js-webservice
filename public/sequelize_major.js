//사용자 이름 눌렷을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
        const id = el.querySelector('td').textContent;
        getComment(id);
    });
});

//사용자로딩

async function getUser2() {
    try {
        const res = await axios.get('/major/pro');
        const professors = res.data;
        console.log(professors);
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        professors.map(function (professors) {
            const row = document.createElement('tr');
            row.addEventListener('click', () => {
                // getComment(question.id);
            });
            //로우 셀 추가
            let td = document.createElement('td');
            td.textContent = professors.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = professors.email;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = professors.phone;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = professors.majorName;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = professors.place;
            row.appendChild(td);
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                const name = prompt('바꿀 이름을 입력하세요');
                const email = prompt('바꿀 이메일을 입력하세요');
                const phone = prompt('바꿀 전화번호를 입력하세요');
                const majorName = prompt('바꿀 전공을 입력하세요');
                const place = prompt('바꿀 연구실을 입력하세요');
                if (!name) {
                    return alert('이름을 반드시 입력하셔야 합니다');
                }
                if (!email) {
                    return alert('이메일을 반드시 입력하셔야 합니다');
                }
                if (!phone) {
                    return alert('전화번호를 반드시 입력하셔야 합니다');
                }
                if (!majorName) {
                    return alert('전공을 반드시 입력하셔야 합니다');
                }
                if (!place) {
                    return alert('연구실을 반드시 입력하셔야 합니다');
                }
                try {
                    await axios.patch(`/major/${professors.id}`, { name, email, phone, majorName, place });
                    getUser2();
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent='삭제';
            remove.addEventListener('click', async () => {
                try {
                    await axios.delete(`/major/${professors.id}`);
                    getUser2();
                } catch (err) {
                    console.error(err);
                }
            });
            //버튼 추가
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
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
            // const edit = document.createElement('button');
            // edit.textContent = '수정';
            // edit.addEventListener('click', async () => {
            //     const newComment = prompt('바꿀 내용 입력');
            //     if (!newComment) {
            //         return alert('내용 반드시 입력');
            //     }
            //     try {
            //         await axios.patch(`/question${commennt.id}`,{ comment: newComment});
            //         getComment(id);
            //     } catch (err) {
            //         console.error(err);
            //     }
            // });
            // const remove = document.createElement('button');
            // remove.textContent = '삭제';
            // remove.addEventListener('click', async () => {
            //     try{
            //         await axios.delete(`/question${commennt.id}`);
            //         getComment(id);
            //     } catch (err) {
            //         console.error(err);
            //     }
            // });
            // // 버튼 추가
            // td = document.createElement('td');
            // td.appendChild(edit);
            // row.appendChild(td);
            // td = document.createElement('td');
            // td.appendChild(remove);
            // row.appendChild(td);
            // tbody.appendChild(row);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

//사용자 등록 시 
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const majorName = e.target.majorName.value;
    const place = e.target.place.value;
    
    if (!name) {
        return alert('이름을 입력하세요');
    }
    if (!phone) {
        return alert('전화번호 입력하세요');
    }
    try {
        await axios.post('/major/pro', { name, email, phone, majorName, place });
        getUser2();
    } catch (err) {
        console.error(err);
    }
    e.target.name.value = '' ;
    e.target.email.value='';
    e.target.phone.value='';
    e.target.majorName.value='';
    e.target.place.value='';
});

// //댓글 등록시
// document.getElementById('comment-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const id = e.target.userid.value;
//     const comment = e.target.comment.value;
//     if (!id) {
//         return alert('아이디입력');
//     }
//     if (!comment) {
//         return alert('댓글 입력');
//     }
//     try {
//         await axios.post('/comments', { id, comment });
//         getComment(id);
//     } catch (err) {
//         console.error(err);
//     }
//     e.target.userid.vale = '';
//     e.target.comment.value = '';
// });
