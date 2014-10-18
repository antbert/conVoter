package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
@Entity
public class Competition extends Model {

    @Id
    @Constraints.Min(1)
    public Long id;

    @Constraints.MaxLength(30)
    public String name;

    @Constraints.MaxLength(300)
    public String description;

    @ManyToMany(mappedBy = "competitions")
    public List<Jury> vouters;

    @OneToMany(mappedBy = "competition")
    public List<Project> projects;

    public static Finder<Long, Competition> find = new Finder<Long, Competition>(
            Long.class, Competition.class
    );

}
