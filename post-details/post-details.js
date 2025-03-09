//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
    let postsDetailsGeneralBlock = document.getElementById('post-details-general-block');
    //
    const urlParams = new URLSearchParams(window.location.search);
    const postID = +urlParams.get('postID');
    //
    let postDetailsBlock = document.createElement('div');
    fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
        .then(value => value.json())
        .then(post => {
                let postDetailsH4 = document.createElement('h4');
                postDetailsH4.innerText = `title: ${post.title}`;
                let postDetailsH5 = document.createElement('h5');
                postDetailsH5.innerText = `userId: ${post.userId}; id: ${post.id}`;
                let postDetailsP = document.createElement('p');
                postDetailsP.innerText = `body: ${post.body}`;
                postDetailsBlock.append(postDetailsH4, postDetailsH5, postDetailsP);
        })
    //
    let commentsOfPostBlock = document.createElement('div');
    //
    fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`)
        .then(value => value.json())
        .then(comments => {
            let commentBlock = document.createElement('div');
            //
            for (const comment of comments) {
                let commentH4 = document.createElement('h4');
                commentH4.innerText = `name: ${comment.name}`;
                let commentH5 = document.createElement('h5');
                commentH5.innerText = `id: ${comment.id}; email: ${comment.email}`;
                let commentP = document.createElement('p');
                commentP.innerText = `body: ${comment.body}`;
                //
                commentBlock.append(commentH4, commentH5, commentP);
                commentsOfPostBlock.appendChild(commentBlock);
            }
        })
    //
    postsDetailsGeneralBlock.append(postDetailsBlock, commentsOfPostBlock);
