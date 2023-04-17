import CommentType from "../interfaces/CommentInterface";
function commentApiCall(
  setComments?: Function,
  url?: string,
  methodType?: string,
  comment?: CommentType
) {
  const apiEndPoint = "http://localhost:8080/api/comments";
if(url==="/"){
    fetch(apiEndPoint, {
        method: methodType, // or 'PUT'
        headers: {
          "Content-Type": "application/json",
         
          'mode': 'no-cors',
       },
        body: JSON.stringify(comment),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
} if (url&&url!=="/") {
    fetch(apiEndPoint +"/"+ url, {
      method: methodType, // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PUT,OPTIONS'
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (setComments) {
    fetch(apiEndPoint, {method:'GET', headers:{  "Content-Type": "application/json",
    'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
  }})
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setComments([]);
      });
  }
}

export default commentApiCall;
