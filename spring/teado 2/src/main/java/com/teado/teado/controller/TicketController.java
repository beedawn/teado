package com.teado.teado.controller;

import com.teado.teado.model.Ticket;
import com.teado.teado.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.teado.teado.types.Status;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api")
public class TicketController {

    @Autowired
    TicketRepository ticketRepository;

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getAllTickets(@RequestParam(required = false) String title) {
        try {
            List<Ticket> tickets = new ArrayList<Ticket>();
            if (title == null) {
                ticketRepository.findAll().forEach(tickets::add);
            } else {
                ticketRepository.findByTitleContaining(title).forEach(tickets::add);
            }

            if (tickets.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tickets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/tickets/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable("id") long id){
        Optional<Ticket> ticketData = ticketRepository.findById(id);

        if(ticketData.isPresent()) {
            return new ResponseEntity<>(ticketData.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        }


    @PostMapping("/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){    //public Ticket(String title, String name, String email, String description)
        try{
            Ticket _ticket = ticketRepository.save(new Ticket(ticket.getTitle(),ticket.getReporter(),ticket.getEmail(),ticket.getDescription(), ticket.getDate(), ticket.getKey(),ticket.getTicketNumber(),ticket.getProjectName()));
            return new ResponseEntity<>(_ticket,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/tickets/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Optional<Ticket> ticketData = ticketRepository.findByTicketNumber(id);
        //public Ticket(String title, String name, String email, String description)
        if(ticketData.isPresent()){
            Ticket _ticket = ticketData.get();
            _ticket.setTitle(ticket.getTitle());
            _ticket.setDescription(ticket.getDescription());
            _ticket.setReporter(ticket.getReporter());
            _ticket.setEmail(ticket.getEmail());
            if(ticket.getStatus()==null){
                _ticket.setStatus(Status.OPEN);
            }else{
                _ticket.setStatus(ticket.getStatus());
            }

            return new ResponseEntity<>(ticketRepository.save(_ticket), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<HttpStatus> deleteTicket(@PathVariable("id") long id){
        try{
            ticketRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @DeleteMapping("/tickets")
    public ResponseEntity<HttpStatus> deleteAllTickets(){
        try{
            ticketRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
