async function readPosts () {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...'

    let req = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await req.json();

    if (json.length > 0) {
        postArea.innerHTML = '';
        
        for (let i in json) {
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr/></div>`;
            postArea.innerHTML += postHtml
        }
    } else {
        postArea.innerHTML = 'Não há posts disponíveis'
    }
} 

async function addNewPost (title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'post',
            headers: {'Content-type': 'application/json',},

            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    )

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    readPosts()
}

document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (title && body) {
        addNewPost(title, body)
    } else {
        alert('Preencha todos os campos')
    }
})

readPosts();

