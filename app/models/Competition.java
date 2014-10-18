package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
@Entity
public class Competition extends Model {

    public Competition(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.MaxLength(30)
    public String name;

    @Constraints.MaxLength(300)
    public String description;

    @ManyToMany(mappedBy = "competitions", fetch = FetchType.LAZY)
    public List<Jury> vouters;

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Project> projects;

    public static Finder<Long, Competition> find = new Finder<Long, Competition>(
            Long.class, Competition.class
    );

}
