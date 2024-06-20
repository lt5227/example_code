package com.stackstone.example.spring.solr;

import com.stackstone.example.spring.solr.entity.MovieEntity;
import com.stackstone.example.spring.solr.repository.MovieRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpJdkSolrClient;
import org.apache.solr.common.SolrInputDocument;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@SpringBootTest
class SpringSolrExampleApplicationTests {

    @Autowired
    private MovieRepository movieRepository;

    @SneakyThrows
    @Test
    void indexMovieToSolr() {
        List<MovieEntity> movieEntities = movieRepository.findAll();
        log.info("Movie entities found: {}", movieEntities.size());
		HttpJdkSolrClient solrClient = null;
		try {
			solrClient = new HttpJdkSolrClient.Builder("http://localhost:8983/solr/movie_core_1").build();
			List<SolrInputDocument> documents = new ArrayList<>();
			for (MovieEntity movie : movieEntities) {
				SolrInputDocument document = new SolrInputDocument();
				// MOVIE_ID
				document.addField("MOVIE_ID", movie.getId());
				// NAME
				if (movie.getName() != null)
					document.addField("NAME", movie.getName());
				// ALIAS
				if (movie.getAlias() != null)
					document.addField("ALIAS", movie.getAlias());
				// COVER
				if (movie.getCover() != null)
					document.addField("COVER", movie.getCover());
				// DIRECTORS
				if (movie.getDirectors() != null)
					document.addField("DIRECTORS", movie.getDirectors());
				// DOUBAN_SCORE
				if (movie.getDoubanScore() != null)
					document.addField("DOUBAN_SCORE", movie.getDoubanScore());
				// DOUBAN_VOTES
				if (movie.getDoubanVotes() != null)
					document.addField("DOUBAN_VOTES", movie.getDoubanVotes());
				// GENRES
				if (movie.getGenres() != null)
					document.addField("GENRES", movie.getGenres());
				// LANGUAGES
				if (movie.getLanguages() != null)
					document.addField("LANGUAGES", movie.getLanguages());
				// MINS
				if (movie.getMins() != null)
					document.addField("MINS", movie.getMins());
				// OFFICIAL_SITE
				if (movie.getOfficialSite() != null)
					document.addField("OFFICIAL_SITE", movie.getOfficialSite());
				// REGIONS
				if (movie.getRegions() != null)
					document.addField("REGIONS", movie.getRegions());
				// RELEASE_DATE
				if (movie.getReleaseDate() != null)
					document.addField("RELEASE_DATE", movie.getReleaseDate().atStartOfDay(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT));
				// STORYLINE
				if (movie.getStoryline() != null)
					document.addField("STORYLINE", movie.getStoryline());
				// TAGS
				if (movie.getTags() != null)
					document.addField("TAGS", movie.getTags());
				// YEAR
				if (movie.getYear() != null)
					document.addField("YEAR", movie.getYear());
				// ACTOR_IDS
				if (movie.getActorIds() != null)
					document.addField("ACTOR_IDS", movie.getActorIds());
				// DIRECTOR_IDS
				if (movie.getDirectorIds() != null)
					document.addField("DIRECTOR_IDS", movie.getDirectorIds());
				documents.add(document);
			}
			solrClient.add(documents);
			solrClient.commit();
		} catch (SolrServerException | IOException e) {
			log.error(e.getMessage(), e);
		} finally {
			solrClient.close();
		}
    }

}
