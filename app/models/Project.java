package models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Antoni Bertel on 18.10.2014.
 */
@Entity
public class Project extends Model {

    public Project(String name, String url, String teamName) {
        this.name = name;
        this.url = url;
        this.teamName = teamName;
    }

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.MaxLength(30)
    public String name;

    @Constraints.MaxLength(30)
    public String teamName;

    @Constraints.MaxLength(100)
    public String url;

    @ManyToOne
    @JsonBackReference
    public Competition competition;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    public List<Rating> ratings;

    @Constraints.Min(-1)
    public int participantsCount;

    public static Finder<Long, Project> find = new Finder<Long, Project>(
            Long.class, Project.class
    );
}
