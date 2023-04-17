package com.teado.teado.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teado.teado.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
    List<Comment> findByTitleContaining(String title);
    List<Comment> findById(String id);

    Optional<Comment> findByTicketNumber(String ticketNumber);


    List<Comment> findByKeyValue(String id);
}
