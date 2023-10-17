
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
                let shown = link.split('/')
                let comments = story.descendants
                if(comments === undefined){
                    comments = '0';
                }
                let html = `<li class="bg-gradient list-group-item d-flex justify-content-between align-items-start" id="list${i}">
                <div class="ms-2 me-auto small">
                    <div class="fw-bold small">${story.title}<a href="${story.url}" class="small badge link-secondary">${shown[2]}</a></div>
                    <p class="badge">${story.score} points   |   Submitted by: ${story.by}   |   ${comments} comments |  <a id="${story.id}" class="small link-danger comments">View comments</a></p>
                  </div>
                  <span class="badge bg-secondary rounded-pill">${story.score}</span>
            </li>`
               $('ol').append(html) 
               allComments.push(story.kids)
               
               return allComments
                })
        
            }
           
        
    })
    





    
    

    

   


     
 

    
    
    

    

    



