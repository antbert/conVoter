package models.pojo;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
public class AngularError {
    public AngularError(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    private String error;

}
