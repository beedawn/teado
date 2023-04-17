package com.teado.teado.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teado.teado.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long>{
    List<Ticket> findByTitleContaining(String title);
    List<Ticket> findById(int id);

    Optional<Ticket> findByTicketNumber(String ticketNumber);


}
