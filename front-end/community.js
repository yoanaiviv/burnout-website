let popup = document.getElementById("popup-blur");
let popupTitle = document.getElementById("community-popup-title");
let popUpVisible = false;

const communityPosts = document.getElementById('community');

const loadPosts = async () => {
    const response = await fetch("http://localhost:3000/posts/");
    const data = await response.json();
    const reversedData = data.reverse()
    for (const post of reversedData) {
        console.log(post)
        const newPost = document.createElement('div');
        newPost.classList.add('community-post');
        const postContainer = document.createElement('div')
        postContainer.classList.add('community-post-main');
        const postInfo = document.createElement('div')
        postInfo.classList.add('community-post-info');
        const postContent = document.createElement('div')
        postContent.classList.add('community-post-content');

        const postName = document.createElement('p')
        postName.classList.add('community-post-name');
        const user = await getUser(post.accountId);
        postName.innerText = user;
        const postDate = document.createElement('p');
        postDate.classList.add('community-post-time');
        postDate.innerText = timeSince( new Date(post.postTime));
        const postImage = document.createElement('img');
        postImage.classList.add('community-post-image');
        postImage.src = "./Assets/Images/user-picture.png";

        const postTitle = document.createElement('p')
        postTitle.classList.add('community-post-title');
        postTitle.innerHTML = post.title;
        const postBody = document.createElement('p')
        postBody.classList.add('community-post-body');
        postBody.innerHTML = post.content;

        const viewCommentsButton = document.createElement('button');
        viewCommentsButton.classList.add('community-comments-button');
        viewCommentsButton.innerText = "View Comments";
        const viewCommentsButtonImg = document.createElement('img');
        viewCommentsButtonImg.src = "./Assets/Images/dropdown-arrow-grey.svg";
        viewCommentsButton.appendChild(viewCommentsButtonImg);

        postInfo.append(postImage, postName, postDate);
        postContent.append(postTitle, postBody);
        postContainer.append(postInfo, postContent, viewCommentsButton);

        const postComments = document.createElement('div');
        postComments.classList.add('community-post-comments');
        const postInput = document.createElement('div');
        postInput.classList.add('community-post-input');

        const postInputImage = document.createElement('img');
        postInputImage.classList.add('community-post-image');
        postInputImage.src = "./Assets/Images/user-picture.png";
        const postInputField = document.createElement('input');
        postInputField.type = "text";
        postInputField.placeholder = "Write a comment...";

        postInput.append(postInputImage, postInputField);
        postComments.appendChild(postInput);

        for (const comment of post.comments) {
            const postComment = document.createElement('div');
            postComment.classList.add('community-post-comment');
            const postCommentImage = document.createElement('img');
            postCommentImage.classList.add('community-post-image');
            postCommentImage.src = "./Assets/Images/user-picture.png";

            const postCommentContent = document.createElement('div');
            postCommentContent.classList.add('community-comment-content');
            const postCommentName = document.createElement('p');
            postCommentName.classList.add('community-comment-name');
            postCommentName.innerText = await getUser(comment.accountId);
            const postCommemntText = document.createElement('p');
            postCommemntText.classList.add('community-comment-text');
            postCommemntText.innerText = comment.comment;

            postCommentContent.append(postCommentName, postCommemntText)
            postComment.append(postCommentImage, postCommentContent)
            postComments.appendChild(postComment);
        }

        newPost.append(postContainer, postComments);
        communityPosts.append(newPost);
        // document.querySelector(".community-comment-name").innerHTML = data[0].comments[0].comment
    }
}

const getUser = async (id) => {
    const response = await fetch(`http://localhost:3000/accounts/${id}`);
    const data = await response.json();
    return `${data.firstName} ${data.lastName}`;

}

const togglePopup = () => {
    popUpVisible = !popUpVisible;
    if (popUpVisible) {
        popup.style.display = "block";
        popupTitle.focus();
    }
    else {
        popup.style.display = "none";
    }
}

function timeSince(date) {
    var seconds = Math.abs((new Date() - date) / 1000);
    console.log(seconds)
    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

window.onload = async () => {
    await loadPosts();
}