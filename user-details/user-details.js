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
    //
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(value => value.json())
        .then(user => {
            function userLog (obj, parent) {
                for (const objKey in obj) {
                    if (typeof obj[objKey] === 'object' && obj[objKey] !== null) {
                        let userObjDetailsBlock = document.createElement('div');
                        let userDetailsBlockP = document.createElement('p');
                        userDetailsBlockP.innerText = `${objKey}:`;
                        userObjDetailsBlock.classList.add('margin-left');
                        parent.append(userDetailsBlockP, userObjDetailsBlock);
                        userLog(obj[objKey], userObjDetailsBlock);
                    } else {
                        let userKeyDetailsP = document.createElement('p');
                        userKeyDetailsP.innerHTML = `${objKey}: <b>${obj[objKey]}</b>`;
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
        buttonPostsOfCurrentUsers.innerText = 'Posts of current users';
        buttonPostsOfCurrentUsers.classList.add('button-posts-of-current-users');
    let postsOfUser = document.createElement('div');
        postsOfUser.classList.add('visibility');
        postsOfUser.classList.add('posts-of-user');
        buttonPostsOfCurrentUsers.onclick = function () {
            postsOfUser.classList.toggle('visibility');
            postsOfUser.scrollIntoView({ behavior: 'smooth', block: 'center' });

            buttonPostsOfCurrentUsers.classList.add('confirmation');
            // Видаляємо колір підтвердження через 3 секунди (3000 мілісекунд)
            setTimeout(function() {
                buttonPostsOfCurrentUsers.classList.remove('confirmation');
            }, 1100);
        }
        //
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(value => value.json())
            .then(posts => {
                for (const post of posts) {
                    let postBlock = document.createElement('div');
                        postBlock.classList.add('post-block');
                    let postH4 = document.createElement('h4');
                    postH4.innerText = post.title;
                    let postDetailsButton = document.createElement('a');
                    postDetailsButton.href = `../post-details/post-details.html?postID=${post.id}`;
                    postDetailsButton.innerText = 'Post details';
                    postDetailsButton.classList.add('post-details-button');
                    // postH4.appendChild(postDetailsButton);
                    postDetailsButton.onclick = function () {
                        postDetailsButton.classList.add('confirmation');
                        // Видаляємо колір підтвердження через 3 секунди (3000 мілісекунд)
                        setTimeout(function() {
                            postDetailsButton.classList.remove('confirmation');
                        }, 1100);
                    }
                    //
                    postBlock.append(postH4, postDetailsButton);
                    postsOfUser.appendChild(postBlock);
                }
            })
        //
        userDetailsGeneralBlock.append(userDetailsBlock, buttonPostsOfCurrentUsers, postsOfUser);
