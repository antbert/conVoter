package models;

/**
 * Created by Antoni_Bertel on 10/16/2014.
 */

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Jury extends Model {

    @Id
    @Constraints.Min(1)
    @Constraints.Required
    public Long id;

    @Constraints.Required
    @Constraints.Max(30)
    @Column(unique=true)
    public String name;

    @Constraints.Required
    @Constraints.Max(30)
    public String login;

    @Constraints.Required
    @Constraints.Max(30)
    public String password;

    @Constraints.Required
    @Constraints.Max(30)
    public String imageLink;

    @Formats.DateTime(pattern="dd/MM/yyyy")
    public Date dueDate = new Date();

    public static Finder<Long, Jury> find = new Finder<Long, Jury>(
            Long.class, Jury.class
    );

}