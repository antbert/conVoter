package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
@Entity
public class RecursiveCompetition extends Model {

    public RecursiveCompetition(Competition competition) {
        this.name = competition.name;
        this.description = competition.description;
        this.id = competition.id;
        this.startDate = competition.startDate;
        this.endDate = competition.endDate;
        this.vouters = competition.vouters;
        this.projects = competition.projects;
    }

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.MaxLength(30)
    public String name;

    @Constraints.MaxLength(300)
    public String description;

    @Formats.DateTime(pattern = "dd/MM/yyyy")
    public Date startDate = new Date();

    @Formats.DateTime(pattern = "dd/MM/yyyy")
    public Date endDate = new Date();

    @ManyToMany(mappedBy = "competitions")
    public List<Jury> vouters;

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL)
    public List<Project> projects;

    public static Finder<Long, RecursiveCompetition> find = new Finder<Long, RecursiveCompetition>(
            Long.class, RecursiveCompetition.class
    );
}
