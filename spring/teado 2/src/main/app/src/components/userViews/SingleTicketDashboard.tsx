import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import TicketType from "../../interfaces/TicketInterface";
import StatusSelector from "./StatusSelector";
import apiCall from "../../apiCall/ticketApiCall";
import commentApiCall from "../../apiCall/commentApiCall";
import CommentType from "../../interfaces/CommentInterface";
import CommentView from "./commentViews/CommentView";
import Status from "../../interfaces/StatusEnum";
function SingleTicketDashboard(props: {
  tickets: Array<TicketType>;
  setTicketView:Function;
  updateStatus: Function;
  setTickets: Function;
  currentTicket?:any;
  commentAdded?:boolean;
  setCommentAdded?:Function;
  setCurrentTicket:Function;


}) {
  const [comments, setComments] = useState<any>([]);
  const tickets = props.tickets;
  const setTickets = props.setTickets;
  const updateStatus = props.updateStatus;
  const currentTicket=props.currentTicket;
  const setCommentAdded=props.setCommentAdded;
  const commentAdded =props.commentAdded;
  const setTicketView=props.setTicketView;
  let ticketId: any = useParams();
  let ticket:TicketType | undefined;
  const setCurrentTicket=props.setCurrentTicket;
//   if(!ticketId.ticketId){
//   if(currentTicket){
//     ticketId.ticketId=currentTicket.ticketNumber;

//   }
// }

 

  if(currentTicket===undefined){
  ticket = tickets.find(
    (element) => element.ticketNumber === ticketId.ticketId
  );
  setCurrentTicket(ticket);
}
  else{
    ticket=currentTicket;
  }

  let commentFiltered;
if(ticketId!=undefined){
  // console.log("COMMMENT TICKET NUMBER")
  // console.log(comments.filter((element: CommentType) => element.ticketNumber === ticketId.ticketId));
  // console.log("PARAMS TICKET")
  // console.log(ticketId.ticketId);
   
  commentFiltered = comments.filter((element: CommentType) => element.ticketNumber === ticketId.ticketId);

  ;


}if(currentTicket!=undefined){
  
  commentFiltered = comments.filter((element: CommentType) => element.ticketId === currentTicket.key);


}


  useEffect(() => {
    commentApiCall(setComments);
  //   apiCall(setTickets);
//     if(ticket&&currentTicket){
// setStatus(currentTicket.status);}
// if(ticket&&!currentTicket){
// setStatus(ticket.status)
// }
// if(currentTicket)
// setStatus(currentTicket.status);


  }, [currentTicket,commentAdded]);

 





  if (ticket) {
 
    const date = new Date(ticket.date);
    return (
      <>
        <div key={ticket.key} className="selectedTicketStyle">
        <div className="focusTicketTitle">Selected Ticket</div>
          <div className="row">
            <div>Project: {ticket.projectName}</div>
            <div>Ticket: {ticket.ticketNumber}</div>
            <div>
              {" "}
              Date:{date.toDateString()} {date.getHours()}:{date.getMinutes()}:
              {date.getSeconds()}
            </div>

            <div className="col-12">Title:{ticket.title}</div>
            <div
              className="col-3"
              // onMouseOut={() => {
              //   props.updateStatus(ticket, status);
              // }}
            >
                 <Link to="#"
                //  to={`/edit/${ticket.ticketNumber}`} 
                 onClick={()=>{setTicketView(false)}}>Edit Ticket</Link>

              {(currentTicket!=undefined)?<StatusSelector
             
                updateStatus={updateStatus}
                ticket={ticket}
              />:<></>}
            </div>
            <div className="col-3">
              <div className="col-3">Email:{ticket.email}</div>
              <div className="col-3">Reporter:{ticket.reporter}</div>
            </div>
            <div>Description:{ticket.description}</div>
              <CommentView ticket={ticket} comments={commentFiltered} setComments={setComments} setCommentAdded={setCommentAdded} commentAdded={commentAdded} />
          
          </div>
        </div>
      </>
    );
  } else {
    return <div>No ticket available. Please try again.</div>;
  }
}

export default SingleTicketDashboard;
