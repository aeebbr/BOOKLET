package com.booklet.recomservice.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "book")
public class Book {
    @Id
    private String bookIsbn;

    private String bookTitle;

    private String bookPublisher;

    private Integer bookPrice;

    private String bookDescription;

    private Float bookScore;

    private Float bookGrade;

    @Column
    private String bookImage;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="author_id")
    private Author author;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookGenre> bookGenres = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookLikes> bookLikes = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Paragraph> paragraphs = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
}
