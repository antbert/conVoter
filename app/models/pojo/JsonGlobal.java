package models.pojo;

import play.db.ebean.Model;

import java.util.List;

/**
 * Created by Antoni Bertel on 18.10.2014.
 */
public class JsonGlobal {
    public Model userInfo;
    public Model currentCompetition;
    public List<Model> competitionsOfCurrentUser;
}
