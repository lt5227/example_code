package com.stackstone.example.spring.solr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "movie", schema = "movies")
public class MovieEntity {
    @Id
    @Comment("电影ID")
    @Column(name = "movie_id", nullable = false)
    private Long id;

    @Size(max = 500)
    @Comment("电影名称")
    @Column(name = "name", length = 500)
    private String name;

    @Size(max = 500)
    @Comment("别名")
    @Column(name = "alias", length = 500)
    private String alias;

    @Size(max = 500)
    @Comment("演员")
    @Column(name = "actors", length = 500)
    private String actors;

    @Size(max = 500)
    @Comment("封面")
    @Column(name = "cover", length = 500)
    private String cover;

    @Size(max = 500)
    @Comment("导演")
    @Column(name = "directors", length = 500)
    private String directors;

    @Comment("豆瓣评分")
    @Column(name = "douban_score")
    private Double doubanScore;

    @Comment("豆瓣票数")
    @Column(name = "douban_votes")
    private Integer doubanVotes;

    @Size(max = 100)
    @Comment("类型")
    @Column(name = "genres", length = 100)
    private String genres;

    @Size(max = 50)
    @Comment("IMDbID")
    @Column(name = "imdb_id", length = 50)
    private String imdbId;

    @Size(max = 100)
    @Comment("语言")
    @Column(name = "languages", length = 100)
    private String languages;

    @Comment("片长")
    @Column(name = "mins")
    private Double mins;

    @Size(max = 100)
    @Comment("官方地址")
    @Column(name = "official_site", length = 100)
    private String officialSite;

    @Size(max = 100)
    @Comment("制片国家/地区")
    @Column(name = "regions", length = 100)
    private String regions;

    @Comment("上映日期")
    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Size(max = 500)
    @Comment("加密的 URL 可忽略")
    @Column(name = "slug", length = 500)
    private String slug;

    @Comment("电影描述")
    @Lob
    @Column(name = "storyline")
    private String storyline;

    @Size(max = 100)
    @Comment("标签")
    @Column(name = "tags", length = 100)
    private String tags;

    @Comment("年份")
    @Column(name = "year")
    private Integer year;

    @Size(max = 1000)
    @Comment("演员与PERSON_ID的对应关系,多个演员采用“|”符号分割，格式“演员A:ID|演员B:ID”")
    @Column(name = "actor_ids", length = 1000)
    private String actorIds;

    @Size(max = 1000)
    @Comment("导演与PERSON_ID的对应关系,多个导演采用“|”符号分割，格式“导演A:ID|导演B:ID”")
    @Column(name = "director_ids", length = 1000)
    private String directorIds;

}
