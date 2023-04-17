import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import UserViewRouter from "./UserViewRouter";
import TicketType from "../interfaces/TicketInterface";
import commentApiCall from "../apiCall/commentApiCall";
import Status from "../interfaces/StatusEnum";
import apiCall from "../apiCall/ticketApiCall";
import { Container } from "react-bootstrap";
function Main() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket]=useState<TicketType>();
  const [ticketAdded,setTicketAdded]=useState(false);
  const [isTicketEdited, setIsTicketEdited]=useState(false);
  const [status,setStatus]=useState<Status>();
  useEffect(() => {
    apiCall(setTickets);
    
    if(currentTicket)
    setStatus(currentTicket.status)
    // const interval = setInterval(() => {
    //   apiCall(setTickets);
    // }, 2000);
    // return () => clearInterval(interval);
  }, [ticketAdded, currentTicket,isTicketEdited]);

  function deleteTicket(ticket: TicketType) {
  // console.log(tickets[2])
  // console.log(tickets[(ticket.ticketNumber-2)])
setCurrentTicket(tickets[(ticket.ticketNumber-2)]);

    apiCall(setTickets, ticket.id.toString(), "DELETE", ticket);

    

}

  function newTicket(ticket: TicketType) {
    apiCall(setTickets, "/", "POST", ticket);
    setCurrentTicket(ticket);
  }
  function editTicket(ticket: TicketType) {
    apiCall(setTickets, ticket.ticketNumber.toString(), "PUT", ticket);
   setCurrentTicket(ticket);
  }

  function updateStatus(ticket: TicketType, status: Status) {
    const updateTicket = { ...ticket, status: status };
    apiCall(setTickets, ticket.ticketNumber.toString(), "PUT", updateTicket);
  }
  if (tickets)
    return (
      <div className="App">
        <NavBar />
        <Container>
          <UserViewRouter
          currentTicket={currentTicket}
          setCurrentTicket={setCurrentTicket}
            tickets={tickets}
            newTicket={newTicket}
            editTicket={editTicket}
            deleteTicket={deleteTicket}
            updateStatus={updateStatus}
            setTickets={setTickets}
            ticketAdded={ticketAdded}
            setTicketAdded={setTicketAdded}
            status={status}
            setStatus={setStatus}
            isTicketEdited={isTicketEdited}
            setIsTicketEdited={setIsTicketEdited}
          />
        </Container>
      </div>
    );
  else
    return (
      <div className="App">
        Error, please try refreshing. ERROR: No tickets in Main.tsx Check API
      </div>
    );
}

export default Main;
