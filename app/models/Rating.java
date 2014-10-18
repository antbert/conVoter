package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Created by Antoni Bertel on 18.10.2014.
 */
@Entity
public class Rating extends Model {
    @Id
    @Constraints.Min(1)
    public Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    public Project project;

    @ManyToOne(cascade = CascadeType.ALL)
    public Jury jury;

    @Constraints.Min(0)
    public int mark;
}
