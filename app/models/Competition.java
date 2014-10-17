package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
@Entity
public class Competition extends Model {

    @Id
    @Constraints.Min(1)
    @Constraints.Required
    public Long id;

    @ManyToMany(mappedBy = "competitions")
    public List<Jury> vouters;

    public static Finder<Long, Competition> find = new Finder<Long, Competition>(
            Long.class, Competition.class
    );

}
