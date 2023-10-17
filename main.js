
let idArr = [];
let storyObjects = [];
let allComments = [];

fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then((data) => data.json())
    .then((storyIds) => {
        idArr = storyIds
        idArr.length = 102
        return idArr 
    })
    .then((idArr) => {
        for(let i = 0; i < idArr.length; i++){
            fetch(`https://hacker-news.firebaseio.com/v0/item/${idArr[i]}.json?print=pretty`)
            .then((data) => data.json())
            .then((story) => {
                let link = story.url
                if(link === undefined){
                    link = '';
                }
                let linkShown = link.split('/')
                let numOfComments = story.descendants
                if(numOfComments === undefined){
                    numOfComments = '0';
                }
                let html = `<li class="bg-gradient list-group-item d-flex justify-content-between align-items-start" id="list${i}">
                <div class="ms-2 me-auto small">
                    <div class="fw-bold small">${story.title}<a href="${story.url}" class="small badge link-secondary">${linkShown[2]}</a></div>
                    <p class="badge">${story.score} points   |   Submitted by: ${story.by}   |   ${numOfComments} comments |  <a id="${story.id}" class="small link-danger comments">View comments</a></p>
                  </div>
                  <span class="badge bg-secondary rounded-pill">${story.score}</span>
            </li>`
               $('ol').append(html)
               console.log(story.kids)
               let commentIds = story.kids
               allComments.push(commentIds)
            })
        
        
        }
        return allComments
    })
    
    
    console.log(allComments[0])
    console.log(typeof(allComments))
    
    
    





    
    

    

   


     
 

    
    
    

    

    



