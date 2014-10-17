package models;

/**
 * Created by Antoni_Bertel on 10/16/2014.
 */

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Jury extends Model {

    public Jury(String name, String login, String password) {
        this.name = name;
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
    public String login;

    @Constraints.MaxLength(30)
    public String password;

    public String imageLink;

//    @Formats.DateTime(pattern = "dd/MM/yyyy")
//    public Date dueDate = new Date();

    @ManyToMany(cascade = CascadeType.ALL)
    public List<Competition> competitions;

    public static Finder<Long, Jury> find = new Finder<Long, Jury>(
            Long.class, Jury.class
    );

}