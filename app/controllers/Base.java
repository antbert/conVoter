package controllers;

import com.avaje.ebean.Ebean;
import controllers.core.CorsAction;
import models.Competition;
import models.Jury;
import models.Project;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

import java.util.List;

public class Base extends Controller {

    public Result fillDatabase() {
        Logger.info("Trying to fill database");
        Jury firstJury = new Jury("login", "password");
        Competition firstCompetition = new Competition("name", "description");
        Project firsProject = new Project("name", "sdfsdf/fssfd");
        Project secondProject = new Project("name2", "fdsdsf/dsfsfdsf12323");

        firstCompetition.projects.add(firsProject);
        firstCompetition.projects.add(secondProject);
        firstJury.competitions.add(firstCompetition);
        Ebean.save(firstJury);
        List<Jury> users =
                Ebean.find(Competition.class).
                        where().eq("id", 1)
                        .findUnique().vouters;
        Project secondProject2 = Ebean.find(Project.class).where().eq("id", 1).findUnique();
        return ok(Json.toJson(users.get(0)));
    }

    ///////
    @With(CorsAction.class)
    public Result competition(String competitionId) {
        Integer competitionIdI = Integer.parseInt(competitionId);
        return ok(Json.toJson(Ebean.find(Competition.class).
                where().eq("id", competitionIdI).findList()));
    }


}
