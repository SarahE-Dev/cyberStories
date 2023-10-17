

let storyObjects = [];
let allComments = [];

fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then((data) => data.json())
    .then((storyIds) => {
        const idArr = []
        storyIds.length = 100
        for(let id of storyIds){
            const request = fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            idArr.push(request)
        }
        return Promise.all(idArr)
    })
    .then(responseArr =>{
        const requestArr = []
        for(let res of responseArr){
            requestArr.push(res.json())
        }
        return Promise.all(requestArr)
    })
    .then(data=>{
        let commentIds = [];
        for(let object of data){
            htmlElementMaker(object)
            commentIds.push(object.kids)
        }
        console.log(commentIds[0])
    })
    
    
    
    function htmlElementMaker(story){
        let link = story.url
                if(link === undefined){
                    link = '';
                }
                let linkShown = link.split('/')
                let numOfComments = story.descendants
                if(numOfComments === undefined){
                    numOfComments = '0';
                }
                let html = `<li class="bg-gradient list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto small">
                    <div class="fw-bold small">${story.title}<a href="${story.url}" class="small badge link-secondary">${linkShown[2]}</a></div>
                    <p class="badge">${story.score} points   |   Submitted by: ${story.by}   |   ${numOfComments} comments |  <a id="${story.id}" class="small link-danger comments">View comments</a></p>
                  </div>
                  <span class="badge bg-secondary rounded-pill">${story.score}</span>
            </li>`
               $('ol').append(html)
    }





    
    

    

   


     
 

    
    
    

    

    



