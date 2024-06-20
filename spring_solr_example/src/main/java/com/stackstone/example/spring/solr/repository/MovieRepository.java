package com.stackstone.example.spring.solr.repository;

import com.stackstone.example.spring.solr.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author stackstone
 */
@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, Long> {
}
