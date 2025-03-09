// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
    let userDetailsGeneralBlock = document.getElementById('user-details-general-block');
    //
    const urlParams = new URLSearchParams(window.location.search);
    const userId = +urlParams.get('userId');
    //
    let userDetailsBlock = document.createElement('div');
    let postsOfUser = document.createElement('div');
    postsOfUser.classList.add('visibility');
    //
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(value => value.json())
        .then(user => {
            function userLog (obj, parent) {
                for (const objKey in obj) {
                    if (typeof obj[objKey] === 'object' && obj[objKey] !== null) {
                        let userObjDetailsBlock = document.createElement('div');
                        userObjDetailsBlock.innerText = `${objKey}:`;
                        parent.appendChild(userObjDetailsBlock);
                        userLog(obj[objKey], userObjDetailsBlock);
                    } else {
                        let userKeyDetailsP = document.createElement('p');
                        userKeyDetailsP.innerText = `${objKey}: ${obj[objKey]};`
                        parent.appendChild(userKeyDetailsP);
                    }
                }
            }
            //
            userLog(user, userDetailsBlock);
        })
    //
    //
    let buttonPostsOfCurrentUsers = document.createElement('button');
        buttonPostsOfCurrentUsers.innerText = 'Post of current users';
        buttonPostsOfCurrentUsers.onclick = function () {
            postsOfUser.classList.toggle('visibility');
            postsOfUser.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        //
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(value => value.json())
            .then(posts => {
                for (const post of posts) {
                    let postH4 = document.createElement('h4');
                    postH4.innerText = post.title;
                    let postDetailsButton = document.createElement('a');
                    postDetailsButton.href = `../post-details/post-details.html?postID=${post.id}`;
                    postDetailsButton.innerText = 'Post details';
                    postH4.appendChild(postDetailsButton);
                    postsOfUser.appendChild(postH4);
                    console.log(post);
                }
            })
        //
        userDetailsGeneralBlock.append(userDetailsBlock, buttonPostsOfCurrentUsers, postsOfUser);
