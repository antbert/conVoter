package controllers;

import com.avaje.ebean.Ebean;
import models.Competition;
import models.Jury;
import models.Project;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

public class Base extends Controller {

    public Result fillDatabase() {
        Logger.info("Trying to fill database");
        Jury firstJury = new Jury("login", "password");
        firstJury.name = "Дмитрий Дудин";
        firstJury.imageLink = "http://wth.by/images/dudes/dudin.png";
        firstJury.color = "#1a9b1f";
        Jury secondJury = new Jury("login2", "password2");
        secondJury.name = "Анастасия Хоменкова";
        secondJury.imageLink = "http://wth.by/images/dudes/nastia.png";
        secondJury.color = "#e51919";

        Competition firstCompetition = new Competition("What the hack", "Within 44 hours the participants will have to create a prototype\n" +
                "and / or a demo that will impress the jury and the audience");
        Competition secondCompetition = new Competition("bla-bla-bla", "bla-bla-bla-bla-bla");
        Project firsProject = new Project("Convoter", "http://localhost:9000", "team name");
        Project secondProject = new Project("Convoter2", "http://localhost:9000", "team name");

        Project firsProject1 = new Project("bla-bla", "http://bla", "team name");
        Project secondProject1 = new Project("bla-bla2", "http://bla", "team name");

        firstCompetition.projects.add(firsProject);
        firstCompetition.projects.add(secondProject);
        secondCompetition.projects.add(firsProject1);
        secondCompetition.projects.add(secondProject1);

        firstJury.competitions.add(firstCompetition);
        secondJury.competitions.add(firstCompetition);
        firstJury.competitions.add(secondCompetition);
        secondJury.competitions.add(secondCompetition);
        Ebean.save(firstJury);
        Ebean.save(secondJury);
        List<Jury> users =
                Ebean.find(Competition.class).
                        where().eq("id", 1)
                        .findUnique().vouters;
        Project secondProject2 = Ebean.find(Project.class).where().eq("id", 1).findUnique();
        return ok(Json.toJson(users.get(0)));
    }

}
