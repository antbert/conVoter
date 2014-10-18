package models;

/**
 * Created by Antoni_Bertel on 10/16/2014.
 */

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Jury extends Model {
    public static final String LOGIN = "login";

    public Jury(String login, String password) {
        this.login = login;
        this.password = password;
    }

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.MaxLength(30)
    @Column(unique = true)
    public String name;

    @Constraints.MaxLength(30)
    @JsonIgnore
    public String login;

    @Constraints.MaxLength(30)
    @JsonIgnore
    public String password;

    public String imageLink;

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonBackReference
    public List<Competition> competitions;

    @OneToMany(mappedBy = "jury", cascade = CascadeType.ALL)
    @JsonBackReference
    public List<Rating> ratings;

    public static Finder<Long, Jury> find = new Finder<Long, Jury>(
            Long.class, Jury.class
    );

}