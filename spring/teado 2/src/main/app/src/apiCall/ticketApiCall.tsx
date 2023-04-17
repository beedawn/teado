import TicketType from "../interfaces/TicketInterface";
function apiCall(
  setTickets?: Function,
  url?: string,
  methodType?: string,
  ticket?: TicketType
) {
  const apiEndPoint = "http://localhost:8080/api/tickets";
if(url==="/"){
    fetch(apiEndPoint, {
        method: methodType, // or 'PUT'
        headers: {
          "Content-Type": "application/json",
         
          'mode': 'no-cors',
       },
        body: JSON.stringify(ticket),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
} if (url&&url!=="/") {
  console.log(apiEndPoint +"/"+ url)
    fetch(apiEndPoint +"/"+ url, {
      method: methodType, // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PUT,OPTIONS'
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (setTickets) {
    fetch(apiEndPoint, {method:'GET', headers:{  "Content-Type": "application/json",
    'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
  }})
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setTickets([]);
      });
  }
}

export default apiCall;
