package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Antoni Bertel on 18.10.2014.
 */
@Entity
public class Project extends Model {
    @Id
    @Constraints.Min(1)
    public Long id;

    @Constraints.MaxLength(30)
    public String name;

    @Constraints.MaxLength(100)
    public String url;

    @ManyToOne(cascade = CascadeType.ALL)
    public Competition competition;

    @OneToMany(mappedBy = "project")
    public List<Rating> ratings;
}
