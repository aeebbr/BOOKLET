package com.booklet.authservice.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="user_image")
public class UserImage extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userImageId;

    @Column
    private String imagePath;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
