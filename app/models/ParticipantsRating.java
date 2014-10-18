package models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Created by Antoni Bertel on 18.10.2014.
 */
@Entity
public class ParticipantsRating extends Model {
    @Id
    @GeneratedValue
    public Long id;

    @ManyToOne
    @JsonBackReference
    public Project project;

    @Constraints.Min(0)
    public int mark;

    public static Finder<Long, ParticipantsRating> find = new Finder<Long, ParticipantsRating>(
            Long.class, ParticipantsRating.class
    );
}