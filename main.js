

let storyObjects = [];


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
        let num = 0;
        for(let object of data){
            num++
            htmlElementMaker(object, num)
            getStoryComments(object.kids, num)
        }
        
        
        
    })
    
    
   
    
    function htmlElementMaker(story, idNum){
        let link = story.url
                if(link === undefined){
                    link = '';
                }
                let linkShown = link.split('/');
                let actualLink = linkShown[2];
                if(actualLink === undefined){
                    actualLink = ''
                }
                let numOfComments = story.descendants
                if(numOfComments === undefined){
                    numOfComments = '0';
                }
                let html = `<li class="bg-gradient list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto small">
                    <div class="fw-bold small">${story.title}<a href="${story.url}" class="small badge link-secondary">${actualLink}</a></div>
                    <p class="badge">${story.score} points   |   Submitted by: ${story.by}   |   ${numOfComments} comments |  <a data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample" href="#collapseExample${idNum}" class="small link-danger comments">View comments</a></p>
                  </div>
                  <span class="badge bg-secondary rounded-pill">${story.score}</span>
            </li>
          <div class="collapse" id="collapseExample${idNum}">
            <div class="card card-body" >
              <p id="comments${idNum}"></p>
            </div>
          </div>`
               $('ol').append(html)
    }

   
function getStoryComments(arr, num){
    if(arr !== undefined){
        const commentPromiseArr = []
        for(let commentID of arr){
            const request = fetch(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`)
            commentPromiseArr.push(request)
        }
        Promise.all(commentPromiseArr)
            .then(commmentRespArr =>{
                const requestArr = []
                for(let res of commmentRespArr){
                    requestArr.push(res.json())
                }
                return Promise.all(requestArr)
            })
            .then(data=>{
                let newHTML = ``
                for(let index of data){
                    newHTML += index.text
                }
                $(`#comments${num}`).append(newHTML) 
            })
    }
}
   





    
    

    

   


     
 

    
    
    

    

    



